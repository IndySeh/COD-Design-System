import styles from '!!raw-loader!./TableRow.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';
import {
  cellHeaderBlockClass,
  firstClass,
  oddClass,
  stackedTableClass,
  handleTableStacked,
} from '../../../shared/js/utilities';
import observedAttributeMixin from '../../../shared/js/observed-attribute-mixin';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

class TableRow extends HTMLElement {
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
    this.tableRow = document.createElement('tr');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line no-unused-vars
    shadow.addEventListener('slotchange', (ev) => {
      // TODO: See CityOfDetroit/detroitmi#1099
      // eslint-disable-next-line prefer-const
      let tempElements = Array.from(this.children);
      tempElements.forEach((node, index) => {
        // TODO: See CityOfDetroit/detroitmi#1099
        // eslint-disable-next-line eqeqeq
        this.getAttribute('data-striped-row') == 'true'
          ? node.setAttribute('data-striped-row', 'true')
          : 0;
        // TODO: See CityOfDetroit/detroitmi#1099
        // eslint-disable-next-line eqeqeq
        this.getAttribute('data-striped-col') == 'true' && index % 2 != 0
          ? node.setAttribute('data-striped-col', 'true')
          : 0;
        // TODO: See CityOfDetroit/detroitmi#1099
        // eslint-disable-next-line eqeqeq
        this.getAttribute('data-vertical-align') == 'true'
          ? node.setAttribute('data-vertical-align', 'true')
          : 0;
        this.getAttribute('data-scrollable') === 'true'
          ? node.setAttribute('data-scrollable', 'true')
          : 0;
        handleTableStacked(this, node);

        this.tableRow.append(node);
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

    shadow.appendChild(this.tableRow);
  }

  connectedCallback() {
    // TableRow attributes
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let extraClasses = this.getAttribute('data-extra-classes');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let hover = this.getAttribute('data-hover');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    hover == 'true' ? this.tableRow.classList.add('table-hover') : 0;
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    extraClasses != undefined && extraClasses != null
      ? this.tableRow.classList.add(extraClasses)
      : 0;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name in TableRow.observedClassAttributes) {
      this.handleObservedClassAttribute(
        name,
        newValue,
        this.tableRow,
        TableRow.observedClassAttributes[name],
        () => {
          return this.shadowRoot.querySelectorAll('cod-table-cell');
        },
      );
    }
  }

  setIsFirst(isFirst = true) {
    if (isFirst) {
      this.tableRow.classList.add(firstClass);
    } else {
      this.tableRow.classList.remove(firstClass);
    }
  }

  setIsOdd(isOdd = true) {
    if (isOdd) {
      this.tableRow.classList.add(oddClass);
    } else {
      this.tableRow.classList.remove(oddClass);
    }
  }
}

// Apply mixins.
Object.assign(TableRow.prototype, observedAttributeMixin);

export { TableRow as default };
