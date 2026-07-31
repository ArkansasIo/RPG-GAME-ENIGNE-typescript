import { describe, expect, it } from 'vitest';
import {
    applyStatusEffect,
    createBuff,
    createDebuff,
    createDefaultCombatStats,
    getEffectiveAttribute,
    getEffectiveSubAttribute,
    tickEffects,
} from './CombatStats';

describe('CombatStats', () => {
    it('applies buffs and debuffs to attributes and sub-attributes', () => {
        const stats = createDefaultCombatStats();
        const strengthBuff = createBuff({ id: 'focus', label: 'Focus', attribute: 'strength', amount: 3, duration: 3 });
        const defenseDebuff = createDebuff({ id: 'slow', label: 'Slow', subAttribute: 'defense', amount: -2, duration: 2 });

        applyStatusEffect(stats, strengthBuff);
        applyStatusEffect(stats, defenseDebuff);

        expect(getEffectiveAttribute(stats, 'strength')).toEqual(7);
        expect(getEffectiveSubAttribute(stats, 'defense')).toEqual(8);
    });

    it('creates a sensible default stat set', () => {
        const stats = createDefaultCombatStats();
        expect(stats.attributes.strength).toEqual(4);
        expect(stats.attributes.agility).toEqual(4);
        expect(stats.attributes.vitality).toEqual(5);
        expect(stats.subAttributes.maxHp).toEqual(20);
        expect(stats.subAttributes.maxMp).toEqual(10);
    });

    it('expires effects when their duration is consumed', () => {
        const stats = createDefaultCombatStats();
        applyStatusEffect(stats, createBuff({ id: 'focus', label: 'Focus', attribute: 'strength', amount: 2, duration: 1 }));
        tickEffects(stats, 1);

        expect(stats.effects).toHaveLength(0);
        expect(getEffectiveAttribute(stats, 'strength')).toEqual(4);
    });
});
