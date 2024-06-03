import '../components/organisms/VideoPlayer/cod-videoplayer';

export default {
  title: 'Components/Organisms/VideoPlayer',
  argTypes: {
    videoType: {
      control: { type: 'select' },
      options: ['youtube'],
      description: 'The ID of the YouTube video.',
    },
    videoId: {
      control: { type: 'text' },
      description: 'The ID of the YouTube video.',
    },
    thumbnailDisplay: {
      control: { type: 'select' },
      options: ['fullwidth', 'inline'],
      description: 'The display mode for the thumbnail.',
    },
    playerDisplay: {
      control: { type: 'select' },
      options: ['modal'],
      description: 'The display mode for the player.',
    },
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
    thumbnailDisplay: 'fullwidth',
    thumbnailSrc: 'https://placehold.co/600x338',
    thumbnailAlt: 'Thumbnail image for a video.',
    title: 'Super Cool Video',
    videoId: 'EfKvl0mX13E',
    videoType: 'youtube',
    playerDisplay: 'modal',
  },
};

// Template
const Template = (args) => {
  const videoPlayerElt = document.createElement('cod-videoplayer');
  videoPlayerElt.setAttribute('thumbnail-display', args.thumbnailDisplay);
  videoPlayerElt.setAttribute('player-display', args.playerDisplay);
  videoPlayerElt.setAttribute('thumbnail-src', args.thumbnailSrc);
  videoPlayerElt.setAttribute('thumbnail-alt', args.thumbnailAlt);
  videoPlayerElt.setAttribute('title', args.title);
  videoPlayerElt.setAttribute('video-id', args.videoId);
  videoPlayerElt.setAttribute('video-type', args.videoType);
  return videoPlayerElt;
};

export const Primary = Template.bind({});
