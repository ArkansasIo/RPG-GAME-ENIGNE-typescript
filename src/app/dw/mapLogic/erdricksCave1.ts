import { AbstractMapLogic } from './AbstractMapLogic';
import { getNpcDialogue } from '@/app/dw/Story';

/**
 * Logic for Erdrick's Cave, 1st floor.
 */
export class ErdricksCave1 extends AbstractMapLogic {

    constructor() {
        super({
            guardian: () => [
                'The cave breathes like a sleeping beast.',
                ...getNpcDialogue('scholar'),
            ],
        });
    }
}
