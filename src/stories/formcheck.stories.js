import '../components/atoms/FormCheck/cod-formcheck';

export default {
  title: 'Forms/FormCheck',
  argTypes: {
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
    btnColor: {
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
      defaultValue: 'primary',
    },
    type: {
      control: { type: 'select' },
      options: ['checkbox', 'radio'],
      defaultValue: 'checkbox',
    },
    required: {
      control: { type: 'select' },
      options: ['true', 'false'],
      defaultValue: 'false',
    },
    disabled: {
      control: { type: 'select' },
      options: ['true', 'false'],
      defaultValue: 'false',
    },
    checked: {
      control: { type: 'select' },
      options: ['true', 'false'],
      defaultValue: 'false',
    },
  },
};
// Template
const Template = (args) => {
  const formCheck = document.createElement('cod-form-check');
  formCheck.setAttribute('data-id', args.id);
  formCheck.setAttribute('data-name', args.name);
  formCheck.setAttribute('data-value', args.value);
  formCheck.setAttribute('data-type', args.type);
  formCheck.setAttribute('data-btn-color', args.btnColor);
  formCheck.setAttribute('data-checked', args.checked);

  if (args.extraClasses != null) {
    formCheck.setAttribute('data-extra-classes', args.extraClasses);
  }

  if (args.backgroundColor != null) {
    formCheck.setAttribute('data-background-color', args.backgroundColor);
  }

  if (args.label != null) {
    formCheck.setAttribute('data-label', args.label);
  }

  if (args.nolabel != null) {
    formCheck.setAttribute('data-nolabel', args.nolabel);
  }

  if (args.mode != null) {
    formCheck.setAttribute('data-mode', args.mode);
  }

  if (args.disabled != null) {
    formCheck.setAttribute('data-disabled', args.disabled);
  }

  if (args.required != null) {
    formCheck.setAttribute('data-required', args.required);
  }
  if (args.clicked) {
    formCheck.addEventListener('click', (e) => {
      args.clicked(e);
    });
  }

  return formCheck;
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  id: 'simple-checkbox',
  label: 'Simple checkbox',
  name: 'simple-checkbox',
  value: 'simple-checkbox',
};

export const Checked = Template.bind({});
Checked.args = {
  id: 'checked-checkbox',
  label: 'Checked checkbox',
  name: 'checked-checkbox',
  value: 'checked-checkbox',
  checked: true,
};

export const Radio = Template.bind({});
Radio.args = {
  id: 'simple-radio',
  type: 'radio',
  label: 'Simple radio',
  name: 'simple-radio',
  value: 'simple-radio',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'disabled-radio',
  type: 'radio',
  label: 'Disabled Radio',
  name: 'disabled-radio',
  value: 'disabled-radio',
  disabled: true,
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  id: 'no-label-radio',
  type: 'radio',
  nolabel: true,
  name: 'no-label-radio',
  value: 'no-label-radio',
};

export const Switches = Template.bind({});
Switches.args = {
  id: 'switch-checkbox',
  label: 'On/Off',
  name: 'switch-checkbox',
  value: 'switch-checkbox',
  mode: 'switch',
};

export const InlineCheckboxes = () => {
  const tempContainer = document.createElement('div');
  const check1 = document.createElement('cod-form-check');
  check1.setAttribute('data-id', 'inlineCheckbox1');
  check1.setAttribute('data-value', 'option1');
  check1.setAttribute('data-name', 'inllne-checkboxes');
  check1.setAttribute('data-label', 'Option 1');
  check1.setAttribute('data-type', 'checkbox');
  check1.setAttribute('data-mode', 'check-inline');
  tempContainer.appendChild(check1);
  const check2 = document.createElement('cod-form-check');
  check2.setAttribute('data-id', 'inlineCheckbox2');
  check2.setAttribute('data-value', 'option2');
  check1.setAttribute('data-name', 'inllne-checkboxes');
  check2.setAttribute('data-label', 'Option 2');
  check2.setAttribute('data-type', 'checkbox');
  check2.setAttribute('data-mode', 'check-inline');
  tempContainer.appendChild(check2);
  const check3 = document.createElement('cod-form-check');
  check3.setAttribute('data-id', 'inlineCheckbox2');
  check3.setAttribute('data-value', 'option2');
  check3.setAttribute('data-name', 'inllne-checkboxes');
  check3.setAttribute('data-label', 'Option 3 disabled');
  check3.setAttribute('data-type', 'checkbox');
  check3.setAttribute('data-mode', 'check-inline');
  check3.setAttribute('data-disabled', true);
  tempContainer.appendChild(check3);
  return tempContainer;
};

export const Reverse = Template.bind({});
Reverse.args = {
  id: 'reverse-checkbox',
  label: 'Reverse Checkbox',
  name: 'reverse-checkbox',
  value: 'reverse-checkbox',
  mode: 'check-reverse',
};

export const CheckboxButton = Template.bind({});
CheckboxButton.args = {
  id: 'checkbox-button',
  label: 'Checkbox Button',
  name: 'checkbox-button',
  value: 'checkbox-button',
  mode: 'btn',
};

export const RadioButton = Template.bind({});
RadioButton.args = {
  id: 'radio-button',
  type: 'radio',
  label: 'Radio Button',
  name: 'radio-button',
  value: 'radio-button',
  btnColor: 'warning',
  mode: 'btn',
};

export const RadioButtonOutlined = Template.bind({});
RadioButtonOutlined.args = {
  id: 'radio-button',
  label: 'Radio Button Outline',
  name: 'radio-button',
  value: 'radio-button',
  btnColor: 'danger',
  mode: 'btn-outline',
};

export const WithInteraction = Template.bind({});
WithInteraction.args = {
  id: 'interaction-checkbox',
  label: 'Interaction checkbox',
  name: 'interaction-checkbox',
  value: 'interaction-checkbox',
  clicked: (e) => {
    // Allow console logging for testing stories.
    // eslint-disable-next-line no-console
    console.log(e);
  },
};

// WithInteraction.play = async ({ args, canvasElement }) => {
//   // Assigns canvas to the component root element
//   const canvas = within(canvasElement);
//   await userEvent.click(canvas.getByTestId('interaction'));
//   await expect(console.log);
// }
