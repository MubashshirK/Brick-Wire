import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import blockContent from './sanity/schemas/blockContent'
import brief from './sanity/schemas/brief'
import newsletter from './sanity/schemas/newsletter'
import review from './sanity/schemas/review'
import podcastEpisode from './sanity/schemas/podcastEpisode'
import testimonial from './sanity/schemas/testimonial'
import marketReport from './sanity/schemas/marketReport'
import event from './sanity/schemas/event'
import page from './sanity/schemas/page'
import market from './sanity/schemas/market'
import sector from './sanity/schemas/sector'
import term from './sanity/schemas/term'
import partner from './sanity/schemas/partner'

export default defineConfig({
  name: 'brick-wire',
  title: 'Brick Wire',

  projectId: '64qdsz2b',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [blockContent, brief, newsletter, review, podcastEpisode, testimonial, marketReport, event, page, market, sector, term, partner],
  },
})
