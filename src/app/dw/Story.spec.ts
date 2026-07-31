import { describe, expect, it } from 'vitest';
import { getStoryActs } from '@/app/dw/Story';

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
});
