import styles from '!!raw-loader!./Breadcrumb.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
  </ol>
</nav>
<slot></slot>
`;

export default class Container extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.nav = shadow.querySelector('nav');
    this.breadcrumb = shadow.querySelector('ol');

    shadow.addEventListener('slotchange', () => {
      const tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        const nodeClasses = node.className.split(' ');
        if (nodeClasses.includes('no-wc')) {
          node.remove();
        } else {
          const crumb = this.querySelector('li');
          crumb && this.breadcrumb.append(crumb);
        }
      });
    });
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const breadcrumbStyles = document.createElement('style');
    breadcrumbStyles.textContent = styles;
    shadow.appendChild(bootStyles);
    shadow.appendChild(variableStyles);
    shadow.appendChild(breadcrumbStyles);
  }

  connectedCallback() {
    // Breadcrumb attributes

    const noDivider = this.getAttribute('data-no-divider');

    const svg = this.getAttribute('data-svg-divider');

    if (noDivider == 'true') {
      this.nav.style.cssText = "--bs-breadcrumb-divider: '';";
    }

    if (svg != undefined || svg != null) {
      this.nav.style.cssText = `--bs-breadcrumb-divider: url(${svg});`;
    }
    this.shadowRoot.appendChild(this.nav);
  }
}
