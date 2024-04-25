import styles from '!!raw-loader!./ModalFooter.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class ModalFooter extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.modalFooter = document.createElement('div');
    this.closeBtn = document.createElement('cod-button');

    this.shadowRoot.addEventListener('slotchange', (ev) => {
      let tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        this.modalFooter.appendChild(node);
      });
    });
    this.modalFooter.appendChild(this.closeBtn);

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

    let btnExtraClasses = this.getAttribute('data-button-extra-classes');

    let extraClasses = this.getAttribute('data-extra-classes');

    let modalFooterClasses = ['modal-footer'];
    this.closeBtn.setAttribute('data-img-alt', '');
    this.closeBtn.setAttribute('data-icon', '');
    this.closeBtn.setAttribute('data-label', 'Close');
    this.closeBtn.setAttribute('data-bs-dismiss', 'modal');

    extraClasses != undefined && extraClasses != null
      ? modalFooterClasses.push(extraClasses)
      : 0;

    btnExtraClasses != undefined && btnExtraClasses != null
      ? this.closeBtn.setAttribute('data-extra-classes', btnExtraClasses)
      : 0;
    this.modalFooter.className = modalFooterClasses.join(' ');
    this.closeBtn.addEventListener('click', this._onClick);
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.modalFooter);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick.bind(this));
  }

  _onClick(e) {
    this.getRootNode()
      .host.getRootNode()
      .host.setAttribute('data-show', 'false');
  }
}
