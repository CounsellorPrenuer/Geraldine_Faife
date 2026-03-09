/**
 * SECTION REGISTRY
 * Maps section types to React components
 * Used by the page renderer to dynamically render sections
 */

import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServiceSection } from '@/components/sections/ServiceSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { MentoriaPackagesSection } from '../../components/sections/MentoriaPackagesSection'
export interface SectionProps {
  _key: string
  _type: string
  [key: string]: any
}

/**
 * Registry of all available sections
 * Maps Sanity document type names to React components
 */
export const sectionRegistry = {
  heroSection: HeroSection,
  aboutSection: AboutSection,
  serviceSection: ServiceSection,
  contactSection: ContactSection,
  footerSection: FooterSection,
  testimonialSection: TestimonialSection,
  featuresSection: FeaturesSection,
  testimonialsSection: TestimonialsSection,
  faqSection: FAQSection,
  ctaSection: CTASection,
  mentoriaPackagesSection: MentoriaPackagesSection,
} as const

/**
 * Get component for a section type
 * @param type - The Sanity section type (e.g., "heroSection")
 * @returns React component or null if not found
 */
export function getSectionComponent(type: string) {
  return sectionRegistry[type as keyof typeof sectionRegistry] || null
}

/**
 * Get all available section types
 */
export function getAvailableSectionTypes() {
  return Object.keys(sectionRegistry)
}
