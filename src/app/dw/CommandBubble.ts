import { InputManager } from 'gtp';
import { DwGame } from './DwGame';
import { RoamingState } from './RoamingState';
import { Bubble } from './Bubble';

export type CommandMenuMode = 'MAIN' | 'ITEM' | 'SPELL';

export const getCommandChoicesForMode = (mode: CommandMenuMode): string[] => {
    switch (mode) {
        case 'ITEM':
            return [ 'USE ITEM', 'CANCEL' ];
        case 'SPELL':
            return [ 'CAST SPELL', 'CANCEL' ];
        case 'MAIN':
        default:
            return [ 'TALK', 'MAP', 'STATUS', 'ITEM', 'SPELL', 'TAKE' ];
    }
};

export class CommandBubble extends Bubble {

    private readonly choices: string[];
    private readonly yInc;
    private selection: number;
    private readonly menuWidth: number;

    constructor(game: DwGame) {

        const scale: number = game.scale;
        const yInc: number = game.stringHeight() + 7 * scale;

        const tileSize: number = game.getTileSize();
        const w: number = 152 * scale;
        let h: number = 104 * scale;
        if (game.getCheatsEnabled()) {
            h += yInc;
        }
        const x: number = game.getWidth() - tileSize * 2 - w;
        const y: number = tileSize / 2;
        super(game, 'COMMAND', x, y, w, h);
        this.selection = 0;
        this.yInc = yInc;
        this.menuWidth = w;

        this.choices = CommandBubble.createChoices(game);
    }

    private static createChoices(game: DwGame): string[] {

        const choices: string[] = [
            'TALK',
            'STATUS',
            'STAIRS',
            'SEARCH',
            'SPELL',
            'ITEM',
            'DOOR',
            'TAKE',
        ];

        if (game.getCheatsEnabled()) {
            choices.splice(choices.length / 2, 0, 'WARP*');
            choices.push('CHEAT*');
        }

        return choices;
    }

    private getRowCount(): number {
        return Math.ceil(this.choices.length / 2);
    }

    getSelection(): number {
        return this.selection;
    }

    handleCommandChosen(screen: RoamingState) {

        // If the user canceled, close the dialog
        if (this.selection === -1) {
            screen.startRoaming();
            return;
        }

        switch (this.choices[this.selection]) {

            case 'TALK':
                screen.talkToNpc();
                break;

            case 'STATUS':
                screen.showStatus();
                break;

            case 'STAIRS':
                screen.takeStairs();
                break;

            case 'SEARCH':
                screen.search();
                break;

            case 'WARP*':
                screen.showWarpBubble();
                break;

            case 'SPELL':
                screen.showSpellList();
                break;

            case 'ITEM':
                screen.showInventory();
                break;

            case 'DOOR':
                screen.openDoor();
                break;

            case 'TAKE':
                screen.take();
                break;

            case 'CHEAT*':
                screen.showCheatBubble();
                break;

        }

    }

    private getSelectionForPoint(x: number, y: number): number | undefined {
        const contentX = this.x + this.getXMargin();
        const contentY = this.y + this.getYMargin();
        const rowCount: number = this.getRowCount();
        const scale: number = this.game.scale;
        const columnGap: number = 16 * scale;
        const contentWidth: number = this.menuWidth - 2 * this.getXMargin();
        const leftColumnWidth = Math.floor(contentWidth / 2) - columnGap / 2;
        const rightColumnWidth = contentWidth - leftColumnWidth - columnGap;
        const leftChoices = this.choices.slice(0, rowCount);
        const rightChoices = this.choices.slice(rowCount);
        const choiceHeight = this.game.stringHeight() + 2 * scale;

        for (let index = 0; index < rowCount; index += 1) {
            const leftChoice = leftChoices[index];
            if (leftChoice) {
                const drawX = contentX + 2 * scale;
                const drawY = contentY + index * this.yInc;
                const choiceWidth = this.game.stringWidth(leftChoice) + 4 * scale;
                if (x >= drawX && x <= drawX + choiceWidth && y >= drawY && y <= drawY + choiceHeight) {
                    return index;
                }
            }

            const rightChoice = rightChoices[index];
            if (rightChoice) {
                const drawX = contentX + Math.max(leftColumnWidth, rightColumnWidth) + columnGap;
                const drawY = contentY + index * this.yInc;
                const choiceWidth = this.game.stringWidth(rightChoice) + 4 * scale;
                if (x >= drawX && x <= drawX + choiceWidth && y >= drawY && y <= drawY + choiceHeight) {
                    return rowCount + index;
                }
            }
        }

        return undefined;
    }

    handlePointerSelection(x: number, y: number): boolean {
        const selection = this.getSelectionForPoint(x, y);
        if (selection === undefined) {
            return false;
        }
        this.selection = selection;
        return true;
    }

    handleInput(): boolean {

        const im: InputManager = this.game.inputManager;
        const rowCount: number = this.getRowCount();

        const pointerPosition = this.game.getPointerPosition();
        if (pointerPosition) {
            this.handlePointerSelection(pointerPosition.x, pointerPosition.y);
        }

        const pointerClick = this.game.consumePointerClick();
        if (pointerClick) {
            const selection = this.getSelectionForPoint(pointerClick.x, pointerClick.y);
            if (selection === undefined) {
                this.selection = -1;
                this.game.audio.playSound('menu');
                return true;
            }
            this.selection = selection;
            this.game.audio.playSound('menu');
            return true;
        }

        if (im.up(true)) {
            this.selection = this.selection - 1;
            if (this.selection < 0) {
                this.selection = rowCount * 2 - 1;
            }
            this.resetArrowTimer();
        } else if (im.down(true)) {
            this.selection = Math.floor((this.selection + 1) % (rowCount * 2));
            this.resetArrowTimer();
        } else if (this.selection >= rowCount && im.left(true)) {
            this.selection -= rowCount;
            this.resetArrowTimer();
        } else if (this.selection < rowCount && im.right(true)) {
            this.selection += rowCount;
            this.resetArrowTimer();
        } else if (this.game.cancelKeyPressed()) {
            this.selection = -1;
            return true;
        } else if (this.game.actionKeyPressed()) {
            this.game.audio.playSound('menu');
            return true;
        }

        return false;

    }

    override paintContent(ctx: CanvasRenderingContext2D, x: number, y: number) {
        const SCALE: number = this.game.scale;
        const rowCount: number = this.getRowCount();
        const contentWidth: number = this.menuWidth - 2 * this.getXMargin();
        const columnGap: number = 16 * SCALE;
        const leftColumnWidth = Math.floor(contentWidth / 2) - columnGap / 2;
        const rightColumnWidth = contentWidth - leftColumnWidth - columnGap;

        const drawChoice = (choice: string, drawX: number, drawY: number) => {
            let color: string | undefined;
            let choiceStr = choice;
            if (choice.endsWith('*')) {
                color = 'blue';
                choiceStr = choice.substring(0, choice.length - 1);
            }
            this.game.drawString(choiceStr, drawX, drawY, color);
        };

        const leftChoices = this.choices.slice(0, rowCount);
        const rightChoices = this.choices.slice(rowCount);

        for (let index = 0; index < rowCount; index += 1) {
            const leftChoice = leftChoices[index];
            if (leftChoice) {
                const drawX = x + 2 * SCALE;
                const drawY = y + index * this.yInc;
                drawChoice(leftChoice, drawX, drawY);
            }
            const rightChoice = rightChoices[index];
            if (rightChoice) {
                const drawX = x + Math.max(leftColumnWidth, rightColumnWidth) + columnGap;
                const drawY = y + index * this.yInc;
                drawChoice(rightChoice, drawX, drawY);
            }
        }

        const selectedIndex = this.selection;
        const row = selectedIndex % rowCount;
        const cursorX = x - this.game.stringWidth('>') - 2 * SCALE;
        const cursorY = y + row * this.yInc;
        this.drawArrow(cursorX, cursorY);
    }

    reset() {
        this.selection = 0;
    }
}
