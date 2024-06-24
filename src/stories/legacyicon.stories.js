import '../components/atoms/LegacyIcon/cod-legacy-icon';
import { html } from 'lit-html';

export default {
  title: 'Components/Atoms/LegacyIcon',
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
  },
  args: {
    icon: 'neighborhoods',
    outlineColor: 'black',
  },
};

function _createLegacyIcon(args) {
  const legacyIconElt = document.createElement('cod-legacy-icon');
  legacyIconElt.setAttribute('icon', args.icon);
  legacyIconElt.setAttribute('outline-color', args.outlineColor);
  return legacyIconElt;
}

// Template
const Template = (args) => {
  return _createLegacyIcon(args);
};

export const Primary = Template.bind({});

export const IconGrid = () => {
  return html`
    <div class="row">
      <div class="col px-0 d-flex justify-content-center">
        <cod-legacy-icon icon="neighborhoods">
        </cod-legacy-icon>
      </div>
      <div class="col px-0 d-flex justify-content-center">
        <cod-legacy-icon icon="people">
        </cod-legacy-icon>
      </div>
      <div class="col px-0 d-flex justify-content-center">
        <cod-legacy-icon icon="sustainability">
        </cod-legacy-icon>
      </div>
    </div>
  `;
};
