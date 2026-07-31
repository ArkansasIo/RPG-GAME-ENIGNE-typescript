export interface MenuOption {
    id: string;
    label: string;
    description: string;
}

export interface MenuSettingsState {
    sound: boolean;
    music: boolean;
    messageSpeed: 'slow' | 'normal' | 'fast';
    difficulty: 'easy' | 'normal' | 'hard';
}

export const createDefaultSettings = (): MenuSettingsState => ({
    sound: true,
    music: true,
    messageSpeed: 'normal',
    difficulty: 'normal',
});

export const getMainMenuOptions = (): MenuOption[] => [
    { id: 'continue', label: 'CONTINUE A QUEST', description: 'Resume your current adventure.' },
    { id: 'options', label: 'OPTIONS', description: 'Adjust sound, music, and UI settings.' },
    { id: 'begin', label: 'BEGIN A NEW QUEST', description: 'Start a new adventure.' },
    { id: 'copy', label: 'COPY A QUEST', description: 'Duplicate an existing save slot.' },
    { id: 'erase', label: 'ERASE A QUEST', description: 'Delete an old save slot.' },
];

export const getOptionsMenuOptions = (): MenuOption[] => [
    { id: 'sound', label: 'SOUND', description: 'Toggle sound effects.' },
    { id: 'music', label: 'MUSIC', description: 'Toggle music playback.' },
    { id: 'speed', label: 'MESSAGE SPEED', description: 'Choose how fast dialogue advances.' },
    { id: 'difficulty', label: 'DIFFICULTY', description: 'Adjust combat challenge.' },
    { id: 'back', label: 'BACK', description: 'Return to the main menu.' },
];

export const getMessageSpeedOptions = (): MenuOption[] => [
    { id: 'slow', label: 'SLOW', description: 'Dialogue advances slowly.' },
    { id: 'normal', label: 'NORMAL', description: 'Balanced pacing.' },
    { id: 'fast', label: 'FAST', description: 'Dialogue advances quickly.' },
];

export const getDifficultyOptions = (): MenuOption[] => [
    { id: 'easy', label: 'EASY', description: 'Gentler encounters.' },
    { id: 'normal', label: 'NORMAL', description: 'Balanced challenge.' },
    { id: 'hard', label: 'HARD', description: 'Fierce and punishing.' },
];
