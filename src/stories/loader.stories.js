import '../components/atoms/Loader/cod-loader';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Atoms/Loader',
  argTypes: {
    // TODO: Use bootstrap color names. Issue #202.
    backgroundColor: COMMON_STORY_ARGS.numberColor,
  },
};

// Template
const Template = (args) => {
  const loader = document.createElement('cod-loader');
  loader.setAttribute('data-color', args.backgroundColor);
  return loader;
};

export const Loader = Template.bind({});
