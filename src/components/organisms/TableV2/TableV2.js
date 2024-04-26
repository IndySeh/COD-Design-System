import styles from '!!raw-loader!./TableV2.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

class TableV2 extends HTMLElement {
  static observedAttributes = [];

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
    // TODO: Add support for: scrollable,
    // custom extra classes, dark, hover, and
    // striped columns/rows.
    this.shadowRoot.append(...this.childNodes);
    this._addTableClasses();
    this._slotCells();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // TODO: Handle attr changes as well.
  }

  _addTableClasses() {
    const table = this.shadowRoot.querySelector('table');
    table.classList.add('table');

    const isStacked = this.hasAttribute('table-stacked');
    if (isStacked) {
      table.classList.add('table-stacked');
    }
  }

  _slotCells() {
    const cells = this.shadowRoot.querySelectorAll('td');
    const cellHeaders = this.shadowRoot.querySelectorAll('th');
    [...cells, ...cellHeaders].forEach((cellNode, idx) => {
      const children = cellNode.childNodes;
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
      const slotName = `slot-${idx}`;
      contentDiv.setAttribute('slot', slotName);
      contentDiv.append(...children);

      const slot = document.createElement('slot');
      slot.setAttribute('name', slotName);
      cellNode.appendChild(slot);

      this.appendChild(contentDiv);
    });
  }
}

export { TableV2 as default };