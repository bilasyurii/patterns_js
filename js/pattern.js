import Playground from "./playground.js";

export default class Pattern {
  /**
   * @param {string} name
   * @param {Playground} playground
   */
  constructor(name, playground) {
    this.name = name;
    this.playground = playground;
  }

  start() {
    throw new Error('Not implemented: Pattern.start().');
  }

  finish() {}
}
