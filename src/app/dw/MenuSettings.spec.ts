import { describe, expect, it } from 'vitest';
import { createDefaultSettings, getMainMenuOptions, getOptionsMenuOptions, getMessageSpeedOptions, getDifficultyOptions } from '@/app/dw/MenuSettings';

describe('MenuSettings', () => {
    it('provides the expected menu option sets', () => {
        expect(getMainMenuOptions()).toHaveLength(5);
        expect(getOptionsMenuOptions()[0].id).toEqual('sound');
        expect(getMessageSpeedOptions()[1].id).toEqual('normal');
        expect(getDifficultyOptions()[2].id).toEqual('hard');
    });

    it('creates sensible defaults', () => {
        const settings = createDefaultSettings();
        expect(settings.sound).toBe(true);
        expect(settings.music).toBe(true);
        expect(settings.messageSpeed).toEqual('normal');
        expect(settings.difficulty).toEqual('normal');
    });
});
