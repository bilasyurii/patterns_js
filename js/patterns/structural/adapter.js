import Pattern from "../../pattern.js";

export default class Adapter extends Pattern {
  constructor(playground) {
    super('Adapter', playground);
  }

  start() {
    const jsonDb = new JSONDatabase();
    const adapter = new XMLToJSONAdapter(jsonDb);

    adapter.add('yurii', '<i><b>data</b></i>');

    const xmlData = adapter.get('yurii');

    this.playground.addParagraph('Received from database:');
    this.playground.addParagraph(xmlData);
  }
}

// service
class JSONDatabase {
  constructor() {
    this._records = {};
  }

  add(key, jsonData) {
    this._records[key] = jsonData;
  }

  get(key) {
    return this._records[key];
  }
}

// adapter
class XMLToJSONAdapter {
  /**
   * @param {JSONDatabase} jsonDatabase
   */
  constructor(jsonDatabase) {
    this._adaptee = jsonDatabase;
  }

  add(key, xmlData) {
    const transformedData = this._transformToJSON(xmlData);

    this._adaptee.add(key, transformedData);
  }

  get(key) {
    const jsonData = this._adaptee.get(key);

    return this._transformToXML(jsonData);
  }

  _transformToJSON(data) {
    // TODO make some transformations here
    return data;
  }

  _transformToXML(data) {
    // TODO make some transformations here
    return data;
  }
}
