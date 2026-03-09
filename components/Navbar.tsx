'use client'

import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  logo?: string
  logoImage?: any
  links?: NavLink[]
  pages?: { title: string, slug: string }[]
}

export function Navbar({ logo, logoImage, links, pages: initialPages }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [dynamicPages, setDynamicPages] = useState<{ title: string, slug: string }[]>(initialPages || [])

  const logoImageUrl = logoImage ? urlForImage(logoImage).url() : null
  const logoAlt = logoImage?.alt || logo || 'Logo'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // If we have explicit links, we might not need to fetch all pages
    // But to be helpful, let's fetch pages that aren't 'home'
    if (!initialPages || initialPages.length === 0) {
      const fetchPages = async () => {
        try {
          const { sanityClient } = await import('@/lib/sanity')
          const result = await sanityClient.fetch(`
            *[_type == "page" && lower(slug.current) != "home"] { 
              "title": title, 
              "slug": slug.current 
            }
          `)
          setDynamicPages(result || [])
        } catch (error) {
          console.error('[Navbar] Failed to fetch dynamic pages:', error)
          setDynamicPages([])
        }
      }
      fetchPages()
    }
  }, [initialPages])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const id = href.substring(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsMobileMenuOpen(false)
      }
    }
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-background)',
        backdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid var(--color-border)',
        padding: isScrolled ? '12px 20px' : '16px 20px',
        boxShadow: isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '#home')}
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            zIndex: 1001,
          }}
        >
          {logoImageUrl ? (
            <Image
              src={logoImageUrl}
              alt={logoAlt}
              width={400}
              height={120}
              style={{
                height: isScrolled ? '38px' : '48px',
                width: 'auto',
                maxWidth: '240px',
                objectFit: 'contain',
                transition: 'height 0.3s ease',
              }}
              priority
            />
          ) : (
            logo || 'Logo'
          )}
        </a>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {(() => {
            // Combine manual links with dynamic pages
            const manualLinks = links || [];
            const pageLinks = dynamicPages
              .filter(p => p.slug && typeof p.slug === 'string')
              .map(p => ({ label: p.title, href: `/${p.slug}` }));

            // Merge and remove duplicates by label
            const combined = [...manualLinks];
            pageLinks.forEach(pl => {
              if (pl.label && !combined.some(cl => cl.label && cl.label.toLowerCase() === pl.label.toLowerCase())) {
                combined.push(pl);
              }
            });

            // Standard sections to ensure are present (as anchors by default)
            const standardSections = [
              { label: 'Home', href: '#home', priority: 1 },
              { label: 'About', href: '#about', priority: 2 },
              { label: 'Packages', href: '#packages', priority: 4 },
              { label: 'Testimonials', href: '#testimonials', priority: 5 },
              { label: 'Contact', href: '#contact', priority: 7 }
            ];

            // Ensure essential links exist
            standardSections.forEach(section => {
              if (!combined.some(l => l.label && l.label.toLowerCase() === section.label.toLowerCase())) {
                combined.push({ label: section.label, href: section.href });
              }
            });

            // Sort combining manual order if possible, but keeping essential ones accessible
            // For simplicity, we'll just ensure Home is first if it was added
            const finalLinks = combined.sort((a, b) => {
              const aDefault = standardSections.find(s => s.label.toLowerCase() === a.label?.toLowerCase());
              const bDefault = standardSections.find(s => s.label.toLowerCase() === b.label?.toLowerCase());
              if (aDefault && bDefault) return aDefault.priority - bDefault.priority;
              if (aDefault) return -1;
              if (bDefault) return 1;
              return 0;
            });

            return (
              <ul
                className="desktop-menu"
                style={{
                  display: 'flex',
                  gap: '30px',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {finalLinks.map((link, idx) => {
                  const labelLower = link.label?.toLowerCase() || ''
                  const isHome = labelLower === 'home' ||
                    link.href?.toLowerCase() === '/home' ||
                    link.href === '#' ||
                    link.href === ''

                  const isServices = labelLower === 'services'
                  const isAbout = labelLower === 'about'
                  const isContact = labelLower === 'contact'
                  const isPackages = labelLower === 'packages'
                  const isTestimonials = labelLower === 'testimonials'
                  const isFAQ = labelLower === 'faq'

                  // Smart Linking: Fallback to anchor if page doesn't exist
                  const pageSlugExists = (slug: string) => dynamicPages.some(p => p.slug?.toLowerCase() === slug.toLowerCase())

                  let href = link.href
                  if (isHome) href = '#home'
                  else if (isServices && !pageSlugExists('services')) href = '#services'
                  else if (isAbout && !pageSlugExists('about')) href = '#about'
                  else if (isPackages && !pageSlugExists('packages')) href = '#packages'
                  else if (isTestimonials && !pageSlugExists('testimonials')) href = '#testimonials'
                  else if (isFAQ && !pageSlugExists('faq')) href = '#faq'
                  else if (isContact && !pageSlugExists('contact')) href = '#contact'
                  else if (isAbout && !link.href?.includes('/')) href = '#about'

                  return (
                    <li key={idx}>
                      <a
                        href={href}
                        onClick={(e) => handleLinkClick(e, href)}
                        style={{
                          color: 'var(--color-text-primary)',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          transition: 'color 0.2s',
                          opacity: 0.9,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--color-primary)'
                          e.currentTarget.style.opacity = '1'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--color-text-primary)'
                          e.currentTarget.style.opacity = '0.9'
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            );
          })()}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
              color: 'var(--color-text-primary)',
            }}
            className="mobile-toggle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          display: isMobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          zIndex: 1000,
          opacity: isMobileMenuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
          {(() => {
            const manualLinks = links || [];
            const pageLinks = dynamicPages
              .filter(p => p.slug && typeof p.slug === 'string')
              .map(p => ({ label: p.title, href: `/${p.slug}` }));
            const combined = [...manualLinks];
            pageLinks.forEach(pl => {
              if (pl.label && !combined.some(cl => cl.label && cl.label.toLowerCase() === pl.label.toLowerCase())) {
                combined.push(pl);
              }
            });

            const standardSections = [
              { label: 'Home', href: '#home', priority: 1 },
              { label: 'About', href: '#about', priority: 2 },
              { label: 'Packages', href: '#packages', priority: 4 },
              { label: 'Testimonials', href: '#testimonials', priority: 5 },
              { label: 'Contact', href: '#contact', priority: 7 }
            ];

            standardSections.forEach(section => {
              if (!combined.some(l => l.label && l.label.toLowerCase() === section.label.toLowerCase())) {
                combined.push({ label: section.label, href: section.href });
              }
            });

            const finalLinks = combined.sort((a, b) => {
              const aDefault = standardSections.find(s => s.label.toLowerCase() === a.label?.toLowerCase());
              const bDefault = standardSections.find(s => s.label.toLowerCase() === b.label?.toLowerCase());
              if (aDefault && bDefault) return aDefault.priority - bDefault.priority;
              if (aDefault) return -1;
              if (bDefault) return 1;
              return 0;
            });

            return finalLinks.map((link, idx) => {
              const labelLower = link.label?.toLowerCase() || ''
              const isHome = labelLower === 'home' ||
                link.href?.toLowerCase() === '/home' ||
                link.href === '#' ||
                link.href === ''

              const isServices = labelLower === 'services'
              const isAbout = labelLower === 'about'
              const isContact = labelLower === 'contact'
              const isPackages = labelLower === 'packages'
              const isTestimonials = labelLower === 'testimonials'
              const isFAQ = labelLower === 'faq'

              const pageSlugExists = (slug: string) => dynamicPages.some(p => p.slug?.toLowerCase() === slug.toLowerCase())

              let href = link.href
              if (isHome) href = '#home'
              else if (isServices && !pageSlugExists('services')) href = '#services'
              else if (isAbout && !pageSlugExists('about')) href = '#about'
              else if (isPackages && !pageSlugExists('packages')) href = '#packages'
              else if (isTestimonials && !pageSlugExists('testimonials')) href = '#testimonials'
              else if (isFAQ && !pageSlugExists('faq')) href = '#faq'
              else if (isContact && !pageSlugExists('contact')) href = '#contact'
              else if (isAbout && !link.href?.includes('/')) href = '#about'

              return (
                <li key={idx} style={{ marginBottom: '30px' }}>
                  <a
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                  >
                    {link.label}
                  </a>
                </li>
              )
            });
          })()}
        </ul>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  )
}

