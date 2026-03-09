/**
 * SANITY SCHEMA: Testimonial / Review
 * 
 * Customer testimonials and reviews section
 */

export default {
  name: 'testimonial',
  title: 'Testimonial / Review',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      description: 'Full name of the person giving the testimonial'
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'Job title or role (e.g., "CEO at Acme Corp")'
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      description: 'The actual testimonial text',
      // No validation, field is optional
    },
    {
      name: 'image',
      title: 'Customer Photo',
      type: 'image',
      description: 'Profile photo of the customer (optional)',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'contentImage',
      title: 'Testimonial Image (Certificate/Photo)',
      type: 'image',
      description: 'An image to display within the testimonial (e.g., a certificate)',
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
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Star rating (1-5)',
      validation: (Rule) => Rule.min(1).max(5)
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company name (optional)'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order testimonials appear on the website',
      initialValue: 0
    }
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
}
