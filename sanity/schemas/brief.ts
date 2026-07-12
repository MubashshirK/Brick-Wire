export default {
  name: 'brief',
  title: 'Brief',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'date', title: 'Date', type: 'datetime' },
    { name: 'market', title: 'Market', type: 'reference', to: [{ type: 'market' }] },
    { name: 'sector', title: 'Sector', type: 'reference', to: [{ type: 'sector' }] },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'sponsored', title: 'Sponsored', type: 'boolean' },
    { name: 'sponsorName', title: 'Sponsor Name', type: 'string' },
    { name: 'sponsorDescription', title: 'Sponsor Description', type: 'text' },
  ],
  preview: {
    select: { title: 'title', media: 'image', date: 'date' },
  },
};
