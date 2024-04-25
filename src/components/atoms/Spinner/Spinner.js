import styles from '!!raw-loader!./Spinner.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';
export default class Image extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root

    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // setting up styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const spinnerStyles = document.createElement('style');
    spinnerStyles.textContent = styles;
    this.shadowRoot.appendChild(bootStyles);
    this.shadowRoot.appendChild(variableStyles);
    this.shadowRoot.appendChild(spinnerStyles);
    // image attributes

    const spinnerType = this.getAttribute('data-type');

    const spinnerSize = this.getAttribute('data-size');

    const backgroundColor = this.getAttribute('data-background-color');

    const displayType = this.getAttribute('data-display-type');
    let spinnerSizeClass;

    if (spinnerSize == 'sm') {
      spinnerSizeClass = `spinner-${spinnerType}-${spinnerSize}`;
    } else {
      spinnerSizeClass = '';
    }
    let spinner;

    displayType == 'inline'
      ? (spinner = document.createElement('span'))
      : (spinner = document.createElement('div'));
    spinner.className = [
      `spinner-${spinnerType || ''}`,
      spinnerSizeClass,
      `text-${backgroundColor || ''}`,
    ].join(' ');
    spinner.role = 'status';

    const pLoading = document.createElement('span');
    pLoading.innerText = 'Loading...';
    pLoading.className = 'visually-hidden';
    spinner.appendChild(pLoading);
    this.shadowRoot.appendChild(spinner);
  }
}
