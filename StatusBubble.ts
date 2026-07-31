import { InputManager } from 'gtp';
import { Bubble } from './Bubble';
import { DwGame } from './DwGame';
import { getPlayerStatsPages } from './PlayerStats';

export class StatusBubble extends Bubble {

    private pageIndex: number;

    constructor(game: DwGame) {

        const scale: number = game.scale;
        const tileSize: number = game.getTileSize();
        const w: number = 172 * scale;
        const x: number = game.getWidth() - tileSize - w;
        const y: number = tileSize * 3;
        const h: number = game.getHeight() - y - tileSize;
        super(game, 'STATUS', x, y, w, h);
        this.pageIndex = 0;
    }

    private calculateX2Offs(val: number | string) {
        if (typeof val === 'number') {
            val = val.toString();
        }
        return this.game.stringWidth(val);
    }

    /**
     * This bubble is a little more space-constrained so its
     * x-margin is smaller.
     */
    override getXMargin(): number {
        const scale: number = this.game.scale;
        // Inset + border width + inner spacing
        return (1 + 2 + 2) * scale;
    }

    handleInput() {
        const im: InputManager = this.game.inputManager;

        if (this.game.cancelKeyPressed() || this.game.actionKeyPressed()) {
            this.game.audio.playSound('menu');
            return true;
        }

        const pages = getPlayerStatsPages(this.game.hero, this.game.party);
        const pageCount = pages.length;
        if (pageCount > 1 && (im.left(true) || im.up(true))) {
            this.pageIndex = (this.pageIndex - 1 + pageCount) % pageCount;
            this.resetArrowTimer();
        } else if (pageCount > 1 && (im.right(true) || im.down(true))) {
            this.pageIndex = (this.pageIndex + 1) % pageCount;
            this.resetArrowTimer();
        }

        return false;
    }

    override paintContent(ctx: CanvasRenderingContext2D, x: number, y: number) {

        const SCALE: number = this.game.scale;
        const x2: number = this.x + this.w - this.getXMargin();
        const pages = getPlayerStatsPages(this.game.hero, this.game.party);
        const page = pages[this.pageIndex] ?? pages[0];
        let y0: number = y;
        const Y_INC: number = this.game.stringHeight() + 7 * SCALE;

        this.game.drawString(page.title, x, y0);
        y0 += Y_INC;

        page.rows.forEach((row) => {
            this.game.drawString(row.label, x, y0);
            const xOffs = this.calculateX2Offs(row.value);
            this.game.drawString(row.value, x2 - xOffs, y0);
            y0 += Y_INC;
        });

        const pageHint = `${this.pageIndex + 1}/${pages.length}`;
        if (pages.length > 1) {
            this.game.drawString('< >', x, y0);
            const xOffs = this.calculateX2Offs(pageHint);
            this.game.drawString(pageHint, x2 - xOffs, y0);
        }

    }
}
