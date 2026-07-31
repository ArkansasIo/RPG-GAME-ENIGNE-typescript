export interface CharacterRace {
    id: string;
    name: string;
    description: string;
    statBonus: Record<string, number>;
}

export interface CharacterClass {
    id: string;
    name: string;
    description: string;
    statBonus: Record<string, number>;
}

export const HERO_RACES: CharacterRace[] = [
    { id: 'human', name: 'Human', description: 'Balanced and versatile.', statBonus: { strength: 1, agility: 1, vitality: 1 } },
    { id: 'elf', name: 'Elf', description: 'Swift and precise.', statBonus: { agility: 2, vitality: 1 } },
    { id: 'dwarf', name: 'Dwarf', description: 'Sturdy and resilient.', statBonus: { strength: 2, vitality: 1 } },
    { id: 'halfling', name: 'Halfling', description: 'Quick and evasive.', statBonus: { agility: 2, strength: 1 } },
    { id: 'orc', name: 'Orc', description: 'Brutal and strong.', statBonus: { strength: 3, vitality: 1 } },
    { id: 'troll', name: 'Troll', description: 'Hard to kill.', statBonus: { vitality: 3, strength: 1 } },
    { id: 'gnome', name: 'Gnome', description: 'Clever and magical.', statBonus: { agility: 1, vitality: 1, wisdom: 2 } },
    { id: 'dragonborn', name: 'Dragonborn', description: 'Fierce with natural endurance.', statBonus: { strength: 2, vitality: 2 } },
    { id: 'tiefling', name: 'Tiefling', description: 'Cunning and mysterious.', statBonus: { agility: 1, vitality: 1, luck: 2 } },
];

export const HERO_CLASSES: CharacterClass[] = [
    { id: 'warrior', name: 'Warrior', description: 'A sturdy frontline fighter.', statBonus: { strength: 2, vitality: 1 } },
    { id: 'mage', name: 'Mage', description: 'A master of spells and foresight.', statBonus: { agility: 1, wisdom: 2 } },
    { id: 'rogue', name: 'Rogue', description: 'A swift scout and opportunist.', statBonus: { agility: 2, luck: 1 } },
    { id: 'cleric', name: 'Cleric', description: 'A healer and protector.', statBonus: { vitality: 2, wisdom: 1 } },
    { id: 'ranger', name: 'Ranger', description: 'A hunter of beasts and ruins.', statBonus: { agility: 2, strength: 1 } },
    { id: 'paladin', name: 'Paladin', description: 'A disciplined knight of honor.', statBonus: { strength: 2, vitality: 1 } },
    { id: 'bard', name: 'Bard', description: 'A charismatic adventurer.', statBonus: { agility: 1, luck: 2 } },
    { id: 'berserker', name: 'Berserker', description: 'A reckless powerhouse.', statBonus: { strength: 3, vitality: 1 } },
    { id: 'alchemist', name: 'Alchemist', description: 'A clever inventor and brewer.', statBonus: { agility: 1, wisdom: 1, luck: 1 } },
    { id: 'monk', name: 'Monk', description: 'A disciplined martial artist.', statBonus: { agility: 2, vitality: 1 } },
    { id: 'necromancer', name: 'Necromancer', description: 'A scholar of death and decay.', statBonus: { wisdom: 2, vitality: 1 } },
    { id: 'summoner', name: 'Summoner', description: 'A commander of spirits.', statBonus: { wisdom: 2, agility: 1 } },
    { id: 'knight', name: 'Knight', description: 'A loyal defender of the realm.', statBonus: { strength: 2, vitality: 2 } },
    { id: 'assassin', name: 'Assassin', description: 'A lethal infiltrator.', statBonus: { agility: 3, luck: 1 } },
    { id: 'shaman', name: 'Shaman', description: 'A keeper of ancient rites.', statBonus: { wisdom: 2, vitality: 1 } },
    { id: 'engineer', name: 'Engineer', description: 'A tactical inventor.', statBonus: { strength: 1, agility: 1, wisdom: 1 } },
    { id: 'druid', name: 'Druid', description: 'A guardian of nature.', statBonus: { vitality: 2, wisdom: 1 } },
    { id: 'champion', name: 'Champion', description: 'A legendary hero of the age.', statBonus: { strength: 2, agility: 1, vitality: 1 } },
];

export const getRaceById = (id: string): CharacterRace | undefined => HERO_RACES.find((race) => race.id === id);
export const getClassById = (id: string): CharacterClass | undefined => HERO_CLASSES.find((characterClass) => characterClass.id === id);
