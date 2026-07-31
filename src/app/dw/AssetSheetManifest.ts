import { AssetClassCatalog, AssetClassCatalogGroup } from './AssetClassCatalog';

export type SplitSheetGroupId = 'weapons' | 'armor' | 'accessories' | 'adventure-world';

export interface SpriteRect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SplitSheetEntry {
    spriteId: string;
    groupId: SplitSheetGroupId;
    categoryId: string;
    classId: string;
    tier: number;
    rarity: string;
    rect: SpriteRect;
    placeholder: boolean;
}

export interface SplitSheetManifest {
    id: string;
    title: string;
    spriteSize: number;
    columns: number;
    rows: number;
    atlasPath: string;
    entries: SplitSheetEntry[];
}

const SPRITE_SIZE = 16;
const DEFAULT_COLUMNS = 16;

const assertSplitGroup = (group: AssetClassCatalogGroup): SplitSheetGroupId => {
    if (group.id === 'weapons' || group.id === 'armor' || group.id === 'accessories' || group.id === 'adventure-world') {
        return group.id;
    }
    throw new Error(`Unsupported split sheet group: ${group.id}`);
};

export const buildSplitManifestForGroup = (catalog: AssetClassCatalog, group: AssetClassCatalogGroup): SplitSheetManifest => {
    const groupId = assertSplitGroup(group);
    const entries: SplitSheetEntry[] = [];

    group.categories.forEach((category) => {
        category.classes.forEach((classId) => {
            const idx = entries.length;
            const col = idx % DEFAULT_COLUMNS;
            const row = Math.floor(idx / DEFAULT_COLUMNS);
            entries.push({
                spriteId: `dw.${groupId}.${category.id}.${classId}.t01`,
                groupId,
                categoryId: category.id,
                classId,
                tier: 1,
                rarity: 'common',
                rect: {
                    x: col * SPRITE_SIZE,
                    y: row * SPRITE_SIZE,
                    w: SPRITE_SIZE,
                    h: SPRITE_SIZE,
                },
                placeholder: true,
            });
        });
    });

    return {
        id: `dw-${groupId}-16x16-v${catalog.meta.version}`,
        title: `${group.label} Split Sheet`,
        spriteSize: SPRITE_SIZE,
        columns: DEFAULT_COLUMNS,
        rows: Math.ceil(entries.length / DEFAULT_COLUMNS),
        atlasPath: `res/sheets/${groupId}_16x16.png`,
        entries,
    };
};

export const buildAllSplitManifests = (catalog: AssetClassCatalog): Record<SplitSheetGroupId, SplitSheetManifest> => {
    const groupsById = new Map(catalog.groups.map((group) => [ group.id, group ]));
    const weapons = groupsById.get('weapons');
    const armor = groupsById.get('armor');
    const accessories = groupsById.get('accessories');
    const adventureWorld = groupsById.get('adventure-world');

    if (!weapons || !armor || !accessories || !adventureWorld) {
        throw new Error('Catalog is missing one or more split sheet groups');
    }

    return {
        weapons: buildSplitManifestForGroup(catalog, weapons),
        armor: buildSplitManifestForGroup(catalog, armor),
        accessories: buildSplitManifestForGroup(catalog, accessories),
        'adventure-world': buildSplitManifestForGroup(catalog, adventureWorld),
    };
};
