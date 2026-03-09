'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

export function TestimonialSection({ title, testimonials, id }: SectionProps) {
  return (
    <section
      id={id || 'testimonials'}
      className="testimonial-section"
      style={{
        padding: '80px 20px',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {title && (
          <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>
            {title}
          </h2>
        )}

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
                const photoUrl = testimonial.clientPhoto
                  ? urlForImage(testimonial.clientPhoto).width(96).height(96).fit('crop').url()
                  : null

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '30px',
                      backgroundColor: 'var(--color-background)',
                      borderRadius: '8px',
                      borderLeft: '4px solid var(--color-primary)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    {testimonial.rating && (
                      <div style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                        {'★'.repeat(testimonial.rating)}
                      </div>
                    )}
                    {testimonial.testimonialText && (
                      <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--color-text-primary)', lineHeight: '1.6' }}>
                        "{testimonial.testimonialText}"
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
                          alt={testimonial.clientName || 'Client photo'}
                          style={{ width: '48px', height: '48px', borderRadius: '9999px', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        {testimonial.clientName && (
                          <strong style={{ display: 'block', marginBottom: '5px', fontSize: '1.1rem' }}>
                            {testimonial.clientName}
                          </strong>
                        )}
                        {testimonial.clientTitle && (
                          <small style={{ color: 'var(--color-text-secondary)' }}>{testimonial.clientTitle}</small>
                        )}
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

