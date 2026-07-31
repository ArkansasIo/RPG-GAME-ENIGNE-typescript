import { Party } from './Party';
import { PartyMember } from './PartyMember';
import { AdventureLog } from './AdventureLog';
import { Quest, getQuestById } from './Quests';
import { HERB, getItemByName } from '@/app/dw/Item';

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
        const rewardItem = getItemByName(quest.reward) ?? HERB;
        if (!party.isInventoryFull()) {
            party.addInventoryItem(rewardItem);
        }
        const leader = party.getLeader();
        leader.gainExperience(50);
    }

    static acceptQuest(log: AdventureLog, questId: string): boolean {
        const quest = getQuestById(questId);
        if (!quest) {
            return false;
        }
        if (log.quests.completedQuestIds.includes(quest.id)) {
            return false;
        }
        log.quests.activeQuestId = quest.id;
        return true;
    }

    static completeQuest(log: AdventureLog, party: Party, questId: string): boolean {
        const quest = getQuestById(questId);
        if (!quest) {
            return false;
        }
        if (log.quests.completedQuestIds.includes(quest.id)) {
            return false;
        }
        if (log.quests.activeQuestId && log.quests.activeQuestId !== quest.id) {
            return false;
        }
        log.quests.completedQuestIds.push(quest.id);
        log.quests.activeQuestId = undefined;
        this.applyQuestRewards(party, quest);
        return true;
    }

    static discoverRegion(log: AdventureLog, party: Party, regionId: string): boolean {
        if (!regionId || log.quests.discoveredRegions.includes(regionId)) {
            return false;
        }
        log.quests.discoveredRegions.push(regionId);
        party.addGold(15);
        return true;
    }

    static levelUp(member: PartyMember) {
        member.level += 1;
        member.maxHp += 5;
        member.hp = member.maxHp;
        member.maxMp += 2;
        member.mp = member.maxMp;
        member.strength += 1;
        member.agility += 1;
    }

    static processTurnBasedEvent(member: PartyMember, eventName: string) {
        if (eventName === 'rest') {
            member.hp = Math.min(member.maxHp, member.hp + 8);
            member.mp = Math.min(member.maxMp, member.mp + 4);
        } else if (eventName === 'training') {
            member.gainExperience(20);
        }
        return member;
    }

    static getChallengeSummary(level: number): string {
        return `Challenge tier ${Math.max(1, Math.floor(level / 10) + 1)}`;
    }
}
