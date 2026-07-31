/*
 * Game bootstrap code.  This can be in an inline <script> tag as well.
 */
import { DwGame } from './dw/DwGame';
import { LoadingState } from './dw/LoadingState';
import { attachCampaignSelector } from './dw/engine/CampaignUI';

const installCanvasReadbackHint = () => {
    type CanvasPrototype = HTMLCanvasElement & {
        __dwReadbackHintInstalled__?: boolean;
    };
    const proto = HTMLCanvasElement.prototype as CanvasPrototype;

    if (proto.__dwReadbackHintInstalled__) {
        return;
    }

    const originalGetContext = proto.getContext;
    const patchedGetContext = function(this: HTMLCanvasElement, contextId: string, options?: unknown) {
        if (contextId === '2d') {
            return originalGetContext.call(this, '2d', {
                ...(options as CanvasRenderingContext2DSettings | undefined),
                willReadFrequently: true,
            });
        }

        return originalGetContext.call(this, contextId as never, options as never);
    } as HTMLCanvasElement['getContext'];

    proto.getContext = patchedGetContext;
    proto.__dwReadbackHintInstalled__ = true;
};

const SCALE = 2;
const tileSize: number = 16 * SCALE;
const CANVAS_WIDTH: number = tileSize * 17; // TODO: No magic numbers for row/column sizes
const CANVAS_HEIGHT: number = tileSize * 15;

installCanvasReadbackHint();

const game = new DwGame({ parent: 'parent', scale: SCALE, width: CANVAS_WIDTH, height: CANVAS_HEIGHT,
    keyRefreshMillis: 300, targetFps: 60 });

const shell = document.getElementById('campaign-shell');
if (shell) {
    attachCampaignSelector(game, shell);
}

game.setState(new LoadingState(game));
game.start();
