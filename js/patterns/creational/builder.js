import Pattern from "../../pattern.js";

export default class Builder extends Pattern {
  constructor(playground) {
    super('Builder', playground);
  }

  start() {
    const director = new Director();
    const gamingPCBuilder = new GamingPCBuilder();
    const officeLaptopBuilder = new OfficeLaptopBuilder();

    this.buildComputer(director, gamingPCBuilder);
    this.buildComputer(director, officeLaptopBuilder);
  }

  /**
   * @param {Director} director
   * @param {IComputerBuilder} builder
   */
  buildComputer(director, builder) {
    const computer = director.makeComputer(builder);

    this.playground.addParagraph('Produced computer with such info:');
    this.playground.addParagraph(computer.info);
    this.playground.emptyParagraph();
  }
}

// 'interface'
class IComputerBuilder {
  constructor() {
  }

  reset() {
    throw new Error('Not implemented: ComputerBuilder.reset().');
  }

  setGraphicCard() {
    throw new Error('Not implemented: ComputerBuilder.setGraphicCard(card).');
  }

  setCPU() {
    throw new Error('Not implemented: ComputerBuilder.setCPU(cpu).');
  }
  
  getResult() {
    throw new Error('Not implemented: ComputerBuilder.getResult().');
  }
}

// product
class Computer {
  constructor() {
    this._graphicCard = null;
    this._cpu = null;
  }

  /**
   * @param {string} value
   */
  set graphicCard(value) {
    this._graphicCard = value;
  }

  /**
   * @param {string} value
   */
  set cpu(value) {
    this._cpu = value;
  }

  /**
   * @returns {string}
   */
  get info() {
    return `Graphics: ${this._graphicCard};<br>CPU: ${this._cpu}`;
  }
}

// concrete builder 1
class GamingPCBuilder extends IComputerBuilder {
  constructor() {
    super();

    this._pc = null;
  }

  reset() {
    this._pc = new Computer();
  }

  setGraphicCard() {
    this._pc.graphicCard = 'MVIDIE ULTRA MEGA GGGTTT5555';
  }

  setCPU() {
    this._pc.cpu = 'Untel More i8';
  }

  getResult() {
    return this._pc;
  }
}

// concrete builder 2
class OfficeLaptopBuilder extends IComputerBuilder {
  constructor() {
    super();

    this._pc = null;
  }

  reset() {
    this._pc = new Computer();
  }

  setGraphicCard() {
    this._pc.graphicCard = 'Untel HD Graphics 8888';
  }

  setCPU() {
    this._pc.cpu = 'Untel More i0';
  }

  getResult() {
    return this._pc;
  }
}

class Director {
  constructor() {}

  /**
   * @param {IComputerBuilder} builder 
   * 
   * @returns {Computer}
   */
  makeComputer(builder) {
    builder.reset();
    builder.setGraphicCard();
    builder.setCPU();

    return builder.getResult();
  }
}
