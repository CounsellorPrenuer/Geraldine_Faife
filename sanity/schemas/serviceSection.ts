import { defineType, defineField } from 'sanity'

export const serviceSection = defineType({
  name: 'serviceSection',
  title: 'Service Section',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Section ID (for anchor links)',
      type: 'string',
      description: 'Optional HTML id for anchor navigation (e.g., "services")',
      validation: (Rule) => Rule.regex(/^[a-z0-9-]+$/).warning('Use lowercase letters, numbers, and hyphens only'),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'serviceName',
              title: 'Service Name',
              type: 'string',
            }),
            defineField({
              name: 'serviceDescription',
              title: 'Service Description',
              type: 'text',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              initialValue: '₹',
            }),
            defineField({
              name: 'popular',
              title: 'Popular',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'icon',
              title: 'Icon/Image',
              type: 'image',
              description: 'Optional icon or image for this service',
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
            }),
          ],
        },
      ],
    }),
  ],
})
