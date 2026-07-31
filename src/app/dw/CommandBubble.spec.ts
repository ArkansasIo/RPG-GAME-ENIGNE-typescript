import { describe, expect, it } from 'vitest';
import { CommandBubble, getCommandChoicesForMode } from '@/app/dw/CommandBubble';
import { DwGame } from '@/app/dw/DwGame';

const mockFont = {
    cellW: 8,
    cellH: 9,
};

describe('CommandBubble menu helpers', () => {
    it('returns the main command options for the primary menu', () => {
        const choices = getCommandChoicesForMode('MAIN');

        expect(choices).toContain('TALK');
        expect(choices).toContain('MAP');
        expect(choices).toContain('ITEM');
    });

    it('returns the submenu choices for the item menu', () => {
        const choices = getCommandChoicesForMode('ITEM');

        expect(choices).toEqual([ 'USE ITEM', 'CANCEL' ]);
    });

    it('returns the submenu choices for the spell menu', () => {
        const choices = getCommandChoicesForMode('SPELL');

        expect(choices).toEqual([ 'CAST SPELL', 'CANCEL' ]);
    });

    it('maps a click inside the command list to the corresponding entry', () => {
        const game = new DwGame();
        game.assets.set('font', mockFont);
        const bubble = new CommandBubble(game);

        bubble.handlePointerSelection(100, 100);

        expect(bubble.getSelection()).toBe(0);
    });
});
