import styles from '!!raw-loader!./ButtonGroup.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<div></div>
<slot></slot>
`;

export default class FormCheckGroup extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.btnGroup = shadow.querySelector('div');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line no-unused-vars
    shadow.addEventListener('slotchange', (ev) => {
      // TODO: See CityOfDetroit/detroitmi#1099
      // eslint-disable-next-line prefer-const
      let tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        // TODO: See CityOfDetroit/detroitmi#1099
        // eslint-disable-next-line prefer-const
        let nodeClasses = node.className.split(' ');
        nodeClasses.includes('no-wc')
          ? node.remove()
          : this.btnGroup.append(node);
      });
    });
    // setting up styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const formSelectStyles = document.createElement('style');
    formSelectStyles.textContent = styles;
    shadow.appendChild(bootStyles);
    shadow.appendChild(variableStyles);
    shadow.appendChild(formSelectStyles);
  }

  connectedCallback() {
    // setting up styles
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let type = this.getAttribute('data-type');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let label = this.getAttribute('data-label');
    let size = this.getAttribute('data-size');
    let vertical = this.getAttribute('data-vertical');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let extraClasses = this.getAttribute('data-extra-classes');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    if (type == 'group') {
      this.btnGroup.role = 'group';
    } else {
      this.btnGroup.role = 'toolbar';
    }
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    if (size != undefined && size != null) {
      size = `btn-group-${size}`;
    }
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    if (vertical == 'true') {
      vertical = 'btn-group-vertical';
    }
    this.btnGroup.setAttribute('aria-label', label);
    this.btnGroup.className = [
      `btn-${type}`,
      `${size || ''}`,
      `${vertical || ''}`,
      `${extraClasses || ''}`,
    ].join(' ');
  }
}
