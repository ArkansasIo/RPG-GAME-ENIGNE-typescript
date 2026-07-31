import { getClassById, getRaceById } from './CharacterClasses';
import { getEffectiveAttribute, getEffectiveSubAttribute } from './CombatStats';

export interface PlayerStatsDetailLine {
    label: string;
    value: string;
}

export type PlayerStatsPageId = 'OVERVIEW' | 'ATTRIBUTES' | 'COMBAT' | 'LOADOUT';

export interface PlayerStatsRow {
    label: string;
    value: string;
}

export interface PlayerStatsPage {
    id: PlayerStatsPageId;
    title: string;
    rows: PlayerStatsRow[];
}

const formatPair = (current: number | undefined, max: number | undefined): string => {
    return `${current ?? 0}/${max ?? 0}`;
};

const getElementRatings = (hero: any): Record<string, number> => {
    const combatStats = hero.combatStats;
    const vitality = combatStats ? getEffectiveAttribute(combatStats, 'vitality') : 0;
    const intelligence = combatStats ? getEffectiveAttribute(combatStats, 'intelligence') : 0;
    const luck = combatStats ? getEffectiveAttribute(combatStats, 'luck') : 0;

    const fire = Math.min(95, 20 + vitality * 2 + luck);
    const ice = Math.min(95, 18 + intelligence * 2 + luck);
    const lightning = Math.min(95, 16 + intelligence + vitality + luck);
    const poison = Math.min(95, 12 + vitality * 2 + luck * 2);

    return { fire, ice, lightning, poison };
};

const getActionRatings = (hero: any): { initiative: number; speed: number; crit: number; hit: number; dodge: number } => {
    const agility = hero.getAgility ? hero.getAgility() : hero.agility ?? 0;
    const luck = hero.combatStats ? getEffectiveAttribute(hero.combatStats, 'luck') : 0;
    const accuracy = hero.getAccuracy ? hero.getAccuracy() : hero.combatStats ? getEffectiveSubAttribute(hero.combatStats, 'accuracy') : 0;
    const evasion = hero.getEvasion ? hero.getEvasion() : hero.combatStats ? getEffectiveSubAttribute(hero.combatStats, 'evasion') : 0;

    return {
        initiative: Math.max(1, Math.floor((agility + accuracy) / 2)),
        speed: 20 + agility * 2,
        crit: Math.min(95, 5 + luck * 2),
        hit: Math.min(99, accuracy),
        dodge: Math.min(95, evasion),
    };
};

export const getPlayerStatsPages = (hero: any, party: any): PlayerStatsPage[] => {
    const combatStats = hero.combatStats;
    const className = getClassById(hero.classId ?? '')?.name ?? 'Adventurer';
    const raceName = getRaceById(hero.raceId ?? '')?.name ?? 'Human';
    const actionRatings = getActionRatings(hero);
    const elementRatings = getElementRatings(hero);

    const overviewRows: PlayerStatsRow[] = [
        { label: 'NAME', value: hero.name ?? 'Hero' },
        { label: 'CLASS', value: className },
        { label: 'RACE', value: raceName },
        { label: 'LEVEL', value: `${hero.level ?? 1}` },
        { label: 'EXP', value: `${hero.exp ?? 0}` },
        { label: 'NEXT LV', value: `${hero.getExpRemainingToNextLevel ? hero.getExpRemainingToNextLevel() : 0}` },
        { label: 'GOLD', value: `${party?.gold ?? 0}` },
        { label: 'HP', value: formatPair(hero.hp, hero.maxHp) },
        { label: 'MP', value: formatPair(hero.mp, hero.maxMp) },
    ];

    const attributesRows: PlayerStatsRow[] = [
        { label: 'STR', value: `${hero.getStrength ? hero.getStrength() : hero.strength ?? 0}` },
        { label: 'AGI', value: `${hero.getAgility ? hero.getAgility() : hero.agility ?? 0}` },
        { label: 'VIT', value: `${combatStats ? getEffectiveAttribute(combatStats, 'vitality') : 0}` },
        { label: 'INT', value: `${combatStats ? getEffectiveAttribute(combatStats, 'intelligence') : 0}` },
        { label: 'LCK', value: `${combatStats ? getEffectiveAttribute(combatStats, 'luck') : 0}` },
        { label: 'ATK', value: `${combatStats ? getEffectiveSubAttribute(combatStats, 'attack') : 0}` },
        { label: 'DEF', value: `${hero.getDefense ? hero.getDefense() : combatStats ? getEffectiveSubAttribute(combatStats, 'defense') : 0}` },
        { label: 'ACC', value: `${hero.getAccuracy ? hero.getAccuracy() : combatStats ? getEffectiveSubAttribute(combatStats, 'accuracy') : 0}` },
        { label: 'EVA', value: `${hero.getEvasion ? hero.getEvasion() : combatStats ? getEffectiveSubAttribute(combatStats, 'evasion') : 0}` },
    ];

    const combatRows: PlayerStatsRow[] = [
        { label: 'INIT', value: `${actionRatings.initiative}` },
        { label: 'SPEED', value: `${actionRatings.speed} ft` },
        { label: 'CRIT', value: `${actionRatings.crit}%` },
        { label: 'HIT%', value: `${actionRatings.hit}%` },
        { label: 'DODGE%', value: `${actionRatings.dodge}%` },
        { label: 'FIRE RES', value: `${elementRatings.fire}%` },
        { label: 'ICE RES', value: `${elementRatings.ice}%` },
        { label: 'LITE RES', value: `${elementRatings.lightning}%` },
        { label: 'POIS RES', value: `${elementRatings.poison}%` },
    ];

    const loadoutRows: PlayerStatsRow[] = [
        { label: 'WEAPON', value: hero.weapon?.displayName ?? hero.weapon?.name ?? 'None' },
        { label: 'ARMOR', value: hero.armor?.displayName ?? hero.armor?.name ?? 'None' },
        { label: 'SHIELD', value: hero.shield?.displayName ?? hero.shield?.name ?? 'None' },
        { label: 'FX COUNT', value: `${combatStats?.effects?.length ?? 0}` },
        { label: 'MAXHP+', value: `${combatStats ? getEffectiveSubAttribute(combatStats, 'maxHp') : 0}` },
        { label: 'MAXMP+', value: `${combatStats ? getEffectiveSubAttribute(combatStats, 'maxMp') : 0}` },
    ];

    return [
        { id: 'OVERVIEW', title: 'OVERVIEW', rows: overviewRows },
        { id: 'ATTRIBUTES', title: 'ATTRIBUTES', rows: attributesRows },
        { id: 'COMBAT', title: 'COMBAT', rows: combatRows },
        { id: 'LOADOUT', title: 'LOADOUT', rows: loadoutRows },
    ];
};

export const getPlayerStatsDetails = (hero: any, party: any): string[] => {
    return getPlayerStatsPages(hero, party).flatMap((page) => {
        const header = `[${page.title}]`;
        const rows = page.rows.map((row) => `${row.label}  ${row.value}`);
        return [ header, ...rows ];
    });
};
