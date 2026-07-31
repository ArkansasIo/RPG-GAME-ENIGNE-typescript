import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { TOTAL_ZONE_COUNT, ZoneCatalog, getZoneById, getZonesInBand, validateZoneCatalog } from './ZoneCatalog';

const readCatalog = (): ZoneCatalog => {
    const filePath = path.join(process.cwd(), 'public/res/zoneCatalog72.json');
    const json = readFileSync(filePath, 'utf8');
    return JSON.parse(json) as ZoneCatalog;
};

describe('ZoneCatalog', () => {
    it('defines the 72-zone world catalog with sequential ids and codes', () => {
        const catalog = readCatalog();

        expect(catalog.zones).toHaveLength(TOTAL_ZONE_COUNT);
        expect(catalog.zones[0]?.code).toBe('ZONE_01');
        expect(catalog.zones[71]?.code).toBe('ZONE_72');

        const firstZone = getZoneById(catalog, 1);
        const lastZone = getZoneById(catalog, 72);

        expect(firstZone?.name).toBe('Dawnvale Plains');
        expect(lastZone?.name).toBe('Worldroot / Final Realm');
    });

    it('matches the intended progression bands', () => {
        const catalog = readCatalog();

        expect(getZonesInBand(catalog, 'beginner-kingdom')).toHaveLength(12);
        expect(getZonesInBand(catalog, 'northern-wilderness')).toHaveLength(12);
        expect(getZonesInBand(catalog, 'great-desert')).toHaveLength(8);
        expect(getZonesInBand(catalog, 'oceanic-kingdoms')).toHaveLength(8);
        expect(getZonesInBand(catalog, 'frozen-north')).toHaveLength(6);
        expect(getZonesInBand(catalog, 'firelands')).toHaveLength(6);
        expect(getZonesInBand(catalog, 'swamplands')).toHaveLength(8);
        expect(getZonesInBand(catalog, 'deep-underground')).toHaveLength(6);
        expect(getZonesInBand(catalog, 'otherworld-endgame')).toHaveLength(6);
    });

    it('passes structural validation checks', () => {
        const catalog = readCatalog();

        expect(validateZoneCatalog(catalog)).toEqual([]);
    });
});
