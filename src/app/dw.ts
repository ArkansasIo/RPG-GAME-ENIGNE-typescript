/*
 * Game bootstrap code.  This can be in an inline <script> tag as well.
 */
import { DwGame } from './dw/DwGame';
import { LoadingState } from './dw/LoadingState';
import { attachCampaignSelector } from './dw/engine/CampaignUI';

const SCALE = 2;
const tileSize: number = 16 * SCALE;
const CANVAS_WIDTH: number = tileSize * 17; // TODO: No magic numbers for row/column sizes
const CANVAS_HEIGHT: number = tileSize * 15;

const game = new DwGame({ parent: 'parent', scale: SCALE, width: CANVAS_WIDTH, height: CANVAS_HEIGHT,
    keyRefreshMillis: 300, targetFps: 60 });

const shell = document.getElementById('campaign-shell');
if (shell) {
    attachCampaignSelector(game, shell);
}

game.setState(new LoadingState(game));
game.start();
