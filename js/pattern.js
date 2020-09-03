export default class Pattern {
  constructor(name, playground) {
    this.name = name;
    this.playground = playground;
  }

  start() {
    throw new Error('Not implemented: Pattern.start().');
  }

  finish() {}
}
