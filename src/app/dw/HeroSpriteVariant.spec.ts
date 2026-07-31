import { describe, expect, it } from 'vitest';
import { getHeroSpriteVariant } from './HeroSpriteVariant';

describe('getHeroSpriteVariant', () => {
    it('returns a class-based variant for warriors', () => {
        const variant = getHeroSpriteVariant({ classId: 'warrior', raceId: 'human' });
        expect(variant.assetKey).toBe('hero-warrior');
        expect(variant.gender).toBe('male');
    });

    it('returns the mage asset for mage heroes', () => {
        const variant = getHeroSpriteVariant({ classId: 'mage', raceId: 'human' });
        expect(variant.assetKey).toBe('hero-mage');
        expect(variant.gender).toBe('female');
        expect(variant.tint).toBe('#8fd5ff');
    });

    it('returns a gender-based fallback for unsupported classes', () => {
        const variant = getHeroSpriteVariant({ classId: 'custom', raceId: 'elf' });
        expect(variant.assetKey).toBe('hero-female');
        expect(variant.gender).toBe('female');
    });
});
