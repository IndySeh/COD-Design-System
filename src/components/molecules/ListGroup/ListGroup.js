import styles from '!!raw-loader!./ListGroup.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class FormCheckGroup extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.listGroup = null;
    // setting up styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const listGroupStyles = document.createElement('style');
    listGroupStyles.textContent = styles;
    shadow.appendChild(bootStyles);
    shadow.appendChild(variableStyles);
    shadow.appendChild(listGroupStyles);
  }

  connectedCallback() {
    // setting up styles

    const tag = this.getAttribute('data-tag');
    let flushed = this.getAttribute('data-flushed');
    let numbered = this.getAttribute('data-numbered');
    let horizontal = this.getAttribute('data-horizontal');

    const extraClasses = this.getAttribute('data-extra-classes');
    this.listGroup = document.createElement(tag);

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    flushed == 'true' ? (flushed = 'list-group-flush') : (flushed = null);

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    numbered == 'true' ? (numbered = 'list-group-numbered') : (numbered = null);

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    horizontal == 'true'
      ? (horizontal = 'list-group-horizontal')
      : (horizontal = null);
    this.listGroup.className = [
      `list-group`,
      `${flushed || ''}`,
      `${numbered || ''}`,
      `${horizontal || ''}`,
      `${extraClasses || ''}`,
    ].join(' ');

    if (!this.shadowRoot.querySelector(tag)) {
      this.shadowRoot.addEventListener('slotchange', () => {
        const tempElements = Array.from(this.children);

        const tempLength = tempElements.length;
        tempElements.forEach((node, index) => {
          let pClasses = null;
          switch (index) {
            case 0:
              node.setAttribute('data-order', 'first');
              break;

            case tempLength - 1:
              node.setAttribute('data-order', 'last');
              break;

            default:
              node.setAttribute('data-order', 'middle');
              break;
          }
          if (flushed) {
            pClasses = `${flushed} `;
          }
          if (numbered) {
            pClasses = `${numbered} `;
            node.setAttribute('data-order-index', index + 1);
          }
          if (horizontal) {
            pClasses = `${horizontal} `;
          }
          if (pClasses) {
            node.setAttribute('data-parent-classes', pClasses);
          }

          const nodeClasses = node.className.split(' ');
          nodeClasses.includes('no-wc')
            ? node.remove()
            : this.listGroup.append(node);
        });
      });
      this.shadowRoot.appendChild(this.listGroup);
    }
  }
}
