import '../components/organisms/ArticleCard/cod-article-card';
import { COMMON_STORY_ARGS } from '../shared/js/storybook/args-utils';

export default {
  title: 'Components/Organisms/ArticleCard',
  argTypes: {
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
  },
  args: {
    src: 'https://placehold.co/300x400',
    title: 'The Great Money Transfer',
    subTitle: 'The Power of Generational Wealth',
    color: 'primary',
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
  if (_containsHTMLTags(args.title)) {
    const title = _createElementFromHTML(args.title);
    title.slot = 'title';
    articleCardElt1.appendChild(title);
  } else {
    const title = document.createElement('h3');
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
    const subTitle = document.createElement('h4');
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

