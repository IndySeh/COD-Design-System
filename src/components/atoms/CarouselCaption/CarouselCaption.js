import styles from '!!raw-loader!./CarouselCaption.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class CarouselCaption extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.carouselCaption = document.createElement('div');

    shadow.addEventListener('slotchange', (ev) => {
      const tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        this.carouselCaption.append(node);
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
    // Modal attributes

    const extraClasses = this.getAttribute('data-extra-classes');

    const carouselCaptionClasses = ['carousel-caption d-none d-md-block'];

    extraClasses != undefined && extraClasses != null
      ? carouselCaptionClasses.push(extraClasses)
      : 0;
    this.carouselCaption.className = carouselCaptionClasses.join(' ');
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.carouselCaption);
    }
  }
}
