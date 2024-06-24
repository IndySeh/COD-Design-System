import '../components/atoms/LegacyButton/cod-legacy-button';
import { html } from 'lit-html';

export default {
  title: 'Components/Atoms/LegacyButton',
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [
        'neighborhoods',
        'housing',
        'people',
        'sustainability',
        'safety',
        'commerce',
      ],
      description: 'The type of icon to use for the button.',
    },
    outlineColor: {
      control: { type: 'text' },
      description: 'The color to be used as the outline of the icon.',
    },
    label: {
      control: { type: 'text' },
      description: 'The label of the button. Custom markdown is supported.',
    },
    href: {
      control: { type: 'text' },
      description: 'The URL of where the button will link to.',
    },
    target: {
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where the new URL will open.',
    },
  },
  args: {
    icon: 'neighborhoods',
    outlineColor: 'black',
    label:
      '<h3 class="text-center" style="text-transform: uppercase; font-weight: 500;">Neighborhoods</h3>',
    href: 'https://www.example.com',
    target: '_blank',
  },
};

function _containsHTMLTags(str) {
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

function _createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

function _createLegacyButton(args) {
  const legacyButtonElt = document.createElement('cod-legacy-button');
  if (_containsHTMLTags(args.label)) {
    const label = _createElementFromHTML(args.label);
    label.slot = 'label';
    legacyButtonElt.appendChild(label);
  } else {
    const label = document.createElement('span');
    label.innerText = args.title;
    label.classList.add('text-center');
    label.slot = 'label';
    legacyButtonElt.appendChild(label);
  }
  legacyButtonElt.setAttribute('icon', args.icon);
  legacyButtonElt.setAttribute('outline-color', args.outlineColor);
  legacyButtonElt.setAttribute('href', args.href);
  legacyButtonElt.setAttribute('target', args.target);
  return legacyButtonElt;
}

// Template
const Template = (args) => {
  return _createLegacyButton(args);
};

export const Primary = Template.bind({});

export const ButtonGrid = () => {
  return html`
    <div class="row">
      <div class="col px-0 d-flex justify-content-center">
        <cod-legacy-button
          icon="neighborhoods"
          href="https://www.example.com"
          target="_blank"
        >
          <h3
            class="text-center"
            style="text-transform: uppercase; font-weight: 500;"
            slot="label"
          >
            Neighborhoods
          </h3>
        </cod-legacy-button>
      </div>
      <div class="col px-0 d-flex justify-content-center">
        <cod-legacy-button
          icon="people"
          href="https://www.example.com"
          target="_blank"
        >
          <h3
            class="text-center"
            style="text-transform: uppercase; font-weight: 500;"
            slot="label"
          >
            People
          </h3>
        </cod-legacy-button>
      </div>
      <div class="col px-0 d-flex justify-content-center">
        <cod-legacy-button
          icon="sustainability"
          href="https://www.example.com"
          target="_blank"
        >
          <h3
            class="text-center"
            style="text-transform: uppercase; font-weight: 500;"
            slot="label"
          >
            Sustainability
          </h3>
        </cod-legacy-button>
      </div>
    </div>
  `;
};
