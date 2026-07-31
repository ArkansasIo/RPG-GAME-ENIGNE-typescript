import { BaseState } from './BaseState';
import { DwGame } from './DwGame';
import { ChoiceBubble } from './ChoiceBubble';
import { createDefaultSettings, getDifficultyOptions, getMainMenuOptions, getMessageSpeedOptions, getOptionsMenuOptions, MenuSettingsState } from './MenuSettings';
import { getMainQuests, getSideQuests } from './Quests';

type Substate = 'mainMenu' | 'saveSelect' | 'optionsMenu' | 'messageSpeedMenu' | 'difficultyMenu';

/**
 * The initial menu shown to the user after pressing Enter on the title screen.
 */
export class InitialMenuState extends BaseState {

    private readonly menuBubble: ChoiceBubble<string>;
    private saveSelectBubble: ChoiceBubble<string> | undefined;
    private optionsBubble: ChoiceBubble<string> | undefined;
    private settingsBubble: ChoiceBubble<string> | undefined;
    private substate: Substate;
    private settings: MenuSettingsState;

    constructor(game: DwGame) {
        super(game);
        this.menuBubble = this.createMenuBubble();
        this.substate = 'mainMenu';
        this.settings = createDefaultSettings();
    }

    private createMenuBubble(): ChoiceBubble<string> {

        const game: DwGame = this.game;
        const tileSize: number = game.getTileSize();
        const w: number = game.getWidth() - 4 * tileSize;
        const h: number = 7 * tileSize;
        const x: number = (game.getWidth() - w) / 2;
        const y: number = (game.getHeight() - h) / 2;

        const choices: string[] = getMainMenuOptions().map((option) => option.label);

        return new ChoiceBubble(this.game, x, y, w, h, choices);
    }

    private createSaveSelectBubble(): ChoiceBubble<string> {

        if (this.saveSelectBubble) {
            this.saveSelectBubble.reset();
            return this.saveSelectBubble;
        }

        const game: DwGame = this.game;
        const tileSize: number = game.getTileSize();
        const w: number = game.getWidth() - 4 * tileSize;
        const h: number = 2 * tileSize;
        const x: number = (game.getWidth() - w) / 2 + tileSize;
        const y: number = (game.getHeight() - h) / 2;

        const choices: string[] = [
            `ADVENTURE LOG 1: ${getMainQuests()[0].title}`,
            `SIDE QUESTS: ${getSideQuests().length}`,
        ];
        return new ChoiceBubble(this.game, x, y, w, h, choices, undefined, true);
    }

    private createOptionsBubble(): ChoiceBubble<string> {

        if (this.optionsBubble) {
            this.optionsBubble.reset();
            return this.optionsBubble;
        }

        const game: DwGame = this.game;
        const tileSize: number = game.getTileSize();
        const w: number = game.getWidth() - 4 * tileSize;
        const h: number = 7 * tileSize;
        const x: number = (game.getWidth() - w) / 2;
        const y: number = (game.getHeight() - h) / 2;

        const choices: string[] = getOptionsMenuOptions().map((option) => option.label);
        return new ChoiceBubble(this.game, x, y, w, h, choices, undefined, true);
    }

    private createSettingsBubble(options: string[]): ChoiceBubble<string> {

        const game: DwGame = this.game;
        const tileSize: number = game.getTileSize();
        const w: number = game.getWidth() - 4 * tileSize;
        const h: number = 2 * tileSize;
        const x: number = (game.getWidth() - w) / 2 + tileSize;
        const y: number = (game.getHeight() - h) / 2;

        return new ChoiceBubble(this.game, x, y, w, h, options, undefined, true);
    }

    override enter() {
        super.enter();
        this.substate = 'mainMenu';
        this.settings = createDefaultSettings();
        this.game.audio.playMusic('MUSIC_TOWN');
    }

    override update(delta: number) {

        this.handleDefaultKeys();

        switch (this.substate) {

            default:
            case 'mainMenu':
                this.menuBubble.update(delta);
                if (this.menuBubble.handleInput()) {
                    const selection: number = this.menuBubble.getSelectedIndex();
                    if (0 === selection) { // Continue a game
                        this.game.audio.playSound('menu');
                        this.substate = 'saveSelect';
                        this.menuBubble.setActive(false);
                        this.saveSelectBubble = this.createSaveSelectBubble();
                    } else if (1 === selection) { // Options
                        this.game.audio.playSound('menu');
                        this.substate = 'optionsMenu';
                        this.menuBubble.setActive(false);
                        this.optionsBubble = this.createOptionsBubble();
                    } else { // Nothing else is implemented
                        this.game.audio.playSound('missed1');
                    }
                }
                break;

            case 'saveSelect':
                this.saveSelectBubble!.update(delta);
                if (this.saveSelectBubble!.handleInput()) {
                    const selection: number = this.saveSelectBubble!.getSelectedIndex();
                    if (-1 === selection) {
                        this.substate = 'mainMenu';
                        this.menuBubble.setActive(true);
                    } else {
                        // For now there's only one selectable game
                        this.game.audio.playSound('menu');
                        this.game.setStatusMessage(`Quest log ready: ${getMainQuests().length} main quests and ${getSideQuests().length} side quests`);
                        this.game.startNewGame();
                    }
                }
                break;

            case 'optionsMenu':
                this.optionsBubble!.update(delta);
                if (this.optionsBubble!.handleInput()) {
                    const selection: number = this.optionsBubble!.getSelectedIndex();
                    if (0 === selection) {
                        this.settings.sound = !this.settings.sound;
                        this.game.audio.playSound('menu');
                    } else if (1 === selection) {
                        this.settings.music = !this.settings.music;
                        this.game.audio.playSound('menu');
                    } else if (2 === selection) {
                        this.substate = 'messageSpeedMenu';
                        this.settingsBubble = this.createSettingsBubble(getMessageSpeedOptions().map((option) => option.label));
                    } else if (3 === selection) {
                        this.substate = 'difficultyMenu';
                        this.settingsBubble = this.createSettingsBubble(getDifficultyOptions().map((option) => option.label));
                    } else if (4 === selection) {
                        this.substate = 'mainMenu';
                        this.menuBubble.setActive(true);
                    }
                }
                break;

            case 'messageSpeedMenu':
            case 'difficultyMenu':
                this.settingsBubble!.update(delta);
                if (this.settingsBubble!.handleInput()) {
                    const selection: number = this.settingsBubble!.getSelectedIndex();
                    if (-1 === selection) {
                        this.substate = 'optionsMenu';
                        this.optionsBubble = this.createOptionsBubble();
                    } else {
                        const options = this.substate === 'messageSpeedMenu' ? getMessageSpeedOptions() : getDifficultyOptions();
                        const chosen = options[selection]?.id;
                        if (chosen) {
                            if (this.substate === 'messageSpeedMenu') {
                                this.settings.messageSpeed = chosen as MenuSettingsState['messageSpeed'];
                            } else {
                                this.settings.difficulty = chosen as MenuSettingsState['difficulty'];
                            }
                        }
                        this.game.audio.playSound('menu');
                        this.substate = 'optionsMenu';
                        this.optionsBubble = this.createOptionsBubble();
                    }
                }
                break;
        }
    }

    override render(ctx: CanvasRenderingContext2D) {

        const game: DwGame = this.game;
        game.clearScreen();

        this.menuBubble.paint(ctx);

        if (this.substate === 'saveSelect') {
            this.saveSelectBubble!.paint(ctx);
        } else if (this.substate === 'optionsMenu') {
            this.optionsBubble!.paint(ctx);
        } else if (this.substate === 'messageSpeedMenu' || this.substate === 'difficultyMenu') {
            this.settingsBubble!.paint(ctx);
        }
    }
}
