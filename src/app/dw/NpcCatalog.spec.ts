import { describe, expect, it } from 'vitest';
import { getNpcCatalog, getNpcProfessions } from './NpcCatalog';

describe('NpcCatalog', () => {
    it('exposes forty new NPCs and eighteen professions', () => {
        const npcs = getNpcCatalog();
        const professions = getNpcProfessions();

        expect(npcs).toHaveLength(40);
        expect(professions).toHaveLength(18);
        expect(npcs[0].name).toEqual('Barnabas');
        expect(professions[0].label).toEqual('Apothecary');
    });
});
