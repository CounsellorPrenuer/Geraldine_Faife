# 🚀 Remixable Website Template

A production-ready, section-based website template powered by **Next.js** and **Sanity CMS**. 

Built like **Framer Remix** or **Webflow Cloneable** - click "Use this template" to create unlimited websites.

---

## ✨ Features

✅ **Section-Based Page Builder** - Build pages by composing reusable sections  
✅ **No Hardcoded Content** - Everything managed through Sanity CMS  
✅ **One-Click Remix** - GitHub Template repository  
✅ **Automated Setup** - `npm run setup` creates new Sanity project  
✅ **Starter Content Included** - Pre-built homepage ready to customize  
✅ **TypeScript** - Fully typed for better DX  
✅ **ISR Enabled** - Incremental Static Regeneration for best performance  

---

## 🎯 How It Works

### Template System Architecture

```
┌─────────────────┐
│  GitHub Template │  ← Click "Use this template"
└────────┬────────┘
         │
         ├─→ New Repo Created
         │
         ├─→ Run: npm run setup
         │       │
         │       ├─ Creates new Sanity project
         │       ├─ Imports starter dataset
         │       └─ Configures .env.local
         │
         └─→ Run: npm run dev
                 └─ Website ready! 🎉
```

### Section-Based Pages

All pages are built from **ordered sections** defined in Sanity:

- **Hero Section** - Headers with CTA
- **Features Section** - Grid of features/services
- **Testimonials Section** - Customer reviews
- **FAQ Section** - Expandable Q&A
- **CTA Section** - Call-to-action banners

Add, remove, or reorder sections in Sanity Studio - no code changes needed.

---

## 🚀 Quick Start

### 1. Use This Template

Click **"Use this template"** button on GitHub → Create new repository

### 2. Clone Your New Repo

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 3. Install Dependencies

```bash
npm install
cd sanity && npm install && cd ..
```

### 4. Run Setup Script

```bash
npm run setup
```

This will:
- Create a new Sanity project
- Import starter content (demo homepage)
- Configure environment variables

### 5. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Edit Content in Sanity

```bash
cd sanity
npm run dev
```

Open [http://localhost:3333](http://localhost:3333)

---

## 📁 Project Structure

```
├── app/
│   ├── [slug]/
│   │   └── page.tsx          # Dynamic page renderer
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   └── sections/
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── FAQSection.tsx
│       └── CTASection.tsx
├── lib/
│   ├── sanity.ts              # Sanity client
│   └── sections/
│       └── registry.ts        # Section type → Component mapping
├── sanity/
│   ├── schemas/
│   │   ├── page.ts            # Page document
│   │   ├── heroSection.ts
│   │   ├── featuresSection.ts
│   │   └── ...
│   ├── starter-data.tar.gz    # Starter content dataset
│   └── sanity.config.ts
└── scripts/
    └── setup.ts               # Automated setup
```

---

## 🧩 How to Add New Sections

### 1. Create Sanity Schema

```typescript
// sanity/schemas/pricingSection.ts
export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'object',
  fields: [
    // Your fields
  ],
})
```

### 2. Add to schemaTypes.ts

```typescript
import { pricingSection } from './schemas/pricingSection'

export const schemaTypes = [
  // ... existing
  pricingSection,
]
```

### 3. Create React Component

```tsx
// components/sections/PricingSection.tsx
export function PricingSection({ ...props }) {
  return <section>{/* Your JSX */}</section>
}
```

### 4. Register in Section Registry

```typescript
// lib/sections/registry.ts
import { PricingSection } from '@/components/sections/PricingSection'

export const sectionRegistry = {
  // ... existing
  pricingSection: PricingSection,
}
```

Done! Now you can add Pricing sections in Sanity Studio.

---

## 🌍 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

### Deploy Sanity Studio

```bash
cd sanity
sanity deploy
```

---

## 📖 Documentation

- [Sanity Docs](https://www.sanity.io/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

## 🤝 Contributing

This is a template repository. Feel free to fork and customize for your needs.

---

## 📄 License

MIT - Use freely for personal or commercial projects.

---

**Built with ❤️ using Next.js + Sanity CMS**
