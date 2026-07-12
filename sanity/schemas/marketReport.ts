export default {
  name: 'marketReport',
  title: 'Market Report',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'publisher', title: 'Publisher', type: 'string' },
    { name: 'assetClass', title: 'Asset Class', type: 'string' },
    { name: 'city', title: 'City', type: 'string' },
    { name: 'state', title: 'State', type: 'string' },
    { name: 'reportDate', title: 'Report Date', type: 'date' },
    { name: 'file', title: 'File', type: 'file' },
    { name: 'coverImage', title: 'Cover Image', type: 'image' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publisher' },
  },
};
