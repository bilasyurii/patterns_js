import Pattern from "../pattern.js";

export default class Prototype extends Pattern {
  constructor(playground) {
    super('Prototype', playground);
  }

  start() {
    const playground = this.playground;
    const materials = [];
    const woodMaterial = new Material('path/to/texture.png');
    
    playground.addParagraph('Loading texture only once.');
    playground.emptyParagraph();

    woodMaterial.color = '#ff0000';

    materials.push(woodMaterial);

    for (let i = 0; i < 2; ++i) {
      materials.push(woodMaterial.clone());
    }

    materials.forEach((material) => {
      const output = material.draw();

      playground.addParagraph(output);
      playground.emptyParagraph();
    });
  }
}

// 'interface'
class IPrototype {
  constructor() {
  }

  /**
   * @returns {IPrototype}
   */
  clone() {
    throw new Error('Not implemented: Prototype.clone().');
  }
}

// concrete prototypable class
class Material extends IPrototype {
  constructor(texturePath) {
    super();

    this._texture = null;
    this._color = null;

    if (texturePath !== undefined) {
      this._loadTexture();
    }
  }

  _loadTexture(_path) {
    // load texture from path
    this._texture = 'fake_texture_data';
  }

  /**
   * @param {string} value
   */
  set color(value) {
    this._color = value;
  }

  draw() {
    return `Drawing using material with texture ${this._texture} and color ${this._color}.`;
  }

  clone() {
    const clone = new Material();

    // usually it's ok for clone method
    // to set private or protected fields during cloning
    clone._texture = this._texture;
    clone._color = this._color;

    return clone;
  }
}
