import { describe, expect, it } from 'vitest';
import enemies from '../../../public/res/enemies.json';

describe('Enemy catalog', () => {
    it('contains at least 80 total enemy entries with new variants', () => {
        const catalog = enemies as Record<string, unknown>;

        expect(Object.keys(catalog).length).toBeGreaterThanOrEqual(80);
        expect(catalog['Mire Slime']).toBeDefined();
        expect(catalog['Ash Drakee']).toBeDefined();
        expect(catalog['Frost Wraith']).toBeDefined();
    });
});
