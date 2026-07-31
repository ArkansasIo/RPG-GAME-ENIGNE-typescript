import { Party } from './Party';
import { PartyMember } from './PartyMember';
import { Quest } from './Quests';

export interface GameLogicSnapshot {
    partyLevel: number;
    gold: number;
    inventorySize: number;
    questCount: number;
    equippedCount: number;
}

export class GameLogic {
    static summarizeParty(party: Party, quests: Quest[]): GameLogicSnapshot {
        const leader = party.getLeader();
        return {
            partyLevel: leader.level,
            gold: party.gold,
            inventorySize: party.getInventory().getSize(),
            questCount: quests.length,
            equippedCount: Object.keys(party.getLeader().combatStats.effects).length,
        };
    }

    static applyQuestRewards(party: Party, quest: Quest) {
        party.addGold(100);
        party.getInventory().push({ name: quest.title } as never);
    }

    static levelUp(member: PartyMember) {
        member.level += 1;
        member.maxHp += 5;
        member.hp = member.maxHp;
        member.maxMp += 2;
        member.mp = member.maxMp;
    }
}
