import '../components/atoms/Icon/cod-icon';

export default {
  title: 'Components/Atoms/Icon',
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [
        'bicycle',
        'bounding-box',
        'bounding-box-circle',
        'building',
        'building-fill',
        'buildings',
        'buildings-fill',
        'bus-front',
        'bus-front-fill',
        'calendar',
        'calendar-fill',
        'calendar-date',
        'calendar-date-fill',
        'cash',
        'check-circle',
        'check-circle-fill',
        'chevron-right',
        'chevron-right-circle',
        'chevron-right-circle-fill',
        'chevron-left',
        'chevron-left-circle',
        'chevron-left-circle-fill',
        'chevron-up',
        'chevron-up-circle',
        'chevron-up-circle-fill',
        'chevron-down',
        'chevron-down-circle',
        'chevron-down-circle-fill',
        'currency-dollar',
        'exclamation-circle',
        'exclamation-circle-fill',
        'exclamation-triangle',
        'file-earmark',
        'funnel',
        'funnel-fill',
        'house',
        'house-fill',
        'list-task',
        'newspaper',
        'no-parking',
        'no-parking-fill',
        'journals',
        'p-circle',
        'p-circle-fill',
        'toilet',
        'universal-access',
        'universal-access-circle',
        'wifi',
        'wifi-off'
      ].sort(),
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
    },
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
