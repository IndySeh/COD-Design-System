import styles from '!!raw-loader!./Form.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot>
</slot>
`;

export default class Form extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.form = document.createElement('form');

    shadow.addEventListener('slotchange', (ev) => {
      let tempElements = Array.from(this.children);
      if (tempElements.length) {
        tempElements.forEach((node) => {
          this.form.append(node);
        });
      }
    });
  }

  connectedCallback() {
    // setting up styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const formStyles = document.createElement('style');
    formStyles.textContent = styles;
    this.shadowRoot.appendChild(bootStyles);
    this.shadowRoot.appendChild(variableStyles);
    this.shadowRoot.appendChild(formStyles);
    // form attributes

    let id = this.getAttribute('data-id');
    let customValidation = this.getAttribute('data-custom-validate');

    let backgroundColor = this.getAttribute('data-background-color');

    let extraClasses = this.getAttribute('data-extra-classes');
    this.form.id = id;

    if (customValidation == 'true') {
      this.form.novalidate = true;
      customValidation = 'needs-validation';
    } else {
      customValidation = '';
    }
    this.form.className = [
      customValidation,
      `bg-${backgroundColor || ''}`,
      `${extraClasses || ''}`,
    ].join(' ');
    this.shadowRoot.appendChild(this.form);
  }
}
