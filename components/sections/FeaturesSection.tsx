'use client'

import { SectionProps } from '@/lib/sections/registry'

export function FeaturesSection({ heading, description, features, id }: SectionProps) {
  return (
    <section id={id || 'features'} style={{ padding: '80px 20px', backgroundColor: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {heading && <h2 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>{heading}</h2>}
        {description && (
          <p style={{ fontSize: '1.1rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            {description}
          </p>
        )}

        {features && features.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {features.map((feature: any, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: '30px',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                }}
              >
                {feature.icon && (
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                    {typeof feature.icon === 'string' ? feature.icon : 'ðŸ“Œ'}
                  </div>
                )}
                {feature.title && <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{feature.title}</h3>}
                {feature.description && <p style={{ color: 'var(--color-text-secondary)' }}>{feature.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

