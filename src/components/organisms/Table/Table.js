import styles from '!!raw-loader!./Table.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

import observedAttributeMixin from '../../../shared/js/observed-attribute-mixin';
import { handleTableStacked } from '../../../shared/js/utilities';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

class Table extends HTMLElement {
  static observedAttributeCbs = {
    'data-stacked': (component, oldValue, newValue) => {
      const tableHeader =
        component.shadowRoot.querySelector('cod-table-header');
      const tableBody = component.shadowRoot.querySelector('cod-table-body');
      if (newValue !== null) {
        tableHeader?.setAttribute('data-stacked');
        tableBody?.setAttribute('data-stacked');
      } else {
        tableHeader?.removeAttribute('data-stacked');
        tableBody?.removeAttribute('data-stacked');
      }
    },
    'data-label-block': (component, oldValue, newValue) => {
      const tableHeader =
        component.shadowRoot.querySelector('cod-table-header');
      const tableBody = component.shadowRoot.querySelector('cod-table-body');
      if (newValue !== null) {
        tableHeader?.setAttribute('data-label-block');
        tableBody?.setAttribute('data-label-block');
      } else {
        tableHeader?.removeAttribute('data-label-block');
        tableBody?.removeAttribute('data-label-block');
      }
    },
  };

  static observedAttributes = Object.keys(this.observedAttributeCbs);

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.tableContainer = document.createElement('div');
    this.table = document.createElement('table');
    this.tableContainer.appendChild(this.table);

    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line no-unused-vars
    shadow.addEventListener('slotchange', (e) => {
      // TODO: See CityOfDetroit/detroitmi#1099
      // eslint-disable-next-line prefer-const
      let tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        switch (node.tagName) {
          case 'COD-TABLE-HEADER':
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

            this.table.appendChild(node);
            break;

          case 'COD-TABLE-BODY':
            // TODO: See CityOfDetroit/detroitmi#1099
            // eslint-disable-next-line eqeqeq
            this.getAttribute('data-hover') == 'true'
              ? node.setAttribute('data-hover', 'true')
              : 0;
            // TODO: See CityOfDetroit/detroitmi#1099
            // eslint-disable-next-line eqeqeq
            this.getAttribute('data-striped-row') == 'true'
              ? node.setAttribute('data-striped-row', 'true')
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

            this.table.appendChild(node);
            break;

          default:
            // TODO: See CityOfDetroit/detroitmi#1099
            // eslint-disable-next-line no-case-declarations, prefer-const
            let nodeClasses = node.className.split(' ');
            nodeClasses.includes('no-wc') ? node.remove() : 0;
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

  connectedCallback() {
    // Table attributes
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let id = this.getAttribute('data-id');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let extraClasses = this.getAttribute('data-extra-classes');
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line prefer-const
    let tableClasses = ['table'];
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    extraClasses != undefined && extraClasses != null
      ? tableClasses.push(extraClasses)
      : 0;
    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line eqeqeq
    id != undefined && id != null ? (this.table.id = id) : 0;
    // Use bootstraps 'table-responsive' utility which styles the table as a
    // horizontally scrollable table.
    // https://getbootstrap.com/docs/5.3/content/tables/#responsive-tables
    this.getAttribute('data-scrollable') === 'true'
      ? (this.tableContainer.className = 'table-responsive')
      : 0;
    this.table.className = tableClasses.join(' ');
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.tableContainer);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name in Table.observedAttributeCbs) {
      this.handleObservedAttribute(
        oldValue,
        newValue,
        Table.observedAttributeCbs[name],
      );
    }
  }
}

// Apply mixins.
Object.assign(Table.prototype, observedAttributeMixin);

export { Table as default };
