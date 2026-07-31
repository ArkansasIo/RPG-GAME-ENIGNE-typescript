export const ASSET_RARITY_TIERS = [
    'common',
    'uncommon',
    'rare',
    'very-rare',
    'epic',
    'legendary',
    'artifact',
] as const;

export type AssetRarityTier = typeof ASSET_RARITY_TIERS[number];

export interface AssetClassCatalogCategory {
    id: string;
    label: string;
    classes: string[];
}

export interface AssetClassCatalogGroup {
    id: string;
    label: string;
    targetClassCount: number;
    categories: AssetClassCatalogCategory[];
}

export interface AssetClassCatalog {
    meta: {
        name: string;
        version: number;
        style: string;
        spriteSize: string;
        masterSpecification: string;
        rarityTiers: AssetRarityTier[];
    };
    groups: AssetClassCatalogGroup[];
    uiModules: string[];
}

export const countClassesInGroup = (group: AssetClassCatalogGroup): number => {
    return group.categories.reduce((total, category) => total + category.classes.length, 0);
};

export const countAllCatalogClasses = (catalog: AssetClassCatalog): number => {
    return catalog.groups.reduce((total, group) => total + countClassesInGroup(group), 0);
};

export const getGroupById = (catalog: AssetClassCatalog, groupId: string): AssetClassCatalogGroup | undefined => {
    return catalog.groups.find((group) => group.id === groupId);
};

export const validateAssetClassCatalog = (catalog: AssetClassCatalog): string[] => {
    const errors: string[] = [];

    const missingRarity = ASSET_RARITY_TIERS.filter((tier) => !catalog.meta.rarityTiers.includes(tier));
    if (missingRarity.length > 0) {
        errors.push(`Missing rarity tiers: ${missingRarity.join(', ')}`);
    }

    catalog.groups.forEach((group) => {
        const actual = countClassesInGroup(group);
        if (actual !== group.targetClassCount) {
            errors.push(`Group ${group.id} expected ${group.targetClassCount} classes but found ${actual}`);
        }
    });

    const total = countAllCatalogClasses(catalog);
    if (total !== 90) {
        errors.push(`Expected total class count of 90 but found ${total}`);
    }

    return errors;
};