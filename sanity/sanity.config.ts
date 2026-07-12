import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import brief from './schemas/brief';
import newsletter from './schemas/newsletter';
import review from './schemas/review';
import podcastEpisode from './schemas/podcastEpisode';
import testimonial from './schemas/testimonial';
import marketReport from './schemas/marketReport';
import event from './schemas/event';
import page from './schemas/page';
import market from './schemas/market';
import sector from './schemas/sector';

export default defineConfig({
  name: 'brick-wire',
  title: 'Brick Wire',
  projectId: process.env.SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [brief, newsletter, review, podcastEpisode, testimonial, marketReport, event, page, market, sector],
  },
});
