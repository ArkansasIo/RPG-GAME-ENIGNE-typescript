import { describe, expect, it } from 'vitest';
import { createWorldCatalog, getRegionForLevel, WORLD_LEVEL_CAP } from '@/app/dw/World';

describe('World progression', () => {
    it('creates 72 regions that span levels 1 through 720', () => {
        const regions = createWorldCatalog();

        expect(regions).toHaveLength(72);
        expect(WORLD_LEVEL_CAP).toEqual(720);
        expect(regions[0].levelMin).toEqual(1);
        expect(regions[regions.length - 1].levelMax).toEqual(720);
    });

    it('returns the region that contains a given level', () => {
        const regions = createWorldCatalog();
        const region = getRegionForLevel(321, regions);

        expect(region).toBeDefined();
        expect(region?.levelMin).toBeLessThanOrEqual(321);
        expect(region?.levelMax).toBeGreaterThanOrEqual(321);
    });
});
