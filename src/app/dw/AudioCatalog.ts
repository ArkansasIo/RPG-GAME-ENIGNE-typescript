export interface AudioCue {
    id: string;
    kind: 'music' | 'sound';
    label: string;
    file: string;
    description: string;
}

export const createAudioCatalog = (): AudioCue[] => [
    { id: 'music-forest-echo', kind: 'music', label: 'Forest Echo', file: 'forest_echo.ogg', description: 'Gentle woodland melody.' },
    { id: 'music-castle-dawn', kind: 'music', label: 'Castle Dawn', file: 'castle_dawn.ogg', description: 'Bright morning court music.' },
    { id: 'music-ember-ruins', kind: 'music', label: 'Ember Ruins', file: 'ember_ruins.ogg', description: 'Haunting ruin ambiance.' },
    { id: 'music-tide-keep', kind: 'music', label: 'Tide Keep', file: 'tide_keep.ogg', description: 'Rolling coastal theme.' },
    { id: 'music-volcano-heart', kind: 'music', label: 'Volcano Heart', file: 'volcano_heart.ogg', description: 'Deep volcanic pulse.' },
    { id: 'music-sky-archive', kind: 'music', label: 'Sky Archive', file: 'sky_archive.ogg', description: 'Celestial and airy.' },
    { id: 'music-moonlit-lake', kind: 'music', label: 'Moonlit Lake', file: 'moonlit_lake.ogg', description: 'Quiet night ambience.' },
    { id: 'music-wind-fortress', kind: 'music', label: 'Wind Fortress', file: 'wind_fortress.ogg', description: 'Windy stronghold theme.' },
    { id: 'music-cinder-market', kind: 'music', label: 'Cinder Market', file: 'cinder_market.ogg', description: 'Busy bazaar rhythm.' },
    { id: 'music-ruin-bells', kind: 'music', label: 'Ruin Bells', file: 'ruin_bells.ogg', description: 'Eerie bell led melody.' },
    { id: 'sound-coin-drop', kind: 'sound', label: 'Coin Drop', file: 'coin_drop.wav', description: 'Small treasure pickup.' },
    { id: 'sound-sword-swing', kind: 'sound', label: 'Sword Swing', file: 'sword_swing.wav', description: 'Hero weapon arc.' },
    { id: 'sound-shield-block', kind: 'sound', label: 'Shield Block', file: 'shield_block.wav', description: 'Parry impact.' },
    { id: 'sound-heal-chime', kind: 'sound', label: 'Heal Chime', file: 'heal_chime.wav', description: 'Restoration effect.' },
    { id: 'sound-fire-burst', kind: 'sound', label: 'Fire Burst', file: 'fire_burst.wav', description: 'Burst of flame.' },
    { id: 'sound-ice-shard', kind: 'sound', label: 'Ice Shard', file: 'ice_shard.wav', description: 'Cold spell impact.' },
    { id: 'sound-thunder-hit', kind: 'sound', label: 'Thunder Hit', file: 'thunder_hit.wav', description: 'Electric strike.' },
    { id: 'sound-bird-call', kind: 'sound', label: 'Bird Call', file: 'bird_call.wav', description: 'Ambient forest call.' },
    { id: 'sound-door-open', kind: 'sound', label: 'Door Open', file: 'door_open.wav', description: 'Heavy stone door.' },
    { id: 'sound-chest-unlock', kind: 'sound', label: 'Chest Unlock', file: 'chest_unlock.wav', description: 'Treasure chest release.' },
    { id: 'sound-monster-roar', kind: 'sound', label: 'Monster Roar', file: 'monster_roar.wav', description: 'Beastly battle cry.' },
    { id: 'sound-magic-echo', kind: 'sound', label: 'Magic Echo', file: 'magic_echo.wav', description: 'Arcane resonance.' },
    { id: 'sound-evil-laugh', kind: 'sound', label: 'Evil Laugh', file: 'evil_laugh.wav', description: 'Sinister villain cue.' },
    { id: 'sound-wind-whistle', kind: 'sound', label: 'Wind Whistle', file: 'wind_whistle.wav', description: 'Open-air whistle.' },
    { id: 'sound-water-drops', kind: 'sound', label: 'Water Drops', file: 'water_drops.wav', description: 'Slow cave drip.' },
    { id: 'sound-bell-toll', kind: 'sound', label: 'Bell Toll', file: 'bell_toll.wav', description: 'Ceremonial bell.' },
    { id: 'sound-campfire-pop', kind: 'sound', label: 'Campfire Pop', file: 'campfire_pop.wav', description: 'Warm fire ambience.' },
    { id: 'sound-portal-hum', kind: 'sound', label: 'Portal Hum', file: 'portal_hum.wav', description: 'Warping magic hum.' },
    { id: 'sound-altar-glow', kind: 'sound', label: 'Altar Glow', file: 'altar_glow.wav', description: 'Sacred light pulse.' },
    { id: 'sound-battle-victory', kind: 'sound', label: 'Battle Victory', file: 'battle_victory.wav', description: 'Victory fanfare.' },
];

export const getAudioCatalog = (): AudioCue[] => createAudioCatalog();
export const getMusicCatalog = (): AudioCue[] => createAudioCatalog().filter((cue) => cue.kind === 'music');
export const getSoundCatalog = (): AudioCue[] => createAudioCatalog().filter((cue) => cue.kind === 'sound');
