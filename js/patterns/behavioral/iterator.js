import Pattern from "../../pattern.js";

export default class Iterator extends Pattern {
  constructor(playground) {
    super('Iterator', playground);
  }

  start() {
    const playground = this.playground;
    const collection = new EnemyCollection();

    [
      'goblin',
      'ogre',
      'dragon'
    ].forEach((enemy) => collection.add(enemy));

    for (const iterator = collection.iterator(); iterator.hasValue(); iterator.next()) {
      const enemy = iterator.current();

      playground.addParagraph(enemy);
    }
  }
}

// 'interface' for iterators
class IIterator {
  constructor() {}

  /**
   * @returns {any}
   */
  current() {
    throw new Error('Not implemented: IIterator.current().');
  }

  next() {
    throw new Error('Not implemented: IIterator.next().');
  }

  /**
   * @returns {boolean}
   */
  hasValue() {
    throw new Error('Not implemented: IIterator.hasValue().');
  }
}

// 'interface' for iterable collections
class IIterable {
  constructor() {}

  /**
   * @returns {IIterator}
   */
  iterator() {
    throw new Error('Not implemented: IIterable.iterator().');
  }
}

class EnemyIterator extends Iterator {
  constructor(collection) {
    super();

    this._collection = collection;
    this._index = 0;
  }

  next() {
    ++this._index;
  }

  hasValue() {
    return this._index < this._collection.length;
  }

  current() {
    const index = this._index;
    const collection = this._collection;

    if (index < collection.length) {
      return collection[index];
    } else {
      throw new Error('Iterator\'s state is incorrect. Can\'t get value from collection');
    }
  }
}

// concrete collection
class EnemyCollection extends IIterable {
  constructor() {
    super();

    this._enemies = [];
  }

  iterator() {
    return new EnemyIterator(this._enemies);
  }

  add(enemy) {
    this._enemies.push(enemy);
  }
}
