const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38,
  HOME: 36,
  END: 35,
};

export default class FormCheckGroup extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // setting up styles
    if (!this.hasAttribute('role')) {
      if (this.getAttribute('data-type') == 'radio') {
        this.setAttribute('role', 'radiogroup');
      } else {
        this.setAttribute('role', 'group');
      }
    }

    let firstFormCheck = this.checkedFormCheck;
    if (firstFormCheck) {
      this._uncheckAll();
      this._checkNode(firstFormCheck);
    } else {
      this.querySelector('cod-form-check').setAttribute('tabindex', 0);
    }

    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
  }

  _onKeyDown(e) {
    switch (e.keyCode) {
      case KEYCODE.UP:
      case KEYCODE.LEFT:
        e.preventDefault();
        this._setCheckedToPrevButton();
        break;

      case KEYCODE.DOWN:
      case KEYCODE.RIGHT:
        e.preventDefault();
        this._setCheckedToNextButton();
        break;

      case KEYCODE.HOME:
        e.preventDefault();
        this._setChecked(this.firstFormCheck);
        break;

      case KEYCODE.END:
        e.preventDefault();
        this._setChecked(this.lastFormCheck);
        break;

      case KEYCODE.SPACE:
        e.preventDefault();
        if (e.target.tagName.toLowerCase() === 'cod-form-check') {
          this._setChecked(e.target);
        }
        break;

      default:
        break;
    }
  }

  get checkedFormCheck() {
    return this.querySelector('[data-checked="true"]');
  }

  get firstFormCheck() {
    return this.querySelector('cod-form-check:first-of-type');
  }

  get lastFormCheck() {
    return this.querySelector('cod-form-check:last-of-type');
  }

  _prevFormCheck(node) {
    let prev = node.previousElementSibling;
    while (prev) {
      if (
        prev.getAttribute('data-type') === 'radio' ||
        prev.getAttribute('data-type') === 'checkbox'
      ) {
        return prev;
      }
      prev = prev.previousElementSibling;
    }
    return null;
  }

  _nextFormCheck(node) {
    let next = node.nextElementSibling;
    while (next) {
      if (
        next.getAttribute('data-type') === 'radio' ||
        prev.getAttribute('data-type') === 'checkbox'
      ) {
        return next;
      }
      next = next.nextElementSibling;
    }
    return null;
  }

  _setCheckedToPrevButton() {
    let checkedButton = this.checkedFormCheck || this.firstFormCheck;
    if (checkedButton === this.firstFormCheck) {
      this._setChecked(this.lastFormCheck);
    } else {
      this._setChecked(this._prevFormCheck(checkedButton));
    }
  }

  _setCheckedToNextButton() {
    let checkedButton = this.checkedRadioButton || this.firstFormCheck;
    if (checkedButton === this.lastFormCheck) {
      this._setChecked(this.firstFormCheck);
    } else {
      this._setChecked(this._nextFormCheck(checkedButton));
    }
  }

  _setChecked(node) {
    this._uncheckAll();
    this._checkNode(node);
    this._focusNode(node);
  }

  _uncheckAll() {
    const formCheck = this.querySelectorAll('cod-form-check');
    for (let i = 0; i < formCheck.length; i++) {
      let btn = formCheck[i];
      btn.setAttribute('data-checked', 'false');
      btn.setAttribute('data-required', 'false');
      btn.tabIndex = -1;
    }
  }

  _validateRequired() {
    const formCheck = this.querySelectorAll('cod-form-check');
    let isValid = false;
    for (let i = 0; i < formCheck.length; i++) {
      let checkbox = formCheck[i];
      checkbox.formCheck.checked ? (isValid = true) : 0;
    }
    isValid ? this._unRequiredAll() : this._requiredAll();
  }

  _requiredAll() {
    const formCheck = this.querySelectorAll('cod-form-check');
    for (let i = 0; i < formCheck.length; i++) {
      let btn = formCheck[i];
      btn.setAttribute('data-required', 'true');
    }
  }

  _unRequiredAll() {
    const formCheck = this.querySelectorAll('cod-form-check');
    for (let i = 0; i < formCheck.length; i++) {
      let btn = formCheck[i];
      btn.setAttribute('data-required', 'false');
    }
  }

  _checkNode(node) {
    node.setAttribute('data-checked', 'true');
    node.setAttribute('data-required', 'true');
    node.tabIndex = 0;
  }

  _focusNode(node) {
    node.focus();
  }

  _onClick(e) {
    if (e.target.getAttribute('data-type') === 'radio') {
      this._setChecked(e.target);
    }
    if (e.target.getAttribute('data-type') === 'checkbox') {
      if (this.getAttribute('data-required') == 'true') {
        this._validateRequired(e.target);
      }
    }
  }
}
