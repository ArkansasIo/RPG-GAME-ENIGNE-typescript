import { BitmapFont, FadeOutInState, Game, Image, ImageAtlas, ImageAtlasInfo, ImageMap, Utils } from 'gtp';
import { BaseState } from './BaseState';
import { Weapon,WeaponData } from './Weapon';
import { Armor,ArmorData } from './Armor';
import { Shield,ShieldData } from './Shield';
import { DwGame } from './DwGame';
import { GameStudioAdvertState } from './GameStudioAdvertState';
import { EquipmentMap } from './dw';
import { createDefaultAssetDatabaseConfig } from '@/app/dw/engine/AssetDatabase';
import { createDefaultContentConfig, type MapConfig } from '@/app/dw/engine/ContentConfig';

export interface EquipmentData {
    weapons: Record<string, WeaponData>;
    armor: Record<string, ArmorData>;
    shields: Record<string, ShieldData>;
}

export function resolveMapAssetKey(mapAsset: MapConfig): string {
    if (mapAsset.assetKey) {
        return mapAsset.assetKey;
    }

    const fileName = mapAsset.path.split('/').pop() ?? mapAsset.path;
    return fileName;
}

export class LoadingState extends BaseState {

    assetsLoaded: boolean;
    private textX?: number;
    private textY?: number;

    constructor(game: DwGame) {
        super(game);
        this.assetsLoaded = false;
    }

    private static createArmorArray(armors: EquipmentMap<Armor>): Armor[] {

        const armorArray: Armor[] = [];

        for (const armorName in armors) {
            if (Object.prototype.hasOwnProperty.call(armors, armorName)) {
                armorArray.push(armors[ armorName ]);
            }
        }

        armorArray.sort((a: Armor, b: Armor) => {
            return a.defense - b.defense;
        });

        return armorArray;
    }

    private static createArmorMap(armors: Record<string, ArmorData>): EquipmentMap<Armor> {

        const map: EquipmentMap<Armor> = {};

        for (const armorName in armors) {
            if (Object.prototype.hasOwnProperty.call(armors, armorName)) {
                map[ armorName ] = new Armor(armorName, armors[ armorName ]);
            }
        }

        return map;
    }

    private static createShieldArray(shields: EquipmentMap<Shield>): Shield[] {

        const shieldArray: Shield[] = [];

        for (const shieldName in shields) {
            if (Object.prototype.hasOwnProperty.call(shields, shieldName)) {
                shieldArray.push(shields[ shieldName ]);
            }
        }

        shieldArray.sort((a: Shield, b: Shield) => {
            return a.defense - b.defense;
        });

        return shieldArray;
    }

    private static createShieldMap(shields: Record<string, ShieldData>): EquipmentMap<Shield> {

        const map: EquipmentMap<Shield> = {};

        for (const shieldName in shields) {
            if (Object.prototype.hasOwnProperty.call(shields, shieldName)) {
                map[ shieldName ] = new Shield(shieldName, shields[ shieldName ]);
            }
        }
        return map;
    }

    private static createWeaponsArray(weapons: EquipmentMap<Weapon>): Weapon[] {

        const weaponArray: Weapon[] = [];

        for (const weaponName in weapons) {
            if (Object.prototype.hasOwnProperty.call(weapons, weaponName)) {
                weaponArray.push(weapons[ weaponName ]);
            }
        }

        weaponArray.sort((a: Weapon, b: Weapon) => {
            return a.power - b.power;
        });

        return weaponArray;
    }

    private static createWeaponsMap(weapons: Record<string, WeaponData>): EquipmentMap<Weapon> {

        const map: EquipmentMap<Weapon> = {};

        for (const weaponName in weapons) {
            if (Object.prototype.hasOwnProperty.call(weapons, weaponName)) {
                map[ weaponName ] = new Weapon(weaponName, weapons[ weaponName ]);
            }
        }
        return map;
    }

    override update(delta: number) {

        this.handleDefaultKeys();

        if (!this.assetsLoaded) {

            this.assetsLoaded = true;
            const game: DwGame = this.game;

            const assetConfig = createDefaultAssetDatabaseConfig();
            const contentConfig = createDefaultContentConfig();

            assetConfig.assets.forEach((asset) => {
                switch (asset.kind) {
                    case 'image':
                        game.assets.addImage(asset.key, asset.path);
                        break;
                    case 'sprite-sheet':
                        game.assets.addSpriteSheet(asset.key, asset.path, 16, 16, 1, 1, true);
                        break;
                    case 'json':
                        void game.assets.addJson(asset.key, asset.path);
                        break;
                    case 'canvas':
                        game.assets.addCanvas(asset.key, asset.path);
                        break;
                    case 'sound': {
                        const options = asset.options ?? {};
                        const volume = typeof options.volume === 'number' ? options.volume : undefined;
                        const loop = typeof options.loop === 'boolean' ? options.loop : undefined;
                        void game.assets.addSound(asset.key, asset.path, volume, loop);
                        break;
                    }
                    default:
                        break;
                }
            });
            game.assets.onLoad(() => {

                // TODO: This could be done much, much more cleanly
                const enemyJson: ImageAtlasInfo = game.assets.get('enemyAtlas');
                const atlas: ImageAtlas = new ImageAtlas(game.assets.get('enemiesImage'), enemyJson);
                // delete game.assets.get('monsters');
                const images: ImageMap = atlas.parse(game.scale);
                for (const id in images) {
                    if (Object.prototype.hasOwnProperty.call(images, id)) {
                        game.assets.set(id, images[ id ]);
                    }
                }

                const equipment: EquipmentData = game.assets.get('equipment');
                const weaponsMap: EquipmentMap<Weapon> = LoadingState.createWeaponsMap(equipment.weapons);
                game.assets.set('weapons', weaponsMap);
                game.assets.set('weaponsArray', LoadingState.createWeaponsArray(weaponsMap));
                const armorMap: EquipmentMap<Armor> = LoadingState.createArmorMap(equipment.armor);
                game.assets.set('armor', armorMap);
                game.assets.set('armorArray', LoadingState.createArmorArray(armorMap));
                const shieldMap: EquipmentMap<Shield> = LoadingState.createShieldMap(equipment.shields);
                game.assets.set('shields', shieldMap);
                game.assets.set('shieldArray', LoadingState.createShieldArray(shieldMap));

                const font: Image = game.assets.get('font');
                const bitmapFont = new BitmapFont(font, 8, 9, 1, 1, game.scale);
                bitmapFont.addVariant('blue',
                    { fromR: 0xff, fromG: 0xff, fromB: 0xff, toR: 0xa0, toG: 0xff, toB: 0xff },
                );
                bitmapFont.addVariant('statIncrease',
                    { fromR: 0xff, fromG: 0xff, fromB: 0xff, toR: 0xa0, toG: 0xff, toB: 0xa0 },
                );
                bitmapFont.addVariant('statDecrease',
                    { fromR: 0xff, fromG: 0xff, fromB: 0xff, toR: 0xff, toG: 0xa0, toB: 0xa0 },
                );
                game.assets.set('font', bitmapFont);

                contentConfig.maps.forEach((mapAsset) => {
                    const assetKey = resolveMapAssetKey(mapAsset);
                    game.assets.addTmxMap(game.initLoadedMap(assetKey));
                });
                game.assets.onLoad(() => {
                    const skipTitle: string | null = Utils.getRequestParam('skipTitle');
                    if (skipTitle !== null) { // Allow empty strings
                        game.startNewGame();
                    } else {
                        game.setState(new FadeOutInState(this, new GameStudioAdvertState(this.game)));
                    }
                });
            });

        }

    }

    override render(ctx: CanvasRenderingContext2D) {

        const game: Game = this.game;
        game.clearScreen('rgb(0,0,255)');

        const str = 'Loading...';
        ctx.font = 'bold 30px Sans Serif';

        if (!this.textX || !this.textY) { // appease tsc
            const textMetrics: TextMetrics = ctx.measureText(str);
            this.textX = (game.getWidth() - textMetrics.width) / 2;
            const fontDescentGuess = 4;
            this.textY = (game.getHeight() - fontDescentGuess) / 2;
        }

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText(str, this.textX, this.textY);

    }
}
