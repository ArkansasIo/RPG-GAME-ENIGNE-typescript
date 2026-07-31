import { InputManager } from 'gtp';
import { Bubble, ColoredTextSpan } from './Bubble';
import { DwGame } from './DwGame';

export type ChoiceStringifier<Choice> = (choice: Choice, contentCharWidth: number) => string;

/**
 * A bubble that lets the user choose between several choices. Can optionally be titled
 * and be 2 columns if there are a lot of choices. Note you must provide its bounds and size
 * to accommodate your number of columns (this isn't currently figured out automatically).
 */
export class ChoiceBubble<ChoiceBubbleChoice> extends Bubble {

    private readonly choices: ChoiceBubbleChoice[];
    private readonly choiceStringifier: ChoiceStringifier<ChoiceBubbleChoice>;
    private curChoice: number;
    private readonly cancellable: boolean;
    private readonly columns: number;
    protected yInc: number;

    constructor(game: DwGame, x: number, y: number, w: number, h: number,
        choices: ChoiceBubbleChoice[] = [],
        choiceStringifier?: ChoiceStringifier<ChoiceBubbleChoice>,
        cancellable = false,
        title?: string,
        columns = 1) {
        super(game, title, x, y, w, h);
        this.choices = choices;
        this.choiceStringifier = choiceStringifier ?? ((choice: ChoiceBubbleChoice) => choice as unknown as string);
        this.cancellable = cancellable;
        this.columns = columns;
        this.curChoice = 0;
        this.yInc = 18 * this.game.scale;
    }

    /**
     * Returns the index of the item selected, or <code>-1</code> if the
     * user cancelled this dialog.
     */
    getSelectedIndex(): number {
        return this.curChoice;
    }

    /**
     * Returns the item selected, or <code>undefined</code> if the user
     * cancelled this dialog.
     */
    getSelectedItem(): ChoiceBubbleChoice | undefined {
        return this.curChoice > -1 ? this.choices[this.curChoice] : undefined;
    }

    private getSelectionForPoint(x: number, y: number): number | undefined {
        const contentX = this.x + this.getXMargin();
        const contentY = this.y + this.getYMargin();

        if (this.columns === 2) {
            const leftCount = Math.ceil(this.choices.length / 2);
            const colGap = this.game.getTileSize();
            const contentWidth = this.w - 2 * this.getXMargin();
            const colWidth = (contentWidth - colGap) / 2;

            for (let index = 0; index < this.choices.length; index += 1) {
                const inRight = index >= leftCount;
                const row = inRight ? index - leftCount : index;
                const textX = inRight ? contentX + colWidth + colGap : contentX;
                const textY = contentY + row * this.yInc;
                const width = this.game.stringWidth(this.choiceStringifier(this.choices[index], Math.floor(contentWidth / this.game.stringWidth('x')))) + 4 * this.game.scale;
                const height = this.yInc + 2 * this.game.scale;

                if (x >= textX && x <= textX + width && y >= textY && y <= textY + height) {
                    return index;
                }
            }
            return undefined;
        }

        for (let index = 0; index < this.choices.length; index += 1) {
            const textY = contentY + index * this.yInc;
            const width = this.game.stringWidth(this.choiceStringifier(this.choices[index], Math.floor((this.w - 2 * this.getXMargin()) / this.game.stringWidth('x')))) + 4 * this.game.scale;
            const height = this.yInc + 2 * this.game.scale;

            if (x >= contentX && x <= contentX + width && y >= textY && y <= textY + height) {
                return index;
            }
        }

        return undefined;
    }

    handlePointerSelection(x: number, y: number): boolean {
        const selection = this.getSelectionForPoint(x, y);
        if (selection === undefined) {
            if (this.cancellable) {
                this.curChoice = -1;
                return true;
            }
            return false;
        }
        this.curChoice = selection;
        return true;
    }

    /**
     * Allows this bubble to react to user input.
     *
     * @return Whether a choice was made.
     */
    handleInput(): boolean {

        const im: InputManager = this.game.inputManager;

        const pointerPosition = this.game.getPointerPosition();
        if (pointerPosition) {
            this.handlePointerSelection(pointerPosition.x, pointerPosition.y);
        }

        const pointerClick = this.game.consumePointerClick();
        if (pointerClick) {
            const handled = this.handlePointerSelection(pointerClick.x, pointerClick.y);
            if (handled) {
                this.game.audio.playSound('menu');
                return true;
            }
        }

        if (this.game.cancelKeyPressed()) {
            if (this.cancellable) {
                this.curChoice = -1;
                return true;
            }
            this.curChoice = 0;
            this.resetArrowTimer();
        } else if (this.game.actionKeyPressed()) {
            this.game.audio.playSound('menu');
            return true;
        } else if (im.up(true)) {
            if (this.columns === 2) {
                const leftCount = Math.ceil(this.choices.length / 2);
                const colMin = this.curChoice >= leftCount ? leftCount : 0;
                const colMax = this.curChoice >= leftCount ? this.choices.length - 1 : leftCount - 1;
                this.curChoice = this.curChoice === colMin ? colMax : this.curChoice - 1;
            } else {
                this.curChoice = this.curChoice === 0 ? this.choices.length - 1 : this.curChoice - 1;
            }
            this.resetArrowTimer();
        } else if (im.down(true)) {
            if (this.columns === 2) {
                const leftCount = Math.ceil(this.choices.length / 2);
                const colMin = this.curChoice >= leftCount ? leftCount : 0;
                const colMax = this.curChoice >= leftCount ? this.choices.length - 1 : leftCount - 1;
                this.curChoice = this.curChoice === colMax ? colMin : this.curChoice + 1;
            } else {
                this.curChoice = this.curChoice === this.choices.length - 1 ? 0 : this.curChoice + 1;
            }
            this.resetArrowTimer();
        } else if (this.columns === 2 && im.left(true)) {
            const leftCount = Math.ceil(this.choices.length / 2);
            if (this.curChoice >= leftCount) {
                this.curChoice -= leftCount;
            }
            this.resetArrowTimer();
        } else if (this.columns === 2 && im.right(true)) {
            const leftCount = Math.ceil(this.choices.length / 2);
            if (this.curChoice < leftCount) {
                this.curChoice = Math.min(this.curChoice + leftCount, this.choices.length - 1);
            }
            this.resetArrowTimer();
        }

        return false;
    }

    override paintContent(ctx: CanvasRenderingContext2D, x: number, y: number) {

        ctx.fillStyle = 'rgb(255,255,255)';

        const charWidth = this.game.stringWidth('x');
        const contentCharWidth = Math.floor((this.w - 2 * this.getXMargin()) / charWidth);

        if (this.columns === 2) {
            const leftCount = Math.ceil(this.choices.length / 2);
            const colGap = this.game.getTileSize();
            const contentWidth = this.w - 2 * this.getXMargin();
            const colWidth = (contentWidth - colGap) / 2;

            this.choices.forEach((choice, index) => {
                const inRight = index >= leftCount;
                const row = inRight ? index - leftCount : index;
                const textX = inRight ? x + colWidth + colGap : x;
                const textY = y + row * this.yInc;

                if (this.curChoice === index) {
                    const arrowX = inRight
                        ? this.x + Bubble.ARROW_MARGIN + colWidth + colGap
                        : this.x + Bubble.ARROW_MARGIN;
                    this.drawArrow(arrowX, textY);
                }
                const rawText = this.choiceStringifier(choice, contentCharWidth);
                const spans: ColoredTextSpan[] = [];
                const text = Bubble.removeSpecialEscapes(rawText, [], spans);
                this.game.drawStringWithColor(text, spans, textX, textY);
            });
        } else {
            this.choices.forEach((choice, index) => {
                if (this.curChoice === index) {
                    this.drawArrow(this.x + Bubble.ARROW_MARGIN, y);
                }
                const rawText = this.choiceStringifier(choice, contentCharWidth);
                const spans: ColoredTextSpan[] = [];
                const text = Bubble.removeSpecialEscapes(rawText, [], spans);
                this.game.drawStringWithColor(text, spans, x, y);
                y += this.yInc;
            });
        }
    }

    reset() {
        this.curChoice = 0;
    }

    setYInc(yInc: number) {
        this.yInc = yInc * this.game.scale;
    }
}
