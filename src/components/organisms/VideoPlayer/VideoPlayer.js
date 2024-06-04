import styles from '!!raw-loader!./VideoPlayer.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');
template.innerHTML = `
<div id="layoutContainer" class="d-flex justify-content-center">
  <button type="button" class="btn" id="modalOpenButton">
    <div class="container-fluid video-placehold player-container"></div>
  </button>

  <!-- Next line is an example of an open modal. -->
  <!--<div class="modal fade show" id="videoPlayerModal" tabindex="-1" aria-labelledby="videoPlayerModalLabel" style="display: block;" aria-modal="true" role="dialog">-->
  <div class="modal fade" id="videoPlayerModal" tabindex="-1" aria-labelledby="videoPlayerModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title visually-hidden" id="videoPlayerModalLabel">Video Title</h1>
          <button id="modalCloseButton" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="ytPlayerContainer"></div>
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

    // Set the playercontainer from the template for later use.
    this.playerContainer = this.shadowRoot.querySelector('#ytPlayerContainer');
    this.player = null;

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
    this._buildThumbnailDisplayMode();
    this._replacePlaceholderWithThumbnail();

    const playerDisplayMode = this.getAttribute('player-display');
    const videoType = this.getAttribute('video-type');
    const videoId = this.getAttribute('video-id');
    switch (playerDisplayMode) {
      case 'modal': {
        this._setModalOpenCloseEventHandlers();
        const videoPlayerLabel = this.shadowRoot.querySelector(
          '#videoPlayerModalLabel',
        );
        videoPlayerLabel.textContent = this.getAttribute('title');

        switch (videoType) {
          case 'youtube': {
            this._loadVideo(videoId);
            break;
          }
        }
      }
    }
  }

  /**
   * Updates the thumbnail display mode based on the 'thumbnail-display' attribute value.
   * @private
   */
  _buildThumbnailDisplayMode() {
    const thumbnailDisplayMode = this.getAttribute('thumbnail-display');
    const layoutContainer = this.shadowRoot.querySelector('#layoutContainer');
    switch (thumbnailDisplayMode) {
      case 'fullwidth': {
        layoutContainer.classList.add('w-100');
        break;
      }
      case 'inline': {
        layoutContainer.classList.remove('d-flex');
        layoutContainer.classList.add('d-inline-flex');
      }
    }
  }

  /**
   * Sets the event handlers for opening and closing the modal.
   * @private
   */
  _setModalOpenCloseEventHandlers() {
    const modalOpenButton = this.shadowRoot.querySelector('#modalOpenButton');
    modalOpenButton.addEventListener('click', this._onOpenModal.bind(this));

    const modalCloseButton = this.shadowRoot.querySelector('#modalCloseButton');
    modalCloseButton.addEventListener('click', this._onCloseModal.bind(this));

    const modal = this.shadowRoot.querySelector('#videoPlayerModal');
    modal.addEventListener('click', this._onClickOutsideModal.bind(this));
  }

  /**
   * Replaces the placeholder with a thumbnail image and play icon.
   * @private
   */
  _replacePlaceholderWithThumbnail() {
    const playerContainer = this.shadowRoot.querySelector(
      'div.video-placehold',
    );
    const imgSrc = this.getAttribute('thumbnail-src');
    const imgAlt = this.getAttribute('thumbnail-alt');
    const imgElt = document.createElement('img');
    imgElt.setAttribute('src', imgSrc);
    imgElt.setAttribute('alt', imgAlt);
    imgElt.classList.add('video-placehold', 'img-fluid');
    playerContainer.appendChild(imgElt);
    const playIcon = document.createElement('div');
    playIcon.classList.add('play-icon');
    playerContainer.appendChild(playIcon);
    playerContainer.classList.remove('video-placehold');
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onOpenModal.bind(this));
    this.removeEventListener('click', this._onCloseModal.bind(this));
  }

  /**
   * Opens the video player modal.
   * @private
   */
  _onOpenModal() {
    const videoModal = this.shadowRoot.querySelector('#videoPlayerModal');
    videoModal.classList.add('show');
    videoModal.style.display = 'block';
    videoModal.removeAttribute('aria-hidden');
    videoModal.setAttribute('aria-modal', 'true');
    videoModal.setAttribute('role', 'modal');
    this.player?.playVideo();
  }

  /**
   * Closes the video player modal and performs necessary cleanup actions.
   * @private
   */
  _onCloseModal() {
    const videoModal = this.shadowRoot.querySelector('#videoPlayerModal');
    videoModal.classList.remove('show');
    videoModal.style.display = 'none';
    videoModal.removeAttribute('aria-modal');
    videoModal.removeAttribute('role');
    videoModal.setAttribute('aria-hidden', 'true');
    this.player?.pauseVideo();
  }

  /**
   * Handles the click event outside the modal content.
   *
   * @param {Event} event - The click event object.
   * @returns {void}
   */
  _onClickOutsideModal(event) {
    if (!event.target.closest('.modal-content')) {
      this._onCloseModal();
    }
  }

  /**
   * Loads the video with the specified videoId.
   * If the YouTube API is already loaded, it creates the player immediately.
   * Otherwise, it loads the YouTube API and creates the player once it's ready.
   *
   * @param {string} videoId - The ID of the video to load.
   */
  _loadVideo(videoId) {
    if (window.YT) {
      this._createPlayer(videoId);
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        this._createPlayer(videoId);
      };
    }
  }

  /**
   * Creates a YouTube player instance and initializes it with the specified video.
   *
   * @param {string} videoId - The ID of the YouTube video to be played.
   * @returns {void}
   */
  _createPlayer(videoId) {
    // YT is defined by youtube iFrame API 3rd party script.
    // eslint-disable-next-line no-undef
    this.player = new YT.Player(this.playerContainer, {
      videoId: videoId,
      events: {},
    });
  }
}

export { VideoPlayer as default };
