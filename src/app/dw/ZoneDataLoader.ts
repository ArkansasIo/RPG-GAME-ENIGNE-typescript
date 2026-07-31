export interface ZoneDataManifestEntry {
    id: number;
    code: string;
    name: string;
    data: {
        zoneData: string;
        encounterTable: string;
        lootTable: string;
        npcData: string;
        musicData: string;
    };
}

export interface ZoneDataManifest {
    id: string;
    title: string;
    version: number;
    generatedAt: string;
    zones: ZoneDataManifestEntry[];
}

export interface ZoneDataBundle {
    zoneData: unknown;
    encounterTable: unknown;
    lootTable: unknown;
    npcData: unknown;
    musicData: unknown;
}

export type ZoneJsonLoader = (assetPath: string) => Promise<unknown>;

export const getZoneManifestEntry = (manifest: ZoneDataManifest, zoneCode: string): ZoneDataManifestEntry | undefined => {
    return manifest.zones.find((zone) => zone.code === zoneCode);
};

export const createZoneDataPathIndex = (manifest: ZoneDataManifest): Record<string, ZoneDataManifestEntry['data']> => {
    return manifest.zones.reduce<Record<string, ZoneDataManifestEntry['data']>>((index, zone) => {
        index[zone.code] = zone.data;
        return index;
    }, {});
};

export const loadZoneDataBundle = async (manifest: ZoneDataManifest, zoneCode: string, loader: ZoneJsonLoader): Promise<ZoneDataBundle> => {
    const entry = getZoneManifestEntry(manifest, zoneCode);
    if (!entry) {
        throw new Error(`Unknown zone code: ${zoneCode}`);
    }

    const [zoneData, encounterTable, lootTable, npcData, musicData] = await Promise.all([
        loader(entry.data.zoneData),
        loader(entry.data.encounterTable),
        loader(entry.data.lootTable),
        loader(entry.data.npcData),
        loader(entry.data.musicData),
    ]);

    return {
        zoneData,
        encounterTable,
        lootTable,
        npcData,
        musicData,
    };
};
