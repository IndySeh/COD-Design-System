import '../components/atoms/FormControl/cod-formcontrol';

export default {
  title: 'Forms/FormControl',
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: ['input', 'textarea'],
      defaultValue: 'input',
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
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'color', 'tel', 'password'],
      defaultValue: 'text',
    },
    required: {
      control: { type: 'select' },
      options: ['true', 'false'],
      defaultValue: 'false',
    },
    readOnly: {
      control: { type: 'select' },
      options: ['true', 'false'],
      defaultValue: 'false',
    },
  },
};
// Template
const Template = (args) => {
  const fcontrol = document.createElement('cod-form-control');
  fcontrol.setAttribute('data-tag', args.tag);

  if (args.size != null) {
    fcontrol.setAttribute('data-size', args.size);
  }

  if (args.rows != null) {
    fcontrol.setAttribute('data-rows', args.rows);
  }

  if (args.value != null) {
    fcontrol.setAttribute('data-value', args.value);
  }
  fcontrol.setAttribute('data-read-only', args.readOnly);
  fcontrol.setAttribute('data-background-color', args.backgroundColor);
  fcontrol.setAttribute('data-id', args.id);
  fcontrol.setAttribute('data-type', args.type);
  fcontrol.setAttribute('data-plain-txt', args.plainText);
  fcontrol.setAttribute('data-disabled', args.disabled);
  fcontrol.setAttribute('data-required', args.required);
  fcontrol.setAttribute('data-placeholder-txt', args.placeholder);
  fcontrol.addEventListener('keydown', (e) => {
    args.keydown(e);
  });
  return fcontrol;
};

export const Input = Template.bind({});
Input.args = {
  id: 'simple-input',
  placeholder: 'enter text here',
  tag: 'input',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  id: 'read-only-input',
  placeholder: 'Not editable',
  readOnly: 'true',
  tag: 'input',
};

export const SpecialInput = Template.bind({});
SpecialInput.args = {
  id: 'special-input',
  placeholder: 'enter text here',
  type: 'color',
  tag: 'input',
};

export const Textarea = Template.bind({});
Textarea.args = {
  id: 'simple-textarea',
  placeholder: 'enter text here',
  tag: 'textarea',
  rows: '5',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'disabled-input',
  placeholder: 'This input is disabled',
  disabled: 'true',
  tag: 'input',
};

export const WithInteraction = Template.bind({});
WithInteraction.args = {
  id: 'interaction-input',
  placeholder: 'enter text here',
  tag: 'input',
  keydown: (e) => {
    console.log(e);
  },
};

// WithInteraction.play = async ({ args, canvasElement }) => {
//   // Assigns canvas to the component root element
//   const canvas = within(canvasElement);
//   await userEvent.click(canvas.getByTestId('interaction'));
//   await expect(console.log);
// }
