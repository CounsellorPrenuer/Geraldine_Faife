import { defineType, defineField } from 'sanity'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'clientName',
              title: 'Client Name',
              type: 'string',
            }),
            defineField({
              name: 'clientTitle',
              title: 'Client Title/Company',
              type: 'string',
            }),
            defineField({
              name: 'clientPhoto',
              title: 'Client Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'testimonialText',
              title: 'Testimonial',
              type: 'text',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              options: {
                list: [
                  { title: '5 Stars', value: 5 },
                  { title: '4 Stars', value: 4 },
                  { title: '3 Stars', value: 3 },
                  { title: '2 Stars', value: 2 },
                  { title: '1 Star', value: 1 },
                ],
              },
            }),
            defineField({
              name: 'contentImage',
              title: 'Testimonial Image (Certificate/Photo)',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
  ],
})
