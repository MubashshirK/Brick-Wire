export default {
  name: 'podcastEpisode',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'guest', title: 'Guest', type: 'string' },
    { name: 'guestTitle', title: 'Guest Title', type: 'string' },
    { name: 'guestBio', title: 'Guest Bio', type: 'text' },
    { name: 'episodeDate', title: 'Episode Date', type: 'date' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'youtubeUrl', title: 'YouTube URL', type: 'url' },
    { name: 'spotifyUrl', title: 'Spotify URL', type: 'url' },
    { name: 'appleUrl', title: 'Apple Podcasts URL', type: 'url' },
    { name: 'albumArt', title: 'Album Art', type: 'image' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'guest', media: 'albumArt' },
  },
};
