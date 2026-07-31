import { getNpcProfessions as getNpcProfessionsFromModule } from './NpcProfessions';

export interface NpcCatalogEntry {
    id: string;
    name: string;
    profession: string;
    title: string;
    location: string;
    description: string;
}

export const getNpcCatalog = (): NpcCatalogEntry[] => [
    { id: 'barnabas', name: 'Barnabas', profession: 'Apothecary', title: 'Herb Doctor', location: 'Brecconary', description: 'Keeps a satchel of restorative tonics.' },
    { id: 'elira', name: 'Elira', profession: 'Blacksmith', title: 'Ironhand', location: 'Garinham', description: 'Forged the town gate hinge with a single hammer blow.' },
    { id: 'morven', name: 'Morven', profession: 'Carpenter', title: 'Timberwright', location: 'Tantegel', description: 'Builds sturdy carts and window frames.' },
    { id: 'cora', name: 'Cora', profession: 'Chef', title: 'Soupmonger', location: 'Kol', description: 'Prepares old-world stews that fill the stomach.' },
    { id: 'tovan', name: 'Tovan', profession: 'Herbalist', title: 'Moss Reader', location: 'Overworld', description: 'Finds moonwort where others see only grass.' },
    { id: 'sella', name: 'Sella', profession: 'Innkeeper', title: 'Lantern Host', location: 'Brecconary', description: 'Offers warm beds and gossip by the hearth.' },
    { id: 'orin', name: 'Orin', profession: 'Mage', title: 'Star Reader', location: 'Tantegel', description: 'Speaks in riddles and candlelight.' },
    { id: 'vark', name: 'Vark', profession: 'Mercenary', title: 'Red Badge', location: 'Garinham', description: 'Protects caravans from raiders and wolves.' },
    { id: 'drena', name: 'Drena', profession: 'Miner', title: 'Rocksplitter', location: 'Erdricks Cave', description: 'Knows where ore glints beneath the roots.' },
    { id: 'juno', name: 'Juno', profession: 'Navigator', title: 'Star Compass', location: 'Overworld', description: 'Charts dusk roads across the cliffs.' },
    { id: 'pello', name: 'Pello', profession: 'Scribe', title: 'Ink Warden', location: 'Tantegel', description: 'Copies ancient maps onto parchment and skin.' },
    { id: 'mira', name: 'Mira', profession: 'Tailor', title: 'Needle Lady', location: 'Kol', description: 'Measures cloaks for the proud and the poor alike.' },
    { id: 'brok', name: 'Brok', profession: 'Tinker', title: 'Spare-Parts Man', location: 'Brecconary', description: 'Repairs old lanterns and loose hinges.' },
    { id: 'nalia', name: 'Nalia', profession: 'Trader', title: 'Market Broker', location: 'Garinham', description: 'Buys relics and sells stories for coin.' },
    { id: 'thorn', name: 'Thorn', profession: 'Guard', title: 'Gate Captain', location: 'Tantegel', description: 'Keeps watch at the eastern gate.' },
    { id: 'lyra', name: 'Lyra', profession: 'Ranger', title: 'Woodrunner', location: 'Overworld', description: 'Tracks footprints left in damp earth.' },
    { id: 'sable', name: 'Sable', profession: 'Alchemist', title: 'Bottle Keeper', location: 'Kol', description: 'Brews smoke, sparks, and sleeping draughts.' },
    { id: 'teo', name: 'Teo', profession: 'Bard', title: 'Drumcaller', location: 'Brecconary', description: 'Sings lullabies that make strangers stay awhile.' },
    { id: 'griss', name: 'Griss', profession: 'Guard', title: 'Stonewatch', location: 'Garinham', description: 'Protects the town from wild beasts by night.' },
    { id: 'yara', name: 'Yara', profession: 'Apothecary', title: 'Rose Hand', location: 'Kol', description: 'Sells salves for bites, burns, and bruises.' },
    { id: 'fenn', name: 'Fenn', profession: 'Blacksmith', title: 'Hammerkin', location: 'Tantegel', description: 'Makes spearheads sharper than moonlight.' },
    { id: 'marik', name: 'Marik', profession: 'Carpenter', title: 'Beamcaller', location: 'Overworld', description: 'Builds fences and bridges with care.' },
    { id: 'hessa', name: 'Hessa', profession: 'Chef', title: 'Pan Keeper', location: 'Brecconary', description: 'Known for peppered bread and stew.' },
    { id: 'moss', name: 'Moss', profession: 'Herbalist', title: 'Root Whisperer', location: 'Garinham', description: 'Can identify every leaf in the valley.' },
    { id: 'dask', name: 'Dask', profession: 'Innkeeper', title: 'Firehand', location: 'Tantegel', description: 'Offers beds, stories, and stable room.' },
    { id: 'vel', name: 'Vel', profession: 'Mage', title: 'Glass Eye', location: 'Kol', description: 'Keeps a crystal orb that glows at dusk.' },
    { id: 'petra', name: 'Petra', profession: 'Mercenary', title: 'Ash Blade', location: 'Overworld', description: 'Cuts down trouble for a fair price.' },
    { id: 'naim', name: 'Naim', profession: 'Miner', title: 'Cave Reader', location: 'Erdricks Cave', description: 'Can hear stones clicking beneath the floor.' },
    { id: 'kell', name: 'Kell', profession: 'Navigator', title: 'Tide Caller', location: 'Brecconary', description: 'Knows the safest paths by moon phase.' },
    { id: 'rune', name: 'Rune', profession: 'Scribe', title: 'Pale Quill', location: 'Garinham', description: 'Writes letters for the illiterate and the lonely.' },
    { id: 'ioka', name: 'Ioka', profession: 'Tailor', title: 'Thread Mage', location: 'Tantegel', description: 'Mends cloaks with invisible stitches.' },
    { id: 'mako', name: 'Mako', profession: 'Tinker', title: 'Tin Spark', location: 'Kol', description: 'Repairs hinges and trinkets by lantern glow.' },
    { id: 'vess', name: 'Vess', profession: 'Trader', title: 'Coin Lantern', location: 'Overworld', description: 'Carries satchels full of salt, nails, and ribbon.' },
    { id: 'cairn', name: 'Cairn', profession: 'Guard', title: 'East Watch', location: 'Tantegel', description: 'The first to notice strange footprints on the road.' },
    { id: 'nerys', name: 'Nerys', profession: 'Ranger', title: 'Bracken Scout', location: 'Garinham', description: 'Moves quietly through thick brush and pine.' },
    { id: 'rowan', name: 'Rowan', profession: 'Alchemist', title: 'Bottlewright', location: 'Brecconary', description: 'Brews remedies from brookwater and ash leaf.' },
    { id: 'tess', name: 'Tess', profession: 'Bard', title: 'Hearth Singer', location: 'Kol', description: 'Sings the tales of old kings and forgotten roads.' },
    { id: 'garr', name: 'Garr', profession: 'Mercenary', title: 'Ashen Hand', location: 'Overworld', description: 'Accepts caravan contracts and monster hunts.' },
    { id: 'lara', name: 'Lara', profession: 'Apothecary', title: 'Sunroot', location: 'Garinham', description: 'Dyes salves with bright herbs and old patience.' },
    { id: 'bran', name: 'Bran', profession: 'Blacksmith', title: 'Mithril Smith', location: 'Tantegel', description: 'Forges blades prized by adventurers.' },
    { id: 'ella', name: 'Ella', profession: 'Chef', title: 'Honey Spoon', location: 'Brecconary', description: 'Serves sweet bread and savory stew.' },
    { id: 'oz', name: 'Oz', profession: 'Herbalist', title: 'Moss Cloak', location: 'Overworld', description: 'Collects herbs from the marshes at dawn.' },
];

export const getNpcProfessions = () => getNpcProfessionsFromModule();
