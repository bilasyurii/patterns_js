import Pattern from "../../pattern.js";

export default class Memento extends Pattern {
  constructor(playground) {
    super('Memento', playground);
  }

  start() {
    const player = new Player(this.playground);
    const snapshots = new SnapshotsHistory();

    player.move(2, 3);
    player.report();

    snapshots.push(player.save());
    player.move(1, 1);
    player.report();

    player.restore(snapshots.pop());
    player.report();
  }
}

// memento
class PlayerSnapshot {
  constructor() {
    this._x = null;
    this._y = null;
  }
}

// originator
class Player {
  constructor(playground) {
    this._playground = playground;
    this._x = 0;
    this._y = 0;
  }

  move(dx, dy) {
    this._x += dx;
    this._y += dy;
  }

  save() {
    const snapshot = new PlayerSnapshot();

    // usually it's OK for originator to access
    // memento's private fields
    snapshot._x = this._x;
    snapshot._y = this._y;

    return snapshot;
  }

  restore(snapshot) {
    this._x = snapshot._x;
    this._y = snapshot._y;
  }

  report() {
    this._playground.addParagraph(`Current player's position is: (${this._x};${this._y}).`);
  }
}

class SnapshotsHistory {
  constructor() {
    this._snapshots = [];
  }

  push(snapshot) {
    this._snapshots.push(snapshot);
  }

  pop() {
    return this._snapshots.pop();
  }
}
