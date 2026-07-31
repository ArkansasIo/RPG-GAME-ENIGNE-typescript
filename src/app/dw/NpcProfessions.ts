export interface NpcProfession {
    id: string;
    label: string;
    description: string;
    role: string;
}

export const getNpcProfessions = (): NpcProfession[] => [
    { id: 'apothecary', label: 'Apothecary', description: 'Sells herbs and remedies.', role: 'Healer' },
    { id: 'blacksmith', label: 'Blacksmith', description: 'Crafts and repairs steel.', role: 'Forgekeeper' },
    { id: 'carpenter', label: 'Carpenter', description: 'Builds homes and wagons.', role: 'Builder' },
    { id: 'chef', label: 'Chef', description: 'Prepares hearty meals.', role: 'Cook' },
    { id: 'herbalist', label: 'Herbalist', description: 'Cultivates rare plants.', role: 'Gatherer' },
    { id: 'innkeeper', label: 'Innkeeper', description: 'Runs rooms and lodging.', role: 'Host' },
    { id: 'mage', label: 'Mage', description: 'Studies ancient magic.', role: 'Spellcaster' },
    { id: 'mercenary', label: 'Mercenary', description: 'Protects caravans for hire.', role: 'Guard' },
    { id: 'miner', label: 'Miner', description: 'Delves for ore and gems.', role: 'Prospector' },
    { id: 'navigator', label: 'Navigator', description: 'Charts journeys across the world.', role: 'Guide' },
    { id: 'scribe', label: 'Scribe', description: 'Records decrees and maps.', role: 'Archivist' },
    { id: 'tailor', label: 'Tailor', description: 'Stitches cloaks and robes.', role: 'Craftsman' },
    { id: 'tinker', label: 'Tinker', description: 'Repairs tools and trinkets.', role: 'Mechanic' },
    { id: 'trader', label: 'Trader', description: 'Buys and sells goods.', role: 'Merchant' },
    { id: 'guard', label: 'Guard', description: 'Keeps the peace.', role: 'Protector' },
    { id: 'ranger', label: 'Ranger', description: 'Tracks beasts in the wild.', role: 'Scout' },
    { id: 'alchemist', label: 'Alchemist', description: 'Brews potent draughts.', role: 'Potionmaker' },
    { id: 'bard', label: 'Bard', description: 'Sings tales and rumors.', role: 'Storyteller' },
];
