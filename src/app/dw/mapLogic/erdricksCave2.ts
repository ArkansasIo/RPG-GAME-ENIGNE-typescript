import { AbstractMapLogic } from './AbstractMapLogic';
import { getNpcDialogue } from '@/app/dw/Story';

/**
 * Logic for Erdrick's Cave, 2nd floor.
 */
export class ErdricksCave2 extends AbstractMapLogic {

    constructor() {
        super({
            relicKeeper: () => [
                'The old relic hums with a memory of brighter times.',
                ...getNpcDialogue('priest'),
            ],
        });
    }
}
