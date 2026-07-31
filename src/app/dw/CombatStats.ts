export type CombatAttribute = 'strength' | 'agility' | 'vitality' | 'intelligence' | 'luck';
export type CombatSubAttribute = 'attack' | 'defense' | 'accuracy' | 'evasion' | 'maxHp' | 'maxMp';
export type StatusEffectType = 'buff' | 'debuff';

export interface CombatAttributes {
    strength: number;
    agility: number;
    vitality: number;
    intelligence: number;
    luck: number;
}

export interface CombatSubAttributes {
    attack: number;
    defense: number;
    accuracy: number;
    evasion: number;
    maxHp: number;
    maxMp: number;
}

export interface StatusEffect {
    id: string;
    label: string;
    type: StatusEffectType;
    attribute?: CombatAttribute;
    subAttribute?: CombatSubAttribute;
    amount: number;
    duration: number;
}

export interface CombatStats {
    attributes: CombatAttributes;
    subAttributes: CombatSubAttributes;
    effects: StatusEffect[];
}

export interface CombatStatModifier {
    attribute?: CombatAttribute;
    subAttribute?: CombatSubAttribute;
    amount: number;
}

export const createDefaultCombatStats = (): CombatStats => ({
    attributes: {
        strength: 4,
        agility: 4,
        vitality: 5,
        intelligence: 3,
        luck: 3,
    },
    subAttributes: {
        attack: 4,
        defense: 10,
        accuracy: 90,
        evasion: 8,
        maxHp: 20,
        maxMp: 10,
    },
    effects: [],
});

export const createBuff = (overrides: Partial<StatusEffect>): StatusEffect => ({
    id: 'buff',
    label: 'Buff',
    type: 'buff',
    amount: 1,
    duration: 1,
    ...overrides,
});

export const createDebuff = (overrides: Partial<StatusEffect>): StatusEffect => ({
    id: 'debuff',
    label: 'Debuff',
    type: 'debuff',
    amount: -1,
    duration: 1,
    ...overrides,
});

export const applyStatusEffect = (stats: CombatStats, effect: StatusEffect): CombatStats => {
    stats.effects.push(effect);
    return stats;
};

export const removeExpiredEffects = (stats: CombatStats): CombatStats => {
    stats.effects = stats.effects.filter((effect) => effect.duration > 0);
    return stats;
};

export const tickEffects = (stats: CombatStats, delta = 1): CombatStats => {
    stats.effects = stats.effects.map((effect) => ({ ...effect, duration: effect.duration - delta }));
    return removeExpiredEffects(stats);
};

export const getAttributeModifier = (stats: CombatStats, attribute: CombatAttribute): number => {
    return stats.effects.reduce((total, effect) => {
        if (effect.attribute === attribute) {
            return total + effect.amount;
        }
        return total;
    }, 0);
};

export const getSubAttributeModifier = (stats: CombatStats, subAttribute: CombatSubAttribute): number => {
    return stats.effects.reduce((total, effect) => {
        if (effect.subAttribute === subAttribute) {
            return total + effect.amount;
        }
        return total;
    }, 0);
};

export const getEffectiveAttribute = (stats: CombatStats, attribute: CombatAttribute): number => {
    return stats.attributes[attribute] + getAttributeModifier(stats, attribute);
};

export const getEffectiveSubAttribute = (stats: CombatStats, subAttribute: CombatSubAttribute): number => {
    return stats.subAttributes[subAttribute] + getSubAttributeModifier(stats, subAttribute);
};
