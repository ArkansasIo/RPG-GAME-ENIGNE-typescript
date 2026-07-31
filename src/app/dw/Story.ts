export interface StoryChapter {
    title: string;
    levelRange: string;
    summary: string;
}

export interface StoryAct {
    title: string;
    chapters: StoryChapter[];
}

export const getStoryActs = (): StoryAct[] => [
    {
        title: 'The Ashen Dawn',
        chapters: [
            { title: 'The Hollow Village', levelRange: '1-20', summary: 'A small village wakes to a strange ashfall.' },
            { title: 'The Silent Trail', levelRange: '21-40', summary: 'The road to the ruins is haunted by strange beasts.' },
        ],
    },
    {
        title: 'The Ember Road',
        chapters: [
            { title: 'The Cinder Pass', levelRange: '41-80', summary: 'A dangerous mountain pass opens into volcanic ruins.' },
        ],
    },
    {
        title: 'The Crystal Sea',
        chapters: [
            { title: 'The Sunken Gate', levelRange: '81-200', summary: 'Ancient gates rise from the flooded ruins.' },
        ],
    },
    {
        title: 'The Storm Crown',
        chapters: [
            { title: 'The Skyforge', levelRange: '201-400', summary: 'A storm-wracked fortress guards the old kingship.' },
        ],
    },
    {
        title: 'The Last Ember',
        chapters: [
            { title: 'The Last Ember', levelRange: '601-720', summary: 'The final raid against the old darkness begins.' },
        ],
    },
];
