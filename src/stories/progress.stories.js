import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';
import '../components/atoms/Progress/cod-progress';

export default {
  title: 'Components/Atoms/Progress',
  argTypes: {
    backgroundColor: COMMON_STORY_ARGS.bootstrapColor,
  },
};

// Template
const Template = (args) => {
  const progress = document.createElement('cod-progress');
  progress.setAttribute('data-type', args.type);
  progress.setAttribute('data-background-color', args.backgroundColor);
  progress.setAttribute('data-value', args.value);
  progress.setAttribute('data-label', args.label);
  progress.setAttribute('data-aria-label', args.ariaLabel);
  progress.setAttribute('data-animated', args.animated);
  progress.setAttribute('data-multi-bars', args.multiBars);
  return progress;
};

export const ProgressBar = Template.bind({});
ProgressBar.args = {
  backgroundColor: 'primary',
  value: '25',
  ariaLabel: 'simple test',
};

export const StripedBar = Template.bind({});
StripedBar.args = {
  backgroundColor: 'primary',
  value: '25',
  ariaLabel: 'simple test',
  type: 'striped',
};

export const StripedBarAnimated = Template.bind({});
StripedBarAnimated.args = {
  backgroundColor: 'primary',
  value: '25',
  ariaLabel: 'simple test',
  type: 'striped',
  animated: 'animated',
};

export const StripedBarLabel = Template.bind({});
StripedBarLabel.args = {
  backgroundColor: 'primary',
  value: '25',
  ariaLabel: 'simple test',
  type: 'striped',
  animated: 'animated',
  label: 'this 25%',
};

export const StripedBarStacked = Template.bind({});
StripedBarStacked.args = {
  multiBars: JSON.stringify([
    {
      ariaLabel: 'first stacked bar',
      value: '30',
      label: 'Something 30%',
      animated: 'animated',
      striped: 'striped',
      backgroundColor: 'info',
    },
    {
      ariaLabel: 'second stacked bar',
      value: '15',
      animated: 'animated',
      striped: 'striped',
      backgroundColor: 'warning',
    },
    {
      ariaLabel: 'second stacked bar',
      value: '20',
      backgroundColor: 'success',
    },
  ]),
};
