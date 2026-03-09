# Complete File Structure & Documentation

## Project Layout

```
professional-website/
│
├── 📄 README.md                 ← START HERE! Overview & quick start
├── 📄 SETUP.md                  ← Step-by-step setup guide (15 mins)
├── 📄 ARCHITECTURE.md           ← How everything works together
├── 📄 GROQ_REFERENCE.md         ← Query language documentation
├── 📄 .gitignore               ← Git configuration
├── 📄 .env.example             ← Environment variables template
│
├── 📁 frontend/                 ← Public website (GitHub Pages)
│   ├── 📄 index.html           ← Main HTML file
│   ├── 📄 package.json         ← Frontend dependencies
│   ├── 📄 README.md            ← Frontend-specific docs
│   │
│   └── 📁 src/
│       ├── 📁 styles/
│       │   └── 🎨 main.css     ← All styling (responsive, variables)
│       │
│       ├── 📁 scripts/
│       │   └── 🔧 app.js       ← Main application logic
│       │
│       └── 📁 utils/
│           └── 🔗 sanityClient.js ← Sanity integration & GROQ queries
│
└── 📁 sanity/                   ← CMS Backend (Sanity Studio)
    ├── 📄 sanity.config.js     ← Sanity configuration
    ├── 📄 schemaTypes.js       ← Import all schemas
    ├── 📄 package.json         ← Sanity dependencies
    ├── 📄 README.md            ← Sanity setup & configuration
    │
    └── 📁 schemas/             ← Content type definitions
        ├── 📝 site.js          ← Site configuration (logo, colors, contact)
        ├── 📝 navbar.js        ← Navigation links
        ├── 📝 hero.js          ← Hero section (headline, CTA, gradient)
        ├── 📝 about.js         ← About section (description, highlights)
        ├── 📝 service.js       ← Services/Cards (reusable items)
        ├── 📝 contact.js       ← Contact section (form config)
        └── 📝 footer.js        ← Footer (copyright, social links)
```

## What Each File Does

### Root Level

| File | Purpose |
|------|---------|
| `README.md` | Project overview, features, deployment guide |
| `SETUP.md` | Step-by-step setup instructions (follow this first!) |
| `ARCHITECTURE.md` | System design, data flow, how it all works |
| `GROQ_REFERENCE.md` | GROQ query examples and reference |
| `.gitignore` | Files to exclude from Git |
| `.env.example` | Environment variables template |

### Frontend (`frontend/`)

| File | Purpose |
|------|---------|
| `index.html` | Main HTML structure with semantic sections |
| `package.json` | Frontend metadata (no npm deps needed) |
| `README.md` | Frontend-specific setup & troubleshooting |
| `src/styles/main.css` | 800+ lines of responsive CSS with variables |
| `src/scripts/app.js` | Fetches from Sanity, renders all sections |
| `src/utils/sanityClient.js` | Sanity API client, GROQ queries, fetch logic |

### Sanity (`sanity/`)

| File | Purpose |
|------|---------|
| `sanity.config.js` | Studio configuration, desk structure |
| `schemaTypes.js` | Imports all schema definitions |
| `package.json` | Sanity CLI and dependencies |
| `README.md` | Sanity setup, content creation guide |
| `schemas/site.js` | Global config schema (singleton) |
| `schemas/navbar.js` | Navigation links schema |
| `schemas/hero.js` | Hero section schema |
| `schemas/about.js` | About section schema |
| `schemas/service.js` | Reusable service/card schema |
| `schemas/contact.js` | Contact form configuration schema |
| `schemas/footer.js` | Footer schema |

## Quick Navigation

### To set up:
👉 Start with [SETUP.md](SETUP.md)

### To understand the architecture:
👉 Read [ARCHITECTURE.md](ARCHITECTURE.md)

### To write GROQ queries:
👉 See [GROQ_REFERENCE.md](GROQ_REFERENCE.md)

### For frontend setup:
👉 Check [frontend/README.md](frontend/README.md)

### For Sanity setup:
👉 Check [sanity/README.md](sanity/README.md)

## Key Features in Each File

### index.html
- ✅ Semantic HTML5 structure
- ✅ Meta tags for SEO
- ✅ Empty placeholders for dynamic rendering
- ✅ Module script loading for app.js

### main.css
- ✅ 800+ lines of modern CSS
- ✅ CSS variables for theming
- ✅ Fully responsive (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Professional color schemes
- ✅ Accessible color contrasts

### app.js
- ✅ Fetches all content from Sanity
- ✅ Renders each section dynamically
- ✅ Mobile menu toggle
- ✅ Form handling
- ✅ Error handling with fallbacks
- ✅ Theme color application

### sanityClient.js
- ✅ Sanity configuration
- ✅ All GROQ queries
- ✅ Fetch function with error handling
- ✅ Individual fetch functions per section
- ✅ Comments explaining each query

### Schemas (Sanity)
Each schema file:
- ✅ Field definitions
- ✅ Validation rules
- ✅ Default values
- ✅ Preview configurations
- ✅ Documentation comments

## Data Types Explained

### Content Documents (What you create in Sanity)

```
┌─ site (singleton)
│  └─ Title, Logo, Colors, Contact Info
│
├─ navbar (singleton)
│  └─ Array of links
│
├─ hero (singleton)
│  └─ Headline, Subheadline, CTA, Gradient
│
├─ about (singleton)
│  └─ Title, Description, Array of highlights
│
├─ service (multiple documents)
│  └─ Title, Description, Icon, Color, Order
│
├─ contact (singleton)
│  └─ Title, Description, Array of form fields
│
└─ footer (singleton)
   └─ Copyright, Array of social links
```

### Field Types Used

| Type | Examples | In Schemas |
|------|----------|-----------|
| `string` | Title, Logo, Email | site, navbar |
| `text` | Description | hero, about |
| `number` | Order, Price | service |
| `object` | Nested data | hero (gradient) |
| `array` | Multiple items | navbar, about, contact |
| `url` | Links | footer |

## File Sizes & Performance

| File | Size | Purpose |
|------|------|---------|
| index.html | ~2 KB | Static markup |
| main.css | ~25 KB | All styling |
| app.js | ~12 KB | Business logic |
| sanityClient.js | ~7 KB | API integration |
| **Total Frontend** | **~46 KB** | Complete website |

*No build process needed! Loads instantly.*

## Environment Variables

Create `.env` files in frontend/ and sanity/:

```env
# Frontend
SANITY_PROJECT_ID=abc123xyz
SANITY_DATASET=production

# Sanity
SANITY_AUTH_TOKEN=your_secret_token
```

See `.env.example` for template.

## Dependencies

### Frontend
✅ **ZERO npm dependencies** - Pure vanilla JS + CSS

### Sanity
```json
{
  "sanity": "^3.0.0",
  "react": "^18.2.0"
}
```

Install with: `npm install`

## Version Control

Recommend structure for Git:

```bash
.
├── frontend/           ← Push to GitHub Pages
├── sanity/            ← Manage with Sanity
├── README.md          ← In Git
├── SETUP.md           ← In Git
├── ARCHITECTURE.md    ← In Git
├── GROQ_REFERENCE.md  ← In Git
├── .gitignore         ← In Git
└── .env.example       ← In Git (no secrets!)
```

Git keeps source files, Sanity keeps content data.

## Customization Checklist

After initial setup, customize in this order:

- [ ] Edit site colors in `sanity/schemas/site.js`
- [ ] Update Sanity content (site config document)
- [ ] Adjust CSS variables in `frontend/src/styles/main.css`
- [ ] Modify section rendering in `frontend/src/scripts/app.js`
- [ ] Add new schema in `sanity/schemas/newType.js`
- [ ] Add GROQ query in `frontend/src/utils/sanityClient.js`
- [ ] Add HTML section in `frontend/index.html`
- [ ] Create render function for new section

## Testing Checklist

- [ ] Sanity Studio loads at localhost:3333
- [ ] Content documents created in Sanity
- [ ] Frontend loads at localhost:8000
- [ ] Website displays all content correctly
- [ ] Edit content in Sanity, refresh website, see changes
- [ ] Mobile layout works (test at 480px, 768px)
- [ ] Form submission works
- [ ] Colors apply from Sanity config
- [ ] All links navigate correctly

## Deployment Checklist

- [ ] All CORS origins configured in Sanity
- [ ] Frontend pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] projectId updated in sanityClient.js
- [ ] Site loads at github.io domain
- [ ] Live domain CORS origin added to Sanity
- [ ] Content updates appear within 30 seconds

## Support Resources

| Topic | Resource |
|-------|----------|
| GROQ Syntax | [sanity.io/docs/groq](https://www.sanity.io/docs/groq) |
| Sanity Schemas | [sanity.io/docs/schema](https://www.sanity.io/docs/schema-types) |
| GitHub Pages | [docs.github.com/pages](https://docs.github.com/en/pages) |
| CSS Variables | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) |

---

**You now have a complete, production-ready, CMS-powered website! 🚀**
