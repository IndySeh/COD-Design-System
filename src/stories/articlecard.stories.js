import '../components/organisms/ArticleCard/cod-article-card';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Organisms/ArticleCard',
  argTypes: {
    href: {
      control: { type: 'text' },
      description: 'The URL of where the card will link to.',
    },
    target: {
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'The URL of where the card will link to.',
    },
    src: {
      control: { type: 'text' },
      description: 'The source of the article card image.',
    },
    title: {
      control: { type: 'text' },
      description: 'The title of the article. Custom markdown is supported.',
    },
    subTitle: {
      control: { type: 'text' },
      description: 'The subtitle of the article. Custom markdown is supported.',
    },
    color: COMMON_STORY_ARGS.bootstrapColor,
    show: {
      control: { type: 'boolean' },
      description: 'Toggle to show or hide the article card title text.',
    },
  },
  args: {
    src: 'https://placehold.co/300x400',
    title:
      '<h2 class="text-center text-light" style="text-transform: uppercase; font-weight: 900; font-size: 2.625rem;">The Great Money Transfer</h2>',
    subTitle:
      '<h3 class="text-center text-success" style="text-transform: uppercase; font-weight: 700; font-size: 1.625rem; line-height: 116%;">The Power of Generational Wealth</h3>',
    color: 'primary',
    href: 'https://www.example.com',
    target: '_blank',
    show: false,
  },
};

function _containsHTMLTags(str) {
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

function _createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

function _createArticleCard(args) {
  const articleCardElt1 = document.createElement('cod-article-card');
  articleCardElt1.setAttribute('src', args.src);
  articleCardElt1.setAttribute('color', args.color);
  articleCardElt1.setAttribute('href', args.href);
  articleCardElt1.setAttribute('target', args.target);
  if (args.show) {
    articleCardElt1.setAttribute('show', 'show');
  }
  if (_containsHTMLTags(args.title)) {
    const title = _createElementFromHTML(args.title);
    title.slot = 'title';
    articleCardElt1.appendChild(title);
  } else {
    const title = document.createElement('h2');
    title.innerText = args.title;
    title.classList.add('text-center');
    title.slot = 'title';
    articleCardElt1.appendChild(title);
  }

  if (_containsHTMLTags(args.subTitle)) {
    const subTitle = _createElementFromHTML(args.subTitle);
    subTitle.slot = 'subtitle';
    articleCardElt1.appendChild(subTitle);
  } else {
    const subTitle = document.createElement('h3');
    subTitle.innerText = args.subTitle;
    subTitle.classList.add('text-center');
    subTitle.slot = 'subtitle';
    articleCardElt1.appendChild(subTitle);
  }
  return articleCardElt1;
}

// Template
const Template = (args) => {
  const articleCardElt1 = _createArticleCard(args);
  const articleCardElt2 = _createArticleCard(args);
  const articleCardElt3 = _createArticleCard(args);

  const rowElt = document.createElement('div');
  rowElt.classList.add('row');

  const colElt1 = document.createElement('div');
  colElt1.classList.add('col');
  colElt1.classList.add('px-0'); // Add bootstrap class to remove left and right padding
  colElt1.appendChild(articleCardElt1);
  rowElt.appendChild(colElt1);

  const colElt2 = document.createElement('div');
  colElt2.classList.add('col');
  colElt2.classList.add('px-0'); // Add bootstrap class to remove left and right padding
  colElt2.appendChild(articleCardElt2);
  rowElt.appendChild(colElt2);

  const colElt3 = document.createElement('div');
  colElt3.classList.add('col');
  colElt3.classList.add('px-0'); // Add bootstrap class to remove left and right padding
  colElt3.appendChild(articleCardElt3);
  rowElt.appendChild(colElt3);

  return rowElt;
};

export const Primary = Template.bind({});
