# NEXT.JS REMIXABLE TEMPLATE MIGRATION

## Current State
- Static HTML + Vanilla JS + Sanity CMS
- No hardcoded content (demo content fallback)
- GitHub Pages deployed

## Target State
✅ Next.js with App Router
✅ Section-based page builder (Sanity schemas)
✅ Reusable section components
✅ Section registry pattern
✅ Dynamic page rendering from Sanity
✅ Setup script for new instances
✅ Starter dataset export
✅ GitHub Template repository

## Migration Steps

### Phase 1: Next.js Setup
- [ ] Create next.config.ts
- [ ] Initialize App Router structure
- [ ] Move frontend/src to app/
- [ ] Create lib/ and components/ directories
- [ ] Update sanity/package.json for CLI

### Phase 2: Sanity Schemas
- [ ] Create page.ts schema with slug, title, seo
- [ ] Create sections array with typed objects:
  - [ ] heroSection.ts
  - [ ] featuresSection.ts
  - [ ] testimonialsSection.ts
  - [ ] faqSection.ts
  - [ ] ctaSection.ts
  - [ ] footerSection.ts

### Phase 3: Next.js Components
- [ ] Create components/sections/Hero.tsx
- [ ] Create components/sections/Features.tsx
- [ ] Create components/sections/Testimonials.tsx
- [ ] Create components/sections/FAQ.tsx
- [ ] Create components/sections/CTA.tsx
- [ ] Create components/sections/Footer.tsx

### Phase 4: Section Registry & Page Renderer
- [ ] Create lib/sections/registry.ts
- [ ] Create lib/sanity.ts (client)
- [ ] Create app/[slug]/page.tsx (dynamic page renderer)

### Phase 5: Starter Content
- [ ] Create demo page in Sanity
- [ ] Export dataset as starter-data.tar.gz
- [ ] Store in /sanity/

### Phase 6: Setup Automation
- [ ] Create scripts/setup.ts
- [ ] Create scripts/seed-dataset.ts
- [ ] Update package.json with "setup" script

### Phase 7: Repository
- [ ] Clean up old static files
- [ ] Update .gitignore
- [ ] Add documentation
- [ ] Mark as GitHub Template

---

Ready to begin? I'll implement all phases systematically.
