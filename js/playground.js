export default class Playground {
  constructor(domElement) {
    this._domElement = domElement;
  }

  clear() {
    const domElement = this._domElement;

    while (domElement.firstChild) {
      domElement.removeChild(domElement.lastChild);
    }
  }

  addParagraph(innerHTML) {
    const domElement = this._domElement;
    const paragraph = document.createElement('p');

    paragraph.innerHTML = innerHTML;
    domElement.append(paragraph);
  }
}
