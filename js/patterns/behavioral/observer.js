import Pattern from "../../pattern.js";

export default class Observer extends Pattern {
  constructor(playground) {
    super('Observer', playground);
  }

  start() {
    const playground = this.playground;

    const player = new Player(playground);
    const achievements = new Achievements(playground);

    player.subscribe(achievements);

    player.killOgre();
    player.killOgre();
    player.killOgre();
    player.killOgre();
  }
}

// 'interface'
class ISubscriber {
  constructor() {}

  notify(_event) {
    throw new Error('Not implemented: ISubscriber.notify(_event).');
  }
}

// base publisher
class Publisher {
  constructor() {
    this._subscribers = [];
  }

  /**
   * @param {ISubscriber} subscriber
   */
  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  /**
   * @param {ISubscriber} subscriber
   */
  unsubscribe(subscriber) {
    const index = this._subscribers.indexOf(subscriber);

    this._subscribers.splice(index, 1);
  }

  notify(event) {
    this._subscribers.forEach((subscriber) => subscriber.notify(event));
  }
}

class Player extends Publisher {
  constructor(playground) {
    super();

    this._playground = playground;
    this._killedOgres = 0;
  }

  killOgre() {
    ++this._killedOgres;

    this._playground.addParagraph(`Killed ogre. Total: ${this._killedOgres}.`);

    this.notify({
      type: 'kill',
      target: 'ogre',
      amount: this._killedOgres,
    });
  }
}

class Achievements extends ISubscriber {
  constructor(playground) {
    super();

    this._playground = playground;
  }

  notify(event) {
    if (event.type === 'kill' && event.target === 'ogre' && event.amount === 3) {
      this._playground.addParagraph('Achievement unlocked: Ogre slayer!');
    }
  }
}
