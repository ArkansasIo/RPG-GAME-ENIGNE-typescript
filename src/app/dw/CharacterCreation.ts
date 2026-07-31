import { HERO_CLASSES, HERO_RACES, getClassById, getRaceById } from './CharacterClasses';

export interface CharacterCreationState {
    name: string;
    raceId: string;
    classId: string;
}

export const createDefaultCharacterCreationState = (): CharacterCreationState => ({
    name: 'Erdrick',
    raceId: 'human',
    classId: 'warrior',
});

export const getCharacterCreationSummary = (state: CharacterCreationState): string => {
    const race = getRaceById(state.raceId);
    const characterClass = getClassById(state.classId);
    return `${state.name} the ${race?.name ?? 'Hero'} ${characterClass?.name ?? 'Adventurer'}`;
};

export const getRaceOptions = () => HERO_RACES.map((race) => ({ id: race.id, label: race.name, description: race.description }));
export const getClassOptions = () => HERO_CLASSES.map((characterClass) => ({ id: characterClass.id, label: characterClass.name, description: characterClass.description }));
