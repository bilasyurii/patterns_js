import Pattern from "../../pattern.js";

export default class TemplateMethod extends Pattern {
  constructor(playground) {
    super('Template Method', playground);
  }

  start() {
    const playground = this.playground;

    const medic = new MedicAI(playground);

    medic.makeTurn();
    medic.makeTurn();

    const cavalry = new Cavalry(playground);

    cavalry.makeTurn();
    cavalry.makeTurn();
  }
}

// abstract class with template method
class EnemyAI {
  constructor(playground) {
    this._playground = playground;
    this._secondaryActionChance = 1;
  }

  makeTurn() {
    this._move();

    this._primaryAction();

    if (Math.random() < this._secondaryActionChance) {
      this._secondaryAction();
    }
  }

  _move() {
    this._playground.addParagraph('Going by foot to target...');
  }

  _primaryAction() {
    throw new Error('Not implemented: EnemyAI._primaryAction().');
  }

  _secondaryAction() {
    throw new Error('Not implemented: EnemyAI._secondaryAction().');
  }
}

class MedicAI extends EnemyAI {
  constructor(playground) {
    super(playground);

    this._secondaryActionChance = 0.5;
  }

  _primaryAction() {
    this._playground.addParagraph('Healing teammate: +10hp.');
  }

  _secondaryAction() {
    this._playground.addParagraph('Gave healing aura for 1 minute: +1hp/sec.');
  }
}

class Cavalry extends EnemyAI {
  constructor(playground) {
    super(playground);

    this._secondaryActionChance = 0.3;
  }

  _move() {
    this._playground.addParagraph('Galoping to target!');
  }

  _primaryAction() {
    this._playground.addParagraph('Hit enemy with sword: -20hp.');
  }

  _secondaryAction() {
    this._playground.addParagraph('Going 1 tile back to stay in safe zone.');
  }
}
