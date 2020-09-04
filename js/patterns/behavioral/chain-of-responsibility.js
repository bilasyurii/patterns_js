import Pattern from "../../pattern.js";

export default class ChainOfResponsibility extends Pattern {
  constructor(playground) {
    super('Chain Of Responsibility', playground);
  }

  start() {
    const team = new GoblinCrasher();
    team.setNextHandler(new OgreKiller());
    
    const enemies = [
      'ogre',
      'goblin',
      'dragon',
    ];

    const playground = this.playground;

    enemies.forEach((enemy) => {
      playground.addParagraph('Enemy spotted: ' + enemy);
      playground.addParagraph(team.onEnemySpotted(enemy));
      playground.emptyParagraph();
    })
  }
}

// 'interface'
class IEnemySpottedHandler {
  constructor() {}

  /**
   * @param {string} _enemy
   * 
   * @returns {string} Result of decision.
   */
  onEnemySpotted(_enemy) {
    throw new Error('Not implemented: IEnemySpottedHandler.onEnemySpotted(_enemy).');
  }
}

// base handler
class Hero extends IEnemySpottedHandler {
  constructor() {
    super();

    this._next = null;
  }

  /**
   * @param {IEnemySpottedHandler} next
   */
  setNextHandler(next) {
    this._next = next;
  }

  onEnemySpotted(enemy) {
    if (this._next) {
      return this._next.onEnemySpotted(enemy);
    } else {
      return 'Oh no, it seems, he is too strong for us! Let\'s flee!';
    }
  }
}

class GoblinCrasher extends Hero {
  constructor() {
    super();
  }

  onEnemySpotted(enemy) {
    if (enemy == 'goblin') {
      return 'GoblinCrasher: I will easily handle this!';
    } else {
      return super.onEnemySpotted(enemy);
    }
  }
}

class OgreKiller extends Hero {
  constructor() {
    super();
  }

  onEnemySpotted(enemy) {
    if (enemy == 'ogre') {
      return 'OgreKiller: I will make this one cry!';
    } else {
      return super.onEnemySpotted(enemy);
    }
  }
}
