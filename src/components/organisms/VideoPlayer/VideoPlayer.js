import styles from '!!raw-loader!./VideoPlayer.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');
template.innerHTML = `
<button type="button" class="btn">
  <div class="container-fluid video-placehold"></div>
</button>
`;

class VideoPlayer extends HTMLElement {
  static observedAttributes = [];

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

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
    const playerContainer = this.shadowRoot.querySelector(
      'div.video-placehold',
    );
    const imgSrc = this.getAttribute('thumbnail-src');
    const imgAlt = this.getAttribute('thumbnail-alt');
    const imgElt = document.createElement('img');
    imgElt.setAttribute('src', imgSrc);
    imgElt.setAttribute('alt', imgAlt);
    imgElt.classList.add('video-placehold');
    playerContainer.appendChild(imgElt);
    playerContainer.classList.remove('video-placehold');

    // TODO: Handle video src attributes and connect modal to button.
  }
}

export { VideoPlayer as default };
