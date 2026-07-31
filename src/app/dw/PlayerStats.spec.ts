import { describe, expect, it } from 'vitest';
import { getPlayerStatsDetails } from './PlayerStats';

describe('PlayerStats', () => {
    it('builds a detailed and readable player profile', () => {
        const hero = {
            name: 'Erdrick',
            level: 8,
            exp: 3200,
            hp: 72,
            maxHp: 90,
            mp: 28,
            maxMp: 36,
            getStrength: () => 14,
            getAgility: () => 11,
            getDefense: () => 9,
            getAccuracy: () => 13,
            getEvasion: () => 6,
            weapon: { name: 'Broadsword' },
            armor: { name: 'Leather Armor' },
            shield: { name: 'Small Shield' },
        } as any;
        const party = { gold: 1250 } as any;

        const details = getPlayerStatsDetails(hero, party);
        const detailText = details.join('\n');

        expect(detailText).toContain('NAME');
        expect(detailText).toContain('LEVEL');
        expect(detailText).toContain('EXP');
        expect(detailText).toContain('GOLD');
        expect(detailText).toContain('WEAPON');
        expect(detailText).toContain('SHIELD');
    });

    it('includes primary and sub-stat lines for the status window', () => {
        const hero = {
            name: 'Erdrick',
            level: 8,
            exp: 3200,
            hp: 72,
            maxHp: 90,
            mp: 28,
            maxMp: 36,
            strength: 10,
            agility: 9,
            combatStats: {
                attributes: { strength: 10, agility: 9, vitality: 8, intelligence: 7, luck: 6 },
                subAttributes: { attack: 6, defense: 5, accuracy: 88, evasion: 9, maxHp: 12, maxMp: 8 },
                effects: [],
            },
            getStrength: () => 14,
            getAgility: () => 11,
            getDefense: () => 9,
            getAccuracy: () => 13,
            getEvasion: () => 6,
        } as any;
        const party = { gold: 1250 } as any;

        const details = getPlayerStatsDetails(hero, party);
        const detailText = details.join('\n');

        expect(detailText).toContain('VIT');
        expect(detailText).toContain('INT');
        expect(detailText).toContain('LCK');
        expect(detailText).toContain('ATK');
        expect(detailText).toContain('ACC');
        expect(detailText).toContain('EVA');
    });
});
