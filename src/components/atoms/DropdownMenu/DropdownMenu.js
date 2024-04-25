import styles from '!!raw-loader!./DropdownMenu.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class DropdownMenu extends HTMLElement {
  static get observedAttributes() {
    return ['data-show'];
  }

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.dropdownMenu = document.createElement('ul');

    this.shadowRoot.addEventListener('slotchange', (ev) => {
      let tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        this.dropdownMenu.append(node);
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

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(newValue);

    let tempClasses = this.dropdownMenu.className.split(' ');

    let popValue = tempClasses.pop();

    popValue != 'show' ? tempClasses.push(popValue) : 0;

    console.log(tempClasses);

    if (newValue == 'true') {
      tempClasses.push('show');
    }
    this.dropdownMenu.className = tempClasses.join(' ');
  }

  connectedCallback() {
    // badge attributes

    let darkMode = this.getAttribute('data-dark-mode');

    let alignment = this.getAttribute('data-alignment');

    let show = this.getAttribute('data-show');

    let classList = ['dropdown-menu'];

    darkMode == 'true' ? classList.push('dropdown-menu-dark') : 0;

    alignment != undefined && alignment != null
      ? classList.push(`dropdown-menu-${alignment}`)
      : 0;

    show == 'true' ? classList.push('show') : 0;
    this.dropdownMenu.className = classList.join(' ');

    if (!this.shadowRoot.querySelector('ul')) {
      this.shadowRoot.appendChild(this.dropdownMenu);
    }
  }
}
