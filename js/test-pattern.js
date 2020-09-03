import Pattern from "./pattern.js";

export default class TestPattern extends Pattern {
  constructor(playground) {
    super('test', playground);
  }

  start() {
    this.playground.addParagraph('Lorem ipsum');
  }
}
