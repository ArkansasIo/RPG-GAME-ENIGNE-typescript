import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface ZoneCatalog {
    zones: Array<{ id: number; code: string; name: string }>;
}

interface ZoneDataManifest {
    zones: Array<{
        id: number;
        code: string;
        name: string;
        data: {
            zoneData: string;
            encounterTable: string;
            lootTable: string;
            npcData: string;
            musicData: string;
        };
    }>;
}

const readJson = <T>(filePath: string): T => {
    return JSON.parse(readFileSync(filePath, 'utf8')) as T;
};

describe('ZoneDataManifest72', () => {
    it('contains one complete data package for each zone in the 72-zone catalog', () => {
        const root = process.cwd();
        const zoneCatalogPath = path.join(root, 'public/res/zoneCatalog72.json');
        const manifestPath = path.join(root, 'public/res/zones/zoneDataManifest72.json');

        const catalog = readJson<ZoneCatalog>(zoneCatalogPath);
        const manifest = readJson<ZoneDataManifest>(manifestPath);

        expect(manifest.zones).toHaveLength(catalog.zones.length);

        manifest.zones.forEach((zoneEntry, index) => {
            const zoneFromCatalog = catalog.zones[index];
            expect(zoneEntry.id).toBe(zoneFromCatalog.id);
            expect(zoneEntry.code).toBe(zoneFromCatalog.code);

            Object.values(zoneEntry.data).forEach((relativePath) => {
                const absolutePath = path.join(root, 'public', relativePath);
                expect(existsSync(absolutePath)).toBe(true);
                expect(() => JSON.parse(readFileSync(absolutePath, 'utf8'))).not.toThrow();
            });
        });
    });
});
