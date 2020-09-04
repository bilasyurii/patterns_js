import Pattern from "../../pattern.js";

export default class Proxy extends Pattern {
  constructor(playground) {
    super('Proxy', playground);
  }

  start() {
    const db = new CachedJSONDatabase(this.playground);

    db.add('yurii', 'bilas');
    db.add('lorem', 'ipsum');
    db.get('yurii');
    db.get('lorem');
    db.add('foo', 'bar');
    db.add('lorem', 'dolor');
    db.get('yurii');
    db.get('lorem');
    db.get('foo');
  }
}

// 'interface'
class IDatabase {
  constructor() {}

  get(_key) {
    throw new Error('Not implemented: IDatabase.get(_key).');
  }

  add(_key, _data) {
    throw new Error('Not implemented: IDatabase.add(_key, _data).');
  }
}

class JSONDatabase extends IDatabase {
  constructor() {
    super();

    this._records = {};
  }

  get(key) {
    return this._records[key];
  }

  add(key, data) {
    this._records[key] = data;
  }
}

class CachedJSONDatabase extends IDatabase {
  constructor(playground) {
    super();

    this._playground = playground;
    this._db = new JSONDatabase();
    this._cachedRecords = {};
    this._cachedNewRecords = {};
  }

  checkConnection() {
    // 50% chance for successfull connection
    return Math.random() < 0.5;
  }

  get(key) {
    if (this.checkConnection()) {
      this._syncNewRecords();

      const data = this._db.get(key);
      
      this._playground.addParagraph(`Connection's OK. Received data from real DB: ${data}.`);

      this._cachedRecords[key] = data;

      return data;
    } else {
      const cachedData = this._cachedRecords[key];

      if (cachedData == undefined) {
        throw new Error('CachedJSONDatabase error: no available connection and no data present in cache.');
      } else {
        this._playground.addParagraph(`No available connection, but got data from cache: ${cachedData}.`);

        return cachedData;
      }
    }
  }

  add(key, data) {
    if (this.checkConnection()) {
      this._syncNewRecords();

      this._playground.addParagraph(`Connection's OK. Added data to real DB: ${data}.`);

      this._db.add(key, data);
      
      this._cachedRecords[key] = data;
    } else {
      this._playground.addParagraph(`No available connection, added data to cache: ${data}.`);
      this._cachedNewRecords[key] = data;
      this._cachedRecords[key] = data;
    }
  }

  _syncNewRecords() {
    const newRecords = this._cachedNewRecords;
    const db = this._db;
    let count = 0;

    for (const key in newRecords) {
      const data = newRecords[key];
      
      db.add(key, data);

      ++count;
    }

    this._cachedNewRecords = {};

    if (count) {
      this._playground.addParagraph(`Connection's OK. Added cached ${count} new records to real DB.`);
    }
  }
}
