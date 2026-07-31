import { Armor } from './Armor';
import { Shield } from './Shield';
import { Weapon } from './Weapon';

export interface EquipmentSet {
    weapon?: Weapon;
    armor?: Armor;
    shield?: Shield;
}

export class Equipment {
    private readonly equipped: EquipmentSet;

    constructor() {
        this.equipped = {};
    }

    equipWeapon(weapon: Weapon) {
        this.equipped.weapon = weapon;
    }

    equipArmor(armor: Armor) {
        this.equipped.armor = armor;
    }

    equipShield(shield: Shield) {
        this.equipped.shield = shield;
    }

    getEquipment(): EquipmentSet {
        return { ...this.equipped };
    }
}
