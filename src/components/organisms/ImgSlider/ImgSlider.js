import styles from '!!raw-loader!./ImgSlider.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot name="image-1"></slot>
<slot name="image-2"></slot>

<label>
<span class="visually-hidden js-label-text">
    Control how much of each overlapping image is shown. 
    0 means the first image is completely hidden and the second image is fully visible.
    100 means the first image is fully visible and the second image is completely hidden.
    50 means both images are half-shown, half-hidden.
</span>
<input type="range" value="50" min="0" max="100"/>
</label>
`;

class ImgSlider extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

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
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    ['input', 'change'].forEach((eventName) => {
      this.shadowRoot
        .querySelector('input')
        .addEventListener(eventName, ({ target }) => {
          if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

          this.animationFrame = requestAnimationFrame(() => {
            this.shadowRoot.host.style.setProperty(
              '--exposure',
              `${target.value}%`,
            );
          });
        });
    });

    const customLabel = this.shadowRoot.host.getAttribute('label-text');
    if (customLabel) {
      this.shadowRoot.querySelector('.js-label-text').textContent = customLabel;
    }
  }
}

export { ImgSlider as default };
