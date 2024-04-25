import styles from '!!raw-loader!./TableCellHeader.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';
import {
  cellHeaderBlockClass,
  stackedTableClass,
} from '../../../shared/js/utilities';
import observedAttributeMixin from '../../../shared/js/observed-attribute-mixin';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

class TableCellHeader extends HTMLElement {
  static observedClassAttributes = {
    'data-stacked': stackedTableClass,
    'data-label-block': cellHeaderBlockClass,
  };
  static observedAttributes = Object.keys(this.observedClassAttributes);

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.tableCellHeader = document.createElement('th');

    shadow.addEventListener('slotchange', () => {
      const tempElements = Array.from(this.childNodes);
      tempElements.forEach((node) => {
        this.tableCellHeader.appendChild(node);
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

    shadow.appendChild(this.tableCellHeader);
  }

  connectedCallback() {
    // tableCellHeader attributes

    const stripedRow = this.getAttribute('data-striped-row');

    const stripedCol = this.getAttribute('data-striped-col');

    const verticalAlign = this.getAttribute('data-vertical-align');

    const extraClasses = this.getAttribute('data-extra-classes');

    verticalAlign != undefined && verticalAlign != null
      ? this.tableCellHeader.classList.add(verticalAlign)
      : 0;
    this.getAttribute('data-scrollable') === 'true'
      ? this.tableCellHeader.classList.add('table-scrollable')
      : 0;

    stripedRow == 'true'
      ? this.tableCellHeader.classList.add('table-striped')
      : 0;

    stripedCol == 'true'
      ? this.tableCellHeader.classList.add('table-striped-columns')
      : 0;

    extraClasses != undefined && extraClasses != null
      ? this.tableCellHeader.classList.add(extraClasses)
      : 0;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name in TableCellHeader.observedClassAttributes) {
      this.handleObservedClassAttribute(
        name,
        newValue,
        this.tableCellHeader,
        TableCellHeader.observedClassAttributes[name],
      );
    }
  }
}

// Apply mixins.
Object.assign(TableCellHeader.prototype, observedAttributeMixin);

export { TableCellHeader as default };
