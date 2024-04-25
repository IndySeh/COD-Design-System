import styles from '!!raw-loader!./ListGroupItem.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class ListGroupItem extends HTMLElement {
  static get observedAttributes() {
    return ['data-order', 'data-parent-classes', 'data-order-index'];
  }

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.listGroupItem = null;

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

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'data-order':
        if (newValue != null) {
          this.listGroupItem.className = `${this.listGroupItem.className} ${newValue}`;
        }
        break;

      case 'data-parent-classes':
        if (newValue != null) {
          this.listGroupItem.className = `${this.listGroupItem.className} ${newValue}`;
        }
        break;

      case 'data-order-index':
        console.log(newValue);

        if (newValue != null) {
          this.listGroupItem.innerHTML = `${newValue}. ${this.listGroupItem.innerHTML}`;

          let tempElements = Array.from(this.children);
          tempElements.forEach((node) => {
            this.listGroupItem.append(node);
          });
        }
        break;

      default:
        break;
    }
  }

  connectedCallback() {
    // badge attributes

    let tag = this.getAttribute('data-tag');

    let backgroundColor = this.getAttribute('data-background-color');
    let current = this.getAttribute('data-current');
    let disabled = this.getAttribute('data-disabled');

    let text = this.getAttribute('data-text');

    let extraClasses = this.getAttribute('data-extra-classes');

    let url = this.getAttribute('data-url');
    this.listGroupItem = document.createElement(tag);
    let actionItem = '';

    tag == 'a' || tag == 'button' ? (actionItem = 'list-group-item-action') : 0;

    if (text != undefined || text != null) {
      this.listGroupItem.innerText = text;
    }

    if (url != undefined || url != null) {
      this.listGroupItem.href = url;
    }

    if (current == 'true') {
      this.listGroupItem.setAttribute('aria-current', 'true');
      current = 'active';
    }

    if (disabled == 'true') {
      this.listGroupItem.setAttribute('aria-disabled', 'true');
      disabled = 'disabled';
    }
    this.listGroupItem.className = [
      'list-group-item',
      `list-group-item-${backgroundColor || ''}`,
      `${current || ''}`,
      `${disabled || ''}`,
      `${actionItem || ''}`,
      `${extraClasses || ''}`,
    ].join(' ');

    if (!this.shadowRoot.querySelector(tag)) {
      this.shadowRoot.addEventListener('slotchange', (ev) => {
        let tempElements = Array.from(this.children);
        tempElements.forEach((node) => {
          this.listGroupItem.append(node);
        });
      });
      this.shadowRoot.appendChild(this.listGroupItem);
    }
  }
}
