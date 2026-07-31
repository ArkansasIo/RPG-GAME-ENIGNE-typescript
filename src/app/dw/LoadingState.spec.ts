import { describe, expect, it } from 'vitest';
import { resolveMapAssetKey } from '@/app/dw/LoadingState';

describe('resolveMapAssetKey', () => {
    it('prefers the configured asset key over the file path', () => {
        expect(resolveMapAssetKey({ assetKey: 'overworld.json', path: 'res/maps/overworld.json' })).toBe('overworld.json');
    });

    it('falls back to the file basename when the asset key is missing', () => {
        expect(resolveMapAssetKey({ assetKey: '', path: 'res/maps/brecconary.json' } as any)).toBe('brecconary.json');
    });
});
