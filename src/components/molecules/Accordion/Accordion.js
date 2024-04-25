import styles from '!!raw-loader!./Accordion.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class Accordion extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.accordion = document.createElement('div');
    this.shadowRoot.addEventListener('slotchange', (ev) => {
      const tempElements = ev.target.assignedElements();
      tempElements.forEach((node, index) => {
        // TODO: Refactor attribute and class handling for children.
        switch (node.tagName) {
          case 'COD-ACCORDION-ITEM': {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';
            node.setAttribute('data-parent-id', this.getAttribute('data-id'));
            node.setAttribute('data-index', index);
            if (this.getAttribute('data-ol') !== null) {
              node.setAttribute('data-li', '');
            }
            accordionItem.appendChild(node);
            this.accordion.append(accordionItem);
            break;
          }
          default: {
            const nodeClasses = node.className.split(' ');
            nodeClasses.includes('no-wc')
              ? node.remove()
              : this.card.appendChild(node);
            break;
          }
        }
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

    const flush = this.getAttribute('data-flush');
    const isOrderedList = this.getAttribute('data-ol');

    const id = this.getAttribute('data-id');

    const extraClasses = this.getAttribute('data-extra-classes');

    const accordionClasses = ['accordion'];

    flush == 'true' ? accordionClasses.push('accordion-flush') : 0;
    isOrderedList !== null ? accordionClasses.push('accordion-ol') : 0;

    extraClasses != undefined && extraClasses != null
      ? accordionClasses.push(extraClasses)
      : 0;
    this.accordion.className = accordionClasses.join(' ');
    this.accordion.id = id;
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.accordion);
    }
  }
}
