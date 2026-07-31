import { DwGame } from '@/app/dw/DwGame';

export interface CampaignDefinition {
    id: string;
    title: string;
    description: string;
    register(game: DwGame): void;
}

export class CampaignRegistry {
    private readonly campaigns = new Map<string, CampaignDefinition>();

    register(campaign: CampaignDefinition): CampaignRegistry {
        this.campaigns.set(campaign.id, campaign);
        return this;
    }

    getAll(): CampaignDefinition[] {
        return Array.from(this.campaigns.values());
    }

    get(id: string): CampaignDefinition | undefined {
        return this.campaigns.get(id);
    }

    getDefault(): CampaignDefinition | undefined {
        return this.getAll()[0];
    }
}
