import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '64qdsz2b',
    dataset: 'production'
  },
  studioHost: 'brick-wire',
  deployment: {
    autoUpdates: true,
    appId: 'd3k0wwzxhei6sojt6zawhap2',
  },
})
