import { HERO_CLASSES, HERO_RACES, getClassById, getRaceById } from './CharacterClasses';
import { PartyMember } from './PartyMember';

export interface CharacterCreationState {
    name: string;
    raceId: string;
    classId: string;
}

export const createDefaultCharacterCreationState = (): CharacterCreationState => ({
    name: 'Erdr',
    raceId: 'human',
    classId: 'warrior',
});

export const getDisplayHeroName = (name?: string): string => {
    if (name === 'Erdr') {
        return 'Erdrick';
    }
    return name ?? 'Erdrick';
};

export const getCharacterCreationSummary = (state: CharacterCreationState): string => {
    const race = getRaceById(state.raceId);
    const characterClass = getClassById(state.classId);
    return `${state.name} the ${race?.name ?? 'Hero'} ${characterClass?.name ?? 'Adventurer'}`;
};

export const getRaceOptions = () => HERO_RACES.map((race) => ({ id: race.id, label: race.name, description: race.description }));
export const getClassOptions = () => HERO_CLASSES.map((characterClass) => ({ id: characterClass.id, label: characterClass.name, description: characterClass.description }));

export const applyCharacterBonuses = (member: PartyMember, raceId: string, classId: string): void => {
    const race = getRaceById(raceId);
    const characterClass = getClassById(classId);

    for (const [key, bonus] of Object.entries(race?.statBonus ?? {})) {
        const statKey = key as keyof Pick<PartyMember, 'strength' | 'agility'>;
        if (statKey === 'strength') {
            member.strength += bonus;
        } else if (statKey === 'agility') {
            member.agility += bonus;
        }
    }

    for (const [key, bonus] of Object.entries(characterClass?.statBonus ?? {})) {
        const statKey = key as keyof Pick<PartyMember, 'strength' | 'agility'>;
        if (statKey === 'strength') {
            member.strength += bonus;
        } else if (statKey === 'agility') {
            member.agility += bonus;
        }
    }

    member.maxHp += 3;
    member.hp = member.maxHp;
    member.maxMp += 2;
    member.mp = member.maxMp;
};
