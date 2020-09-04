import Playground from './playground.js';
import FactoryMethod from './patterns/creational/factory-method.js';
import Builder from './patterns/creational/builder.js';
import Prototype from './patterns/creational/prototype.js';
import Singleton from './patterns/creational/singleton.js';
import Adapter from './patterns/structural/adapter.js';
import Bridge from './patterns/structural/bridge.js';
import Composite from './patterns/structural/composite.js';
import Decorator from './patterns/structural/decorator.js';
import Facade from './patterns/structural/facade.js';
import Flyweight from './patterns/structural/flyweight.js';
import Proxy from './patterns/structural/proxy.js';
import ChainOfResponsibility from './patterns/behavioral/chain-of-responsibility.js';
import Command from './patterns/behavioral/command.js';
import Iterator from './patterns/behavioral/iterator.js';
import Mediator from './patterns/behavioral/mediator.js';
import Memento from './patterns/behavioral/memento.js';
import Observer from './patterns/behavioral/observer.js';
import State from './patterns/behavioral/state.js';

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
  // Creational
  FactoryMethod,
  Builder,
  Prototype,
  Singleton,
  // Structural
  Adapter,
  Bridge,
  Composite,
  Decorator,
  Facade,
  Flyweight,
  Proxy,
  // Behavioral
  ChainOfResponsibility,
  Command,
  Iterator,
  Mediator,
  Memento,
  Observer,
  State,
];

const config = {
  reportPatterns: true,
  reportReady: true,
  reportStartedPatterns: true,
};

document.addEventListener('DOMContentLoaded', () => new StartPoint(patternClasses, config));
