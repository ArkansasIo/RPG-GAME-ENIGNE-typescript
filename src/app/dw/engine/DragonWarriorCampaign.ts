import { DwGame } from '@/app/dw/DwGame';
import { CampaignContentModule } from '@/app/dw/engine/ContentRegistry';
import { CampaignDefinition } from '@/app/dw/engine/CampaignRegistry';
import { Brecconary } from '@/app/dw/mapLogic/brecconary';
import { ErdricksCave1 } from '@/app/dw/mapLogic/erdricksCave1';
import { ErdricksCave2 } from '@/app/dw/mapLogic/erdricksCave2';
import { Garinham } from '@/app/dw/mapLogic/garinham';
import { Kol } from '@/app/dw/mapLogic/kol';
import { Overworld } from '@/app/dw/mapLogic/overworld';
import { TantegelCastle } from '@/app/dw/mapLogic/tantegelCastle';

export const createDragonWarriorCampaignModule = (): CampaignContentModule => {
    return new CampaignContentModule('dragon-warrior', 'Dragon Warrior Campaign')
        .withMapLogic('Brecconary', new Brecconary())
        .withMapLogic('erdricksCave1', new ErdricksCave1())
        .withMapLogic('erdricksCave2', new ErdricksCave2())
        .withMapLogic('Garinham', new Garinham())
        .withMapLogic('Kol', new Kol())
        .withMapLogic('Overworld', new Overworld())
        .withMapLogic('TantegelCastle', new TantegelCastle());
};

export const createDragonWarriorCampaignDefinition = (): CampaignDefinition => ({
    id: 'dragon-warrior',
    title: 'Dragon Warrior',
    description: 'A Dragon Warrior-inspired campaign with towns, dungeons, and classic turn-based combat.',
    register(game: DwGame): void {
        createDragonWarriorCampaignModule().register(game);
    },
});

export const registerDragonWarriorCampaign = (game: DwGame): void => {
    createDragonWarriorCampaignDefinition().register(game);
};
