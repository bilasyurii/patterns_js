import Pattern from "../../pattern.js";

export default class Flyweight extends Pattern {
  constructor(playground) {
    super('Flyweight', playground);
  }

  start() {
    const playground = this.playground;

    const factory = new ParticleTypeFactory();

    const colors = ['#ff0000', '#00ffff'];
    const textures = ['goblin.png', 'elf.png'];

    const particles = [];

    colors.forEach((color) => {
      textures.forEach((texture) => {
        const type = factory.get(color, texture);
        const x = ~~(Math.random() * 5);
        const y = ~~(Math.random() * 5);

        particles.push(new Particle(type, x, y));
      });
    });

    particles.push(new Particle(factory.get(colors[0], textures[1]), 0, 0));
    particles.push(new Particle(factory.get(colors[1], textures[1]), 0, 0));

    particles.forEach((particle) => particle.draw(playground));

    playground.emptyParagraph();
    playground.addParagraph(`Total particle types (flyweights) created: ${ParticleType.getTypesCount()}.`);
    playground.addParagraph(`Total particles (contexts) created: ${particles.length}.`);
  }

  finish() {
    ParticleType.clean();
  }
}

// flyweight
class ParticleType {
  constructor(color, texture) {
    this.color = color;
    this.texture = texture;
    this.id = ParticleType._id++;
  }

  draw(playground) {
    playground.addParagraph(`Texture '${this.texture}' tinted with ${this.color}. Type id: ${this.id}.`);
  }

  static getTypesCount() {
    return ParticleType._id;
  }

  static clean() {
    ParticleType._id = 0;
  }
}

ParticleType._id = 0;

// context
class Particle {
  /**
   * @param {ParticleType} type 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  draw(playground) {
    playground.addParagraph(`Drawing at (${this.x}; ${this.y}):`);

    this.type.draw(playground);
  }
}

// factory for flyweights
class ParticleTypeFactory {
  constructor() {
    this._types = [];
  }

  get(color, texture) {
    const types = this._types;

    for (let i = types.length - 1; i >= 0; --i) {
      const type = types[i];

      if (type.color == color && type.texture == texture) {
        return type;
      }
    }

    const type = new ParticleType(color, texture);

    types.push(type);

    return type;
  }
}
