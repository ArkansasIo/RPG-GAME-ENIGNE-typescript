import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { AssetClassCatalog, countClassesInGroup } from './AssetClassCatalog';
import { buildAllSplitManifests } from './AssetSheetManifest';

const readCatalog = (): AssetClassCatalog => {
    const filePath = path.join(process.cwd(), 'public/res/assetClassCatalog.json');
    return JSON.parse(readFileSync(filePath, 'utf8')) as AssetClassCatalog;
};

const readManifest = (fileName: string) => {
    const filePath = path.join(process.cwd(), 'public/res/manifests', fileName);
    return JSON.parse(readFileSync(filePath, 'utf8')) as {
        entries: Array<{ spriteId: string; rect: { x: number; y: number; w: number; h: number } }>;
    };
};

describe('AssetSheetManifest', () => {
    it('creates one manifest per production split group', () => {
        const manifests = buildAllSplitManifests(readCatalog());

        expect(Object.keys(manifests).sort()).toEqual([
            'accessories',
            'adventure-world',
            'armor',
            'weapons',
        ]);
    });

    it('matches entry counts with class counts from each group', () => {
        const catalog = readCatalog();
        const manifests = buildAllSplitManifests(catalog);
        const groupsById = new Map(catalog.groups.map((group) => [ group.id, group ]));

        expect(manifests.weapons.entries).toHaveLength(countClassesInGroup(groupsById.get('weapons')!));
        expect(manifests.armor.entries).toHaveLength(countClassesInGroup(groupsById.get('armor')!));
        expect(manifests.accessories.entries).toHaveLength(countClassesInGroup(groupsById.get('accessories')!));
        expect(manifests['adventure-world'].entries).toHaveLength(countClassesInGroup(groupsById.get('adventure-world')!));
    });

    it('emits stable sprite IDs and 16x16 placeholder rectangles', () => {
        const manifests = buildAllSplitManifests(readCatalog());
        const entry = manifests.weapons.entries[0];

        expect(entry.spriteId).toMatch(/^dw\.weapons\./);
        expect(entry.tier).toBe(1);
        expect(entry.rarity).toBe('common');
        expect(entry.placeholder).toBe(true);
        expect(entry.rect.w).toBe(16);
        expect(entry.rect.h).toBe(16);
    });

    it('matches committed manifest artifact files', () => {
        const built = buildAllSplitManifests(readCatalog());
        const weaponsFile = readManifest('weapons-16x16.manifest.json');
        const armorFile = readManifest('armor-16x16.manifest.json');
        const accessoriesFile = readManifest('accessories-16x16.manifest.json');
        const worldFile = readManifest('adventure-world-16x16.manifest.json');

        expect(weaponsFile.entries.map((entry) => entry.spriteId)).toEqual(built.weapons.entries.map((entry) => entry.spriteId));
        expect(armorFile.entries.map((entry) => entry.spriteId)).toEqual(built.armor.entries.map((entry) => entry.spriteId));
        expect(accessoriesFile.entries.map((entry) => entry.spriteId)).toEqual(built.accessories.entries.map((entry) => entry.spriteId));
        expect(worldFile.entries.map((entry) => entry.spriteId)).toEqual(built['adventure-world'].entries.map((entry) => entry.spriteId));
    });
});
