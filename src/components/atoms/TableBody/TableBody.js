import styles from '!!raw-loader!./TableBody.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';
import {
  cellHeaderBlockClass,
  stackedTableClass,
  handleTableStacked,
} from '../../../shared/js/utilities';
import observedAttributeMixin from '../../../shared/js/observed-attribute-mixin';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

class TableBody extends HTMLElement {
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
    this.tableBody = document.createElement('tbody');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line no-unused-vars
    shadow.addEventListener('slotchange', (ev) => {
      // TODO: See CityOfDetroit/detroitmi#1099
      // eslint-disable-next-line prefer-const
      let tempElements = Array.from(this.children);
      tempElements.forEach((node, index) => {
        if (index === 0) {
          node.setIsFirst();
        } else if (index % 2 !== 0) {
          node.setIsOdd();
        }
        // TODO: See CityOfDetroit/detroitmi#1099
        // eslint-disable-next-line eqeqeq
        this.getAttribute('data-striped-row') == 'true' && index % 2 == 0
          ? node.setAttribute('data-striped-row', 'true')
          : 0;
        // TODO: See CityOfDetroit/detroitmi#1099
        // eslint-disable-next-line eqeqeq
        this.getAttribute('data-hover') == 'true'
          ? node.setAttribute('data-hover', 'true')
          : 0;
        // TODO: See CityOfDetroit/detroitmi#1099
        // eslint-disable-next-line eqeqeq
        this.getAttribute('data-striped-col') == 'true'
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

        this.tableBody.append(node);
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

    shadow.appendChild(this.tableBody);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name in TableBody.observedClassAttributes) {
      this.handleObservedClassAttribute(
        name,
        newValue,
        this.tableBody,
        TableBody.observedClassAttributes[name],
        () => {
          return this.shadowRoot.querySelectorAll('cod-table-row');
        },
      );
    }
  }
}

// Apply mixins.
Object.assign(TableBody.prototype, observedAttributeMixin);

export { TableBody as default };
