/**
 * SANITY SCHEMA: Site Configuration
 * 
 * This schema defines global site settings that can be edited in Sanity Studio.
 * It's a singleton document - only one instance exists.
 */

export default {
  name: 'site',
  title: 'Site Configuration',
  type: 'document',
  // This makes it a singleton - only one document of this type can exist
  __experimental_actions: ['create', 'update', /*'delete'*/],

  fieldsets: [
    {
      name: 'themeColors',
      title: 'Theme Colors',
      options: {
        collapsible: true,
        collapsed: false
      },
      description: 'Customize the color scheme of your website'
    }
  ],

  fields: [
    {
      name: 'title',
      title: 'Website Title',
      type: 'string',
      description: 'Main website title (used in browser tab)'
    },
    {
      name: 'description',
      title: 'Website Description',
      type: 'text',
      description: 'SEO description for search engines'
    },
    {
      name: 'logo',
      title: 'Logo Text',
      type: 'string',
      description: 'Short text/acronym for navbar logo (e.g., "PS", "ACME"). Used if no logo image is uploaded.',
      validation: (Rule) => Rule.max(5)
    },
    {
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      description: 'Upload a logo image (recommended: 200x60px). If provided, this will be used instead of logo text.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe your logo for accessibility',
        },
      ],
    },
    // Theme Colors Fieldset
    {
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Primary brand color for buttons and links',
      initialValue: '#2563eb',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'primaryHoverColor',
      title: 'Primary Hover Color',
      type: 'string',
      description: 'Color when hovering over primary buttons/links',
      initialValue: '#1d4ed8',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Main page background color',
      initialValue: '#ffffff',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'surfaceColor',
      title: 'Surface Color',
      type: 'string',
      description: 'Background for cards, panels, and sections',
      initialValue: '#f8f9fa',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'textPrimary',
      title: 'Primary Text Color',
      type: 'string',
      description: 'Main text color for headings',
      initialValue: '#000000',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'textSecondary',
      title: 'Secondary Text Color',
      type: 'string',
      description: 'Secondary text color for body copy',
      initialValue: '#4b5563',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'borderColor',
      title: 'Border Color',
      type: 'string',
      description: 'Color for borders and dividers',
      initialValue: '#e0e0e0',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'footerBackground',
      title: 'Footer Background Color',
      type: 'string',
      description: 'Background color for footer',
      initialValue: '#010101',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'footerText',
      title: 'Footer Text Color',
      type: 'string',
      description: 'Text color for footer content',
      initialValue: '#ffffff',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).warning('Use hex format: #RRGGBB'),
      fieldset: 'themeColors'
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email()
    },
    {
      name: 'phone',
      title: 'Contact Phone',
      type: 'string'
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string'
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      description: 'Links to your social media profiles',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          description: 'https://instagram.com/yourprofile'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          description: 'https://linkedin.com/company/yourcompany'
        },
        {
          name: 'twitter',
          title: 'Twitter / X URL',
          type: 'url',
          description: 'https://twitter.com/yourprofile'
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          description: 'https://facebook.com/yourpage'
        },
        {
          name: 'github',
          title: 'GitHub URL',
          type: 'url',
          description: 'https://github.com/yourprofile'
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
        title: selection.title || 'Site Configuration'
      }
    }
  }
}
