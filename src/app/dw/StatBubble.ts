import { Bubble } from './Bubble';
import { DwGame } from './DwGame';
import { Party } from './Party';
import { Hero } from './Hero';

export class StatBubble extends Bubble {

    selection: number;

    constructor(game: DwGame) {
        const scale: number = game.scale;
        const tileSize: number = game.getTileSize();
        const w: number = 60 * scale;
        const h: number = 100 * scale;
        const x: number = tileSize;
        const y: number = tileSize * 3 / 2;
        let title: string = game.hero.name;
        if (title.length > 4) {
            title = title.substring(0, 4);
        }
        super(game, title, x, y, w, h);
        this.selection = 0;
    }

    private calculateX2Offs(val: number | string) {
        return this.game.stringWidth(typeof val === 'number' ? val.toString(10) : val);
        //         var digits = 1;
        //         while (val > 10) {
        //            digits++;
        //            val /= 10;
        //         }
        //         return digits * 10 * this.game.scale;
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
    }

    override paintContent(ctx: CanvasRenderingContext2D, x: number, y: number) {

        const SCALE: number = this.game.scale;
        const x2: number = this.x + this.w - this.getXMargin();
        let y0: number = y;
        const Y_INC: number = this.game.stringHeight() + 7 * SCALE;
        const party: Party = this.game.party;
        const hero: Hero = this.game.hero;
        const rows: Array<{ label: string; value: number | string }> = [
            { label: 'LV', value: hero.level },
            { label: 'HP', value: hero.hp },
            { label: 'MP', value: hero.mp },
            { label: 'G', value: party.gold },
            { label: 'E', value: hero.exp },
            { label: 'NXT', value: hero.getExpRemainingToNextLevel() },
        ];

        rows.forEach((row) => {
            this.game.drawString(row.label, x, y0);
            const xOffs = this.calculateX2Offs(row.value);
            this.game.drawString(row.value, x2 - xOffs, y0);
            y0 += Y_INC;
        });

    }
}
