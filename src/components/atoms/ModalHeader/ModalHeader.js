import styles from '!!raw-loader!./ModalHeader.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class ModalHeader extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.modalHeader = document.createElement('div');
    this.modalTitle = document.createElement('div');
    this.closeBtn = document.createElement('cod-button');

    this.shadowRoot.addEventListener('slotchange', (ev) => {
      let tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        this.modalTitle.appendChild(node);
      });
    });
    this.modalHeader.appendChild(this.modalTitle);
    this.modalHeader.appendChild(this.closeBtn);

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

    let parentID = this.getAttribute('data-parent-id');

    let btnDark = this.getAttribute('data-button-dark');

    let extraClasses = this.getAttribute('data-extra-classes');

    let modalHeaderClasses = ['modal-header'];
    this.modalTitle.className = 'modal-title';
    this.modalTitle.id = `${parentID}-label`;
    this.closeBtn.setAttribute('data-img-alt', '');
    this.closeBtn.setAttribute('data-icon', '');
    this.closeBtn.setAttribute('data-close', 'true');
    this.closeBtn.setAttribute('data-bs-dismiss', 'modal');

    extraClasses != undefined && extraClasses != null
      ? modalHeaderClasses.push(extraClasses)
      : 0;

    btnDark == 'true'
      ? this.closeBtn.setAttribute('data-extra-classes', 'btn-close-white')
      : 0;
    this.modalHeader.className = modalHeaderClasses.join(' ');
    this.closeBtn.addEventListener('click', this._onClick);
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.modalHeader);
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
