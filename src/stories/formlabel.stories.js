import '../components/atoms/FormLabel/cod-formlabel';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Forms/FormLabel',
  argTypes: {
    color: COMMON_STORY_ARGS.bootstrapColor,
    required: COMMON_STORY_ARGS.required,
  },
};
// Template
const Template = (args) => {
  const label = document.createElement('cod-form-label');
  label.setAttribute('data-color', args.color);
  label.setAttribute('data-input-id', args.inputID);
  label.setAttribute('data-text', args.text);
  label.setAttribute('data-hidden', args.hidden);
  label.setAttribute('data-required', args.required);
  label.setAttribute('data-extra-classes', args.extraClasses);
  return label;
};

export const Label = Template.bind({});
Label.args = {
  inputID: 'basic-label',
  text: 'Basic label',
};

export const Hidden = Template.bind({});
Hidden.args = {
  inputID: 'hidden-label',
  text: 'Hidden label',
  hidden: 'true',
};

export const ExtraClasses = Template.bind({});
ExtraClasses.args = {
  inputID: 'hidden-label',
  text: 'Hidden label',
  extraClasses: 'p-5 text-bg-warning',
};
