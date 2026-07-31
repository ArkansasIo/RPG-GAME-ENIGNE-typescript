export interface ZoneCatalogSection {
    map: string[];
    tiles: string[];
    characters: string[];
    items: string[];
    effects: string[];
    data: string[];
}

export interface ZoneMapRules {
    animatedWater: boolean;
    animatedLava: boolean;
    animatedTreesAndGrass: boolean;
    dayNightPalettes: boolean;
    weatherOverlays: boolean;
    tileBasedCollision: boolean;
    hiddenPassages: boolean;
    secretRooms: boolean;
    townsAndCastles: boolean;
    dungeons: boolean;
    bossArenas: boolean;
    teleportPoints: boolean;
    worldMapConnections: boolean;
}

export interface ZoneProgressionBand {
    id: string;
    label: string;
    startZoneId: number;
    endZoneId: number;
}

export interface ZoneBiomeFamily {
    id: string;
    label: string;
    startZoneId: number;
    endZoneId: number;
}

export interface ZoneDefinition {
    id: number;
    code: string;
    name: string;
    biomeFamilyId: string;
    theme: string;
    progressionBandId: string;
}

export interface ZoneCatalog {
    meta: {
        name: string;
        version: number;
        tileSize: string;
        detailTileSize: string;
        movement: string;
        presentation: string;
    };
    zoneStructure: ZoneCatalogSection;
    mapRules: ZoneMapRules;
    progressionBands: ZoneProgressionBand[];
    biomeFamilies: ZoneBiomeFamily[];
    zones: ZoneDefinition[];
}

export const TOTAL_ZONE_COUNT = 72;

export const getZoneById = (catalog: ZoneCatalog, zoneId: number): ZoneDefinition | undefined => {
    return catalog.zones.find((zone) => zone.id === zoneId);
};

export const getZonesInBand = (catalog: ZoneCatalog, bandId: string): ZoneDefinition[] => {
    return catalog.zones.filter((zone) => zone.progressionBandId === bandId);
};

const isSequentialZoneId = (zones: ZoneDefinition[], zoneId: number): boolean => {
    return zones[zoneId - 1]?.id === zoneId;
};

const createZoneCode = (zoneId: number): string => {
    return `ZONE_${zoneId.toString().padStart(2, '0')}`;
};

const validateRangeDefinitions = (definitions: Array<{ id: string; startZoneId: number; endZoneId: number }>, zones: ZoneDefinition[], label: string): string[] => {
    const errors: string[] = [];

    definitions.forEach((definition) => {
        if (definition.startZoneId > definition.endZoneId) {
            errors.push(`${label} ${definition.id} has an invalid range ${definition.startZoneId}-${definition.endZoneId}`);
            return;
        }

        for (let zoneId = definition.startZoneId; zoneId <= definition.endZoneId; zoneId += 1) {
            if (!isSequentialZoneId(zones, zoneId)) {
                errors.push(`${label} ${definition.id} references missing zone id ${zoneId}`);
            }
        }
    });

    return errors;
};

export const validateZoneCatalog = (catalog: ZoneCatalog): string[] => {
    const errors: string[] = [];

    if (catalog.zones.length !== TOTAL_ZONE_COUNT) {
        errors.push(`Expected ${TOTAL_ZONE_COUNT} zones but found ${catalog.zones.length}`);
    }

    catalog.zones.forEach((zone, index) => {
        const expectedId = index + 1;
        const expectedCode = createZoneCode(expectedId);

        if (zone.id !== expectedId) {
            errors.push(`Expected zone id ${expectedId} but found ${zone.id}`);
        }

        if (zone.code !== expectedCode) {
            errors.push(`Expected zone code ${expectedCode} but found ${zone.code}`);
        }
    });

    const uniqueZoneNames = new Set(catalog.zones.map((zone) => zone.name));
    if (uniqueZoneNames.size !== catalog.zones.length) {
        errors.push('Zone names must be unique');
    }

    const uniqueZoneCodes = new Set(catalog.zones.map((zone) => zone.code));
    if (uniqueZoneCodes.size !== catalog.zones.length) {
        errors.push('Zone codes must be unique');
    }

    const biomeFamilyIds = new Set(catalog.biomeFamilies.map((family) => family.id));
    catalog.zones.forEach((zone) => {
        if (!biomeFamilyIds.has(zone.biomeFamilyId)) {
            errors.push(`Zone ${zone.code} uses unknown biome family ${zone.biomeFamilyId}`);
        }
    });

    const progressionBandIds = new Set(catalog.progressionBands.map((band) => band.id));
    catalog.zones.forEach((zone) => {
        if (!progressionBandIds.has(zone.progressionBandId)) {
            errors.push(`Zone ${zone.code} uses unknown progression band ${zone.progressionBandId}`);
        }
    });

    const missingMapRules = Object.entries(catalog.mapRules)
        .filter(([, enabled]) => enabled !== true)
        .map(([ruleName]) => ruleName);
    if (missingMapRules.length > 0) {
        errors.push(`All map rules should be enabled for baseline spec: ${missingMapRules.join(', ')}`);
    }

    errors.push(...validateRangeDefinitions(catalog.biomeFamilies, catalog.zones, 'Biome family'));
    errors.push(...validateRangeDefinitions(catalog.progressionBands, catalog.zones, 'Progression band'));

    return errors;
};
