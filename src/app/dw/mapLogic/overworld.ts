import { DwGame } from '../DwGame';
import { AbstractMapLogic, NpcTextGeneratorMap } from './AbstractMapLogic';
import { NpcText } from './MapLogic';

interface OverworldRegion {
    id: string;
    name: string;
    description: string;
    discoveryBonus: string;
}

interface OverworldEvent {
    id: string;
    title: string;
    description: string;
    trigger: string;
}

const regions: OverworldRegion[] = [
    { id: 'tantegel', name: 'Tantegel Reach', description: 'An old frontier of roads and fields.', discoveryBonus: 'Gain +1 morale.' },
    { id: 'brecconary', name: 'Brecconary Hills', description: 'Rolling hills with hidden paths and herbs.', discoveryBonus: 'Gain +2 herb drops.' },
    { id: 'garinham', name: 'Garinham Meadow', description: 'Meadows rich with travelers and rumors.', discoveryBonus: 'Gain +1 gold from encounters.' },
    { id: 'kol', name: 'Kol Fields', description: 'Wide-open grasslands with distant watchfires.', discoveryBonus: 'Gain +1 exploration progress.' },
    { id: 'caves', name: 'Cave Approaches', description: 'Dangers lurk where the path descends.', discoveryBonus: 'Gain +1 dungeon clue.' },
];

const events: OverworldEvent[] = [
    { id: 'storm', title: 'Stormfront', description: 'A passing storm reveals hidden ruins.', trigger: 'Weather' },
    { id: 'festival', title: 'Harvest Festival', description: 'Villagers gather and share news of the roads.', trigger: 'Time' },
    { id: 'raid', title: 'Border Raid', description: 'A sudden skirmish sends travelers fleeing.', trigger: 'Threat' },
    { id: 'mist', title: 'Mistborn Paths', description: 'A veil of mist reveals rare herbs and old tracks.', trigger: 'Fog' },
];

const talks: NpcTextGeneratorMap = {
    npc: (game: DwGame): NpcText => {
        const region = regions[Math.floor(game.playTime % regions.length)];
        return [
            'The roads are quiet tonight...',
            `The ${region.name} is alive with rumor and danger.`,
            `Travelers say ${region.discoveryBonus}.`,
        ];
    },
    'Village Scout': (game: DwGame): NpcText => {
        const event = events[Math.floor((game.playTime / 1000) % events.length)];
        return [
            'I have watched the roads all day.',
            `Today’s sign is ${event.title}.`,
            event.description,
        ];
    },
    Gatekeeper: (game: DwGame): NpcText => {
        return [
            'The gate stays open only for the prepared.',
            'You may enter the wilds if you carry courage and supplies.',
        ];
    },
};

/**
 * Logic for the overworld.
 */
export class Overworld extends AbstractMapLogic {

    constructor() {
        super(talks);
    }

    override init() {
        // Hook for future map initialization.
    }

    getRegions(): OverworldRegion[] {
        return regions;
    }

    getEvents(): OverworldEvent[] {
        return events;
    }

    getRegionById(id: string): OverworldRegion | undefined {
        return regions.find((region) => region.id === id);
    }

    discoverRegion(game: DwGame, id: string): string | undefined {
        const region = this.getRegionById(id);
        if (!region) {
            return undefined;
        }

        const message = `Discovered ${region.name}: ${region.description}`;
        game.setStatusMessage(message);
        return message;
    }

    triggerEvent(game: DwGame, id: string): string | undefined {
        const event = this.getEvents().find((entry) => entry.id === id);
        if (!event) {
            return undefined;
        }

        const message = `${event.title}: ${event.description}`;
        game.setStatusMessage(message);
        return message;
    }
}