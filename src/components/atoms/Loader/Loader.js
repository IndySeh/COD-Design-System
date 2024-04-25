import styles from '!!raw-loader!./Loader.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
export default class Loader extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root

    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    this.shadowRoot.appendChild(variableStyles);
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = styles;
    // Loader attributes
    this.shadowRoot.appendChild(loaderStyles);
    const loader = document.createElement('article');

    const color = this.getAttribute('data-color');
    loader.className = ['cod-loader', `cod-loader--${color || 'color-1'}`].join(
      ' ',
    );
    loader.innerHTML = `
    <article class="cod-loader-container">
        <article>
        <div class="cod-loader-bars">
            <div class="cod-loader__bar"></div>
            <div class="cod-loader__bar"></div>
            <div class="cod-loader__bar"></div>
            <div class="cod-loader__bar"></div>
            <div class="cod-loader__bar"></div>
            <div class="cod-loader__ball"></div>
        </div>
        <p>LOADING</p>
        </article>
    </article>`;
    this.shadowRoot.appendChild(loader);
  }
}
