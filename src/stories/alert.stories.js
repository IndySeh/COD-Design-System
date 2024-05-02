import '../components/atoms/Alert/cod-alert';

export default {
  title: 'Components/Atoms/Alert',
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [
        'house',
        'house-fill',
        'exclamation-circle',
        'exclamation-circle-fill',
        'exclamation-triangle',
        'check-circle',
        'check-circle-fill',
      ],
    },
    iconOrder: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    iconSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
    },
    backgroundColor: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
      ],
    },
    isOpen: {
      control: { type: 'boolean' },
      defaultValue: false,
    }
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

    if (args.isOpen) {
      alert.setAttribute('is-open', true);
    } else {
      alert.removeAttribute('is-open');
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
  isOpen: true,
  backgroundColor: 'primary',
  elements: `
    <span>Alert with Close Button</span>
  `,
};

