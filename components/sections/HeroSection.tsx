'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

export function HeroSection({ tagline, heading, subheading, backgroundImage, cta }: SectionProps) {
  const bgImageUrl = backgroundImage ? urlForImage(backgroundImage).width(1920).height(800).url() : undefined

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px',
        padding: '100px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-on-dark)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '40px',
          borderRadius: '8px',
          maxWidth: '800px',
        }}
      >
        {tagline && (
          <span style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '10px',
            color: 'var(--color-primary)'
          }}>
            {tagline}
          </span>
        )}
        {heading && <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', lineHeight: '1.2' }}>{heading}</h1>}
        {subheading && <p style={{ fontSize: '1.25rem', marginBottom: '30px', opacity: 0.9 }}>{subheading}</p>}
        {cta?.text && (
          <a
            href={cta.link || '#'}
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-background)',
              padding: '12px 30px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '1.1rem',
            }}
          >
            {cta.text}
          </a>
        )}
      </div>
    </section>
  )
}

