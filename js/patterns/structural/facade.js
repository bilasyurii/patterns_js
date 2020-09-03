import Pattern from "../../pattern.js";

export default class Facade extends Pattern {
  constructor(playground) {
    super('Facade', playground);
  }

  start() {
    const playground = this.playground;
    const game = new Game(playground);

    playground.addParagraph(game.addPlayer());
    playground.addParagraph(game.addParticlesToPlayer());
    playground.addParagraph(game.enableAudio());
    game.startGame();
  }
}

// facade
class Game {
  constructor(playground) {
    this._playground = playground;
    this._renderer = new Renderer();
    this._physics = new Physics();
    this._audio = new Audio();
    this._input = new Input();

    this._objects = [];
    this._isPlayer = false;
    this._hasParticles = false;
    this._hasAudio = true;
  }

  // handy short method 1
  startGame() {
    const playground = this._playground;
    const renderer = this._renderer;
    const audio = this._audio;
    const input = this._input;

    if (this._isPlayer) {
      input.checkEvent('movement', playground);
    }

    this._physics.resolveCollisions(playground);

    this._objects.forEach((object) => renderer.render(object, playground));

    if (this._hasAudio) {
      if (this._isPlayer) {
        audio.playSound('singing.mp3', playground);
      }
  
      if (this._hasParticles) {
        audio.playSound('particles.mp3', playground);
      }
    }
  }

  // handy short method 2
  enableAudio() {
    this._hasAudio = true;

    return 'Enabled audio';
  }

  // handy short method 3
  addPlayer() {
    this._objects.push('player');

    this._isPlayer = true;

    return 'Added player!';
  }

  // handy short method 4
  addParticlesToPlayer() {
    this._objects.push('particle');

    this._hasParticles = true;

    return 'Added particles to player!';
  }
}

// subsystem 1
class Renderer {
  constructor() {}

  render(thing, playground) {
    playground.addParagraph(`Rendering ${thing}...`);
  }
}

// subsystem 2
class Physics {
  constructor() {}

  resolveCollisions(playground) {
    playground.addParagraph('Resolving collisions...');
  }
}

// subsystem 3
class Audio {
  constructor() {}

  playSound(name, playground) {
    playground.addParagraph(`Playing sound '${name}'...`);
  }
}

// subsystem 4
class Input {
  constructor() {}

  checkEvent(name, playground) {
    playground.addParagraph(`Checking input event '${name}'...`);
  }
}
