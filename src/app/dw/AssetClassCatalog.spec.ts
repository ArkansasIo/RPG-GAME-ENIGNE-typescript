import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { AssetClassCatalog, ASSET_RARITY_TIERS, countAllCatalogClasses, countClassesInGroup, getGroupById, validateAssetClassCatalog } from './AssetClassCatalog';

const readCatalog = (): AssetClassCatalog => {
    const filePath = path.join(process.cwd(), 'public/res/assetClassCatalog.json');
    const json = readFileSync(filePath, 'utf8');
    return JSON.parse(json) as AssetClassCatalog;
};

describe('AssetClassCatalog', () => {
    it('defines the required rarity progression', () => {
        const catalog = readCatalog();

        expect(catalog.meta.rarityTiers).toEqual([ ...ASSET_RARITY_TIERS ]);
    });

    it('enforces the 30/20/20/20 class breakdown for the 90-class spec', () => {
        const catalog = readCatalog();

        const weapons = getGroupById(catalog, 'weapons');
        const armor = getGroupById(catalog, 'armor');
        const accessories = getGroupById(catalog, 'accessories');
        const adventureWorld = getGroupById(catalog, 'adventure-world');

        expect(weapons).toBeDefined();
        expect(armor).toBeDefined();
        expect(accessories).toBeDefined();
        expect(adventureWorld).toBeDefined();

        expect(countClassesInGroup(weapons!)).toBe(30);
        expect(countClassesInGroup(armor!)).toBe(20);
        expect(countClassesInGroup(accessories!)).toBe(20);
        expect(countClassesInGroup(adventureWorld!)).toBe(20);
        expect(countAllCatalogClasses(catalog)).toBe(90);
    });

    it('passes structural validation checks', () => {
        const catalog = readCatalog();

        expect(validateAssetClassCatalog(catalog)).toEqual([]);
    });
});