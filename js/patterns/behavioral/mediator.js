import Pattern from "../../pattern.js";

export default class Mediator extends Pattern {
  constructor(playground) {
    super('Mediator', playground);
  }

  start() {
    const playground = this.playground;

    const window = new RegisterWindow(playground);

    window.registerButton.click(playground);
    window.acceptTermsCheckbox.toggle(playground);
    window.registerButton.click(playground);
  }
}

// base class for classes, that should communicate
class GUIElement {
  /**
   * @param {IWindow} window
   */
  constructor(window) {
    this.window = window;
  }

  click() {
    this.window.notify(this, 'click');
  }
}

// 'interface' for mediator
class IWindow {
  constructor() {}

  notify(_sender, _event, _args = undefined) {
    throw new Error('Not implemented: IWindow.notify(_context, _event, _args).');
  }
}

// mediator
class RegisterWindow extends IWindow {
  constructor(playground) {
    super();

    this._playground = playground;
    this.registerButton = new Button(this, false);
    this.acceptTermsCheckbox = new Checkbox(this, false);
  }

  notify(sender, event, args = undefined) {
    switch (event) {
      case 'check_toggled':
        if (sender === this.acceptTermsCheckbox) {
          this._playground.addParagraph(`Register button's state changed: enabled = ${args.checked}.`);

          this.registerButton.enabled = args.checked;
        }
        break;

      case 'click':
        if (sender === this.registerButton) {
          this._register();
        }
        break;
    }
  }

  _register() {
    this._playground.addParagraph('Registered successfully!');
  }
}

// concrete class, that will be communicating, 1
class Button extends GUIElement {
  constructor(window, enabled = true) {
    super(window);

    this.enabled = enabled;
  }

  click(playground) {
    if (this.enabled) {
      playground.addParagraph('Clicked button.');
      
      super.click();
    } else {
      playground.addParagraph('Couldn\'t click a button, because it wasn\'t enabled.');
    }
  }
}

// concrete class, that will be communicating, 2
class Checkbox extends GUIElement {
  constructor(window, checked = false) {
    super(window);

    this._checked = checked;
  }

  toggle(playground) {
    this._checked = !this._checked;

    playground.addParagraph(`Checkbox was toggled: checked = ${this._checked}.`);

    this.window.notify(this, 'check_toggled', {
      checked: this._checked,
    });
  }
}
