import styles from '!!raw-loader!./Image.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
  <picture></picture>
  <slot></slot>
`;

export default class Image extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    // Create select and move options from slot to select
    this.picture = shadow.querySelector('picture');

    shadow.addEventListener('slotchange', (ev) => {
      const tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        this.picture.append(node);
      });
    });
    // setting up styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const imageStyles = document.createElement('style');
    imageStyles.textContent = styles;
    this.shadowRoot.appendChild(bootStyles);
    this.shadowRoot.appendChild(variableStyles);
    this.shadowRoot.appendChild(imageStyles);
  }
}
