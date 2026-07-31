import { describe, expect, it } from 'vitest';
import { getNpcDialogue, getMonsterDialogue, getPrologueText, getStoryActs } from '@/app/dw/Story';

describe('Story', () => {
    it('exposes five acts with chapters and level ranges', () => {
        const acts = getStoryActs();

        expect(acts).toHaveLength(5);
        expect(acts[0].title).toEqual('The Ashen Dawn');
        expect(acts[0].chapters[0].title).toEqual('The Hollow Village');
        expect(acts[0].chapters[0].levelRange).toEqual('1-20');
        expect(acts[4].chapters[0].title).toEqual('The Last Ember');
        expect(acts[4].chapters[0].levelRange).toEqual('601-720');
    });

    it('provides a prologue and dialogue catalog for NPCs and monsters', () => {
        const prologue = getPrologueText();
        expect(prologue.length).toBeGreaterThan(3);
        expect(prologue.join(' ')).toContain('Erdr');

        const npcDialogue = getNpcDialogue('king');
        expect(npcDialogue.length).toBeGreaterThan(0);
        expect(npcDialogue.join(' ')).toContain('Princess');

        const monsterDialogue = getMonsterDialogue('Slime');
        expect(monsterDialogue.length).toBeGreaterThan(0);
        expect(monsterDialogue.join(' ')).toContain('slime');
    });
});
