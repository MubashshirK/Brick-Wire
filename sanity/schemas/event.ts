export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'datetime' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'link', title: 'Link', type: 'url' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location' },
  },
};
