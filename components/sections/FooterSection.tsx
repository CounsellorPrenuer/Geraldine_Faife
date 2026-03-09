'use client'

import { SectionProps } from '@/lib/sections/registry'

export function FooterSection({ companyName, description, socialLinks, copyright }: SectionProps) {
  return (
    <footer
      className="footer-section"
      style={{
        padding: '60px 20px 30px',
        backgroundColor: 'var(--color-footer-background)',
        color: 'var(--color-footer-text)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Company Info */}
          <div>
            {companyName && <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--color-footer-text)' }}>{companyName}</h3>}
            {description && <p style={{ color: 'var(--color-footer-text)', opacity: 0.8, lineHeight: '1.6' }}>{description}</p>}
          </div>

          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--color-footer-text)' }}>Connect With Us</h4>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {socialLinks.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--color-footer-text)',
                      textDecoration: 'none',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                    }}
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: '30px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            color: 'var(--color-footer-text)',
            opacity: 0.7,
            fontSize: '0.9rem',
          }}
        >
          {copyright || `Â© ${new Date().getFullYear()} ${companyName || 'Company'}. All rights reserved.`}
        </div>
      </div>
    </footer>
  )
}

