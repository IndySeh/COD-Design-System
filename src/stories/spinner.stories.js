import '../components/atoms/Spinner/cod-spinner';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Atoms/Spinner',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['border', 'grow'],
    },
    // TODO: Add support for lg and xl to make size
    // consistent. Issue #202.
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    backgroundColor: COMMON_STORY_ARGS.bootstrapColor,
  },
};
// Template
const Template = (args) => {
  const spinner = document.createElement('cod-spinner');
  spinner.setAttribute('data-type', args.type);
  spinner.setAttribute('data-background-color', args.backgroundColor);
  spinner.setAttribute('data-size', args.size);
  spinner.setAttribute('data-display-type', args.displayType);
  return spinner;
};

export const Spinner = Template.bind({});
Spinner.args = {
  type: 'border',
  backgroundColor: 'primary',
};
