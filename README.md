# DragonWarriorJS

![Build](https://github.com/bobbylight/DragonWarriorJS/actions/workflows/build.yml/badge.svg)
![CodeQL](https://github.com/bobbylight/DragonWarriorJS/actions/workflows/codeql-analysis.yml/badge.svg)

DragonWarriorJS is a browser-based RPG engine foundation written in TypeScript with Vite and the gtp framework. It ships with a Dragon Warrior-inspired campaign as the first playable experience, while providing reusable systems for exploration, combat, party progression, dialogue, inventory, quests, and content-driven world building.

## What is included

The project now provides a flexible RPG engine toolkit with a complete sample game:

- Overworld exploration with maps, collisions, warps, doors, and NPCs
- Turn-based combat with attacks, status effects, and equipment-based stat changes
- Character creation with multiple races and classes
- Party progression, experience, and basic combat stats
- Quests, adventure-log progress tracking, and rewards
- Equipment, spells, and battle UI flows
- Data-driven content through JSON catalogs, Tiled maps, and map-logic modules
- Hero sprite variants that change visually by class and race
- A state-driven architecture designed to support additional campaigns and game modes

## Getting started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:5173.

### Build for production

```bash
npm run build
```

### Validate the project

```bash
npm run tsc
npm run test
```

## Project structure

- `public/res/` - game assets, maps, enemy/equipment data, sprite sheets
- `public/res/maps/` - Tiled map JSON files
- `src/app/dw/` - main game runtime and gameplay systems
- `src/app/dw/mapLogic/` - per-map logic for NPC conversations and events
- `src/test-setup.ts` - test setup utilities

## Editing content

### Maps

Maps are stored as Tiled JSON files in `public/res/maps/`. They define tile layers, collisions, NPCs, warps, treasure, and enemy territories.

Each map can reference a logic module in `src/app/dw/mapLogic/` so conversations and custom events can be driven from code.

### NPC conversations

Conversation logic lives in the map logic files under `src/app/dw/mapLogic/`. They map NPC names to conversation content or templates so dialogue can change based on game progress.

### Enemies, equipment, and world data

- `public/res/enemies.json` - enemy catalog
- `public/res/equipment.json` - weapons, armor, shields
- `public/res/enemyAtlas.json` - enemy sprite atlas mappings

## Development notes

The project is intentionally data-driven, so many additions can be made without touching the rendering engine directly:

- Add new maps in Tiled and wire them into the loading flow
- Extend the JSON catalogs for enemies or equipment
- Add or adjust logic in the relevant map module
- Introduce new hero variants by generating additional sprite sheets and wiring them into the variant selection logic

## Documentation

Additional development notes are available in [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

