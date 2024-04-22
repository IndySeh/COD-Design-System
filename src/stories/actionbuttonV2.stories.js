import { html } from 'lit-html';
import '../components/atoms/ActionButtonV2/cod-action-button-v2';
import '../components/atoms/Icon/cod-icon';
import IconStory from './icon.stories';

export default {
  component: 'cod-action-button-v2',
  title: 'Components/Atoms/ActionButtonV2',
  // 👇 Creates specific argTypes
  argTypes: {
    buttonColor: {
      options: [
        'btn-outline-primary',
        'btn-outline-secondary',
        'btn-outline-success',
      ],
      control: 'select',
    },
    icon: IconStory.argTypes.icon,
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
  const aButton = document.createElement('cod-action-button-v2');
  aButton.setAttribute('btn-color', args.buttonColor);
  aButton.setAttribute('icon', args.icon);

  // Create a title slot
  const titleSlot = document.createElement('h4');
  titleSlot.setAttribute('slot', 'title');
  titleSlot.innerText = args.title;
  aButton.appendChild(titleSlot);

  // Create a body slot
  const bodySlot = document.createElement('p');
  bodySlot.setAttribute('slot', 'body');
  bodySlot.innerText = args.body;
  aButton.appendChild(bodySlot);

  aButton.setAttribute('href', 'https://example.com');
  return aButton;
};

export const ActionButtonV2 = Template.bind({});

export const ActionButtonV2RichBody = () => html`
  <div style="width: 300px; height: 300px">
    <cod-action-button-v2
      btn-color="btn-outline-primary"
      icon="house"
      href="https://example.com"
      target="_blank"
    >
      <h4 slot="title">Do Something</h4>
      <div slot="body">
        <p>
          Anything can go inside an action button but it's best to keep to
          simple text.
        </p>
        <img
          src="https://placehold.co/800x400/000000/FFF"
          alt="..."
          width="100"
          height="50"
        />
      </div>
    </cod-action-button-v2>
  </div>
`;

export const ActionButtonV2Grid = () => html`
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-sm-4">
        <cod-action-button-v2
          btn-color="btn-outline-primary"
          icon="house"
          href="https://example.com"
          target="_blank"
        >
          <h4 slot="title">Do Something</h4>
          <p slot="body">Like Click on This Button</p>
        </cod-action-button-v2>
      </div>
      <div class="col-sm-4">
        <cod-action-button-v2
          btn-color="btn-outline-primary"
          icon="house"
          href="https://example.com"
          target="_blank"
        >
          <h4 slot="title">Do Something</h4>
          <p slot="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            luctus eros sit amet augue tempus sollicitudin. Mauris lacinia ante
            et.
          </p>
        </cod-action-button-v2>
      </div>
      <div class="col-sm-4">
        <cod-action-button-v2
          btn-color="btn-outline-primary"
          icon="house"
          href="https://example.com"
          target="_blank"
        >
          <h4 slot="title">Do Something</h4>
          <p slot="body">Like Click on This Button</p>
        </cod-action-button-v2>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-sm-4">
        <cod-action-button-v2
          btn-color="btn-outline-primary"
          icon="house"
          href="https://example.com"
          target="_blank"
        >
          <h4 slot="title">Do Something</h4>
          <p slot="body">Like Click on This Button</p>
        </cod-action-button-v2>
      </div>
      <div class="col-sm-4">
        <cod-action-button-v2
          btn-color="btn-outline-primary"
          icon="house"
          href="https://example.com"
          target="_blank"
        >
          <h4 slot="title">Do Something</h4>
          <p slot="body">Like Click on This Button</p>
        </cod-action-button-v2>
      </div>
      <div class="col-sm-4">
        <cod-action-button-v2
          btn-color="btn-outline-primary"
          icon="house"
          href="https://example.com"
          target="_blank"
        >
          <h4 slot="title">Do Something</h4>
          <p slot="body">Like Click on This Button</p>
        </cod-action-button-v2>
      </div>
    </div>
  </div>
`;
