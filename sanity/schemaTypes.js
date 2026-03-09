/**
 * SANITY SCHEMA TYPE DEFINITIONS
 * 
 * Import all schema types and export them as an array
 */

import site from './schemas/site'
import navbar from './schemas/navbar'
import hero from './schemas/hero'
import about from './schemas/about'
import service from './schemas/service'
import contact from './schemas/contact'
import footer from './schemas/footer'
import seo from './schemas/seo'
import button from './schemas/button'
import testimonial from './schemas/testimonial'
import { page } from './schemas/page'
import { heroSection } from './schemas/heroSection'
import { aboutSection } from './schemas/aboutSection'
import { serviceSection } from './schemas/serviceSection'
import { testimonialSection } from './schemas/testimonialSection'
import { contactSection } from './schemas/contactSection'
import { footerSection } from './schemas/footerSection'
import { featuresSection } from './schemas/featuresSection'
import { testimonialsSection } from './schemas/testimonialsSection'
import { faqSection } from './schemas/faqSection'
import { ctaSection } from './schemas/ctaSection'
import { mentoriaPackagesSection } from './schemas/mentoriaPackagesSection'

import mentoriaPackages from './schemas/mentoriaPackages'
import mentoriaPackageItem from './schemas/mentoriaPackageItem'
import mentoriaPackageCategory from './schemas/mentoriaPackageCategory'

export const schemaTypes = [
  // Top-level documents
  site,
  navbar,
  hero,
  about,
  mentoriaPackages,
  service,
  contact,
  footer,
  seo,
  button,
  testimonial,
  page,

  // Objects
  mentoriaPackageItem,
  mentoriaPackageCategory,

  // Page section objects (embedded in pages)
  heroSection,
  aboutSection,
  serviceSection,
  testimonialSection,
  contactSection,
  footerSection,
  featuresSection,
  testimonialsSection,
  faqSection,
  ctaSection,
  mentoriaPackagesSection,
]
