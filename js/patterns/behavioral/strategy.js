import Pattern from "../../pattern.js";

export default class Strategy extends Pattern {
  constructor(playground) {
    super('Strategy', playground);
  }

  start() {
    const playground = this.playground;

    const boss = new Boss(playground);
    
    const easy = new EasyAI(playground);
    const hard = new HardAI(playground);

    boss.setAI(easy);
    boss.onEnemySpotted('zombie');
    boss.onEnemySpotted('player');
    boss.onEnemySpotted('player');

    boss.setAI(hard);
    boss.onEnemySpotted('player');
    
    boss.setAI(easy);
    boss.onEnemySpotted('player');
  }
}

// 'interface' for strategies
class IAI {
  constructor() {}

  onEnemySpotted(_enemy) {
    throw new Error('Not implemented: IAI.onEnemySpotted(_enemy).');
  }

  getName() {
    throw new Error('Not implemented: IAI.getName().');
  }
}

// context
class Boss {
  constructor(playground) {
    this._ai = null;
    this._playground = playground;
  }

  /**
   * @param {IAI} ai
   */
  setAI(ai) {
    this._playground.addParagraph('AI changed: ' + ai.getName() + '.');
    this._ai = ai;
  }

  onEnemySpotted(enemy) {
    this._playground.addParagraph('Enemy spotted: ' + enemy + '!');
    this._ai.onEnemySpotted(enemy);
  }
}

// concrete strategy 1
class EasyAI extends IAI {
  constructor(playground) {
    super();

    this._playground = playground;
  }

  getName() {
    return 'Easy';
  }

  onEnemySpotted(enemy) {
    if (enemy === 'player') {
      // 40% chance
      if (Math.random() < 0.4) {
        this._attack();
      }
    } else {
      this._attack();
    }
  }

  _attack() {
    this._playground.addParagraph('Hitting enemy with knife...');
  }
}

// concrete strategy 2
class HardAI extends IAI {
  constructor(playground) {
    super();

    this._playground = playground;
  }

  getName() {
    return 'Hard';
  }

  onEnemySpotted(_enemy) {
    this._attack();
  }

  _attack() {
    this._playground.addParagraph('Shooting with mega lazer from satellite!');
    this._playground.addParagraph('Nuking enemy with atomic bomb!');
  }
}
