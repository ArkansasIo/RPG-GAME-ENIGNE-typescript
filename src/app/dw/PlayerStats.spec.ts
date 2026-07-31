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

        expect(details[0]).toContain('NAME');
        expect(details[1]).toContain('LEVEL');
        expect(details[2]).toContain('EXP');
        expect(details[3]).toContain('HP');
        expect(details[10]).toContain('WEAPON');
        expect(details[12]).toContain('GOLD');
    });
});
