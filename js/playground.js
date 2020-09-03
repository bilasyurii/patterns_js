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
    const paragraph = this._createParagraph();

    paragraph.innerHTML = innerHTML;
  }

  emptyParagraph() {
    const paragraph = this._createParagraph();

    paragraph.classList.add('empty-paragraph');
  }

  _createParagraph() {
    const domElement = this._domElement;
    const paragraph = document.createElement('p');

    domElement.append(paragraph);

    return paragraph;
  }
}
