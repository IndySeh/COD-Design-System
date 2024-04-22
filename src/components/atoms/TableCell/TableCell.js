import styles from '!!raw-loader!./TableCell.css';
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

class TableCell extends HTMLElement {
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
    this.tableCell = document.createElement('td');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line no-unused-vars
    shadow.addEventListener('slotchange', (ev) => {
      const tempElements = ev.target.assignedNodes();
      tempElements.forEach((node) => {
        // Only accept HTMLElements or non-empty text nodes.
        if (
          node.nodeType !== Node.TEXT_NODE ||
          !/^\s*$/.test(node.textContent)
        ) {
          const contentDiv = document.createElement('div');
          contentDiv.classList.add('content');
          contentDiv.appendChild(node);
          this.tableCell.appendChild(contentDiv);
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

    shadow.appendChild(this.tableCell);
  }

  connectedCallback() {
    // TableCell attributes
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let stripedRow = this.getAttribute('data-striped-row');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let stripedCol = this.getAttribute('data-striped-col');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let verticalAlign = this.getAttribute('data-vertical-align');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let extraClasses = this.getAttribute('data-extra-classes');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    verticalAlign != undefined && verticalAlign != null
      ? this.tableCell.classList.add(verticalAlign)
      : 0;
    this.getAttribute('data-scrollable') === 'true'
      ? this.tableCell.classList.add('table-scrollable')
      : 0;
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    stripedRow == 'true' ? this.tableCell.classList.add('table-striped') : 0;
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    stripedCol == 'true'
      ? this.tableCell.classList.add('table-striped-columns')
      : 0;
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    extraClasses != undefined && extraClasses != null
      ? this.tableCell.classList.add(extraClasses)
      : 0;

    const dataLabel = this.getAttribute('data-label');
    if (dataLabel) {
      this.tableCell.setAttribute('data-label', dataLabel);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name in TableCell.observedClassAttributes) {
      this.handleObservedClassAttribute(
        name,
        newValue,
        this.tableCell,
        TableCell.observedClassAttributes[name],
      );
    }
  }
}

// Apply mixins.
Object.assign(TableCell.prototype, observedAttributeMixin);

export { TableCell as default };
