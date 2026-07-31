import { describe, expect, it } from 'vitest';
import { getSpriteDetailConfig } from './SpriteDetails';

describe('getSpriteDetailConfig', () => {
    it('returns a warrior detail for hero classes', () => {
        const detail = getSpriteDetailConfig('hero', { classId: 'warrior', raceId: 'human' });
        expect(detail?.badge).toBe('shield');
        expect(detail?.label).toBe('warrior');
    });

    it('returns a merchant detail for NPC types', () => {
        const detail = getSpriteDetailConfig('npc', { type: 'MERCHANT_GREEN' });
        expect(detail?.badge).toBe('coin');
        expect(detail?.label).toBe('merchant');
    });

    it('returns a boss detail for enemies with a boss rank', () => {
        const detail = getSpriteDetailConfig('enemy', { rank: 'boss', monsterClass: 'dragon' });
        expect(detail?.badge).toBe('crown');
        expect(detail?.label).toBe('boss');
    });
});
