import { defineType, defineField } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Section ID (for anchor links)',
      type: 'string',
      description: 'Optional HTML id for anchor navigation (e.g., "about")',
      validation: (Rule) => Rule.regex(/^[a-z0-9-]+$/).warning('Use lowercase letters, numbers, and hyphens only'),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (Above Highlights)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'quote',
      title: 'Inspirational Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Highlight Text',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon (emoji)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional image to accompany the about section',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for accessibility and SEO',
        },
      ],
    }),
  ],
})
