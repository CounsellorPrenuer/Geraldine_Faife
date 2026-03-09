'use client'

import { SectionProps } from '@/lib/sections/registry'

export function ServiceSection({ title, description, services, id }: SectionProps) {
  const cardShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 5px 15px -5px rgba(0, 0, 0, 0.2)'
  const popularColor = '#2563eb'

  return (
    <section
      id={id || 'services'}
      className="service-section"
      style={{
        padding: '100px 20px',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-on-dark)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {title && (
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '16px',
            textAlign: 'center',
            color: 'var(--color-primary)',
            fontWeight: '700'
          }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '80px',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 80px auto'
          }}>
            {description}
          </p>
        )}

        {services && services.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '40px',
              alignItems: 'stretch'
            }}
          >
            {services.map((service: any, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: '40px 30px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '24px',
                  border: `1.5px solid ${service.popular ? 'var(--color-primary)' : '#333333'}`,
                  boxShadow: cardShadow,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                }}
              >
                {service.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: popularColor,
                    color: 'white',
                    padding: '4px 20px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}>
                    ★ Popular
                  </div>
                )}

                {service.serviceName && (
                  <h3 style={{
                    fontSize: '1.6rem',
                    marginBottom: '16px',
                    color: 'var(--color-primary)',
                    fontWeight: '700',
                    lineHeight: '1.2'
                  }}>
                    {service.serviceName}
                  </h3>
                )}

                {service.serviceDescription && (
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    marginBottom: '24px'
                  }}>
                    {service.serviceDescription}
                  </p>
                )}

                {service.price && (
                  <div style={{
                    fontSize: '2.5rem',
                    color: 'var(--color-primary)',
                    fontWeight: '800',
                    marginBottom: '32px'
                  }}>
                    {service.price}
                  </div>
                )}

                {service.features && service.features.length > 0 && (
                  <div style={{ flexGrow: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {service.features.map((feature: string, fIdx: number) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <span style={{
                            color: 'var(--color-primary)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginTop: '2px'
                          }}>✓</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  style={{
                    marginTop: '40px',
                    padding: '16px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

