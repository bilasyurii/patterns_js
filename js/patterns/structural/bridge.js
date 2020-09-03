import Pattern from "../../pattern.js";

export default class Bridge extends Pattern {
  constructor(playground) {
    super('Bridge', playground);
  }

  start() {
    const riffle = new Riffle();
    const lazerGun = new LazerGun();
    const marauderWithRiffle = new Marauder(riffle);
    const marauderWithLazerGun = new Marauder(lazerGun);
    const stormtrooperWithLazerGun = new Stormtrooper(lazerGun);
    const playground = this.playground;

    [
      marauderWithRiffle,
      marauderWithLazerGun,
      stormtrooperWithLazerGun
    ].forEach((attacker) => playground.addParagraph(`${attacker.name} says "${attacker.speak()}" and shoots: ${attacker.attack()}`));
  }
}

// 'interface' for one abstraction
class IWeapon {
  constructor() {}

  /**
   * @returns {string}
   */
  attack() {
    throw new Error('Not implemented: IWeapon.attack().');
  }
}

// 'interface' for second abstraction
class IAttacker {
  /**
   * @param {string} name
   * @param {IWeapon} weapon
   */
  constructor(name, weapon) {
    this.name = name;
    this._weapon = weapon;
  }

  /**
   * @returns {string}
   */
  attack() {
    return this._weapon.attack();
  }

  /**
   * @returns {string}
   */
  speak() {
    throw new Error('Not implemented: IAttacker.speak().');
  }
}

class Riffle extends IWeapon {
  constructor() {
    super();
  }

  attack() {
    return 'Tra-ta-ta!';
  }
}

class LazerGun extends IWeapon {
  constructor() {
    super();
  }

  attack() {
    return 'Pew! Pew!';
  }
}

class Stormtrooper extends IAttacker {
  constructor(weapon) {
    super('Stormtrooper', weapon);
  }

  speak() {
    return 'Ready to fight for empire!';
  }
}

class Marauder extends IAttacker {
  constructor(weapon) {
    super('Marauder', weapon);
  }

  speak() {
    return 'I will steal all your stuff.';
  }
}
