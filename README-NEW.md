# 🚀 Remixable Website Template

A production-ready, section-based website template powered by **Next.js** and **Sanity CMS**.

This repository is a **GitHub Template** - click "Use this template" to create a new website instantly.

---

## ✨ Features

- ✅ **Section-Based Page Builder** - Compose pages from reusable sections in Sanity
- ✅ **Dynamic Page Rendering** - Sections rendered automatically via registry pattern
- ✅ **No Hardcoded Content** - All content managed through Sanity CMS
- ✅ **One-Command Setup** - Automated project creation and content seeding
- ✅ **TypeScript** - Fully typed for safety and developer experience
- ✅ **Static Generation (ISR)** - Fast, SEO-friendly pages with automatic revalidation

---

## 📦 What's Included

### Section Types
- **Hero Section** - Large banner with heading, subheading, CTA
- **Features Section** - Grid of features with icons
- **Testimonials Section** - Customer reviews with ratings
- **FAQ Section** - Expandable question/answer list
- **CTA Section** - Call-to-action with buttons

### Architecture
- **Section Registry** (`lib/sections/registry.ts`) - Maps section types to components
- **Dynamic Page Renderer** (`app/[slug]/page.tsx`) - Renders pages from Sanity
- **Reusable Components** (`components/sections/`) - Pure React section components
- **Setup Automation** (`scripts/setup.ts`) - Creates new Sanity projects

---

## 🚀 Quick Start

### 1. Use This Template

Click **"Use this template"** on GitHub to create your own repository.

### 2. Clone Your Repo

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run Setup

\`\`\`bash
npm run setup
\`\`\`

This will:
- Create a new Sanity project
- Import starter content
- Configure environment variables

### 5. Start Development

\`\`\`bash
npm run dev
\`\`\`

Your site is now live at **http://localhost:3000**! 🎉

---

## 🎨 Managing Content

### Open Sanity Studio

\`\`\`bash
cd sanity
npx sanity dev
\`\`\`

Studio opens at **http://localhost:3333**

### Create a Page

1. Go to "Pages" in Sanity Studio
2. Click "Create"
3. Add:
   - **Title**: "Home"
   - **Slug**: "home"
   - **Sections**: Add any combination of sections

### Edit Content

All changes in Sanity appear on your website within 60 seconds (ISR revalidation).

---

## 📂 Project Structure

\`\`\`
├── app/                      # Next.js App Router
│   ├── [slug]/page.tsx       # Dynamic page renderer
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   └── sections/             # Reusable section components
├── lib/
│   ├── sanity.ts             # Sanity client & queries
│   └── sections/registry.ts  # Section registry
├── sanity/
│   ├── schemas/              # Sanity schema definitions
│   ├── starter-data.tar.gz   # Demo content export
│   └── sanity.config.ts      # Sanity configuration
├── scripts/
│   └── setup.ts              # Automated setup script
└── package.json
\`\`\`

---

## 🧩 Adding New Sections

### 1. Create Sanity Schema

\`\`\`typescript
// sanity/schemas/yourSection.ts
import { defineType, defineField } from 'sanity'

export const yourSection = defineType({
  name: 'yourSection',
  title: 'Your Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    // ... more fields
  ],
})
\`\`\`

### 2. Create React Component

\`\`\`tsx
// components/sections/YourSection.tsx
'use client'

import { SectionProps } from '@/lib/sections/registry'

export function YourSection({ heading }: SectionProps) {
  return <section>{heading}</section>
}
\`\`\`

### 3. Register Section

\`\`\`typescript
// lib/sections/registry.ts
import { YourSection } from '@/components/sections/YourSection'

export const sectionRegistry = {
  // ... existing sections
  yourSection: YourSection,
}
\`\`\`

### 4. Add to Page Schema

\`\`\`typescript
// sanity/schemas/page.ts
sections: [
  { type: 'yourSection' },
  // ... other sections
]
\`\`\`

Done! Your new section is now available in Sanity.

---

## 🌍 Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy!

### Environment Variables

\`\`\`bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...  # For mutations (optional)
\`\`\`

---

## 🔄 Creating New Websites

Every time you want a new website:

1. Click **"Use this template"** on GitHub
2. Clone the new repo
3. Run `npm install && npm run setup`
4. Deploy!

Each instance gets its own Sanity project with fresh starter content.

---

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Section Registry Pattern](/docs/section-registry.md)

---

## 📄 License

MIT - feel free to use this template for commercial projects.

---

**Built with ❤️ using Next.js + Sanity**
