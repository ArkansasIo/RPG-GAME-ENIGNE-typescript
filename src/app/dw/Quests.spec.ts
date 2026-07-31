import { describe, expect, it } from 'vitest';
import { getMainQuests, getQuests, getSideQuests } from './Quests';

describe('Quests', () => {
    it('exposes fifty quests split across main and side content', () => {
        const quests = getQuests();
        expect(quests).toHaveLength(50);
        expect(getMainQuests()).toHaveLength(25);
        expect(getSideQuests()).toHaveLength(25);
        expect(quests[0].title).toEqual('The Ashen Bell');
        expect(quests[49].title).toEqual('The Final Hearth');
    });
});
