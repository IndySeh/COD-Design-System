import '../components/atoms/Alert/cod-alert';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Atoms/Alert',
  argTypes: {
    icon: COMMON_STORY_ARGS.icon,
    iconOrder: COMMON_STORY_ARGS.order,
    iconSize: COMMON_STORY_ARGS.longSize,
    backgroundColor: COMMON_STORY_ARGS.bootstrapColor,

    closeable: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};
// Template
const Template = (args) => {
  const alert = document.createElement('cod-alert');
  alert.innerHTML = args.elements;
  alert.setAttribute('data-type', args.type);
  alert.setAttribute('data-icon', args.icon);
  alert.setAttribute('data-icon-order', args.iconOrder);
  alert.setAttribute('data-icon-size', args.iconSize);
  alert.setAttribute('data-extra-classes', args.extraClasses);
  alert.setAttribute('data-background-color', args.backgroundColor);

  if (args.closeable) {
    // If closeable is true, set the closeable attribute
    alert.setAttribute('closeable', '');
  } else {
    // If closeable is false, remove the closeable attribute
    alert.removeAttribute('closeable');
  }

  return alert;
};

export const Alert = Template.bind({});
Alert.args = {
  backgroundColor: 'primary',
  elements: `
    <span>Basic Alert</span>
  `,
};

export const AlertExtras = Template.bind({});
AlertExtras.args = {
  elements: `
    <span>Basic Alert</span>
  `,
  backgroundColor: 'primary',
  extraClasses: 'text-center p-3',
};

export const AlertElements = Template.bind({});
AlertElements.args = {
  backgroundColor: 'primary',
  extraClasses: 'text-center p-3',
  elements: `
    <p>Simple paragraph</p>
    <article>Article with <a href="https://google.com">link</a></article>
  `,
};

export const AlertIcon = Template.bind({});
AlertIcon.args = {
  backgroundColor: 'primary',
  icon: 'house',
  iconOrder: 'left',
  iconSize: 'small',
  elements: `
    <article>Article with <a href="https://google.com">link</a></article>
  `,
};

export const AlertClose = Template.bind({});
AlertClose.args = {
  closeable: true,
  backgroundColor: 'primary',
  elements: `
    <span>Alert with Close Button</span>
  `,
};
