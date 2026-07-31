export interface StoryChapter {
    title: string;
    levelRange: string;
    summary: string;
}

export interface StoryAct {
    title: string;
    chapters: StoryChapter[];
}

interface DialogueCatalog {
    [key: string]: string[];
}

const npcDialogueCatalog: DialogueCatalog = {
    king: [
        'I am King Lorik, keeper of Tantegel, and I have watched the land sink into shadow.',
        'The bells of warning sound each dawn, and still the roads run red with fear.',
        'Princess Gwaelin was taken by the forces of the Dragonlord, and I beg thee to bring her home.',
    ],
    innkeeper: [
        'Rest here, traveler, and let thy wounds mend before the road grows harsher.',
        'The inn keeps warm hearths for those who have walked too long through the dark.',
        'Many a hero has slept beneath these rafters and risen at dawn with new courage.',
    ],
    merchant: [
        'I trade in steel, leather, and hope, for a weapon is only as strong as the hand that wields it.',
        'Take care when choosing thy gear, for every blade and shield has its own burden.',
        'The road ahead rewards preparation as much as bravery.',
    ],
    guard: [
        'The gates stand open only to the prepared, and the prepared do not walk alone.',
        'Heed the warnings of the old folk, for they have seen the dark come and go.',
        'If thou art bound for the caves, carry a torch and a steady heart.',
    ],
    villager: [
        'The village still hums with rumor, though the evening air has grown cold.',
        'Small fires are lit to keep the night from creeping too close to our doors.',
        'We speak of old heroes and new dangers, for the world has become restless.',
    ],
    priest: [
        'The old prayers still answer when spoken in truth and with a clear conscience.',
        'Some charms are stronger than steel, but only when the heart is willing.',
        'Keep faith, traveler, and the light may yet find thee.',
    ],
    scholar: [
        'The runes on the stone are old, but their warnings remain sharp as ever.',
        'To understand the past is to walk more safely into the future.',
        'Every tablet, relic, and map bears a memory that cannot be ignored.',
    ],
};

const monsterDialogueCatalog: DialogueCatalog = {
    Slime: [
        'A slime bubbles and oozes toward thee, hungry for the scent of living flesh.',
        'The slime slaps the ground, a wet and hungry thing that knows no mercy.',
        'It gurgles faintly, as though the dungeon itself is laughing at thy courage.',
    ],
    Ghost: [
        'The ghost drifts through the air with mournful cries and a cold, unnatural grace.',
        'It whispers of old sorrows and of graves long forgotten.',
        'Each step it takes leaves the air colder than winter itself.',
    ],
    Dragon: [
        'The dragon unfurls its wings and fills the cavern with fire and fury.',
        'Its ancient eyes watch thee as though it remembers the first age of the world.',
        'The beast speaks in a voice like thunder rolling over a ruined kingdom.',
    ],
    Goblin: [
        'The goblin snarls and brandishes a rusted blade with crude delight.',
        'It cackles at the idea of a hero stumbling into its trap.',
        'A small creature, but dangerous when backed by hunger and spite.',
    ],
    Skeleton: [
        'The skeleton rattles as it rises from the earth, driven by old malice.',
        'Its bones creak like a dying gate in a storm.',
        'The dead have little patience for the living, and this one is no exception.',
    ],
};

export const getStoryActs = (): StoryAct[] => [
    {
        title: 'The Ashen Dawn',
        chapters: [
            { title: 'The Hollow Village', levelRange: '1-20', summary: 'A small village wakes to a strange ashfall and sends its bravest into the wilderness.' },
            { title: 'The Silent Trail', levelRange: '21-40', summary: 'The road to the ruins is haunted by strange beasts and old omens.' },
        ],
    },
    {
        title: 'The Ember Road',
        chapters: [
            { title: 'The Cinder Pass', levelRange: '41-80', summary: 'A dangerous mountain pass opens into volcanic ruins and ancient fire rites.' },
        ],
    },
    {
        title: 'The Crystal Sea',
        chapters: [
            { title: 'The Sunken Gate', levelRange: '81-200', summary: 'Ancient gates rise from the flooded ruins and reveal the history of the realm.' },
        ],
    },
    {
        title: 'The Storm Crown',
        chapters: [
            { title: 'The Skyforge', levelRange: '201-400', summary: 'A storm-wracked fortress guards the old kingship and the last hope of the crown.' },
        ],
    },
    {
        title: 'The Last Ember',
        chapters: [
            { title: 'The Last Ember', levelRange: '601-720', summary: 'The final raid against the old darkness begins as the kingdom gathers its last strength.' },
        ],
    },
];

export const getPrologueText = (): string[] => [
    'The kingdom of Alefgard wakes beneath a pall of ash and rumor.',
    'Villagers whisper that the Dragonlord has stolen the peace of the land and carried it into the dark.',
    'Only Erdr, a wandering champion of courage and purpose, can walk the broken roads and restore the light.',
    'With a sword in hand, a torch at the ready, and a promise in thy heart, the adventure begins.',
];

export const getNpcDialogue = (role: string): string[] => {
    const key = role.toLowerCase();
    if (key === 'king') {
        return npcDialogueCatalog.king;
    }
    if (key === 'innkeeper') {
        return npcDialogueCatalog.innkeeper;
    }
    if (key === 'merchant') {
        return npcDialogueCatalog.merchant;
    }
    if (key === 'guard') {
        return npcDialogueCatalog.guard;
    }
    if (key === 'villager') {
        return npcDialogueCatalog.villager;
    }
    if (key === 'priest') {
        return npcDialogueCatalog.priest;
    }
    if (key === 'scholar') {
        return npcDialogueCatalog.scholar;
    }
    return npcDialogueCatalog.villager;
};

export const getMonsterDialogue = (name: string): string[] => {
    return monsterDialogueCatalog[name] ?? [
        `The ${name} advances, a living reminder that the wilderness is not kind.`,
        'Its eyes are bright with hunger and old malice.',
    ];
};
