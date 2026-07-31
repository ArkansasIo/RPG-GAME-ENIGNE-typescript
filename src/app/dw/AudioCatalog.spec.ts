import { describe, expect, it } from 'vitest';
import { getAudioCatalog, getMusicCatalog, getSoundCatalog } from './AudioCatalog';

describe('AudioCatalog', () => {
    it('exposes thirty audio cues split into music and sounds', () => {
        const audio = getAudioCatalog();
        const music = getMusicCatalog();
        const sounds = getSoundCatalog();

        expect(audio).toHaveLength(30);
        expect(music).toHaveLength(10);
        expect(sounds).toHaveLength(20);
        expect(audio[0].label).toEqual('Forest Echo');
        expect(audio[29].label).toEqual('Battle Victory');
    });
});
