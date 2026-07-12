export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'rating', title: 'Rating', type: 'number', options: { min: 1, max: 5 } },
  ],
  preview: {
    select: { title: 'name', subtitle: 'company' },
  },
};
