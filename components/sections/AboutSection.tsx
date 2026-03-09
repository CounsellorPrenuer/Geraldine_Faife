'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'

export function AboutSection({ title, subtitle, description, quote, image, id, highlights }: SectionProps) {
  const imageUrl = image ? urlForImage(image).width(1000).height(1200).url() : null
  const altText = image?.alt || title || 'About section image'
  const validHighlights = Array.isArray(highlights) ? highlights.filter((item: any) => item?.text || item?.icon) : []

  const cardShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  const imageShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'

  // Highlight icon background colors
  const iconBgs = ['#f3f4f6', '#f3f4f6', '#f3f4f6', '#f3f4f6']
  const iconColors = ['var(--color-primary)', 'var(--color-primary)', 'var(--color-primary)', 'var(--color-primary)']

  return (
    <section
      id={id || 'about'}
      className="about-section"
      style={{
        padding: '100px 20px',
        backgroundColor: 'var(--color-background)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: imageUrl ? '1.1fr 0.9fr' : '1fr',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            order: 1,
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: cardShadow,
            zIndex: 2
          }}
        >
          {title && (
            <h2 style={{
              fontSize: '3rem',
              marginBottom: '24px',
              color: 'var(--color-primary)',
              fontWeight: '700'
            }}>
              {title}
            </h2>
          )}

          {description && (
            <div
              style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: 'var(--color-text-secondary)',
                marginBottom: '32px',
                whiteSpace: 'pre-line'
              }}
            >
              {description}
            </div>
          )}

          {quote && (
            <div
              style={{
                borderLeft: `4px solid var(--color-primary)`,
                paddingLeft: '24px',
                marginBottom: '40px',
                fontStyle: 'italic',
                color: 'var(--color-primary)',
                fontSize: '1.15rem',
                fontWeight: '500',
                lineHeight: '1.6'
              }}
            >
              "{quote}"
            </div>
          )}

          {(subtitle || validHighlights.length > 0) && (
            <div>
              {subtitle && (
                <h3 style={{
                  fontSize: '1.4rem',
                  marginBottom: '20px',
                  color: 'var(--color-primary)',
                  fontWeight: '600'
                }}>
                  {subtitle}
                </h3>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {validHighlights.map((highlight: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: iconBgs[idx % iconBgs.length],
                      color: iconColors[idx % iconColors.length],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0
                    }}>
                      {highlight.icon || '✓'}
                    </div>
                    <span style={{
                      fontSize: '1rem',
                      color: 'var(--color-text-secondary)',
                      fontWeight: '500'
                    }}>
                      {highlight.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {imageUrl && (
          <div
            style={{
              order: 2,
              position: 'relative',
              borderRadius: '40px',
              boxShadow: imageShadow,
              overflow: 'hidden',
              aspectRatio: '4/5',
              transform: 'translateX(-20px)',
              zIndex: 1
            }}
          >
            <Image
              src={imageUrl}
              alt={altText}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 968px) {
          .about-section > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-section > div > div {
            transform: none !important;
            order: unset !important;
          }
        }
      `}</style>
    </section>
  )
}

