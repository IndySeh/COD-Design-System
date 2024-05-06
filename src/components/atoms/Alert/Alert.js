import styles from '!!raw-loader!./Alert.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class Alert extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.alert = document.createElement('div');
    const alertContent = document.createElement('div');
    alertContent.id = 'alert-content';
    this.alert.appendChild(alertContent);

    // TODO: See CityOfDetroit/detroitmi#1099
    // eslint-disable-next-line no-unused-vars
    shadow.addEventListener('slotchange', (ev) => {
      // TODO: See CityOfDetroit/detroitmi#1099
      // eslint-disable-next-line prefer-const
      let tempElements = Array.from(this.children);
      tempElements.forEach((node) => {
        const nodeClasses = node.className.split(' ');
        nodeClasses.includes('no-wc')
          ? node.remove()
          : this.alert.querySelector('#alert-content').append(node);
      });
    });
  }

  connectedCallback() {
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const alertStyles = document.createElement('style');
    alertStyles.textContent = styles;
    this.shadowRoot.appendChild(bootStyles);
    this.shadowRoot.appendChild(variableStyles);
    this.shadowRoot.appendChild(alertStyles);

    // alert attributes

    const icon = this.getAttribute('data-icon');

    const iconOrder = this.getAttribute('data-icon-order');

    const iconSize = this.getAttribute('data-icon-size');

    const backgroundColor = this.getAttribute('data-background-color');

    const extraClasses = this.getAttribute('data-extra-classes');
    this.alert.role = 'alert';
    let iconClass = '';

    // TODO: Fix old ESLint errors - see issue #1099
    // eslint-disable-next-line eqeqeq
    if (icon != undefined && icon != null) {
      this.alert.querySelector('#alert-content').className = 'col';

      const activeIcon = document.createElement('cod-icon');
      activeIcon.setAttribute('data-icon', icon);
      activeIcon.setAttribute('data-size', iconSize);

      const iconContainer = document.createElement('div');
      iconContainer.appendChild(activeIcon);
      iconClass = 'd-flex';
      switch (iconOrder) {
        case 'left':
          iconContainer.className = 'pe-2 m-0';
          this.alert.insertBefore(
            iconContainer,
            this.alert.querySelector('#alert-content'),
          );
          break;

        case 'right':
          iconContainer.className = 'ps-2 m-0';
          this.alert.appendChild(iconContainer);
          break;

        default:
          break;
      }
    }
    this.alert.className = [
      'alert',
      `alert-${backgroundColor || ''}`,
      `${extraClasses || ''}`,
      iconClass,
    ].join(' ');
    this.shadowRoot.appendChild(this.alert);

        // Check if the alert is closeable
        const isCloseable = this.hasAttribute('closeable');

        if (isCloseable) {
            // Add close button
            const closeButton = document.createElement('cod-button');
            closeButton.className = 'btn-close';
            closeButton.addEventListener('click', () => this.remove());
            this.alert.appendChild(closeButton);
        }
  }
}
