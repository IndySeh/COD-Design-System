import styles from '!!raw-loader!./VideoPlayer.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');
template.innerHTML = `
<div>
  <button type="button" class="btn" id="modalOpenButton">
    <div class="container-fluid video-placehold"></div>
  </button>

  <!--<div class="modal fade show" id="videoPlayerModal" tabindex="-1" aria-labelledby="videoPlayerModalLabel" style="display: block;" aria-modal="true" role="dialog">-->
  <div class="modal fade" id="videoPlayerModal" tabindex="-1" aria-labelledby="videoPlayerModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title visually-hidden" id="videoPlayerModalLabel">Video Title</h1>
          <button id="modalCloseButton" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p> Test Video </p>
        </div>
      </div>
    </div>
  </div>
</div>
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

    const modalOpenButton = this.shadowRoot.querySelector('#modalOpenButton');
    modalOpenButton.addEventListener('click', this._onOpenModal.bind(this));

    const modalCloseButton = this.shadowRoot.querySelector('#modalCloseButton');
    modalCloseButton.addEventListener('click', this._onCloseModal.bind(this));

    const videoPlayerLabel = this.shadowRoot.querySelector('#videoPlayerModalLabel');
    videoPlayerLabel.textContent = this.getAttribute('title');

    // TODO: Handle video src attributes.
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onOpenModal.bind(this));
    this.removeEventListener('click', this._onCloseModal.bind(this));
  }

  _onOpenModal() {
    const videoModal = this.shadowRoot.querySelector('#videoPlayerModal');
    videoModal.classList.add('show');
    videoModal.style.display = 'block';
    videoModal.removeAttribute('aria-hidden');
    videoModal.setAttribute('aria-modal', 'true');
    videoModal.setAttribute('role', 'modal');
  }

  _onCloseModal() {
    const videoModal = this.shadowRoot.querySelector('#videoPlayerModal');
    videoModal.classList.remove('show');
    videoModal.style.display = 'none';
    videoModal.removeAttribute('aria-modal');
    videoModal.removeAttribute('role');
    videoModal.setAttribute('aria-hidden', 'true');
  }
}

export { VideoPlayer as default };
