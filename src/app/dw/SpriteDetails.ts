export interface SpriteDetailConfig {
    badge: 'shield' | 'coin' | 'crown' | 'star' | 'spark';
    label: string;
    tint: string;
    accent: string;
}

export interface SpriteDetailContext {
    classId?: string;
    raceId?: string;
    type?: string;
    rank?: string;
    monsterClass?: string;
}

const heroDetailMap: Record<string, SpriteDetailConfig> = {
    warrior: { badge: 'shield', label: 'warrior', tint: '#f0c36d', accent: '#7a4b1a' },
    mage: { badge: 'spark', label: 'mage', tint: '#8fd5ff', accent: '#2d4b78' },
    priest: { badge: 'star', label: 'priest', tint: '#fff0a6', accent: '#7d6b18' },
    rogue: { badge: 'spark', label: 'rogue', tint: '#8de0bb', accent: '#205a42' },
};

const npcDetailMap: Record<string, SpriteDetailConfig> = {
    MERCHANT_GREEN: { badge: 'coin', label: 'merchant', tint: '#ffd166', accent: '#8a5a00' },
    MERCHANT_RED: { badge: 'coin', label: 'merchant', tint: '#ffd166', accent: '#8a5a00' },
    HEALER: { badge: 'star', label: 'healer', tint: '#c7f9cc', accent: '#236b3d' },
    SOLDIER: { badge: 'shield', label: 'guard', tint: '#b7c7ff', accent: '#3b4d8a' },
};

const enemyDetailMap: Record<string, SpriteDetailConfig> = {
    boss: { badge: 'crown', label: 'boss', tint: '#ff8b8b', accent: '#7d0000' },
    elite: { badge: 'star', label: 'elite', tint: '#ffcf6b', accent: '#8b5500' },
    mini: { badge: 'spark', label: 'mini', tint: '#cdb4ff', accent: '#5a306d' },
};

export function getSpriteDetailConfig(kind: 'hero' | 'npc' | 'enemy', context: SpriteDetailContext): SpriteDetailConfig | undefined {
    if (kind === 'hero') {
        const classKey = context.classId?.toLowerCase();
        return heroDetailMap[classKey ?? 'warrior'];
    }

    if (kind === 'npc') {
        const key = context.type?.toUpperCase();
        return npcDetailMap[key ?? 'MERCHANT_GREEN'];
    }

    const rankKey = context.rank?.toLowerCase();
    if (rankKey && enemyDetailMap[rankKey]) {
        return enemyDetailMap[rankKey];
    }

    if (context.monsterClass?.toLowerCase() === 'dragon') {
        return enemyDetailMap.boss;
    }

    return undefined;
}
