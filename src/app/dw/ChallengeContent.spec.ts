import { describe, expect, it } from 'vitest';
import { getChallengeCatalog, getDungeons, getRaids, getTrials } from './ChallengeContent';

describe('ChallengeContent', () => {
    it('exposes 40 dungeons, 40 raids, and 40 trials', () => {
        const catalog = getChallengeCatalog();

        expect(getDungeons()).toHaveLength(40);
        expect(getRaids()).toHaveLength(40);
        expect(getTrials()).toHaveLength(40);
        expect(catalog.dungeons[0].title).toContain('Ashen');
        expect(catalog.raids[0].title).toContain('Blackbarrow');
        expect(catalog.trials[0].title).toContain('First Step');
    });
});
