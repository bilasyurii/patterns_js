import Pattern from "../../pattern.js";

export default class Composite extends Pattern {
  constructor(playground) {
    super('Composite', playground);
  }

  start() {
    const root = new Group();

    for (let i = 1; i < 3; ++i) {
      root.add(new Sprite(`house_0${i}.png`));
    }

    const subRoot = new Group();

    for (let i = 1; i < 4; ++i) {
      subRoot.add(new Sprite(`tree_0${i}.png`));
    }

    root.add(subRoot);

    root.add(new Sprite('goblin_01.png'));

    root.render(this.playground);
  }
}

// 'interface' for nodes
class IRenderable {
  constructor() {}

  render(_playground) {
    throw new Error('Not implemented: IRenderable.render(_playground).');
  }
}

// leaf
class Sprite extends IRenderable {
  constructor(texture) {
    super();

    this._texture = texture;
  }

  render(playground) {
    playground.addParagraph(`Sprite with texture ${this._texture}.`);
  }
}

// composite
class Group extends IRenderable {
  constructor() {
    super();

    /**
     * @type {IRenderable[]}
     */
    this._children = [];
  }

  /**
   * @param {IRenderable} child
   */
  add(child) {
    this._children.push(child);
  }

  render(playground) {
    const children = this._children;

    playground.emptyParagraph();

    playground.addParagraph(`Rendering group with ${children.length} children:`);
  
    children.forEach((child) => child.render(playground));

    playground.emptyParagraph();
  }
}
