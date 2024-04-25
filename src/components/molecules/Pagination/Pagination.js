import styles from '!!raw-loader!./Pagination.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class Pagination extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.paginationContainer = document.createElement('nav');
    this.pagination = document.createElement('ul');

    this.shadowRoot.addEventListener('slotchange', () => {
      const tempElements = Array.from(this.children);
      tempElements.forEach((node, index) => {
        const paginationItem = document.createElement('li');

        const paginationItemClasses = ['page-item'];

        if (node.getAttribute('data-active') == 'true') {
          paginationItemClasses.push('active');
          paginationItem.setAttribute('aria-current', 'page');
        }

        if (node.getAttribute('data-disabled') == 'true') {
          paginationItemClasses.push('disabled');
          paginationItem.setAttribute('tabindex', '-1');
        }
        paginationItem.className = paginationItemClasses.join(' ');
        node.setAttribute('data-index', index);
        paginationItem.appendChild(node);

        const nodeClasses = node.className.split(' ');
        nodeClasses.includes('no-wc')
          ? node.remove()
          : this.pagination.append(paginationItem);
      });
    });
    this.paginationContainer.appendChild(this.pagination);

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

    const label = this.getAttribute('data-label');

    const id = this.getAttribute('data-id');

    const size = this.getAttribute('data-size');

    const extraClasses = this.getAttribute('data-extra-classes');

    const paginationClasses = ['pagination'];

    size != undefined && size != null
      ? paginationClasses.push(`pagination-${size}`)
      : 0;

    extraClasses != undefined && extraClasses != null
      ? paginationClasses.push(extraClasses)
      : 0;

    id != undefined && id != null ? (this.paginationContainer.id = id) : 0;
    this.paginationContainer.setAttribute('aria-label', label);
    this.pagination.className = paginationClasses.join(' ');
    if (!this.shadowRoot.querySelector('nav')) {
      this.shadowRoot.appendChild(this.paginationContainer);
    }
  }
}
