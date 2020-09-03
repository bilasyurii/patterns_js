import Pattern from "../../pattern.js";

export default class Singleton extends Pattern {
  constructor(playground) {
    super('Singleton', playground);
  }

  start() {
    const playground = this.playground;

    // first manager to access
    const manager = AssetManager.instance;
    const sameManger = new AssetManager();
    // second way to access
    
    manager.loadTexture('texture1.png');
    sameManger.loadTexture('texture2.png');

    const textures = new AssetManager().getTextures();

    playground.addParagraph(`Loaded ${textures.length} textures:`);

    textures.forEach((texture) => playground.addParagraph(texture));
  }
}

// singleton
class AssetManager {
  constructor() {
    if (AssetManager._instance) {
      return AssetManager._instance;
    }

    this._textures = [];

    AssetManager._instance = this;
  }

  loadTexture(path) {
    this._textures.push(path);
  }

  getTextures() {
    return this._textures;
  }

  /**
   * @returns {AssetManager}
   */
  static get instance() {
    if (!AssetManager._instance) {
      AssetManager._instance = new AssetManager();
    }

    return AssetManager._instance;
  }
}
