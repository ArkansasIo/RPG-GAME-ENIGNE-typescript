import { DwGame } from '../DwGame';
import { AbstractMapLogic, NpcTextGeneratorMap } from './AbstractMapLogic';
import { NpcText } from './MapLogic';
import { getNpcDialogue } from '@/app/dw/Story';

const talks: NpcTextGeneratorMap = {

    merchant1: (game: DwGame): NpcText => {
        return {
            conversationType: 'merchant',
            choices: [ 'bambooPole', 'club', 'copperSword' ],
            introText: [
                'We deal in weapons and armor.\nDost thou wish to buy anything today?',
                ...getNpcDialogue('merchant'),
            ].join('\n'),
        };
    },

    guard1: (game: DwGame): NpcText => {
        return [
            'The roads beyond Garinham are watched by keen eyes and old fear.',
            ...getNpcDialogue('guard'),
        ];
    },

    villager1: (game: DwGame): NpcText => {
        return [
            'The wind rises before battle, and every hearth grows a little warmer.',
            ...getNpcDialogue('villager'),
        ];
    },
};

/**
 * Logic for Garinham.
 */
export class Garinham extends AbstractMapLogic {

    constructor() {
        super(talks);
    }
}
