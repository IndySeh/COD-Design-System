import styles from '!!raw-loader!./FormLabel.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';
export default class FormLabel extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // progress attributes

    const inputID = this.getAttribute('data-input-id');
    let hidden = this.getAttribute('data-hidden');

    const textColor = this.getAttribute('data-color');
    let required = this.getAttribute('data-required');

    const text = this.getAttribute('data-text');

    const extraClasses = this.getAttribute('data-extra-classes');

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    if (hidden == 'true') {
      hidden = 'visually-hidden';
    } else {
      hidden = '';
    }

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    if (required == 'true') {
      required = 'required-field';
    }
    const label = document.createElement('label');
    label.innerText = text;
    label.setAttribute('for', inputID);
    label.className = [
      'form-label',
      hidden,
      required,
      `${extraClasses || ''}`,
      `text-${textColor || ''}`,
    ].join(' ');
    if (!this.shadowRoot.querySelector('label')) {
      // setting up styles
      const bootStyles = document.createElement('style');
      bootStyles.textContent = bootstrapStyles;
      const variableStyles = document.createElement('style');
      variableStyles.textContent = varStyles;
      const formLabelStyles = document.createElement('style');
      formLabelStyles.textContent = styles;
      this.shadowRoot.appendChild(bootStyles);
      this.shadowRoot.appendChild(variableStyles);
      this.shadowRoot.appendChild(formLabelStyles);
      this.shadowRoot.appendChild(label);
    }
  }
}
