export default {
  name: 'partner',
  title: 'Search Partner',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'logo', title: 'Logo', type: 'image' },
    { name: 'url', title: 'Website URL', type: 'url' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Data & Analytics', value: 'data-analytics' },
          { title: 'Listing Platforms', value: 'listing-platforms' },
          { title: 'Investment Tools', value: 'investment-tools' },
          { title: 'Property Management', value: 'property-management' },
          { title: 'CRM', value: 'crm' },
          { title: 'Marketing', value: 'marketing' },
        ],
      },
    },
    { name: 'featured', title: 'Featured Partner', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'logo' },
  },
}
