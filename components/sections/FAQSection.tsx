'use client'

import React from 'react'
import { SectionProps } from '@/lib/sections/registry'

export function FAQSection({ heading, faqs, id }: SectionProps) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null)

  return (
    <section id={id || 'faq'} style={{ padding: '80px 20px', backgroundColor: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {heading && <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>{heading}</h2>}

        {faqs && faqs.length > 0 && (
          <div>
            {faqs.map((faq: any, idx: number) => (
              <div
                key={idx}
                style={{
                  marginBottom: '20px',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '20px',
                }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '15px 0',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {faq.question}
                  <span style={{ marginLeft: '10px', fontSize: '0.8em' }}>{openIdx === idx ? '▼' : '▶'}</span>
                </button>

                {openIdx === idx && faq.answer && (
                  <p style={{ marginTop: '15px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

