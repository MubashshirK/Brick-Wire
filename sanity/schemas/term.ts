export default {
  name: 'term',
  title: 'CRE Term',
  type: 'document',
  fields: [
    { name: 'name', title: 'Term', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    { name: 'definition', title: 'Definition', type: 'blockContent' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Leasing', value: 'leasing' },
          { title: 'Financing', value: 'financing' },
          { title: 'Valuation', value: 'valuation' },
          { title: 'Investment', value: 'investment' },
          { title: 'Development', value: 'development' },
          { title: 'Property Types', value: 'property-types' },
          { title: 'Legal', value: 'legal' },
        ],
      },
    },
    { name: 'abbreviation', title: 'Abbreviation', type: 'string' },
    {
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'term' }] }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', abbreviation: 'abbreviation' },
    prepare({ title, subtitle, abbreviation }: { title: string; subtitle: string; abbreviation: string }) {
      return {
        title: abbreviation ? `${abbreviation} — ${title}` : title,
        subtitle: subtitle ? `Category: ${subtitle}` : '',
      };
    },
  },
  orderings: [
    { title: 'Name A\u2013Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
}
