export interface PlayerStatsDetailLine {
    label: string;
    value: string;
}

export const getPlayerStatsDetails = (hero: any, party: any): string[] => {
    const lines: string[] = [
        `NAME  ${hero.name ?? 'Hero'}`,
        `LEVEL ${hero.level ?? 1}`,
        `EXP   ${hero.exp ?? 0}`,
        `HP    ${hero.hp ?? 0}/${hero.maxHp ?? 0}`,
        `MP    ${hero.mp ?? 0}/${hero.maxMp ?? 0}`,
        `STR   ${hero.getStrength ? hero.getStrength() : hero.strength ?? 0}`,
        `AGI   ${hero.getAgility ? hero.getAgility() : hero.agility ?? 0}`,
        `DEF   ${hero.getDefense ? hero.getDefense() : 0}`,
        `ACC   ${hero.getAccuracy ? hero.getAccuracy() : 0}`,
        `EVA   ${hero.getEvasion ? hero.getEvasion() : 0}`,
        `WEAPON ${hero.weapon?.name ?? 'None'}`,
        `ARMOR  ${hero.armor?.name ?? 'None'}`,
        `SHIELD ${hero.shield?.name ?? 'None'}`,
        `GOLD   ${party?.gold ?? 0}`,
    ];

    return lines;
};
