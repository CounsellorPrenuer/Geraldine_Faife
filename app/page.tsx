import { getLegacyHomeContent, getPageBySlug } from '@/lib/sanity'

function buildLegacySections(legacyContent: any) {
  const sections: any[] = []

  if (legacyContent?.hero) {
    sections.push({
      _key: 'legacy-hero',
      _type: 'heroSection',
      heading: legacyContent.hero.headline,
      subheading: legacyContent.hero.subheadline,
      cta: {
        text: legacyContent.hero.ctaText,
        link: legacyContent.hero.ctaLink,
      },
    })
  }

  if (legacyContent?.about) {
    sections.push({
      _key: 'legacy-about',
      _type: 'aboutSection',
      title: legacyContent.about.title,
      subtitle: legacyContent.about.subtitle,
      description: legacyContent.about.description,
      quote: legacyContent.about.quote,
      image: legacyContent.about.image,
      highlights: legacyContent.about.highlights,
    })
  }

  if (legacyContent?.services?.length) {
    sections.push({
      _key: 'legacy-services',
      _type: 'serviceSection',
      title: 'Services',
      services: legacyContent.services.map((service: any) => ({
        serviceName: service.title,
        serviceDescription: service.description,
        price: service.price,
        popular: service.popular,
        features: service.features,
      })),
    })
  }

  if (legacyContent?.mentoriaPackages) {
    sections.push({
      _key: 'legacy-mentoriaPackages',
      _type: 'mentoriaPackagesSection',
      title: legacyContent.mentoriaPackages.title,
      subtitle: legacyContent.mentoriaPackages.subtitle,
      id: legacyContent.mentoriaPackages.id,
      categories: legacyContent.mentoriaPackages.categories || [],
    })
  }


  const mappedTestimonials = legacyContent?.testimonials?.length
    ? legacyContent.testimonials.map((testimonial: any) => ({
      clientName: testimonial.name,
      clientTitle: testimonial.role || testimonial.company,
      testimonialText: testimonial.quote,
      clientPhoto: testimonial.image,
      contentImage: testimonial.contentImage,
      rating: testimonial.rating,
    }))
    : []

  if (mappedTestimonials.length) {
    sections.push({
      _key: 'legacy-testimonials',
      _type: 'testimonialSection',
      title: 'Testimonials',
      testimonials: mappedTestimonials,
    })
  }

  if (legacyContent?.contact || legacyContent?.site?.email || legacyContent?.site?.phone || legacyContent?.site?.address) {
    sections.push({
      _key: 'legacy-contact',
      _type: 'contactSection',
      title: legacyContent?.contact?.title || 'Contact Us',
      description: legacyContent?.contact?.description,
      email: legacyContent?.site?.email,
      phone: legacyContent?.site?.phone,
      address: legacyContent?.site?.address,
      formTitle: 'Send us a message',
      id: 'contact',
    })
  }

  if (legacyContent?.footer || legacyContent?.site) {
    const socialLinks = legacyContent?.footer?.socialLinks?.map((link: any) => ({
      platform: link.label,
      url: link.url,
    }))

    sections.push({
      _key: 'legacy-footer',
      _type: 'footerSection',
      companyName: legacyContent?.site?.title,
      description: legacyContent?.site?.description,
      socialLinks,
      copyright: legacyContent?.footer?.copyright,
    })
  }

  return sections
}

/**
 * Root page / home
 * Shows welcome page or home content
 */
export default async function Home() {
  let homePage = null
  let legacyHomeContent = null
  const sanityStudioUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : '/studio'

  try {
    // Add 5-second timeout for Sanity fetch
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    homePage = await Promise.race([getPageBySlug('home'), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch home page, using fallback', error)
  }

  if (!homePage) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
      legacyHomeContent = await Promise.race([getLegacyHomeContent(), timeoutPromise])
    } catch (error) {
      console.log('[Home] Failed to fetch legacy home content, using fallback', error)
    }
  }

  const legacySections = legacyHomeContent ? buildLegacySections(legacyHomeContent) : []
  const pageSections = homePage?.sections || []

  // If home page exists in Sanity with sections, render it. If not, fallback to legacy content.
  if (pageSections.length > 0 || legacySections.length > 0) {
    const { getSectionComponent } = await import('@/lib/sections/registry')
    const allSections = pageSections.length > 0 ? pageSections : legacySections
    const footerSection = allSections.find((s: any) => s._type === 'footerSection')
    const regularSections = allSections.filter((s: any) => s._type !== 'footerSection')

    return (
      <main>
        {regularSections.length > 0 ? (
          regularSections.map((section: any, idx: number) => {
            const Component = getSectionComponent(section._type)
            if (!Component) return null
            return <Component key={section._key || idx} {...section} />
          })
        ) : null}
        {footerSection && (() => {
          const { getSectionComponent } = require('@/lib/sections/registry')
          const FooterComponent = getSectionComponent(footerSection._type)
          if (FooterComponent) return <FooterComponent key={footerSection._key || 'footer'} {...footerSection} />
          return null
        })()}
      </main>
    )
  }

  // Fallback welcome message if no home page found
  return (
    <main style={{ padding: '40px', textAlign: 'center', minHeight: '100vh' }}>
      <h1>Welcome to Your Remixable Template</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '20px auto' }}>
        This is a section-based website template powered by Sanity CMS.
      </p>
      <p>
        <a
          href={sanityStudioUrl}
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-background)',
            padding: '12px 30px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Manage Content in Sanity
        </a>
      </p>
      <p style={{ marginTop: '40px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        Create a page with slug "home" in Sanity to get started.
      </p>
    </main>
  )
}
// Git sync
