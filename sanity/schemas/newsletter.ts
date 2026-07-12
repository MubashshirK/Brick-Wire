export default {
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'edition', title: 'Edition', type: 'string', options: { list: ['national', 'texas', 'new-york'] } },
    { name: 'issueDate', title: 'Issue Date', type: 'date' },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'edition', media: 'image' },
  },
};
