import Pattern from "../pattern.js";

export default class FactoryMethod extends Pattern {
  constructor(playground) {
    super('Factory Method', playground);
  }

  start() {
    const ogreBarracks = new OgreBarracks();
    const trollBarracks = new TrollBarracks();

    this.spawnUnit(ogreBarracks);
    this.spawnUnit(trollBarracks);
  }

  /**
   * @param {Barracks} barracks 
   */
  spawnUnit(barracks) {
    const unit = barracks.createUnit();
    const speach = unit.speak();

    this.playground.addParagraph(`Spawned ${unit.name}. It says:`);
    this.playground.addParagraph(speach);
    this.playground.emptyParagraph();
  }
}

// 'interface'
class Monster {
  constructor(name) {
    this.name = name;
  }

  speak() {
    throw new Error('Not implemented: Monster.speak().');
  }
}

// concrete class 1
class Ogre extends Monster {
  constructor() {
    super('Ogre');
  }

  speak() {
    return 'I will destroy your village!';
  }
}

// concrete class 2
class Troll extends Monster {
  constructor() {
    super('Troll')
  }

  speak() {
    return 'I am too lazy to talk with you';
  }
}

// base factory class
class Barracks {
  constructor() {}

  /**
   * @returns {Monster}
   */
  createUnit() {
    throw new Error('Not implemented: Barracks.createUnit().');
  }
}

// concrete factory class 1
class OgreBarracks extends Barracks {
  constructor() {
    super();
  }

  createUnit() {
    return new Ogre();
  }
}

// concrete factory class 2
class TrollBarracks extends Barracks {
  constructor() {
    super();
  }

  createUnit() {
    return new Troll();
  }
}
