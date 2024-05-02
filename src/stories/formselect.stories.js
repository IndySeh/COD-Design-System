import '../components/atoms/FormSelect/cod-formselect';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Forms/FormSelect',
  argTypes: {
    // TODO: Add support for xl to make size
    // consistent. Issue #202.
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    required: COMMON_STORY_ARGS.required,
    disabled: COMMON_STORY_ARGS.disabled,
  },
};
// Template
const Template = (args) => {
  const select = document.createElement('cod-form-select');
  select.innerHTML = `
    <option value="">Select something</option>
    <option value="1">Options 1</option>
    <option value="2">Options 2</option>
    <option value="3">Options 3</option>
  `;

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.id != null) {
    select.setAttribute('data-id', args.id);
  }

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.value != null) {
    select.setAttribute('data-value', args.value);
  }

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.size != null) {
    select.setAttribute('data-size', args.size);
  }

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.multiple != null) {
    select.setAttribute('data-multiple', args.multiple);
  }

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.displayMultiple != null) {
    select.setAttribute('data-display-multiple', args.displayMultiple);
  }

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.extraClasses != null) {
    select.setAttribute('data-extra-classes', args.extraClasses);
  }
  select.setAttribute('data-aria-label', args.ariaLabel);
  select.setAttribute('data-disabled', args.disabled);
  select.setAttribute('data-required', args.required);

  // TODO: Fix old ESLint errors - issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.selectChange != null) {
    select.addEventListener('click', (e) => {
      args.selectChange(e);
    });
  }

  return select;
};

export const Select = Template.bind({});
Select.args = {
  id: 'simple-select',
  ariaLabel: 'Simple select example',
};

export const Multiple = Template.bind({});
Multiple.args = {
  id: 'simple-select',
  ariaLabel: 'Simple select example',
  multiple: 'true',
};

export const MultipleShowOnly = Template.bind({});
MultipleShowOnly.args = {
  id: 'simple-select',
  ariaLabel: 'Simple select example',
  multiple: 'true',
  displayMultiple: '2',
};

export const WithInteraction = Template.bind({});
WithInteraction.args = {
  id: 'interaction-input',
  ariaLabel: 'Interaction select example',
  selectChange: (e) => {
    // Allow console log for testing in Storybook.
    // eslint-disable-next-line no-console
    console.log(e.target.shadowRoot.querySelector('select').value);
  },
};
