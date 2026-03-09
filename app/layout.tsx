import type { Metadata } from 'next'
import React from 'react'

import './globals.css'
import { Navbar } from '@/components/Navbar'
import { getNavbar, getSiteConfig } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Remixable Template',
  description: 'A reusable section-based website template powered by Sanity CMS',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navbar = null
  let siteConfig = null

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 3000)
    )
    navbar = await Promise.race([getNavbar(), timeoutPromise])
  } catch (error) {
    console.log('[Layout] Navbar fetch failed, using defaults')
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 3000)
    )
    siteConfig = await Promise.race([getSiteConfig(), timeoutPromise])
  } catch (error) {
    console.log('[Layout] SiteConfig fetch failed, using defaults')
  }

  // Define CSS variables from Sanity with sensible defaults
  const cssVars = {
    '--color-primary': siteConfig?.primaryColor || '#2563eb', // Vibrant Blue
    '--color-primary-hover': siteConfig?.primaryHoverColor || '#1d4ed8', // Darker Blue
    '--color-primary-dark': '#1e40af', // Deep Blue for hover states
    '--color-background': siteConfig?.backgroundColor || '#ffffff', // White
    '--color-background-secondary': '#f3f4f6', // Light Gray background
    '--color-surface': siteConfig?.surfaceColor || '#111111', // Deep Black
    '--color-text-primary': siteConfig?.textPrimary || '#000000', // Black
    '--color-text-secondary': siteConfig?.textSecondary || '#4b5563', // Gray
    '--color-text-on-dark': '#ffffff', // White text for dark backgrounds
    '--color-border': siteConfig?.borderColor || '#e5e7eb', // Light Gray
    '--color-footer-background': siteConfig?.footerBackground || '#010101', // Pure Black
    '--color-footer-text': siteConfig?.footerText || '#ffffff', // White
  } as React.CSSProperties

  const allPages = await import('@/lib/sanity').then(m => m.getAllPages())
  const pages = allPages?.filter((p: any) => p.slug?.toLowerCase() !== 'home') || []

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          ...cssVars
        }}
      >
        <Navbar
          logo={siteConfig?.logo}
          logoImage={siteConfig?.logoImage}
          links={navbar?.links}
          pages={pages}
        />
        {children}
      </body>
    </html>
  )
}
