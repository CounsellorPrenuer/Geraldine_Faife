/**
 * SANITY STUDIO CONFIGURATION
 * 
 * Configure which schemas are available in Sanity Studio
 * and how they're organized in the desk structure.
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Professional Website CMS',
  
  projectId: 'qdidf6e5',  // Get from sanity.io/manage
  dataset: 'production',
  
  plugins: [
    structureTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
