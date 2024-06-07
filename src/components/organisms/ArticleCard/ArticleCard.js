import styles from '!!raw-loader!./ArticleCard.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');
template.innerHTML = `
<div class="card-container container-fluid px-0">
  <div class="img-placeholder"></div>
  <div class="text-container">
    <slot name="title"></slot>
    <div class="subtitle-container">
      <slot name="subtitle"></slot>
    </div>
  </div>
</div>
`;

class ArticleCard extends HTMLElement {
  static observedAttributes = [];

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

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
    this._replaceImgPlacehold();

    const color = this.getAttribute('color');
    const textContainer = this.shadowRoot.querySelector('.text-container');
    textContainer.classList.add(`bg-${color}`);
  }

  /**
   * Replaces the image placeholder with the actual image element.
   */
  _replaceImgPlacehold() {
    const img = document.createElement('img');
    img.classList.add('w-100');
    img.src = this.getAttribute('src');

    // Replace div with img element
    const imgPlaceholder = this.shadowRoot.querySelector('.img-placeholder');
    imgPlaceholder.replaceWith(img);
  }
}

export { ArticleCard as default };