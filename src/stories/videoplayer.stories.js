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
  },
  args: {
    thumbnailSrc: 'https://placehold.co/600x338',
    thumbnailAlt: 'Thumbnail image for a video.',
  },
};

// Template
const Template = (args) => {
  const videoPlayerElt = document.createElement('cod-videoplayer');
  videoPlayerElt.setAttribute('thumbnail-src', args.thumbnailSrc);
  return videoPlayerElt;
};

export const Primary = Template.bind({});
