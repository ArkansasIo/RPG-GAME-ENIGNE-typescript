import { describe, expect, it } from 'vitest';
import { resolveCombatAction } from './BattleLogic';

describe('BattleLogic', () => {
    it('reports a crit and strong damage when the roll is favorable', () => {
        const result = resolveCombatAction(12, 2, 8, false, 95);
        expect(result.hit).toBe(true);
        expect(result.critical).toBe(true);
        expect(result.damage).toBeGreaterThan(0);
    });

    it('returns zero damage when the attack misses', () => {
        const result = resolveCombatAction(2, 10, 4, false, 1);
        expect(result.hit).toBe(false);
        expect(result.damage).toBe(0);
    });
});
