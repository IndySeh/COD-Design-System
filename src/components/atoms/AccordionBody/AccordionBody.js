import styles from '!!raw-loader!./AccordionBody.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class AccordionBody extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.accordionBody = document.createElement('div');

    this.shadowRoot.addEventListener('slotchange', (ev) => {
      let tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        this.accordionBody.append(node);
      });
    });

    // Add styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const itemStyles = document.createElement('style');
    itemStyles.textContent = styles;
    shadow.appendChild(bootStyles);
    shadow.appendChild(variableStyles);
    shadow.appendChild(itemStyles);
  }

  connectedCallback() {
    // Nav attributes
    // TODO: Refactor attribute and class handling.

    let extraClasses = this.getAttribute('data-extra-classes');

    let accordionBodyClasses = ['accordion-body'];
    if (this.getAttribute('data-li') !== null) {
      accordionBodyClasses.push('data-li');
    }

    extraClasses != undefined && extraClasses != null
      ? accordionBodyClasses.push(extraClasses)
      : 0;
    this.accordionBody.className = accordionBodyClasses.join(' ');
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.accordionBody);
    }
  }
}
