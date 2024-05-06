import '../components/atoms/Icon/cod-icon';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Atoms/Icon',
  argTypes: {
    icon: COMMON_STORY_ARGS.icon,
    size: COMMON_STORY_ARGS.longSize,
    isHighlighted: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};
// Template
const Template = (args) => {
  const icon = document.createElement('cod-icon');
  icon.setAttribute('data-icon', args.icon);
  icon.setAttribute('data-size', args.size);
  if (args.isHighlighted) {
    icon.setAttribute('is-highlighted', ''); // Set the attribute if isHighlighted is true
  } else {
    icon.removeAttribute('is-highlighted'); // Remove the attribute if isHighlighted is false
  }
  return icon;
};

export const Icon = Template.bind({});
Icon.args = {
  icon: 'house',
  size: 'small',
};

export const IconCustom = Template.bind({});
IconCustom.args = {
  icon: 'house',
  size: '120',
};
