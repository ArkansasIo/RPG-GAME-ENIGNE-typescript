import { DwGame } from '@/app/dw/DwGame';
import { MapLogic } from '@/app/dw/mapLogic/MapLogic';

export interface ContentModule {
    id: string;
    title: string;
    register(game: DwGame): void;
}

export class EngineContentRegistry {
    private readonly modules: ContentModule[] = [];

    register(module: ContentModule): EngineContentRegistry {
        this.modules.push(module);
        return this;
    }

    applyTo(game: DwGame): void {
        this.modules.forEach((module) => module.register(game));
    }

    reset(): void {
        this.modules.length = 0;
    }

    getModules(): ContentModule[] {
        return [ ...this.modules ];
    }
}

export class CampaignContentModule implements ContentModule {
    readonly id: string;
    readonly title: string;
    private readonly mapLogics: Array<{ mapId: string; logic: MapLogic }> = [];

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }

    withMapLogic(mapId: string, logic: MapLogic): CampaignContentModule {
        this.mapLogics.push({ mapId, logic });
        return this;
    }

    register(game: DwGame): void {
        this.mapLogics.forEach(({ mapId, logic }) => {
            game.registerMapLogic(mapId, logic);
        });
    }
}
