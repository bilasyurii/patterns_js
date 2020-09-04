import Pattern from "../../pattern.js";

export default class Visitor extends Pattern {
  constructor(playground) {
    super('Visitor', playground);
  }

  start() {
    const renderer = this.getRenderer();
    const elements = this.getRenderableElements();

    elements.forEach((element) => element.render(renderer));
  }

  /**
   * @returns {IRenderer}
   */
  getRenderer() {
    return new WebGLRenderer(this.playground);
  }

  /**
   * @returns {IRenderable[]}
   */
  getRenderableElements() {
    return [
      new Sprite('fairy.png'),
      new Text('nice_pixelated_font.ttf'),
    ];
  }
}

// 'interface' for visitors
class IRenderer {
  constructor() {}

  // visitA method
  renderSprite(_sprite) {
    throw new Error('Not implemented: IRenderer.renderSprite(sprite).');
  }

  // visitB method
  renderText(_text) {
    throw new Error('Not implemented: IRenderer.renderText(_text).');
  }
}

// concrete visitor
class WebGLRenderer extends IRenderer {
  constructor(playground) {
    super();

    this._playground = playground;
  }

  // concrete visitA method
  renderSprite(sprite) {
    this._playground.addParagraph(`Rendering sprite with texture ${sprite.texture} with WebGL renderer...`);
  }

  // concrete visitB method
  renderText(text) {
    this._playground.addParagraph(`Rendering text with font ${text.font} with WebGL renderer...`);
  }
}

// interface for 'clients'
class IRenderable {
  constructor() {}

  /**
   * Accept visitor method.
   * 
   * @param {IRenderer} _renderer
   */
  render(_renderer) {
    throw new Error('Not implemented: IRenderable.render(renderer).');
  }
}

// concrete 'client' A
class Sprite extends IRenderable {
  constructor(texture) {
    super();

    this.texture = texture;
  }

  render(renderer) {
    // visit A
    renderer.renderSprite(this);
  }
}

// concrete 'client' B
class Text extends IRenderable {
  constructor(font) {
    super();

    this.font = font;
  }

  render(renderer) {
    // visit B
    renderer.renderText(this);
  }
}
