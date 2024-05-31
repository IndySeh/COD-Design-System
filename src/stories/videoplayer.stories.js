import '../components/organisms/VideoPlayer/cod-videoplayer';

export default {
  title: 'Components/Organisms/VideoPlayer',
  argTypes: {
    thumbnailSrc: {
      control: { type: 'text' },
      description: 'The source of the thumbnail image.',
    },
    thumbnailAlt: {
      control: { type: 'text' },
      description: 'The alt text for the thumbnail image.',
    },
    title: {
      control: { type: 'text' },
      description: 'The title of the video (used for screenreaders).',
    },
  },
  args: {
    thumbnailSrc: 'https://placehold.co/600x338',
    thumbnailAlt: 'Thumbnail image for a video.',
    title: 'Super Cool Video',
  },
};

// Template
const Template = (args) => {
  const videoPlayerElt = document.createElement('cod-videoplayer');
  videoPlayerElt.setAttribute('thumbnail-src', args.thumbnailSrc);
  videoPlayerElt.setAttribute('thumbnail-alt', args.thumbnailAlt);
  videoPlayerElt.setAttribute('title', args.title);
  return videoPlayerElt;
};

export const Primary = Template.bind({});
