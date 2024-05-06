import '../components/atoms/Container/cod-container';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Atoms/Container',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'container',
        'container-sm',
        'container-md',
        'container-lg',
        'container-xl',
        'container-xxl',
        'container-fluid',
      ],
    },
    // TODO: Use bootstrap color names. Issue #202.
    backgroundColor: COMMON_STORY_ARGS.numberColor,
  },
};
// Template
const Template = (args) => {
  const container = document.createElement('cod-container');
  container.setAttribute('data-type', args.type);

  // TODO: Fix old ESLint errors - see issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.elements != null) {
    container.innerHTML = args.elements;
  }
  if (args.content) {
    container.setAttribute('data-text', args.content);
  }
  container.setAttribute('data-extra-classes', args.extraClasses);
  container.setAttribute('data-background-color', args.backgroundColor);
  return container;
};

export const Container = Template.bind({});
Container.args = {
  content: 'Basic container',
  type: 'container',
};

export const ContainerColor = Template.bind({});
ContainerColor.args = {
  content: 'Basic container',
  type: 'container',
  backgroundColor: 'color-1',
};

export const ContainerExtras = Template.bind({});
ContainerExtras.args = {
  content: 'Container with Extra Classes',
  type: 'container',
  backgroundColor: 'color-1',
  extraClasses: 'text-center p-3',
};

export const ContainerElements = Template.bind({});
ContainerElements.args = {
  type: 'container',
  backgroundColor: 'color-1',
  extraClasses: 'text-center p-3',
  elements: `
  <div>
  <p>Paragraph 1</p>
  <p><strong>Paragraph</strong> 2</p>
  </div>
  `,
};
