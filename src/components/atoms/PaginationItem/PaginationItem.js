import styles from '!!raw-loader!./PaginationItem.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

export default class PaginationItem extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
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
    // Nav attributes

    const url = this.getAttribute('data-url');

    const special = this.getAttribute('data-special');

    const label = this.getAttribute('data-label');

    const text = this.getAttribute('data-text');

    const disabled = this.getAttribute('data-disabled');

    const active = this.getAttribute('data-active');

    const extraClasses = this.getAttribute('data-extra-classes');

    const paginationItemClasses = ['page-link'];
    let paginationItem = null;
    let tag = null;

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    if (url != undefined && url != null) {
      // TODO: Fix old ESLint errors - see issue #1099
      // eslint-disable-next-line eqeqeq
      if (disabled == 'true') {
        paginationItemClasses.push('disabled');
        paginationItem = document.createElement('span');
        tag = 'span';
      } else {
        paginationItem = document.createElement('a');

        const cleanURL = encodeURI(url);
        paginationItem.href = decodeURI(cleanURL);
        tag = 'a';
      }
    } else {
      paginationItem = document.createElement('span');
      tag = 'span';
    }

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    active == 'true' ? paginationItemClasses.push('active') : 0;

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    extraClasses != undefined && extraClasses != null
      ? paginationItemClasses.push(extraClasses)
      : 0;

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    special != undefined && special != null
      ? this.setSpecialItem(special, paginationItem)
      : 0;

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    text != undefined && text != null ? (paginationItem.innerText = text) : 0;

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    label != undefined && label != null
      ? paginationItem.setAttribute('aria-label', label)
      : 0;
    paginationItem.className = paginationItemClasses.join(' ');
    if (!this.shadowRoot.querySelector(tag)) {
      this.shadowRoot.appendChild(paginationItem);
    }
  }

  setSpecialItem(special, paginationItem) {
    switch (special) {
      case 'first':
        paginationItem.innerHTML = `<span aria-hidden="true">«</span>`;
        break;

      case 'previous':
        paginationItem.innerHTML = `<span aria-hidden="true">‹</span>`;
        break;

      case 'next':
        paginationItem.innerHTML = `<span aria-hidden="true">›</span>`;
        break;

      case 'last':
        paginationItem.innerHTML = `<span aria-hidden="true">»</span>`;
        break;

      case 'ellipsiss':
        paginationItem.innerHTML = `<span aria-hidden="true">…</span>`;
        break;

      default:
        break;
    }
  }
}
