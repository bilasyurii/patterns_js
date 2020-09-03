import Pattern from "../../pattern.js";

export default class Decorator extends Pattern {
  constructor(playground) {
    super('Decorator', playground);
  }

  start() {
    let enemy = new Frog();
    enemy = new AcrobaticDecorator(enemy);
    enemy = new CyborgDecorator(enemy);

    const playground = this.playground;

    playground.addParagraph('Enemy moves:');
    enemy.move(playground);
    playground.emptyParagraph();
    playground.addParagraph('Enemy attacks:');
    enemy.attack(playground);
  }
}

// 'interface'
class IEnemy {
  constructor() {}

  move(_playground) {
    throw new Error('Not implemented: IEnemy.move(_playground).');
  }

  attack(_playground) {
    throw new Error('Not implemented: IEnemy.attack(_playground).');
  }
}

// concrete enemy
class Frog extends IEnemy {
  constructor() {
    super();
  }

  move(playground) {
    playground.addParagraph('jump');
  }

  attack(playground) {
    playground.addParagraph('tongue');
  }
}

// base decorator
class FrogBaseDecorator extends IEnemy {
  /**
   * @param {IEnemy} enemy
   */
  constructor(enemy) {
    super();
    
    this._wrappee = enemy;
  }

  move(playground) {
    this._wrappee.move(playground);
  }

  attack(playground) {
    this._wrappee.attack(playground);
  }
}

// concrete decorator 1
class AcrobaticDecorator extends FrogBaseDecorator {
  constructor(enemy) {
    super(enemy);
  }

  move(playground) {
    super.move(playground);

    this._salto(playground);
  }

  _salto(playground) {
    playground.addParagraph('salto');
  }
}

// concrete decorator 2
class CyborgDecorator extends FrogBaseDecorator {
  constructor(enemy) {
    super(enemy);
  }

  attack(playground) {
    super.attack(playground);

    this._lazer(playground);
  }

  move(playground) {
    super.move(playground);

    // 60% chance
    if (Math.random() < 0.6) {
      this._jetpack(playground);
    }
  }

  _lazer(playground) {
    playground.addParagraph('lazer from eyes');
  }

  _jetpack(playground) {
    playground.addParagraph('fly on jetpack');
  }
}
