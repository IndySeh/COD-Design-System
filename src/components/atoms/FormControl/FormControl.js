import styles from '!!raw-loader!./FormControl.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';
export default class FormControl extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return ['data-invalid'];
  }

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root

    const shadow = this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals();
    this.formControl = null;
    this.invalid = false;
    this.pristine = true;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let tempClasses = this.formControl.className.split(' ');

    let popValue = tempClasses.pop();

    popValue != 'is-invalid' ? tempClasses.push(popValue) : 0;

    switch (newValue) {
      case 'true':
        console.log('invalid input');
        tempClasses.push('is-invalid');
        this.formControl.className = tempClasses.join(' ');
        break;

      case 'false':
        this.formControl.className = tempClasses.join(' ');
        break;

      default:
        break;
    }
  }

  connectedCallback() {
    // progress attributes

    let inputType = this.getAttribute('data-tag');

    let dataType = this.getAttribute('data-type');

    let id = this.getAttribute('data-id');

    let minlength = this.getAttribute('data-minlength');

    let maxlength = this.getAttribute('data-maxlength');

    let pattern = this.getAttribute('data-pattern');

    let placeholderTxt = this.getAttribute('data-placeholder-txt');

    let readOnly = this.getAttribute('data-read-only');

    let disabled = this.getAttribute('data-disabled');

    let plainText = this.getAttribute('data-plain-txt');

    let required = this.getAttribute('data-required');

    let rows = this.getAttribute('data-rows');

    let size = this.getAttribute('data-size');

    let value = this.getAttribute('data-value');

    let backgroundColor = this.getAttribute('data-background-color');
    const formControl = document.createElement(inputType);
    formControl.id = id;
    formControl.placeholder = placeholderTxt;

    if (required == 'true') {
      formControl.setAttribute('required', true);
    }

    if (inputType != 'textarea') {
      formControl.type = dataType;
    }

    if (minlength != undefined && minlength != null) {
      formControl.setAttribute('minlength', minlength);
    }

    if (maxlength != undefined && maxlength != null) {
      formControl.setAttribute('maxlength', maxlength);
    }

    if (pattern != undefined && pattern != null) {
      formControl.setAttribute('pattern', pattern);
    }

    if (rows != undefined && rows != null) {
      formControl.setAttribute('rows', rows);
    }

    if (value != undefined && value != null) {
      formControl.value = value;
    }

    if (readOnly == 'true') {
      formControl.setAttribute('readonly', true);
    }

    if (disabled == 'true') {
      formControl.setAttribute('disabled', true);
    }
    let colorPicker;

    dataType == 'color' ? (colorPicker = dataType) : (colorPicker = '');
    formControl.className = [
      'form-control',
      `form-control-${size || ''}`,
      `form-control-${colorPicker || ''}`,
      `bg-${backgroundColor || ''}`,
      `form-control-${plainText || ''}`,
    ].join(' ');

    formControl.addEventListener('change', (e) => {
      // we also want to dispatch a `change` event from
      // our custom element
      this.setAttribute('data-invalid', false);
      const clone = new e.constructor(e.type, e);
      this.dispatchEvent(clone);
      // set the element’s validity whenever the value of the
      // <input> changes
      this.validateInput();
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

    this.addEventListener('focus', () => formControl.focus());
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    if (!this.shadowRoot.querySelector(inputType)) {
      // setting up styles
      const bootStyles = document.createElement('style');
      bootStyles.textContent = bootstrapStyles;
      const variableStyles = document.createElement('style');
      variableStyles.textContent = varStyles;
      const formControlsStyles = document.createElement('style');
      formControlsStyles.textContent = styles;
      this.shadowRoot.appendChild(bootStyles);
      this.shadowRoot.appendChild(variableStyles);
      this.shadowRoot.appendChild(formControlsStyles);

      // Loading formcontrol to dom
      this.shadowRoot.appendChild(formControl);
      this.formControl = formControl;
    }

    this.validateInput();
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

  validateInput() {
    // get the validity of the internal <input>
    const validState = this.formControl.validity;

    // reset this.invalid before validating again
    this.invalid = false;

    // if the input is invalid, show the correct error
    if (!validState.valid) {
      // loop through the error reasons

      for (let state in validState) {
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
            : this.formControl.validationMessage;
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
