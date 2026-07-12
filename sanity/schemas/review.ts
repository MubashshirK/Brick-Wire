export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'productName', title: 'Product Name', type: 'string' },
    { name: 'rating', title: 'Rating', type: 'number', options: { min: 1, max: 5 } },
    { name: 'pricing', title: 'Pricing', type: 'text' },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'pros', title: 'Pros', type: 'array', of: [{ type: 'string' }] },
    { name: 'cons', title: 'Cons', type: 'array', of: [{ type: 'string' }] },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'productName', media: 'image' },
  },
};
