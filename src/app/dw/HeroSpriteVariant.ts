export interface HeroSpriteVariant {
    assetKey: string;
    gender: 'male' | 'female';
    tint: string;
}

export interface HeroSpriteVariantContext {
    classId?: string;
    raceId?: string;
}

const classVariantMap: Record<string, HeroSpriteVariant> = {
    warrior: { assetKey: 'hero-warrior', gender: 'male', tint: '#f0c36d' },
    mage: { assetKey: 'hero-mage', gender: 'female', tint: '#8fd5ff' },
    priest: { assetKey: 'hero-priest', gender: 'female', tint: '#fff0a6' },
    rogue: { assetKey: 'hero-rogue', gender: 'male', tint: '#8de0bb' },
    ranger: { assetKey: 'hero-ranger', gender: 'male', tint: '#b7d37a' },
    paladin: { assetKey: 'hero-paladin', gender: 'male', tint: '#d9c2ff' },
    cleric: { assetKey: 'hero-cleric', gender: 'female', tint: '#ffe29f' },
    berserker: { assetKey: 'hero-berserker', gender: 'male', tint: '#ff8e72' },
};

export function getHeroSpriteVariant(context: HeroSpriteVariantContext): HeroSpriteVariant {
    const classKey = context.classId?.toLowerCase();
    if (classKey && classVariantMap[classKey]) {
        return classVariantMap[classKey];
    }

    const raceKey = context.raceId?.toLowerCase();
    if (raceKey && ['elf', 'gnome', 'tiefling'].includes(raceKey)) {
        return { assetKey: 'hero-female', gender: 'female', tint: '#d3c1ff' };
    }

    return { assetKey: 'hero-male', gender: 'male', tint: '#f6f1dc' };
}
