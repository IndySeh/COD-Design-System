import '../components/atoms/Button/cod-button';
import '../components/atoms/Icon/cod-icon';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Atoms/Button',
  argTypes: {
    primary: {
      control: { type: 'boolean' },
    },
    disable: COMMON_STORY_ARGS.disabled,
    // TODO: Make this attr name and accepted
    // values consistent with other action button, progress bar,
    // etc. Issue #202.
    backgroundColor: COMMON_STORY_ARGS.bootstrapColor,
    // TODO: Add support for lg and xl to make size
    // consistent. Issue #202.
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: COMMON_STORY_ARGS.icon,
    onClick: { action: 'onClick' },
    iconSize: COMMON_STORY_ARGS.longSize,
    iconOrder: COMMON_STORY_ARGS.order,
    shape: {
      control: { type: 'select' },
      options: ['fluid', 'square'],
    },
  },
};
// Template
const Template = (args) => {
  const btn = document.createElement('cod-button');
  btn.addEventListener('click', (e) => {
    args.onclick(e);
  });
  btn.setAttribute('data-primary', args.primary);
  btn.setAttribute('data-disable', args.disable);
  btn.setAttribute('data-label', args.label);
  btn.setAttribute('data-img', args.img ? args.img : '');
  btn.setAttribute('data-img-alt', args.imgAlt ? args.imgAlt : '');
  btn.setAttribute('data-icon', args.icon ? args.icon : '');
  btn.setAttribute('data-icon-order', args.iconOrder ? args.iconOrder : '');
  btn.setAttribute('data-icon-size', args.iconSize ? args.iconSize : '');
  btn.setAttribute('data-shape', args.shape);
  btn.setAttribute('data-aria-label', args.ariaLabel ? args.ariaLabel : '');
  args.backgroundColor
    ? btn.setAttribute('data-background-color', args.backgroundColor)
    : btn.setAttribute('data-background-color', 'primary');
  if (args.close) {
    btn.setAttribute('data-close', args.close);
  }
  if (args.hLabel) {
    btn.setAttribute('data-hidden-label', args.hLabel);
  }
  if (args.size) {
    btn.setAttribute('data-size', args.size);
  }
  if (args.id) {
    btn.setAttribute('data-id', args.id);
  }
  if (args.link) {
    btn.setAttribute('data-link', args.link);
  }
  if (args.extraClasses) {
    btn.setAttribute('data-extra-classes', args.extraClasses);
  }
  return btn;
};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  label: 'Secondary',
};

export const Extras = Template.bind({});
Extras.args = {
  primary: false,
  label: 'Extras',
  extraClasses: 'w-100',
};

export const Link = Template.bind({});
Link.args = {
  primary: false,
  label: 'Link',
  link: 'https://detroitmi.gov',
};

export const Image = Template.bind({});
Image.args = {
  primary: true,
  label: 'Image',
  backgroundColor: 'secondary',
  img: 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-02/map.png',
  imgAlt: 'map',
};

export const Icon = Template.bind({});
Icon.args = {
  primary: true,
  label: 'Image',
  backgroundColor: 'secondary',
  icon: 'house',
  iconSize: 'small',
  iconOrder: 'left',
};

export const IconCenterSquare = Template.bind({});
IconCenterSquare.args = {
  primary: true,
  label: '',
  size: 'lg',
  backgroundColor: 'primary',
  icon: 'house',
  iconSize: 'medium',
  shape: 'square',
  ariaLabel: 'Home',
  extraClasses: 'icon-center',
};

export const Close = Template.bind({});
Close.args = {
  primary: true,
  label: '',
  ariaLabel: 'Close',
  close: 'true',
};

export const SquareClose = Template.bind({});
SquareClose.args = {
  primary: true,
  label: 'x',
  shape: 'square',
  ariaLabel: 'Close',
  extraClasses: 'fw-bold',
};

export const SquareImage = Template.bind({});
SquareImage.args = {
  primary: true,
  label: '',
  backgroundColor: 'secondary',
  shape: 'square',
  img: 'https://detroitmi.gov/sites/detroitmi.localhost/files/2023-02/map.png',
  imgAlt: 'map',
};

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  primary: true,
  label: '',
  hLabel: 'Toggle Dropdown',
  extraClasses: 'dropdown-toggle dropdown-toggle-split',
};

// export const WithInteraction = Template.bind({});
// WithInteraction.args = {
//   primary: true,
//   label: 'Interaction',
//   id: 'interaction',
//   onclick: (e) => {console.log(e)}
// };

// WithInteraction.play = async ({ args, canvasElement }) => {
//   // Assigns canvas to the component root element
//   const canvas = within(canvasElement);
//   await userEvent.click(canvas.getByTestId('interaction'));
//   await expect(console.log);
// }
