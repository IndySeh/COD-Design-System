import '../components/organisms/Form/cod-form';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Forms/FormValidation',
  argTypes: {
    backgroundColor: COMMON_STORY_ARGS.bootstrapColor,
  },
};
// Template
const Template = (args) => {
  const form = document.createElement('cod-form');
  form.setAttribute('data-background-color', args.backgroundColor);
  form.setAttribute('data-id', args.id);
  form.setAttribute('data-extra-classes', args.extraClasses);
  if (args.submit) {
    form.form.addEventListener('submit', (e) => {
      args.submit(e);
    });
  }
  form.innerHTML = args.elements;
  return form;
};

export const Form = Template.bind({});
Form.args = {
  id: 'simple-form',
  elements: `
  <cod-form-label data-input-id="first-name" data-required="true" data-text="First Name"></cod-form-label>
  <cod-form-control data-id="first-name" data-required="true" dat-type="text" data-minlength="5" data-rows="10"
    data-tooShort="Type at least 5 characters" data-valueMissing="This field can't be empty"
    data-placeholder-txt="Enter text" data-tag="input"></cod-form-control>
  <cod-form-label data-input-id="simple-select" data-required="true" data-text="Select Option"></cod-form-label>
  <cod-form-select data-required="true" data-id="simple-select" data-size="md"
    data-valueMissing="Please make a selection" data-aria-label="Simple select example">
    <option value="">Select something</option>
    <option value="1">Option 1</option>
  </cod-form-select>
  <cod-form-check-group data-type="radio">
    <cod-form-check data-id="radio-group-test-1" data-type="radio" data-label="Option 1" data-required="true"
      data-value="option 1" data-name="radio-group-test" data-mode="check-inline"
      data-valueMissing="Please select one"></cod-form-check>
    <cod-form-check data-id="radio-group-test-2" data-type="radio" data-label="Option 2" data-required="true"
      data-value="option 2" data-name="radio-group-test" data-mode="check-inline"
      data-valueMissing="Please select one"></cod-form-check>
    <cod-form-check data-id="radio-group-test-3" data-type="radio" data-label="Option 3" data-required="true"
      data-value="option 3" data-name="radio-group-test" data-mode="check-inline"
      data-valueMissing="Please select one"></cod-form-check>
  </cod-form-check-group>
  <br />
  <cod-form-check-group data-type="checkbox" data-required="true">
    <cod-form-check data-id="check-group-test-1" data-type="checkbox" data-label="Check 1" data-required="true"
      data-value="Check 1" data-name="check-group-test" data-mode="check-inline"
      data-valueMissing="Please select one"></cod-form-check>
    <cod-form-check data-id="check-group-test-2" data-type="checkbox" data-label="Check 2" data-required="true"
      data-value="Check 2" data-name="check-group-test" data-mode="check-inline"
      data-valueMissing="Please select one"></cod-form-check>
    <cod-form-check data-id="check-group-test-3" data-type="checkbox" data-label="Check 3" data-required="true"
      data-value="Check 3" data-name="check-group-test" data-mode="check-inline"
      data-valueMissing="Please select one"></cod-form-check>
  </cod-form-check-group>
  <cod-form-check data-type="checkbox" data-label="Accept legal stuff" data-required="true"
    data-valueMissing="Please sign off your rights to proceed lol"></cod-form-check>
  <cod-button data-label="submit" data-background-color="color-1" data-primary="true" data-img-alt="" data-icon=""></cod-button>
  `,
  submit: (e) => {
    e.preventDefault();
    alert('submitted');
  },
};

// WithInteraction.play = async ({ args, canvasElement }) => {
//   // Assigns canvas to the component root element
//   const canvas = within(canvasElement);
//   await userEvent.click(canvas.getByTestId('interaction'));
//   await expect(console.log);
// }
