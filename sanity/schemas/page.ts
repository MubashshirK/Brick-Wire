export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'seoDescription', title: 'SEO Description', type: 'text' },
  ],
  preview: {
    select: { title: 'title' },
  },
};
