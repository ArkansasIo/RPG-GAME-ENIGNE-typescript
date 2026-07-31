import { describe, expect, it } from 'vitest';
import { getStatusRowIcon, getStatusTabLabel } from './StatusBubble';

describe('StatusBubble helpers', () => {
    it('maps page titles to short tab labels', () => {
        expect(getStatusTabLabel('OVERVIEW')).toBe('OVR');
        expect(getStatusTabLabel('ATTRIBUTES')).toBe('ATR');
        expect(getStatusTabLabel('COMBAT')).toBe('CMB');
        expect(getStatusTabLabel('LOADOUT')).toBe('EQP');
    });

    it('maps key status rows to icon glyphs', () => {
        expect(getStatusRowIcon('HP')).toBe('+');
        expect(getStatusRowIcon('MP')).toBe('*');
        expect(getStatusRowIcon('DEF')).toBe('#');
        expect(getStatusRowIcon('GOLD')).toBe('$');
        expect(getStatusRowIcon('UNKNOWN')).toBe('-');
    });
});
