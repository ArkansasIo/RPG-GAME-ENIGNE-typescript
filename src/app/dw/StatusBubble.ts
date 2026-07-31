import { InputManager } from 'gtp';
import { Bubble } from './Bubble';
import { DwGame } from './DwGame';
import { getPlayerStatsPages } from './PlayerStats';

export const getStatusTabLabel = (title: string): string => {
    switch (title) {
        case 'OVERVIEW':
            return 'OVR';
        case 'ATTRIBUTES':
            return 'ATR';
        case 'COMBAT':
            return 'CMB';
        case 'LOADOUT':
            return 'EQP';
        default:
            return title.substring(0, 3);
    }
};

export const getStatusRowIcon = (label: string): string => {
    switch (label) {
        case 'HP':
            return '+';
        case 'MP':
            return '*';
        case 'ATK':
        case 'STR':
            return '/';
        case 'DEF':
        case 'ARMOR':
        case 'SHIELD':
            return '#';
        case 'ACC':
            return '!';
        case 'EVA':
            return '~';
        case 'CRIT':
            return '^';
        case 'GOLD':
            return '$';
        case 'EXP':
        case 'NEXT LV':
            return '=';
        default:
            return '-';
    }
};

export class StatusBubble extends Bubble {

    private pageIndex: number;

    private getTabBounds(): Array<{ x: number; y: number; w: number; h: number; pageIndex: number }> {
        const scale = this.game.scale;
        const pages = getPlayerStatsPages(this.game.hero, this.game.party);
        const y = this.y + this.getYMargin();
        let x = this.x + this.getXMargin();
        const h = this.game.stringHeight() + 3 * scale;

        return pages.map((page, index) => {
            const tabLabel = `[${getStatusTabLabel(page.title)}]`;
            const w = this.game.stringWidth(tabLabel) + 4 * scale;
            const bounds = { x, y, w, h, pageIndex: index };
            x += w + 4 * scale;
            return bounds;
        });
    }

    private getClickedTabIndex(point: { x: number; y: number }): number | undefined {
        const tabs = this.getTabBounds();
        const hit = tabs.find((tab) => {
            return point.x >= tab.x && point.x <= tab.x + tab.w && point.y >= tab.y && point.y <= tab.y + tab.h;
        });
        return hit?.pageIndex;
    }

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
        const pages = getPlayerStatsPages(this.game.hero, this.game.party);
        const pageCount = pages.length;

        const pointerPosition = this.game.getPointerPosition();
        if (pointerPosition) {
            const tabIndex = this.getClickedTabIndex(pointerPosition);
            if (typeof tabIndex === 'number' && tabIndex !== this.pageIndex) {
                this.pageIndex = tabIndex;
                this.resetArrowTimer();
            }
        }

        const pointerClick = this.game.consumePointerClick();
        if (pointerClick) {
            const tabIndex = this.getClickedTabIndex(pointerClick);
            if (typeof tabIndex === 'number') {
                this.pageIndex = tabIndex;
                this.game.audio.playSound('menu');
                this.resetArrowTimer();
                return false;
            }
        }

        if (this.game.cancelKeyPressed() || this.game.actionKeyPressed()) {
            this.game.audio.playSound('menu');
            return true;
        }

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
        const iconLabelGap = 6 * SCALE;
        const iconColumnW = this.game.stringWidth('!');
        const tabBounds = this.getTabBounds();

        tabBounds.forEach((tab, index) => {
            const tabLabel = `[${getStatusTabLabel(pages[index].title)}]`;
            const color = index === this.pageIndex ? 'blue' : undefined;
            this.game.drawString(tabLabel, tab.x, tab.y, color);
        });

        y0 += Y_INC;

        page.rows.forEach((row) => {
            const icon = getStatusRowIcon(row.label);
            this.game.drawString(icon, x, y0, 'blue');
            this.game.drawString(row.label, x + iconColumnW + iconLabelGap, y0);
            const xOffs = this.calculateX2Offs(row.value);
            this.game.drawString(row.value, x2 - xOffs, y0);
            y0 += Y_INC;
        });

        const pageHint = `${this.pageIndex + 1}/${pages.length}`;
        if (pages.length > 1) {
            this.game.drawString('<TAB>', x, y0, 'blue');
            const xOffs = this.calculateX2Offs(pageHint);
            this.game.drawString(pageHint, x2 - xOffs, y0);
        }

    }
}
