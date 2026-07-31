import { Utils } from 'gtp';

export interface CombatResolution {
    hit: boolean;
    critical: boolean;
    damage: number;
}

export const resolveCombatAction = (
    heroAccuracy: number,
    enemyDodge: number,
    heroStrength: number,
    defending: boolean,
    roll?: number,
): CombatResolution => {
    const accuracy = Math.max(5, Math.min(95, 55 + heroAccuracy * 3 - enemyDodge * 2 - (defending ? 15 : 0)));
    const resolvedRoll = typeof roll === 'number' ? roll : Utils.randomInt(0, 101);
    const hit = resolvedRoll <= accuracy;
    const critical = hit && resolvedRoll >= Math.max(5, accuracy - 12);
    const baseDamage = Math.max(1, heroStrength + (critical ? 2 : 0));
    const damage = hit ? Math.max(1, defending ? Math.floor(baseDamage / 2) : baseDamage) : 0;

    return { hit, critical, damage };
};
