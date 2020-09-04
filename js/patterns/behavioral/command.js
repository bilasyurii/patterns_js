import Pattern from "../../pattern.js";

export default class Command extends Pattern {
  constructor(playground) {
    super('Command', playground);
  }

  start() {
    const player = new Player();
    const history = new History();

    this.doAction(new MoveHorizontalCommand(3), 'move_horizontal', history, player);
    this.undo(history, player);
    this.doAction(new MoveVerticalCommand(-2), 'move_vertical', history, player);
    this.doAction(new MoveHorizontalCommand(-1), 'move_vertical', history, player);
    this.undo(history, player);
  }

  /**
   * @param {ICommand} command
   * @param {string} name
   * @param {History} history
   * @param {Player} player
   */
  doAction(command, name, history, player) {
    this.playground.addParagraph(`Executing ${name} command.`);

    command.execute(player);
    history.push(command);

    this._reportPlayer(player);
  }

  /**
   * @param {History} history
   * @param {Player} player
   */
  undo(history, player) {
    this.playground.addParagraph('Undoing last command.');

    const command = history.pop();

    if (command) {
      command.undo(player);
    } else {
      this.playground.addParagraph('No more commands to undo.');
    }

    this._reportPlayer(player);
  }

  _reportPlayer(player) {
    this.playground.addParagraph(`New player's position: (${player.x}; ${player.y}).`);
  }
}

// 'interface'
class ICommand {
  constructor() {}

  /**
   * @param {Player} context
   */
  execute(_context) {
    throw new Error('Not implemented: ICommand.execute(_context).');
  }

  /**
   * @param {Player} context
   */
  undo(_context) {
    throw new Error('Not implemented: ICommand.undo(_context).');
  }
}

// context
class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

// concrete command 1
class MoveHorizontalCommand extends ICommand {
  constructor(delta) {
    super();

    this._delta = delta;
  }

  execute(context) {
    context.x += this._delta;
  }

  undo(context) {
    context.x -= this._delta;
  }
}


// concrete command 2
class MoveVerticalCommand extends ICommand {
  constructor(delta) {
    super();

    this._delta = delta;
  }

  execute(context) {
    context.y += this._delta;
  }

  undo(context) {
    context.y -= this._delta;
  }
}

// command history
class History {
  constructor() {
    this._commands = [];
  }

  /**
   * @param {ICommand} command
   */
  push(command) {
    this._commands.push(command);
  }

  /**
   * @returns {ICommand}
   */
  pop() {
    return this._commands.pop();
  }
}
