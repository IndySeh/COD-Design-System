import styles from '!!raw-loader!./Modal.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class Modal extends HTMLElement {
  static get observedAttributes() {
    return ['data-show'];
  }

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.modal = document.createElement('div');
    this.modalDialog = document.createElement('div');
    this.modalContent = document.createElement('div');
    this.modalHeader = document.createElement('div');
    this.modalBody = document.createElement('div');
    this.modalFooter = document.createElement('div');
    this.modalDialog.appendChild(this.modalContent);
    this.modal.appendChild(this.modalDialog);

    shadow.addEventListener('slotchange', () => {
      const tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        switch (node.tagName) {
          case 'COD-MODAL-HEADER':
            this.getAttribute('data-show') == 'true'
              ? node.setAttribute('data-show', true)
              : 0;

            this.getAttribute('data-button-dark') == 'true'
              ? node.setAttribute('data-button-dark', true)
              : 0;
            this.modalHeader.appendChild(node);
            this.modalContent.appendChild(this.modalHeader);
            break;

          case 'COD-MODAL-BODY':
            this.modalBody.appendChild(node);
            this.modalContent.appendChild(this.modalBody);
            break;

          case 'COD-MODAL-FOOTER':
            this.modalFooter.appendChild(node);
            this.modalContent.appendChild(this.modalFooter);
            break;

          default:
            break;
        }
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

  attributeChangedCallback(name, oldValue, newValue) {
    const tempClasses = this.modal.className.split(' ');

    const popValue = tempClasses.pop();

    popValue != 'show' ? tempClasses.push(popValue) : 0;

    if (newValue == 'true') {
      tempClasses.push('show');
      this.modal.style.display = 'block';

      if (this.getAttribute('data-static') != 'true') {
        this.modal.addEventListener('click', this._onClick);
      }
      this.modal.className = tempClasses.join(' ');
    } else {
      this.modal.className = tempClasses.join(' ');
      setTimeout(() => {
        this.modal.style.display = 'none';
      }, 500);
    }
  }

  connectedCallback() {
    // Modal attributes

    const bStatic = this.getAttribute('data-static');

    const id = this.getAttribute('data-id');

    const show = this.getAttribute('data-show');

    const verticalCentered = this.getAttribute('data-vertical-centered');

    const size = this.getAttribute('data-size');

    const fullScreen = this.getAttribute('data-full-screen');

    const extraClasses = this.getAttribute('data-extra-classes');

    const modalClasses = ['modal fade'];

    const modalDialogClasses = ['modal-dialog'];

    const modalContentClasses = ['modal-content'];

    extraClasses != undefined && extraClasses != null
      ? modalClasses.push(extraClasses)
      : 0;

    size != undefined && size != null
      ? modalDialogClasses.push(`modal-${size}`)
      : 0;

    verticalCentered == 'true'
      ? modalDialogClasses.push('modal-dialog-centered')
      : 0;

    if (fullScreen != undefined && fullScreen != null) {
      fullScreen == 'always'
        ? modalDialogClasses.push('modal-fullscreen')
        : modalDialogClasses.push(`modal-fullscreen-${fullScreen}-down`);
    }

    if (bStatic == 'true') {
      this.modal.setAttribute('data-bs-backdrop', 'static');
      this.modal.setAttribute('data-bs-keyboard', 'false');
    }

    if (show == 'true') {
      this.modalClasses.push('show');
      this.modal.setAttribute('aria-modal', `true`);
    } else {
      this.modal.setAttribute('aria-modal', `false`);
    }

    id != undefined && id != null ? (this.modal.id = id) : 0;
    this.modal.setAttribute('tabindex', -1);
    this.modal.className = modalClasses.join(' ');
    this.modalDialog.className = modalDialogClasses.join(' ');
    this.modalContent.className = modalContentClasses.join(' ');
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.modal);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick.bind(this));
  }

  _onClick() {
    this.getRootNode().host.setAttribute('data-show', 'false');
  }
}
