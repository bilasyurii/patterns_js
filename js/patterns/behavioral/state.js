import Pattern from "../../pattern.js";

export default class State extends Pattern {
  constructor(playground) {
    super('State', playground);
  }

  start() {
    const playground = this.playground;

    const player = new Player(playground);

    player.update();
    player.update();

    player.onEnemySpotted('goblin');

    player.update();
    player.update();

    player.onEnemyDied('goblin');

    player.update();
  }
}

// base for states
class BaseState {
  constructor(name, context, playground) {
    this.name = name;
    this.context = context;
    this._playground = playground;
  }

  onEnter() {}

  onFinish() {}

  onUpdate() {}

  handleEvent(_event) {}

  setState(newState) {
    this.context.setState(newState);
  }
}

// context
class Player {
  constructor(playground) {
    this._currentState = null;
    this._playground = playground;

    this.setState(new IdleState(this, playground));
  }

  /**
   * @param {BaseState} newState 
   */
  setState(newState) {
    if (this._currentState) {
      this._currentState.onFinish();
    }

    this._currentState = newState;

    this._playground.addParagraph('Entering state: ' + newState.name);

    newState.onEnter();
  }

  update() {
    if (this._currentState) {
      this._currentState.onUpdate();
    }
  }

  onEnemySpotted(enemy) {
    this._currentState.handleEvent({
      type: 'enemy_spotted',
      target: enemy,
    });
  }

  onEnemyDied(enemy) {
    this._currentState.handleEvent({
      type: 'enemy_died',
      target: enemy,
    });
  }
}

// concrete state
class IdleState extends BaseState {
  constructor(player, playground) {
    super('idle', player, playground);
  }

  onUpdate() {
    this._playground.addParagraph('Idling...');
  }

  handleEvent(event) {
    if (event.type === 'enemy_spotted') {
      this._playground.addParagraph('Spotted enemy: ' + event.target + '!');

      this.setState(new BattleState(this.context, this._playground, event.target));
    }
  }
}

class BattleState extends BaseState {
  constructor(player, playground, opponent) {
    super('battle', player, playground);

    this.opponent = opponent;
  }
  
  onEnter() {
    this._playground.addParagraph('Player: I will destroy you, ' + this.opponent + '!');
  }

  onUpdate() {
    this._playground.addParagraph('Battling with ' + this.opponent + '.');
  }

  onFinish() {
    this._playground.addParagraph('That fight was quite tough...');
  }

  handleEvent(event) {
    if (event.type === 'enemy_died' && event.target == this.opponent) {
      this._playground.addParagraph('Enemy died: ' + this.opponent + '!');

      this.setState(new IdleState(this.context, this._playground));
    }
  }
}
