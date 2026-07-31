export type AssetKind = 'image' | 'spritesheet' | 'json' | 'sound' | 'tmxMap' | 'canvas';

export interface AssetConfig {
    key: string;
    kind: AssetKind;
    path: string;
    options?: Record<string, unknown>;
}

export interface MapConfig {
    assetKey: string;
    path: string;
    logicFile?: string;
}

export interface GameContentConfig {
    assetDatabase: string;
    assets: AssetConfig[];
    maps: MapConfig[];
    initialMap: string;
}

export const createDefaultContentConfig = (): GameContentConfig => ({
    assetDatabase: 'default',
    assets: [
        { key: 'title', kind: 'image', path: 'res/title.png' },
        { key: 'hero', kind: 'spritesheet', path: 'res/hero.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-male', kind: 'spritesheet', path: 'res/hero-male.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-female', kind: 'spritesheet', path: 'res/hero-female.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-warrior', kind: 'spritesheet', path: 'res/hero-warrior.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-mage', kind: 'spritesheet', path: 'res/hero-mage.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-priest', kind: 'spritesheet', path: 'res/hero-priest.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-rogue', kind: 'spritesheet', path: 'res/hero-rogue.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-ranger', kind: 'spritesheet', path: 'res/hero-ranger.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-paladin', kind: 'spritesheet', path: 'res/hero-paladin.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-cleric', kind: 'spritesheet', path: 'res/hero-cleric.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'hero-berserker', kind: 'spritesheet', path: 'res/hero-berserker.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'npcs', kind: 'spritesheet', path: 'res/npcs.png', options: { width: 16, height: 16, rows: 1, cols: 1, center: true } },
        { key: 'battleBG', kind: 'image', path: 'res/battle_backgrounds.png' },
        { key: 'font', kind: 'image', path: 'res/font_8x9.png' },
        { key: 'enemies', kind: 'json', path: 'res/enemies.json' },
        { key: 'enemyTerritories', kind: 'json', path: 'res/enemyTerritories.json' },
        { key: 'assetClassCatalog', kind: 'json', path: 'res/assetClassCatalog.json' },
        { key: 'sourceSheetCatalog', kind: 'json', path: 'res/assets/sourceSheetCatalog.json' },
        { key: 'zoneCatalog72', kind: 'json', path: 'res/zoneCatalog72.json' },
        { key: 'zoneDataManifest72', kind: 'json', path: 'res/zones/zoneDataManifest72.json' },
        { key: 'enemiesImage', kind: 'canvas', path: 'res/monsters.png' },
        { key: 'enemyAtlas', kind: 'json', path: 'res/enemyAtlas.json' },
        { key: 'weaponSheetManifest', kind: 'json', path: 'res/manifests/weapons-16x16.manifest.json' },
        { key: 'armorSheetManifest', kind: 'json', path: 'res/manifests/armor-16x16.manifest.json' },
        { key: 'accessorySheetManifest', kind: 'json', path: 'res/manifests/accessories-16x16.manifest.json' },
        { key: 'worldSheetManifest', kind: 'json', path: 'res/manifests/adventure-world-16x16.manifest.json' },
        { key: 'tileset_tiles.json', kind: 'json', path: 'res/maps/tileset_tiles.json' },
        { key: 'enemy_territory_tiles.json', kind: 'json', path: 'res/maps/enemy_territory_tiles.json' },
        { key: 'collision_tiles.json', kind: 'json', path: 'res/maps/collision_tiles.json' },
        { key: 'overworld.json', kind: 'json', path: 'res/maps/overworld.json' },
        { key: 'equipment', kind: 'json', path: 'res/equipment.json' },
        { key: 'brecconary.json', kind: 'json', path: 'res/maps/brecconary.json' },
        { key: 'tantegelCastle.json', kind: 'json', path: 'res/maps/tantegelCastle.json' },
        { key: 'tantegelCastleUpstairs.json', kind: 'json', path: 'res/maps/tantegelCastleUpstairs.json' },
        { key: 'erdricksCave1.json', kind: 'json', path: 'res/maps/erdricksCave1.json' },
        { key: 'erdricksCave2.json', kind: 'json', path: 'res/maps/erdricksCave2.json' },
        { key: 'garinham.json', kind: 'json', path: 'res/maps/garinham.json' },
        { key: 'kol.json', kind: 'json', path: 'res/maps/kol.json' },
        { key: 'MUSIC_TITLE_SCREEN', kind: 'sound', path: 'res/sound/01 Dragon Quest 1 - Intro ~ Overture (22khz mono).ogg' },
        { key: 'MUSIC_TANTEGEL', kind: 'sound', path: 'res/sound/02 Dragon Quest 1 - Tantegel Castle (22khz mono).ogg' },
        { key: 'MUSIC_TANTEGEL_LOWER', kind: 'sound', path: 'res/sound/03 Dragon Quest 1 - Tantegel Castle (Lower) (22khz mono).ogg' },
        { key: 'MUSIC_TOWN', kind: 'sound', path: 'res/sound/04 Dragon Quest 1 - Peaceful Village (22khz mono).ogg' },
        { key: 'MUSIC_OVERWORLD', kind: 'sound', path: 'res/sound/05 Dragon Quest 1 - Kingdom of Alefgard (22khz mono).ogg' },
        { key: 'MUSIC_BATTLE', kind: 'sound', path: 'res/sound/14 Dragon Quest 1 - A Monster Draws Near (16khz mono).ogg', options: { volume: 2.32 } },
        { key: 'MUSIC_DUNGEON_FLOOR_1', kind: 'sound', path: 'res/sound/06 Dragon Quest 1 - Dark Dungeon - Floor 1 (22khz mono).ogg' },
        { key: 'dead', kind: 'sound', path: 'res/sound/20 Dragon Quest 1 - Thou Hast Died (22khz mono).ogg' },
        { key: 'overnight', kind: 'sound', path: 'res/sound/21 Dragon Quest 1 - Special Item (22khz mono).ogg' },
        { key: 'victory', kind: 'sound', path: 'res/sound/25 Dragon Quest 1 - Victory (22khz mono).ogg', options: { loop: false } },
        { key: 'stairs', kind: 'sound', path: 'res/sound/29 Dragon Quest 1 - Stairs Up (22khz mono).wav' },
        { key: 'run', kind: 'sound', path: 'res/sound/30 Dragon Quest 1 - Stairs Down (22khz mono).wav' },
        { key: 'menu', kind: 'sound', path: 'res/sound/32 Dragon Quest 1 - Menu Button (22khz mono).wav' },
        { key: 'confirmation', kind: 'sound', path: 'res/sound/33 Dragon Quest 1 - Confirmation (22khz mono).wav' },
        { key: 'hit', kind: 'sound', path: 'res/sound/34 Dragon Quest 1 - Hit (22khz mono).wav' },
        { key: 'excellentMove', kind: 'sound', path: 'res/sound/35 Dragon Quest 1 - Excellent Move (22khz mono).wav' },
        { key: 'attack', kind: 'sound', path: 'res/sound/36 Dragon Quest 1 - Attack (22khz mono).ogg' },
        { key: 'receiveDamage', kind: 'sound', path: 'res/sound/37 Dragon Quest 1 - Receive Damage (22khz mono).wav' },
        { key: 'prepareToAttack', kind: 'sound', path: 'res/sound/39 Dragon Quest 1 - Prepare to Attack (22khz mono).wav' },
        { key: 'missed1', kind: 'sound', path: 'res/sound/40 Dragon Quest 1 - Missed! (22khz mono).wav' },
        { key: 'missed2', kind: 'sound', path: 'res/sound/41 Dragon Quest 1 - Missed! (2) (22khz mono).wav' },
        { key: 'bump', kind: 'sound', path: 'res/sound/42 Dragon Quest 1 - Bumping into Walls (22khz mono).wav' },
        { key: 'castSpell', kind: 'sound', path: 'res/sound/43 Dragon Quest 1 - Cast A Spell (22khz mono).ogg' },
        { key: 'openChest', kind: 'sound', path: 'res/sound/44 Dragon Quest 1 - Open Treasure (22khz mono).ogg' },
        { key: 'door', kind: 'sound', path: 'res/sound/45 Dragon Quest 1 - Open Door (22khz mono).ogg' },
        { key: 'breatheFire', kind: 'sound', path: 'res/sound/46 Dragon Quest 1 - Breathe Fire (22khz mono).ogg' },
        { key: 'talk', kind: 'sound', path: 'res/sound/Dragon Warrior [Dragon Quest] SFX (1).wav' },
    ],
    maps: [
        { assetKey: 'overworld.json', path: 'res/maps/overworld.json' },
        { assetKey: 'brecconary.json', path: 'res/maps/brecconary.json' },
        { assetKey: 'tantegelCastle.json', path: 'res/maps/tantegelCastle.json' },
        { assetKey: 'tantegelCastleUpstairs.json', path: 'res/maps/tantegelCastleUpstairs.json' },
        { assetKey: 'erdricksCave1.json', path: 'res/maps/erdricksCave1.json' },
        { assetKey: 'erdricksCave2.json', path: 'res/maps/erdricksCave2.json' },
        { assetKey: 'garinham.json', path: 'res/maps/garinham.json' },
        { assetKey: 'kol.json', path: 'res/maps/kol.json' },
    ],
    initialMap: 'overworld.json',
});

export class ContentDatabase {
    constructor(private readonly config: GameContentConfig) {}

    getAsset(key: string): AssetConfig | undefined {
        return this.config.assets.find((asset) => asset.key === key);
    }

    getAssetsByKind(kind: AssetKind): AssetConfig[] {
        return this.config.assets.filter((asset) => asset.kind === kind);
    }

    getMaps(): MapConfig[] {
        return this.config.maps;
    }

    getInitialMap(): string {
        return this.config.initialMap;
    }
}
