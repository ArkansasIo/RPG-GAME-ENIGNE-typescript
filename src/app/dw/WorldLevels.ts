export interface WorldLevelInfo {
    level: number;
    name: string;
    region: string;
    difficulty: string;
    monsterBias: string;
    rewardHint: string;
}

const WORLD_LEVELS: WorldLevelInfo[] = [
    { level: 1, name: 'Starter Vale', region: 'Ashen Plains', difficulty: 'Novice', monsterBias: 'Beasts', rewardHint: 'Warm herbs and simple relics' },
    { level: 2, name: 'Moss Hollow', region: 'Ashen Plains', difficulty: 'Novice', monsterBias: 'Creatures', rewardHint: 'Basic charms' },
    { level: 3, name: 'Cinder Crossing', region: 'Ashen Plains', difficulty: 'Apprentice', monsterBias: 'Undead', rewardHint: 'Smoked stones' },
    { level: 4, name: 'Raven Fen', region: 'Mire March', difficulty: 'Apprentice', monsterBias: 'Beasts', rewardHint: 'Old bone charms' },
    { level: 5, name: 'Thornwatch', region: 'Mire March', difficulty: 'Scout', monsterBias: 'Creatures', rewardHint: 'Wild herbs' },
    { level: 6, name: 'Grim Ford', region: 'Mire March', difficulty: 'Scout', monsterBias: 'Undead', rewardHint: 'Shrouded relics' },
    { level: 7, name: 'Sunken Gate', region: 'Stormreach', difficulty: 'Veteran', monsterBias: 'Beasts', rewardHint: 'Frosted talismans' },
    { level: 8, name: 'Echo Ridge', region: 'Stormreach', difficulty: 'Veteran', monsterBias: 'Creatures', rewardHint: 'Lightning crystals' },
    { level: 9, name: 'Crown of Ash', region: 'Stormreach', difficulty: 'Champion', monsterBias: 'Ancients', rewardHint: 'Legendary ember shards' },
];

export const getWorldLevels = (): WorldLevelInfo[] => WORLD_LEVELS.slice();

export const getWorldLevelByLevel = (level: number): WorldLevelInfo | undefined => {
    return WORLD_LEVELS.find((entry) => entry.level === level);
};
