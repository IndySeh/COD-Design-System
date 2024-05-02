import '../components/atoms/Range/cod-range';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Atoms/Forms/Range',
  argTypes: {
    disable: COMMON_STORY_ARGS.disabled,
  },
};
// Template
const Template = (args) => {
  const range = document.createElement('cod-range');
  range.setAttribute('data-id', args.id);
  range.setAttribute('data-disable', args.disable);

  if (args.min !== null) {
    range.setAttribute('data-min', args.min);
  }

  if (args.max !== null) {
    range.setAttribute('data-max', args.max);
  }

  if (args.step !== null) {
    range.setAttribute('data-step', args.step);
  }
  return range;
};

export const Range = Template.bind({});
Range.args = {
  id: 'simple-range',
};

export const MinMax = Template.bind({});
MinMax.args = {
  id: 'simple-range',
  min: 0,
  max: 100,
};

export const Step = Template.bind({});
Step.args = {
  id: 'simple-range',
  min: 0,
  max: 5,
  step: 0.5,
};
