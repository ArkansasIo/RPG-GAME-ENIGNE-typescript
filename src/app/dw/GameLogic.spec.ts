import { describe, expect, it } from 'vitest';
import { GameLogic } from './GameLogic';
import { Party } from './Party';
import { Hero } from './Hero';
import { DwGame } from './DwGame';
import { createNewAdventureLog } from './AdventureLog';
import { getQuests } from './Quests';

describe('GameLogic', () => {
    it('summarizes party state and applies quest rewards', () => {
        const game = new DwGame();
        const party = new Party(game);
        const hero = new Hero(game, { name: 'Erdrick' });
        party.addMember(hero);
        party.addGold(120);

        const snapshot = GameLogic.summarizeParty(party, getQuests().slice(0, 3));
        expect(snapshot.partyLevel).toEqual(1);
        expect(snapshot.gold).toEqual(120);
        expect(snapshot.questCount).toEqual(3);

        GameLogic.applyQuestRewards(party, getQuests()[0]);
        expect(party.gold).toEqual(220);
    });

    it('accepts and completes quests through the adventure log', () => {
        const game = new DwGame();
        const party = new Party(game);
        const hero = new Hero(game, { name: 'Erdrick' });
        party.addMember(hero);
        const log = createNewAdventureLog();

        expect(GameLogic.acceptQuest(log, 'q1')).toBe(true);
        expect(log.quests.activeQuestId).toBe('q1');

        expect(GameLogic.completeQuest(log, party, 'q1')).toBe(true);
        expect(log.quests.completedQuestIds).toContain('q1');
        expect(log.quests.activeQuestId).toBeUndefined();
        expect(party.gold).toBe(100);
    });

    it('rewards the party when discovering a new region', () => {
        const game = new DwGame();
        const party = new Party(game);
        const hero = new Hero(game, { name: 'Erdrick' });
        party.addMember(hero);
        const log = createNewAdventureLog();

        expect(GameLogic.discoverRegion(log, party, 'brecconary')).toBe(true);
        expect(log.quests.discoveredRegions).toContain('brecconary');
        expect(party.gold).toBe(15);
        expect(GameLogic.discoverRegion(log, party, 'brecconary')).toBe(false);
    });
});
