import { html } from 'lit-html';
import '../components/atoms/Badge/cod-badge';

export default {
  title: 'Components/Atoms/Badge',
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: ['span', 'div', 'a'],
      defaultValue: 'span',
    },
    backgroundColor: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
      ],
      defaultValue: 'primary',
    },
  },
};
// Template
const Template = (args) => {
  const badge = document.createElement('cod-badge');
  badge.setAttribute('data-tag', args.tag);
  badge.setAttribute('data-background-color', args.backgroundColor);

  // TODO: Fix old ESLint errors - see issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.url != null) {
    badge.setAttribute('data-url', args.url);
  }

  // TODO: Fix old ESLint errors - see issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.hiddenText != null) {
    badge.setAttribute('data-hidden-text', args.hiddenText);
  }

  // TODO: Fix old ESLint errors - see issue #1099
  // eslint-disable-next-line eqeqeq
  if (args.pill != null) {
    badge.setAttribute('data-pill', args.pill);
  }
  badge.setAttribute('data-text', args.text);
  badge.setAttribute('data-extra-classes', args.extraClasses);
  return badge;
};

export const Badge = Template.bind({});
Badge.args = {
  text: 'Badge',
  tag: 'span',
  backgroundColor: 'primary',
};

export const Pill = Template.bind({});
Pill.args = {
  text: 'Pill Badge',
  pill: true,
  tag: 'span',
  backgroundColor: 'primary',
};

export const BadgeHidden = Template.bind({});
BadgeHidden.args = {
  text: '99+',
  hiddenText: 'Unread Messages',
  backgroundColor: 'danger',
  tag: 'span',
};

export const BadgePosition = (args) => html`
  <button type="button" class="btn btn-primary position-relative">
    Inbox
    <cod-badge
      data-tag="span"
      data-background-color="${args.backgroundColor}"
      data-hidden-text="${args.hiddenText}"
      data-text="${args.text}"
      data-extra-classes="${args.extraClasses}"
    ></cod-badge>
  </button>
`;
BadgePosition.args = {
  text: '99+',
  hiddenText: 'Unread Messages',
  backgroundColor: 'danger',
  extraClasses: 'position-absolute top-0 start-100 translate-middle',
  tag: 'span',
};

export const BadgeLink = Template.bind({});
BadgeLink.args = {
  text: 'Badge Link',
  url: 'https://google.com',
  tag: 'span',
  backgroundColor: 'primary',
};
