import styles from '!!raw-loader!./Progress.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';
export default class Progress extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // setting up styles
    const bootStyles = document.createElement('style');
    bootStyles.textContent = bootstrapStyles;
    const variableStyles = document.createElement('style');
    variableStyles.textContent = varStyles;
    const progressStyles = document.createElement('style');
    progressStyles.textContent = styles;
    this.shadowRoot.appendChild(bootStyles);
    this.shadowRoot.appendChild(variableStyles);
    this.shadowRoot.appendChild(progressStyles);
    // progress attributes

    const striped = this.getAttribute('data-type');

    const label = this.getAttribute('data-label');

    const ariaLabel = this.getAttribute('data-aria-label');

    const animated = this.getAttribute('data-animated');

    const value = this.getAttribute('data-value');

    const backgroundColor = this.getAttribute('data-background-color');

    const stacked = this.getAttribute('data-multi-bars');
    const progressContainer = document.createElement('div');

    if (stacked == 'undefined' || stacked == 'null') {
      const bar = document.createElement('div');
      bar.role = 'progressbar';
      bar.setAttribute('aria-label', ariaLabel);
      bar.setAttribute('aria-valuenow', value);
      bar.className = 'progress';
      const barBody = document.createElement('div');
      barBody.style = `width: ${value}%`;

      if (label != 'undefined' && label != 'null') {
        barBody.innerText = label;
      }
      barBody.className = [
        'progress-bar',
        `progress-bar-${animated || ''}`,
        `progress-bar-${striped || ''}`,
        `bg-${backgroundColor || ''}`,
      ].join(' ');
      bar.appendChild(barBody);
      progressContainer.appendChild(bar);
    } else {
      progressContainer.className = 'progress-stacked';
      this.buildBar(JSON.parse(stacked), progressContainer);
    }
    this.shadowRoot.appendChild(progressContainer);
  }

  buildBar(bars, barContainer) {
    bars.forEach((bar) => {
      const tempBar = document.createElement('div');
      tempBar.role = 'progressbar';
      tempBar.setAttribute('aria-label', bar.ariaLabel);
      tempBar.setAttribute('aria-valuenow', bar.value);
      tempBar.setAttribute('aria-valuemin', '0');
      tempBar.setAttribute('aria-valuemax', '100');
      tempBar.className = 'progress';
      const barBody = document.createElement('div');
      tempBar.style = `width: ${bar.value}%`;

      bar.label == undefined || bar.label == null
        ? ''
        : (barBody.innerText = bar.label);
      barBody.className = [
        'progress-bar',
        `progress-bar-${bar.animated || ''}`,
        `progress-bar-${bar.striped || ''}`,
        `bg-${bar.backgroundColor || ''}`,
      ].join(' ');
      tempBar.appendChild(barBody);
      barContainer.appendChild(tempBar);
    });
  }
}
