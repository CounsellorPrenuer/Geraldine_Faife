'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

export function TestimonialsSection({ heading, testimonials, id }: SectionProps) {
  return (
    <section id={id || 'testimonials'} style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {heading && <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>{heading}</h2>}

        {testimonials && testimonials.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {testimonials.map((testimonial: any, idx: number) => (
              (() => {
                const photoSource = testimonial.avatar || testimonial.image || testimonial.clientPhoto
                const photoUrl = photoSource ? urlForImage(photoSource).width(96).height(96).fit('crop').url() : null

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '30px',
                      backgroundColor: 'var(--color-surface)',
                      borderRadius: '8px',
                      borderLeft: '4px solid var(--color-primary)',
                    }}
                  >
                    {testimonial.rating && (
                      <div style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                        {'\u2605'.repeat(testimonial.rating)}
                      </div>
                    )}
                    {testimonial.quote && (
                      <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--color-text-primary)' }}>
                        "{testimonial.quote}"
                      </p>
                    )}
                    {testimonial.contentImage && (
                      <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img
                          src={urlForImage(testimonial.contentImage).url()}
                          alt="Testimonial attachment"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {photoUrl && (
                        <img
                          src={photoUrl}
                          alt={testimonial.author || 'Author photo'}
                          style={{ width: '48px', height: '48px', borderRadius: '9999px', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        {testimonial.author && (
                          <strong style={{ display: 'block', marginBottom: '5px' }}>{testimonial.author}</strong>
                        )}
                        {testimonial.role && <small style={{ color: 'var(--color-text-secondary)' }}>{testimonial.role}</small>}
                      </div>
                    </div>
                  </div>
                )
              })()
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


