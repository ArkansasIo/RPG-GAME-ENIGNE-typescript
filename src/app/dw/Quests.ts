export interface Quest {
    id: string;
    title: string;
    type: 'main' | 'side';
    region: string;
    level: number;
    summary: string;
    reward: string;
}

export const createQuestCatalog = (): Quest[] => [
    { id: 'q1', title: 'The Ashen Bell', type: 'main', region: 'Brecconary', level: 1, summary: 'Ring the bell in the village to calm the spirits.', reward: 'Healing Herb and 100 gold' },
    { id: 'q2', title: 'The Missing Smith', type: 'main', region: 'Garinham', level: 4, summary: 'Find the smith who vanished after the night raid.', reward: 'Iron Sword' },
    { id: 'q3', title: 'The Hollow Orchard', type: 'side', region: 'Brecconary', level: 5, summary: 'Clear the cursed trees from the orchard.', reward: 'Apple Pie' },
    { id: 'q4', title: 'Lost Lanterns', type: 'side', region: 'Kol', level: 6, summary: 'Recover the village lanterns stolen by goblins.', reward: 'Lantern Charm' },
    { id: 'q5', title: 'A New Dawn', type: 'main', region: 'Tantegel', level: 8, summary: 'Rekindle the beacon tower to guide the caravan.', reward: 'Town Access' },
    { id: 'q6', title: 'The Whispering Well', type: 'side', region: 'Brecconary', level: 9, summary: 'Investigate the well that echoes with voices.', reward: 'Water Rune' },
    { id: 'q7', title: 'Dusty Relics', type: 'side', region: 'Garinham', level: 10, summary: 'Retrieve relic fragments buried in the desert.', reward: 'Ancient Coin' },
    { id: 'q8', title: 'The Red Path', type: 'main', region: 'Overworld', level: 12, summary: 'Open the sealed road by defeating the red patrol.', reward: 'Map Fragment' },
    { id: 'q9', title: 'Moonlit Moss', type: 'side', region: 'Overworld', level: 13, summary: 'Gather moonlit moss for the apothecary.', reward: 'Moon Salve' },
    { id: 'q10', title: 'The Stone Tablet', type: 'main', region: 'Erdricks Cave', level: 15, summary: 'Translate the tablet before the cave collapses.', reward: 'Rune Key' },
    { id: 'q11', title: 'The Grimoire Thief', type: 'side', region: 'Kol', level: 16, summary: 'Catch the thief before the spellbook is sold.', reward: 'Spellbook Page' },
    { id: 'q12', title: 'The Sable River', type: 'main', region: 'Overworld', level: 18, summary: 'Cross the rising river and reach the shrine.', reward: 'River Token' },
    { id: 'q13', title: 'Bandit Trouble', type: 'side', region: 'Garinham', level: 19, summary: 'Drive out bandits harassing the caravans.', reward: 'Leather Boots' },
    { id: 'q14', title: 'Echoes in the Cave', type: 'main', region: 'Erdricks Cave', level: 20, summary: 'Follow the echoing voice deeper into the cavern.', reward: 'Cave Compass' },
    { id: 'q15', title: 'A Friend in Need', type: 'side', region: 'Brecconary', level: 21, summary: 'Escort the stranded traveler to safety.', reward: 'Travel Cloak' },
    { id: 'q16', title: 'The Sunken Gate', type: 'main', region: 'Coastal Ruins', level: 24, summary: 'Restore the gate before the tide consumes the ruins.', reward: 'Tide Pearl' },
    { id: 'q17', title: 'Cinder Seeds', type: 'side', region: 'Volcanic Pass', level: 25, summary: 'Gather rare seeds from the lava fields.', reward: 'Flame Seed' },
    { id: 'q18', title: 'The Silent Chapel', type: 'main', region: 'Overworld', level: 26, summary: 'Free the chapel from the shadow curse.', reward: 'Holy Candle' },
    { id: 'q19', title: 'The Hungry Wolves', type: 'side', region: 'Forest Edge', level: 27, summary: 'Drive off the wolves stalking the logging camp.', reward: 'Wolf Pelt' },
    { id: 'q20', title: 'The Fallen Banner', type: 'main', region: 'Tantegel', level: 30, summary: 'Recover the fallen banner from the battlefield.', reward: 'Banner Sigil' },
    { id: 'q21', title: 'Ritual of Ember', type: 'side', region: 'Volcanic Pass', level: 32, summary: 'Stop the cult from feeding the volcano.', reward: 'Ember Shard' },
    { id: 'q22', title: 'The Iron Chapel', type: 'main', region: 'Garinham', level: 35, summary: 'Open the chapel vault and retrieve the relic.', reward: 'Iron Key' },
    { id: 'q23', title: 'The Stolen Maps', type: 'side', region: 'Kol', level: 36, summary: 'Recover the stolen maps from smugglers.', reward: 'Road Atlas' },
    { id: 'q24', title: 'A Crown of Stars', type: 'main', region: 'Overworld', level: 38, summary: 'Retrieve the celestial crown from the fallen watchtower.', reward: 'Star Crown' },
    { id: 'q25', title: 'The Green Riddle', type: 'side', region: 'Forest Edge', level: 40, summary: 'Solve the riddle of the ancient green shrine.', reward: 'Verdant Charm' },
    { id: 'q26', title: 'The Hollow Throne', type: 'main', region: 'Tantegel', level: 42, summary: 'Ascend the old throne room and face the usurper.', reward: 'Royal Seal' },
    { id: 'q27', title: 'River of Glass', type: 'side', region: 'Coastal Ruins', level: 44, summary: 'Collect the glass fragments before the tide returns.', reward: 'Glass Shard' },
    { id: 'q28', title: 'The Black Orchard', type: 'main', region: 'Overworld', level: 46, summary: 'Cleansing the blighted orchard lifts the curse on the field.', reward: 'Black Apple' },
    { id: 'q29', title: 'Wolves at the Gate', type: 'side', region: 'Brecconary', level: 48, summary: 'Defend the village from the wolf pack at dusk.', reward: 'Hunter Badge' },
    { id: 'q30', title: 'The Last Beacon', type: 'main', region: 'Volcanic Pass', level: 50, summary: 'Relight the beacon to guide the survivors home.', reward: 'Beacon Flame' },
    { id: 'q31', title: 'The Moth Priest', type: 'side', region: 'Forest Edge', level: 53, summary: 'Find the priest driven mad by the moth swarm.', reward: 'Moth Cloak' },
    { id: 'q32', title: 'The Forgotten Keep', type: 'main', region: 'Overworld', level: 55, summary: 'Reclaim the keep from the undead garrison.', reward: 'Keep Key' },
    { id: 'q33', title: 'The Clockwork Cart', type: 'side', region: 'Kol', level: 58, summary: 'Repair the broken clockwork cart before it rolls away.', reward: 'Clockwork Cog' },
    { id: 'q34', title: 'Fury of the North', type: 'main', region: 'Garinham', level: 60, summary: 'Break the northern siege by defeating the warlord.', reward: 'North Banner' },
    { id: 'q35', title: 'The Moonwell Prophecy', type: 'side', region: 'Overworld', level: 62, summary: 'Interpret the prophecy hidden in the moonwell.', reward: 'Moonwell Charm' },
    { id: 'q36', title: 'The Dragon Stair', type: 'main', region: 'Volcanic Pass', level: 65, summary: 'Climb the dragon stair and claim the relic.', reward: 'Dragon Scale' },
    { id: 'q37', title: 'A Cart Full of Grain', type: 'side', region: 'Brecconary', level: 67, summary: 'Protect the grain cart from raiders.', reward: 'Grain Sack' },
    { id: 'q38', title: 'The Shattered Crown', type: 'main', region: 'Tantegel', level: 70, summary: 'Recover the crown shards scattered through the capital.', reward: 'Crown Fragment' },
    { id: 'q39', title: 'The Bramble King', type: 'side', region: 'Forest Edge', level: 72, summary: 'Defeat the bramble king before he consumes the road.', reward: 'Bramble Thorn' },
    { id: 'q40', title: 'The Deep Gate', type: 'main', region: 'Erdricks Cave', level: 75, summary: 'Open the deep gate to release the trapped spirits.', reward: 'Spirit Key' },
    { id: 'q41', title: 'The Fading Ink', type: 'side', region: 'Kol', level: 78, summary: 'Recover the fading ink from the scholar’s ruined study.', reward: 'Ink of Memory' },
    { id: 'q42', title: 'The Blind Oracle', type: 'main', region: 'Overworld', level: 80, summary: 'Guide the blind oracle through the haunted marsh.', reward: 'Oracle Lens' },
    { id: 'q43', title: 'The Red Harvest', type: 'side', region: 'Garinham', level: 82, summary: 'Bring back the harvest before the plague spreads.', reward: 'Red Grain' },
    { id: 'q44', title: 'The Sunken Vault', type: 'main', region: 'Coastal Ruins', level: 85, summary: 'Break into the sunken vault beneath the sea cliffs.', reward: 'Vault Seal' },
    { id: 'q45', title: 'The Lantern Keeper', type: 'side', region: 'Brecconary', level: 88, summary: 'Find the keeper who lost the sacred lantern.', reward: 'Sacred Lantern' },
    { id: 'q46', title: 'The Iron Crown', type: 'main', region: 'Tantegel', level: 90, summary: 'Claim the ancient iron crown from the citadel.', reward: 'Iron Crown' },
    { id: 'q47', title: 'The Frozen Echo', type: 'side', region: 'Volcanic Pass', level: 92, summary: 'Listen to the frozen echoes in the cave of wind.', reward: 'Frost Rune' },
    { id: 'q48', title: 'The Last Parade', type: 'main', region: 'Overworld', level: 95, summary: 'Bring the last parade to the ruined city square.', reward: 'Parade Banner' },
    { id: 'q49', title: 'The Dusk Orchard', type: 'side', region: 'Forest Edge', level: 98, summary: 'Gather fruit from the dusk orchard before sunset.', reward: 'Dusk Fruit' },
    { id: 'q50', title: 'The Final Hearth', type: 'main', region: 'Tantegel', level: 100, summary: 'Restore the final hearth to end the age of ash.', reward: 'Flame of Hope' },
];

export const getQuests = (): Quest[] => createQuestCatalog();
export const getMainQuests = (): Quest[] => createQuestCatalog().filter((quest) => quest.type === 'main');
export const getSideQuests = (): Quest[] => createQuestCatalog().filter((quest) => quest.type === 'side');
