import { describe, expect, it } from 'vitest';
import { getWorldLevels, getWorldLevelByLevel } from '@/app/dw/WorldLevels';

describe('WorldLevels', () => {
    it('provides nine world levels', () => {
        const levels = getWorldLevels();
        expect(levels).toHaveLength(9);
        expect(levels[0].name).toEqual('Starter Vale');
        expect(levels[8].name).toEqual('Crown of Ash');
    });

    it('returns the level info for a given world level', () => {
        const info = getWorldLevelByLevel(5);
        expect(info?.region).toEqual('Mire March');
        expect(info?.difficulty).toEqual('Scout');
    });
});
