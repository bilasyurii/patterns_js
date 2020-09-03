import Playground from './playground.js';
import FactoryMethod from './patterns/factory-method.js';
import Builder from './patterns/builder.js';

export default class StartPoint {
  constructor(patternClasses, config) {
    this._patternClasses = patternClasses;
    this._config = config;
    this._patterns = [];
    this._selector = null;
    this._currentPattern = null;
    this._playground = null;

    this._init();
  }

  _init() {
    this._initPlayGround();
    this._initPatterns();
    
    if (this._config.reportPatterns) {
      this._reportPatternsInfo();
    }
    
    this._initSelector();
    this._initButtonHandler();

    this._onReady();
  }

  _initSelector() {
    const selector = this._selector = document.getElementById('patternSelector');

    if (!selector) {
      throw new Error('Pattern selector html element doesn\'t exist.');
    }

    this._patterns.forEach((pattern) => {
      const optionElement = document.createElement('option');

      optionElement.value = pattern.name;
      optionElement.innerText = pattern.name;

      selector.appendChild(optionElement);
    });
  }

  _initPlayGround() {
    const domElement = document.getElementById('playground');

    this._playground = new Playground(domElement);
  }

  _initPatterns() {
    const patterns = this._patterns;
    const playground = this._playground;

    this._patternClasses.forEach((PatternClass) => patterns.push(new PatternClass(playground)));
  }

  _reportPatternsInfo() {
    const patterns = this._patterns;

    console.log(`Loaded ${patterns.length} patterns in total. The list of them:`);

    patterns.forEach((pattern) => console.log(pattern.name));
  }

  _initButtonHandler() {
    const button = document.getElementById('patternStartButton');

    button.addEventListener('click', () => this._startSelectedPattern());
  }

  _onReady() {
    if (this._config.reportReady) {
      console.log('Initialized successfully and ready.');
    }
  }

  _startSelectedPattern() {
    const current = this._currentPattern;

    if (current) {
      current.finish();
    }

    const newPattern = this._patterns[this._selector.selectedIndex];

    this._playground.clear();

    this._currentPattern = newPattern;

    if (this._config.reportStartedPatterns) {
      console.log(`Started pattern: ${newPattern.name}`);
    }

    newPattern.start();
  }
}

const patternClasses = [
  FactoryMethod,
  Builder,
];

const config = {
  reportPatterns: true,
  reportReady: true,
  reportStartedPatterns: true,
};

document.addEventListener('DOMContentLoaded', () => new StartPoint(patternClasses, config));
