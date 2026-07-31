import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ZoneDataManifest, createZoneDataPathIndex, getZoneManifestEntry, loadZoneDataBundle } from './ZoneDataLoader';

const readManifest = (): ZoneDataManifest => {
    const filePath = path.join(process.cwd(), 'public/res/zones/zoneDataManifest72.json');
    return JSON.parse(readFileSync(filePath, 'utf8')) as ZoneDataManifest;
};

describe('ZoneDataLoader', () => {
    it('finds entries by zone code and creates fast path index', () => {
        const manifest = readManifest();
        const first = getZoneManifestEntry(manifest, 'ZONE_01');
        const index = createZoneDataPathIndex(manifest);

        expect(first).toBeDefined();
        expect(first?.name).toBe('Dawnvale Plains');
        expect(index.ZONE_72).toBeDefined();
    });

    it('loads all zone data assets for a zone code', async () => {
        const manifest = readManifest();
        const root = path.join(process.cwd(), 'public');

        const bundle = await loadZoneDataBundle(manifest, 'ZONE_01', async (assetPath) => {
            const filePath = path.join(root, assetPath);
            return JSON.parse(readFileSync(filePath, 'utf8'));
        });

        const zoneData = bundle.zoneData as { zoneCode: string };
        const encounter = bundle.encounterTable as { zoneCode: string };
        const loot = bundle.lootTable as { zoneCode: string };

        expect(zoneData.zoneCode).toBe('ZONE_01');
        expect(encounter.zoneCode).toBe('ZONE_01');
        expect(loot.zoneCode).toBe('ZONE_01');
    });

    it('throws for unknown zone code', async () => {
        const manifest = readManifest();

        await expect(loadZoneDataBundle(manifest, 'ZONE_99', async () => ({}))).rejects.toThrow('Unknown zone code: ZONE_99');
    });
});
