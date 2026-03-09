/**
 * SANITY SCHEMA: Hero Section
 * 
 * The large banner section at the top of the page with headline, subheadline, and CTA.
 */

export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  
  fields: [
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small text above headline (e.g., "Welcome to our site")'
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main hero headline (e.g., "Transform Your Vision Into Reality")'
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      description: 'Subheadline text below main headline'
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Call-to-action button text (e.g., "Get Started", "Learn More")',
      initialValue: 'Get Started'
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Where the CTA button links to (e.g., "#contact", "https://example.com")',
      initialValue: '#contact'
    },
    {
      name: 'backgroundGradient',
      title: 'Background Gradient',
      type: 'object',
      description: 'Gradient colors for hero section background',
      fields: [
        {
          name: 'fromColor',
          title: 'From Color (hex)',
          type: 'string',
          validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i)
        },
        {
          name: 'toColor',
          title: 'To Color (hex)',
          type: 'string',
          validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i)
        }
      ]
    }
  ],
  preview: {
    select: {
      headline: 'headline'
    },
    prepare(selection) {
      return {
        title: 'Hero Section',
        subtitle: selection.headline
      }
    }
  }
}
