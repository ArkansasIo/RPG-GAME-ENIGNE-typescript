export interface WorldLocationInfo {
    id: string;
    name: string;
    kind: 'city' | 'town' | 'village' | 'underground-zone';
    region: string;
    levelRange: string;
    description: string;
}

const WORLD_LOCATIONS: WorldLocationInfo[] = [
    { id: 'ashen-hollow', name: 'Ashen Hollow', kind: 'village', region: 'Ashen Plains', levelRange: '1-3', description: 'A smoke-bent village of thatched roofs and river reeds.' },
    { id: 'brambleford', name: 'Brambleford', kind: 'town', region: 'Ashen Plains', levelRange: '2-5', description: 'A market town famed for cider and iron nails.' },
    { id: 'stonewatch', name: 'Stonewatch', kind: 'city', region: 'Ashen Plains', levelRange: '4-7', description: 'A fortified city that guards the eastern passes.' },
    { id: 'reedmere', name: 'Reedmere', kind: 'village', region: 'Mire March', levelRange: '4-6', description: 'A marsh village built on stilts above black water.' },
    { id: 'gloomharbor', name: 'Gloom Harbor', kind: 'town', region: 'Mire March', levelRange: '5-8', description: 'A foggy harbor where lanterns glow through the mist.' },
    { id: 'embergate', name: 'Embergate', kind: 'city', region: 'Mire March', levelRange: '6-9', description: 'A brass-walled city of forges and watchtowers.' },
    { id: 'glasshollow', name: 'Glasshollow', kind: 'village', region: 'Stormreach', levelRange: '7-9', description: 'A cliff village that trades in crystal and stormglass.' },
    { id: 'stormspine', name: 'Stormspine', kind: 'town', region: 'Stormreach', levelRange: '8-9', description: 'A wind-carved town perched above the thunder sea.' },
    { id: 'deepcairn', name: 'Deepcairn', kind: 'underground-zone', region: 'Stormreach', levelRange: '7-9', description: 'An ancient burial complex veined with crystal and old runes.' },
    { id: 'sunkenroot', name: 'Sunken Root', kind: 'underground-zone', region: 'Ashen Plains', levelRange: '3-6', description: 'A root-woven cavern where the dead whisper under the stones.' },
];

export const getWorldLocations = (): WorldLocationInfo[] => WORLD_LOCATIONS.slice();

export const getWorldLocationById = (id: string): WorldLocationInfo | undefined => {
    return WORLD_LOCATIONS.find((location) => location.id === id);
};
