import styles from '!!raw-loader!./Carousel.css';
import varStyles from '!!raw-loader!../../../shared/variables.css';
import bootstrapStyles from '!!raw-loader!../../../shared/themed-bootstrap.css';

const template = document.createElement('template');

template.innerHTML = `
<slot></slot>
`;

export default class Carousel extends HTMLElement {
  static get observedAttributes() {
    return ['data-active-item'];
  }

  constructor() {
    // Always call super first in constructor
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
    this.carousel = document.createElement('div');
    this.carouselIndicators = document.createElement('div');
    this.carouselIndicators.className = 'carousel-indicators';
    this.carouselInner = document.createElement('div');
    this.carouselInner.className = 'carousel-inner';
    this.carouselPrev = document.createElement('button');
    this.carouselNext = document.createElement('button');

    if (this.getAttribute('data-no-controls') != 'true') {
      if (this.getAttribute('data-external-controls') == 'true') {
        this.carouselPrev.className = 'carousel-control-prev position-relative';
        this.carouselNext.className = 'carousel-control-next position-relative';
      } else {
        this.carouselPrev.className = 'carousel-control-prev';
        this.carouselNext.className = 'carousel-control-next';
      }
      this.carouselPrev.type = 'button';
      this.carouselPrev.setAttribute(
        'data-bs-target',
        `#${this.getAttribute('data-id')}`,
      );
      this.carouselPrev.setAttribute('data-bs-slide', 'prev');

      const prevIcon = document.createElement('span');
      prevIcon.className = 'carousel-control-prev-icon';
      prevIcon.setAttribute('aria-hidden', 'true');
      this.carouselPrev.appendChild(prevIcon);

      const prevText = document.createElement('span');
      prevText.className = 'visually-hidden';
      prevText.innerText = 'Previous';
      this.carouselPrev.appendChild(prevText);
      this.carouselNext.type = 'button';
      this.carouselNext.setAttribute(
        'data-bs-target',
        `#${this.getAttribute('data-id')}`,
      );
      this.carouselNext.setAttribute('data-bs-slide', 'next');

      const nextIcon = document.createElement('span');
      nextIcon.className = 'carousel-control-next-icon';
      nextIcon.setAttribute('aria-hidden', 'true');
      this.carouselNext.appendChild(nextIcon);

      const nextText = document.createElement('span');
      nextText.className = 'visually-hidden';
      nextText.innerText = 'Next';
      this.carouselNext.appendChild(nextText);

      // Adding event listener to controls
      this.carouselPrev.addEventListener('click', this._onClick);
      this.carouselNext.addEventListener('click', this._onClick);
      this.carousel.appendChild(this.carouselPrev);
      this.carousel.appendChild(this.carouselInner);
      this.carousel.appendChild(this.carouselNext);
    } else {
      this.carousel.appendChild(this.carouselInner);
    }

    shadow.addEventListener('slotchange', (e) => {
      const tempElements = Array.from(this.children);
      let tempElementsCount = 0;
      tempElements.forEach((node, index) => {
        if (node.tagName == 'COD-CAROUSEL-ITEM') {
          tempElementsCount += 1;

          const tempItem = document.createElement('div');
          tempItem.setAttribute('data-index', index);

          if (node.getAttribute('data-active') == 'true') {
            tempItem.className = 'carousel-item active';
            this.setAttribute('data-active-item', index);
          } else {
            tempItem.className = 'carousel-item';
          }

          node.getAttribute('data-interval') != undefined &&
          node.getAttribute('data-interval') != null
            ? tempItem.setAttribute(
                'data-bs-interval',
                node.getAttribute('data-interval'),
              )
            : 0;
          tempItem.appendChild(node);
          this.carouselInner.appendChild(tempItem);

          if (this.getAttribute('data-indicator') == 'true') {
            const tempIndicator = document.createElement('button');
            tempIndicator.type = 'button';
            tempIndicator.setAttribute(
              'data-bs-target',
              `#${this.getAttribute('data-id')}`,
            );
            tempIndicator.setAttribute('data-bs-slide-to', index);
            tempIndicator.setAttribute('aria-label', `Slide ${index}`);

            if (node.getAttribute('data-active') == 'true') {
              tempIndicator.className = 'active';
              tempIndicator.setAttribute('aria-current', 'true');
            }
            tempIndicator.addEventListener('click', this._onClick);
            this.carouselIndicators.appendChild(tempIndicator);
            this.carousel.appendChild(this.carouselIndicators);
          }
        }
        tempElementsCount
          ? this.setAttribute('data-total-items', tempElementsCount)
          : 0;

        const nodeClasses = node.className.split(' ');
        nodeClasses.includes('no-wc') ? node.remove() : 0;
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != null) {
      const oldItem = this.carouselInner.querySelector(
        `[data-index="${oldValue}"`,
      );

      const newItem = this.carouselInner.querySelector(
        `[data-index="${newValue}"`,
      );

      if (this.getAttribute('data-indicator') == 'true') {
        this.carouselIndicators.querySelector(
          `[data-bs-slide-to="${oldValue}"`,
        ).className = '';
        this.carouselIndicators.querySelector(
          `[data-bs-slide-to="${newValue}"`,
        ).className = 'active';
      }

      if (this.getAttribute('data-direction') == 'next') {
        oldItem.className = 'carousel-item active carousel-item-start';
        newItem.className =
          'carousel-item carousel-item-next carousel-item-start';
      } else {
        oldItem.className = 'carousel-item active carousel-item-end';
        newItem.className =
          'carousel-item carousel-item-prev carousel-item-end';
      }
      setTimeout(() => {
        oldItem.className = 'carousel-item';
        newItem.className = 'carousel-item active';
      }, 500);
    }
  }

  connectedCallback() {
    // Modal attributes

    const id = this.getAttribute('data-id');

    const crossfade = this.getAttribute('data-crossfade');

    const autoplay = this.getAttribute('data-autoplay');

    const noTouch = this.getAttribute('data-no-touch');

    const extraClasses = this.getAttribute('data-extra-classes');

    const externalControls = this.getAttribute('data-external-controls');

    const carouselClasses = ['carousel slide'];

    extraClasses != undefined && extraClasses != null
      ? carouselClasses.push(extraClasses)
      : 0;

    crossfade == 'true' ? carouselClasses.push('carousel-fade') : 0;

    externalControls == 'true' ? carouselClasses.push('d-flex') : 0;

    noTouch == 'false'
      ? this.carousel.setAttribute('data-bs-touch', 'false')
      : 0;

    if (autoplay != undefined && autoplay != null) {
      autoplay == 'true'
        ? this.carousel.setAttribute('data-bs-ride', autoplay)
        : this.carousel.setAttribute('data-bs-ride', 'carousel');
    }

    id != undefined && id != null ? (this.carousel.id = id) : 0;
    this.carousel.className = carouselClasses.join(' ');
    if (!this.shadowRoot.querySelector('div')) {
      this.shadowRoot.appendChild(this.carousel);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick.bind(this));
  }

  _onClick(e) {
    const activeItem = this.getRootNode().host.getAttribute('data-active-item');

    const totalItems = this.getRootNode().host.getAttribute('data-total-items');

    if (this.getAttribute('data-bs-slide') == undefined) {
      if (this.getAttribute('data-bs-slide-to') > activeItem) {
        this.getRootNode().host.setAttribute('data-direction', 'prev');
        this.getRootNode().host.setAttribute(
          'data-active-item',
          this.getAttribute('data-bs-slide-to'),
        );
      } else {
        this.getRootNode().host.setAttribute('data-direction', 'next');
        this.getRootNode().host.setAttribute(
          'data-active-item',
          this.getAttribute('data-bs-slide-to'),
        );
      }
    } else {
      const activeItem = this.getRootNode().host.getAttribute('data-active-item');

      const totalItems = this.getRootNode().host.getAttribute('data-total-items');

      if (this.getAttribute('data-bs-slide') == 'prev') {
        this.getRootNode().host.setAttribute('data-direction', 'prev');
        parseInt(activeItem) - 1 >= 0
          ? this.getRootNode().host.setAttribute(
              'data-active-item',
              parseInt(activeItem) - 1,
            )
          : this.getRootNode().host.setAttribute(
              'data-active-item',
              parseInt(totalItems) - 1,
            );
      } else {
        this.getRootNode().host.setAttribute('data-direction', 'next');
        parseInt(activeItem) + 1 < parseInt(totalItems)
          ? this.getRootNode().host.setAttribute(
              'data-active-item',
              parseInt(activeItem) + 1,
            )
          : this.getRootNode().host.setAttribute('data-active-item', 0);
      }
    }
  }
}
