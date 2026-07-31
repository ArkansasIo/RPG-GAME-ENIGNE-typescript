# Asset Import Guide

This project does not consume the large concept sheets directly. The runtime uses smaller production atlases and JSON catalogs under `public/res/`.

Store the uploaded source sheets in `public/res/assets/` using these filenames:

- `dw-master-monsters-npcs-sheet.png`
- `dw-master-weapons-armor-items-sheet.png`
- `dw-master-world-tiles-sheet.png`

## Pipeline audit

The active runtime asset paths are:

- Enemy art: `public/res/monsters.png` with coordinates in `public/res/enemyAtlas.json`
- Enemy stats and names: `public/res/enemies.json`
- Enemy spawn regions: `public/res/enemyTerritories.json`
- Equipment gameplay data: `public/res/equipment.json`
- Split-sheet metadata for item and world art:
  - `public/res/manifests/weapons-16x16.manifest.json`
  - `public/res/manifests/armor-16x16.manifest.json`
  - `public/res/manifests/accessories-16x16.manifest.json`
  - `public/res/manifests/adventure-world-16x16.manifest.json`
- Map tile atlas: `public/res/tiles.png`
- Tiled tileset definition: `public/res/maps/tileset_tiles.json`

The content registry now also loads `public/res/assets/sourceSheetCatalog.json` so the raw source sheets have a formal home in the project.

## 1. Add a new enemy or enemy set

This game still uses one compiled enemy atlas, not per-enemy image files.

1. Copy the chosen enemy sprites from `public/res/assets/dw-master-monsters-npcs-sheet.png` into `public/res/monsters.png`.
2. Measure each sprite rectangle in pixels and append entries to `public/res/enemyAtlas.json`.
3. Add the enemy definition to `public/res/enemies.json`.
4. If the enemy should appear in the overworld, add it to `public/res/enemyTerritories.json`.

Expected atlas entries:

```json
{ "id": "MyEnemy", "dim": "x,y,width,height" },
{ "id": "MyEnemy_damaged", "dim": "x,y,width,height" }
```

Expected enemy data shape:

```json
"MyEnemy": {
  "name": "My Enemy",
  "shortName": "My Enemy",
  "image": "MyEnemy",
  "damagedImage": "MyEnemy_damaged",
  "str": 0,
  "agility": 0,
  "hp": 0,
  "resist": { "sleep": 0, "stopSpell": 0, "hurt": 0 },
  "dodge": 0,
  "xp": 0,
  "gp": 0,
  "ai": "attackOnly"
}
```

## 2. Replace or expand item and equipment sprites

The item and equipment sheets in this repo are organized as four production atlases:

- `public/res/sheets/weapons_16x16.png`
- `public/res/sheets/armor_16x16.png`
- `public/res/sheets/accessories_16x16.png`
- `public/res/sheets/adventure-world_16x16.png`

The stable sprite IDs and slot order come from:

- `public/res/assetClassCatalog.json`
- `public/res/manifests/*.manifest.json`

Import workflow:

1. Crop 16x16 sprites from `public/res/assets/dw-master-weapons-armor-items-sheet.png`.
2. Paste them into the matching production atlas in the same order as the corresponding manifest entries.
3. Keep the manifest JSON unchanged unless you deliberately change slot order.
4. Update `public/res/equipment.json` only when you add gameplay items, not when you only reskin existing ones.

Current gameplay-backed equipment is limited to weapons, armor, and shields in `public/res/equipment.json`. The broader class catalog and manifests are visual planning metadata for future expansion.

## 3. Wire in a new tileset for maps

Maps are authored against Tiled JSON and the shared tileset definition in `public/res/maps/tileset_tiles.json`.

Import workflow:

1. Build the production tile atlas at `public/res/tiles.png` from `public/res/assets/dw-master-world-tiles-sheet.png`.
2. Keep tile size at 16x16 and spacing at 1 pixel unless you also update the tileset JSON.
3. If the atlas dimensions change, update these fields in `public/res/maps/tileset_tiles.json`:
   - `image`
   - `imagewidth`
   - `imageheight`
   - `tilecount`
   - `columns` if you add it in Tiled
4. Reopen each affected map in Tiled and verify tile indices still point at the intended graphics.

If you want a second tileset instead of replacing the current one, create a new Tiled tileset JSON in `public/res/maps/` and repoint any target maps to it. The current runtime loads map JSON files directly, so the map file is what decides which tileset gets used.

## 4. Exact import targets for the uploaded sheets

- Monsters and NPC sheet:
  - primary target: `public/res/monsters.png`
  - secondary target: `public/res/npcs.png`
- Weapons, armor, and items sheet:
  - primary targets: `public/res/sheets/weapons_16x16.png`, `public/res/sheets/armor_16x16.png`, `public/res/sheets/accessories_16x16.png`, `public/res/sheets/adventure-world_16x16.png`
- World and tiles sheet:
  - primary target: `public/res/tiles.png`
  - metadata target: `public/res/maps/tileset_tiles.json`

## Validation

After importing or editing these assets, run:

```bash
npm run tsc
npm run test -- src/app/dw/AssetSheetManifest.spec.ts
```

If you change Tiled map data or tileset geometry, also run:

```bash
npm run build
```