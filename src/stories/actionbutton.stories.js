import { html } from 'lit-html';
import '../components/atoms/ActionButton/cod-action-button';
import '../components/atoms/Icon/cod-icon';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  component: 'cod-action-button',
  title: 'Components/Atoms/ActionButton',
  // 👇 Creates specific argTypes
  argTypes: {
    // TODO: Make this attr name and accepted 
    // values consistent with other action button, progress bar, 
    // etc. Issue #202.
    buttonColor: {
      options: [
        'btn-outline-primary',
        'btn-outline-secondary',
        'btn-outline-success',
      ],
      control: 'select',
    },
    icon: COMMON_STORY_ARGS.icon,
    title: {
      control: 'text',
    },
    body: {
      control: 'text',
    },
  },
  args: {
    buttonColor: 'btn-outline-primary',
    title: 'Do Something',
    body: 'Like click on this card',
    icon: 'house-fill',
  },
};

// Template
const Template = (args) => {
  const aButton = document.createElement('cod-action-button');
  aButton.setAttribute('btn-color', args.buttonColor);
  aButton.setAttribute('icon', args.icon);
  aButton.setAttribute('title', args.title);
  aButton.setAttribute('href', 'https://example.com');
  const body = document.createElement('p');
  body.innerText = args.body;
  aButton.appendChild(body);
  return aButton;
};

export const ActionButton = Template.bind({});

export const ActionButtonRichBody = () => html`
  <div style="width: 300px; height: 300px">
    <cod-action-button
      btn-color="btn-outline-primary"
      icon="house"
      title="Do Something"
      href="https://example.com"
      target="_blank"
    >
      <p>
        Anything can go inside an action button but it's best to keep to simple
        text.
      </p>
      <img
        src="https://placehold.co/800x400/000000/FFF"
        alt="..."
        width="100"
        height="50"
      />
    </cod-action-button>
  </div>
`;

export const ActionButtonGrid = () => html`
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-sm-4">
        <cod-action-button
          btn-color="btn-outline-primary"
          icon="house"
          title="Do Something"
          href="https://example.com"
          target="_blank"
        >
          <p>Like Click on This Button</p>
        </cod-action-button>
      </div>
      <div class="col-sm-4">
        <cod-action-button
          btn-color="btn-outline-primary"
          icon="house"
          title="Do Something"
          href="https://example.com"
          target="_blank"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            luctus eros sit amet augue tempus sollicitudin. Mauris lacinia ante
            et.
          </p>
        </cod-action-button>
      </div>
      <div class="col-sm-4">
        <cod-action-button
          btn-color="btn-outline-primary"
          icon="house"
          title="Do Something"
          href="https://example.com"
          target="_blank"
        >
          <p>Like Click on This Button</p>
        </cod-action-button>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-sm-4">
        <cod-action-button
          btn-color="btn-outline-primary"
          icon="house"
          title="Do Something"
          href="https://example.com"
          target="_blank"
        >
          <p>Like Click on This Button</p>
        </cod-action-button>
      </div>
      <div class="col-sm-4">
        <cod-action-button
          btn-color="btn-outline-primary"
          icon="house"
          title="Do Something"
          href="https://example.com"
          target="_blank"
        >
          <p>Like Click on This Button</p>
        </cod-action-button>
      </div>
      <div class="col-sm-4">
        <cod-action-button
          btn-color="btn-outline-primary"
          icon="house"
          title="Do Something"
          href="https://example.com"
          target="_blank"
        >
          <p>Like Click on This Button</p>
        </cod-action-button>
      </div>
    </div>
  </div>
`;
