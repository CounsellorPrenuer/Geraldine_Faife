/**
 * SANITY SCHEMA: About Section
 * 
 * Information about the company/organization with highlights/features.
 */

export default {
  name: 'about',
  title: 'About Section',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Us'
    },
    {
      name: 'subtitle',
      title: 'Subtitle (Above Highlights)',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Main about section text'
    },
    {
      name: 'quote',
      title: 'Inspirational Quote',
      type: 'text',
      rows: 3
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    },
    {
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      description: 'Important points/achievements (e.g., "10+ Years of Experience")',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Highlight Text',
              type: 'string'
            },
            {
              name: 'icon',
              title: 'Icon (emoji)',
              type: 'string',
              description: 'An emoji to represent this highlight'
            }
          ],
          preview: {
            select: {
              text: 'text',
              icon: 'icon'
            },
            prepare(selection) {
              return {
                title: selection.text,
                subtitle: selection.icon
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title
      }
    }
  }
}
