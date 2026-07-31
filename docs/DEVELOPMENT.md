# Development Guide

This document summarizes the main architecture and workflow for DragonWarriorJS as an RPG engine foundation.

## Tech stack

- TypeScript
- Vite
- gtp
- Vitest
- ESLint

## Runtime architecture

The engine uses a state-driven architecture built around a top-level game runtime and a set of state classes.

- `DwGame` owns the main game loop, map loading, viewport handling, and shared services.
- `LoadingState` loads assets, sprite sheets, maps, and data catalogs before the game begins.
- `RoamingState` handles exploration, input, collisions, and map interaction.
- `BattleState` manages combat encounters.
- The existing Dragon Warrior-inspired content sits on top of these reusable systems so new campaigns can be added without rewriting the engine.

## Content pipeline

### Maps

Maps are authored in Tiled and exported as JSON into `public/res/maps/`.

When adding a new map:

1. Create or edit the Tiled JSON in `public/res/maps/`.
2. Add the map to the loading flow in `LoadingState`.
3. Add a matching logic module under `src/app/dw/mapLogic/` if the map needs custom behavior.

### NPC logic

Map behavior is usually defined in the logic files under `src/app/dw/mapLogic/`.
Those modules return the conversation content or templates for NPC objects placed on a map.

### Data catalogs

Several gameplay systems are data-driven:

- `public/res/enemies.json` for monsters
- `public/res/equipment.json` for weapons, armor, and shields
- `public/res/hero*.png` sprite sheets for hero variants
- `public/res/assetClassCatalog.json` for the master 90-class pixel asset taxonomy

### 90-class master specification

The project now includes a formal 8-bit NES style class catalog derived from the master visual sheet.

- Sprite standard: 16x16
- Rarity progression: Common -> Uncommon -> Rare -> Very Rare -> Epic -> Legendary -> Artifact
- Class breakdown:
	- 30 weapon classes
	- 20 armor classes
	- 20 accessory/equipment classes
	- 20 world/support classes (consumables, utility, crafting, profession, mounts, vehicles, NPCs, monsters, relics, misc)

Implementation files:

- `public/res/assetClassCatalog.json` is the content source of truth.
- `src/app/dw/AssetClassCatalog.ts` provides typed accessors and validation helpers.
- `src/app/dw/AssetClassCatalog.spec.ts` enforces count and structure constraints.
- `public/res/manifests/weapons-16x16.manifest.json` is the split manifest for weapon sprites.
- `public/res/manifests/armor-16x16.manifest.json` is the split manifest for armor sprites.
- `public/res/manifests/accessories-16x16.manifest.json` is the split manifest for accessory sprites.
- `public/res/manifests/adventure-world-16x16.manifest.json` is the split manifest for world/support sprites.
- `src/app/dw/AssetSheetManifest.ts` generates deterministic sprite IDs and placeholder atlas coordinates.
- `src/app/dw/AssetSheetManifest.spec.ts` verifies generated manifests stay in sync with committed JSON artifacts.

Expansion workflow:

1. Use the master sheet as the style and taxonomy spec.
2. Split each class category into dedicated 16x16 production sprite sheets.
3. Keep IDs stable between sheets and the catalog JSON.
4. Register new sheet assets in `ContentConfig` and `AssetDatabase`.

### 72-zone biome world specification

The project now includes a formal 72-zone world plan that captures biome families,
progression bands, and baseline map package requirements.

- Zone count: 72
- Tile standards: 16x16 gameplay tiles, optional 8x8 detail tiles
- Movement/collision: 4-direction movement with tile-based collision
- Core map rules: day/night palettes, weather overlays, animated water/lava/foliage,
	hidden passages, secret rooms, towns/castles, dungeons, boss arenas, teleport points,
	and world-map connections
- Progression bands:
	- Zones 1-12: Beginner Kingdom
	- Zones 13-24: Northern Wilderness and Mountains
	- Zones 25-32: Great Desert
	- Zones 33-40: Ocean and Coastal Kingdoms
	- Zones 41-46: Frozen North
	- Zones 47-52: Firelands
	- Zones 53-60: Swamplands
	- Zones 61-66: Deep Underground
	- Zones 67-72: Otherworld and Endgame

Implementation files:

- `public/res/zoneCatalog72.json` is the source of truth for all zones.
- `src/app/dw/ZoneCatalog.ts` provides typed models and validation helpers.
- `src/app/dw/ZoneCatalog.spec.ts` enforces the 72-zone structure and progression bands.

Generated data scaffold:

- `public/res/zones/zoneDataManifest72.json` indexes all zone data packages.
- Each zone has a data package at `public/res/zones/ZONE_XX/Data/` containing:
	- `ZoneData.json`
	- `EncounterTable.json`
	- `LootTable.json`
	- `NPCData.json`
	- `MusicData.json`
- `src/app/dw/ZoneDataManifest.spec.ts` verifies all indexed files exist and parse as JSON.

## Testing and validation

Run the following commands before finishing changes:

```bash
npm run tsc
npm run test
npm run build
```

## Notes for contributors

- Keep new systems modular and data-driven where possible.
- Favor small, testable helpers over large ad-hoc branches.
- When adding visual variants, update both the asset registration and the selection logic.
- Keep README updates in sync with the current feature set.
