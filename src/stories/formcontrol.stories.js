import '../components/atoms/FormControl/cod-formcontrol';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Forms/FormControl',
  argTypes: {
    backgroundColor: COMMON_STORY_ARGS.bootstrapColor,
    size: COMMON_STORY_ARGS.size,
    required: COMMON_STORY_ARGS.required,
    readOnly: COMMON_STORY_ARGS.readOnly,
    tag: {
      control: { type: 'select' },
      options: ['input', 'textarea'],
      defaultValue: 'input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'color', 'tel', 'password'],
      defaultValue: 'text',
    },
  },
};
// Template
const Template = (args) => {
  const fcontrol = document.createElement('cod-form-control');
  fcontrol.setAttribute('data-tag', args.tag);

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.size != null) {
    fcontrol.setAttribute('data-size', args.size);
  }

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.rows != null) {
    fcontrol.setAttribute('data-rows', args.rows);
  }

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
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
    // Allow console log for testing in Storybook.
    // eslint-disable-next-line no-console
    console.log(e);
  },
};
