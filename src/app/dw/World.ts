export interface WorldRegion {
    id: string;
    name: string;
    biome: string;
    subBiome?: string;
    zone: string;
    subZone?: string;
    levelMin: number;
    levelMax: number;
    rank: string;
}

export const WORLD_LEVEL_CAP = 720;

const BIOMES = [
    'Ashen Marsh',
    'Cinder Fen',
    'Moonlit Steppe',
    'Verdant Hollow',
    'Crystal Reach',
    'Frostbound Ridge',
    'Stormwake Coast',
    'Velvet Jungle',
    'Obsidian Wastes',
    'Golden Orchard',
    'Tideglass Shoals',
    'Sunken Crypt',
    'Emberwood Grove',
    'Silvershade Mire',
    'Ruinspire Highlands',
    'Dawnspire Plateau',
    'Mireglass Basin',
    'Whispering Dunes',
    'Thornroot Wilds',
    'Starfall Tundra',
];

const ZONES = [
    'Outer Reach',
    'Wild March',
    'Deep Hollow',
    'Riven Path',
    'Echo Vale',
    'Dusk Gate',
    'Ridgewatch',
    'Tidewatch',
    'Ashen Loop',
    'Stonewake',
    'Moonharbor',
    'Crownfall',
    'Scarfen',
    'Gloam Glen',
    'Thorn Gate',
    'Frostline',
    'Sunspire',
    'Sable Knoll',
    'Gilded Pass',
    'Vortex Hollow',
];

const RANKS = [
    'Warden',
    'Scout',
    'Sentinel',
    'Champion',
    'Elder',
    'Legend',
];

export function createWorldCatalog(): WorldRegion[] {
    const regions: WorldRegion[] = [];
    const totalRegions = 72;

    for (let index = 0; index < totalRegions; index += 1) {
        const levelMin = index * 10 + 1;
        const levelMax = Math.min(WORLD_LEVEL_CAP, levelMin + 9);
        const biome = BIOMES[index % BIOMES.length];
        const zone = ZONES[index % ZONES.length];
        const subBiome = `${biome.split(' ')[0]} Expanse`;
        const subZone = `${zone.split(' ')[0]} Verge`;
        const rank = RANKS[index % RANKS.length];

        regions.push({
            id: `region-${index + 1}`,
            name: `${biome} ${index + 1}`,
            biome,
            subBiome,
            zone,
            subZone,
            levelMin,
            levelMax,
            rank,
        });
    }

    return regions;
}

export function getRegionForLevel(level: number, regions: WorldRegion[] = createWorldCatalog()): WorldRegion | undefined {
    return regions.find((region) => region.levelMin <= level && region.levelMax >= level);
}

export function getLevelProgressionSummary(level: number): string {
    const region = getRegionForLevel(level);
    if (!region) {
        return 'Out of bounds';
    }

    return `${region.name} :: ${region.biome}/${region.subBiome} :: ${region.zone}/${region.subZone} :: Lv ${region.levelMin}-${region.levelMax} :: ${region.rank}`;
}
