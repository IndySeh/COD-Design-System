import styles from '!!raw-loader!./FormSelect.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
  <select></select>
  <slot></slot>
`;

export default class FormSelect extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return ['data-invalid'];
  }

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.internals = this.attachInternals();
    // Create select and move options from slot to select
    this.select = shadow.querySelector('select');

    shadow.addEventListener('slotchange', () => {
      const node = this.querySelector('option');
      node && this.select.append(node);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const tempClasses = this.select.className.split(' ');

    const popValue = tempClasses.pop();

    popValue != 'is-invalid' ? tempClasses.push(popValue) : 0;

    switch (newValue) {
      case 'true':
        tempClasses.push('is-invalid');
        this.select.className = tempClasses.join(' ');
        break;

      case 'false':
        this.select.className = tempClasses.join(' ');
        break;

      default:
        break;
    }
  }

  connectedCallback() {
    // setting up styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const formSelectStyles = document.createElement('style');
    formSelectStyles.textContent = styles;
    this.shadowRoot.appendChild(bootStyles);
    this.shadowRoot.appendChild(variableStyles);
    this.shadowRoot.appendChild(formSelectStyles);
    // progress attributes

    const id = this.getAttribute('data-id');

    const size = this.getAttribute('data-size');

    const multiple = this.getAttribute('data-multiple');

    const displayMultiple = this.getAttribute('data-display-multiple');

    const disabled = this.getAttribute('data-disabled');

    const required = this.getAttribute('data-required');

    const ariaLabel = this.getAttribute('data-aria-label');

    const extraClasses = this.getAttribute('data-extra-classes');

    this.select.addEventListener('change', (e) => {
      // we also want to dispatch a `change` event from
      // our custom element
      this.setAttribute('data-invalid', false);
      const clone = new e.constructor(e.type, e);
      this.dispatchEvent(clone);
      // set the element’s validity whenever the value of the
      // <input> changes
      this.validateSelect();
    });

    this.addEventListener('invalid', (e) => {
      this.invalid = true;
      this.pristine = false;
      this.setAttribute('data-invalid', true);
      // when a custom error needs to be displayed,
      // prevent the native error from showing
      if (this.customErrorDisplay) {
        e.preventDefault();
      }
    });

    this.addEventListener('focus', () => this.select.focus());
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    if (required == 'true') {
      this.select.setAttribute('required', true);
    }

    if (disabled == 'true') {
      this.select.setAttribute('disabled', true);
    }

    if (multiple == 'true') {
      this.select.setAttribute('multiple', true);
    }

    if (displayMultiple != undefined && displayMultiple != null) {
      this.select.setAttribute('size', displayMultiple);
    }
    this.select.setAttribute('aria-label', ariaLabel);
    this.select.id = id;
    this.select.className = [
      'form-select',
      `${extraClasses || ''}`,
      `form-select-${size || ''}`,
    ].join(' ');
    // this.buildOptions(JSON.parse(options), this.select);
    this.validateSelect();
  }

  get validity() {
    return this.internals.validity;
  }
  get validationMessage() {
    return this.internals.validationMessage;
  }
  get willValidate() {
    return this.internals.willValidate;
  }
  checkValidity() {
    return this.internals.checkValidity();
  }
  reportValidity() {
    return this.internals.reportValidity();
  }

  validateSelect() {
    // get the validity of the internal <input>
    const validState = this.select.validity;

    // reset this.invalid before validating again
    this.invalid = false;

    // if the input is invalid, show the correct error
    if (!validState.valid) {
      // loop through the error reasons

      for (const state in validState) {
        // get the name of the data attribute that holds the
        //error message
        const attr = `data-${state.toString()}`;
        // if there is an error and corresponding attribute holding
        // the message
        if (validState[state]) {
          this.validationError = state.toString();
          this.invalid = !this.pristine && !validState.valid;

          // get the correct error message
          const errorMessage = this.hasAttribute(attr)
            ? this.getAttribute(attr)
            : this.select.validationMessage;
          // set the validity error reason and the corresponding
          // message
          this.internals.setValidity(
            { [this.validationError]: true },
            errorMessage,
          );
          // when a custom error needs to be displayed,
          // dispatch the 'invalid' event manually so consuming code
          // can use this as a hook to get the correct error message
          // and display it
          if (this.invalid && this.customErrorDisplay) {
            this.dispatchEvent(new Event('invalid'));
          }
        }
      }
    } else {
      this.internals.setValidity({});
    }
  }
}
