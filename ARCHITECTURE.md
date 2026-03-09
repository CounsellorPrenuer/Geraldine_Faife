# Architecture & How It Works

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SANITY CMS (Backend)                       │
│                    sanity/                                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Sanity Studio (Web Interface)               │  │
│  │          http://localhost:3333 or cloud hosted          │  │
│  │                                                          │  │
│  │  • Create/edit site content visually                    │  │
│  │  • Manage services, contact info, navigation            │  │
│  │  • Change colors and branding                           │  │
│  │  • Preview changes in real-time                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ▲                                    │
│                            │                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │  ├── site.js (global config)                          │    │
│  │  ├── navbar.js (navigation)                           │    │
│  │  ├── hero.js (hero section)                           │    │
│  │  ├── about.js (about section)                         │    │
│  │  ├── service.js (cards)                               │    │
│  │  ├── contact.js (form config)                         │    │
│  │  └── footer.js (footer)                               │    │
│  │                                                         │    │
│  │  Schemas Define Content Structure                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Content stored in: Sanity's database                          │
│  API available at: https://[projectId].api.sanity.io           │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ GROQ Queries (REST API)
                            │ JSON responses
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  FRONTEND (GitHub Pages)                        │
│                    frontend/                                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              index.html (Static HTML)                    │  │
│  │                                                          │  │
│  │  • Empty placeholders for sections                      │  │
│  │  • Loads via GitHub Pages (no server needed)           │  │
│  │  • Updated dynamically by JavaScript                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ▲                                    │
│                            │ Populated by JavaScript            │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │              src/scripts/app.js                         │    │
│  │                                                         │    │
│  │  • Fetches data from Sanity (GROQ queries)            │    │
│  │  • Renders content to HTML                            │    │
│  │  • Handles interactions (mobile menu, forms)           │    │
│  │  • Applies theme colors                               │    │
│  │                                                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │              src/styles/main.css                        │    │
│  │                                                         │    │
│  │  • Professional responsive design                      │    │
│  │  • CSS variables for easy theming                      │    │
│  │  • Mobile-first approach                              │    │
│  │                                                         │    │
│  │              src/utils/sanityClient.js                 │    │
│  │                                                         │    │
│  │  • GROQ queries definition                            │    │
│  │  • Fetch logic                                        │    │
│  │  • Error handling                                     │    │
│  │                                                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Hosted at: https://yourusername.github.io/repository          │
│  No server, no backend, pure static hosting                    │
└─────────────────────────────────────────────────────────────────┘
                            ▲
                            │
                            │ Browser loads
                            │
                    ┌───────────────┐
                    │  Web Browser  │
                    │  (User sees   │
                    │  live website)│
                    └───────────────┘
```

## Data Flow

### 1. **Content Creation** (You in Sanity Studio)
```
You → Sanity Studio → Create Document → Save → Publish
                       (e.g., Hero section)
                            ↓
                        Sanity Database
```

### 2. **Content Delivery** (When user visits website)
```
User visits https://yourusername.github.io/repository
                            ↓
            Browser loads index.html (static)
                            ↓
            JavaScript executes (app.js)
                            ↓
         Builds GROQ query and calls Sanity API
         GET https://[projectId].api.sanity.io/query
                            ↓
           Sanity returns JSON with all content
                            ↓
         JavaScript parses JSON and renders HTML
                            ↓
       User sees fully populated website
```

### 3. **Real-time Updates**
```
You edit Hero headline in Sanity Studio
        ↓
Change saved to Sanity database
        ↓
User refreshes website (or it auto-refreshes)
        ↓
Website fetches latest content from Sanity
        ↓
New headline appears immediately
```

## How GROQ Queries Work

GROQ = "Graph-Relational Object Queries"

### Example Query
```groq
// Fetch everything needed for the website
{
  "site": *[_type == "site"][0],
  "navbar": *[_type == "navbar"][0],
  "hero": *[_type == "hero"][0],
  "about": *[_type == "about"][0],
  "services": *[_type == "service"] | order(order asc),
  "contact": *[_type == "contact"][0],
  "footer": *[_type == "footer"][0]
}
```

### What It Returns
```json
{
  "site": {
    "title": "Professional Solutions",
    "logo": "PS",
    "primaryColor": "#667eea",
    "email": "hello@example.com",
    ...
  },
  "navbar": {
    "links": [
      { "label": "Home", "href": "#home" },
      { "label": "About", "href": "#about" },
      ...
    ]
  },
  "hero": {
    "headline": "Transform Your Vision Into Reality",
    "subheadline": "Professional solutions...",
    "ctaText": "Get Started",
    ...
  },
  "services": [
    {
      "title": "Strategic Consulting",
      "description": "Expert guidance...",
      "icon": "📊",
      ...
    },
    ...
  ],
  ...
}
```

## Content Editable Locations

### In Sanity Studio

```
Sanity Studio Content
├── Site Configuration (global)
│   ├── Title
│   ├── Logo
│   ├── Colors (Primary, Secondary)
│   └── Contact Info (Email, Phone, Address)
│
├── Navigation Bar
│   └── Links (drag to reorder)
│
├── Hero Section
│   ├── Headline
│   ├── Subheadline
│   ├── CTA Button
│   └── Background Gradient
│
├── About Section
│   ├── Title
│   ├── Description
│   └── Highlights (with icons)
│
├── Services (create multiple)
│   ├── Title
│   ├── Description
│   ├── Icon
│   ├── Color
│   └── Display Order
│
├── Contact Section
│   ├── Title
│   ├── Description
│   └── Form Fields (configurable)
│
└── Footer
    ├── Copyright
    └── Social Links
```

## Component Lifecycle

```
┌─────────────────────────────────────────┐
│        Page Load                        │
│   (index.html loaded by browser)        │
└────────────────┬────────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │   JavaScript Init  │
        │    (app.js loads)  │
        └────────┬───────────┘
                 │
                 ▼
     ┌────────────────────────────┐
     │ Fetch Content from Sanity  │
     │  (sanityClient.js executes)│
     └────────┬───────────────────┘
              │
              ▼
     ┌────────────────────┐
     │  Content Received  │
     │   (JSON parsed)    │
     └────────┬───────────┘
              │
              ▼ (renderNavbar())
          Navbar
          
          ▼ (renderHero())
          Hero Section
          
          ▼ (renderAbout())
          About Section
          
          ▼ (renderServices())
          Services Cards
          
          ▼ (renderContact())
          Contact Section
          
          ▼ (renderFooter())
          Footer
              │
              ▼
     ┌────────────────────┐
     │  Website Complete  │
     │  (User sees site)  │
     └────────────────────┘
```

## Technology Stack

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with variables
- **Vanilla JavaScript (ES6)** - No frameworks needed
- **Fetch API** - For Sanity communication
- **GitHub Pages** - Free hosting

### Backend (Sanity)
- **Sanity CMS** - Headless CMS
- **GROQ** - Query language
- **REST API** - Content delivery
- **React** - Studio interface
- **Cloud-hosted** - Sanity manages servers

### No External Dependencies
✅ Frontend has ZERO npm dependencies  
✅ Pure HTML, CSS, JavaScript  
✅ Works in any modern browser  
✅ Extremely fast load times  

## Why This Architecture?

| Feature | Benefit |
|---------|---------|
| **GitHub Pages** | Free, fast, no backend |
| **Sanity CMS** | Professional content management |
| **Client-side Fetch** | Real-time updates, simple deployment |
| **Vanilla JS** | No build process needed, small footprint |
| **GROQ Queries** | Efficient data fetching |
| **CSS Variables** | Easy theming without recompiling |

## Security Flow

```
┌─────────────────────────────────────────┐
│      Sanity Project                    │
│  ├─ Public API (read-only)             │
│  └─ API Tokens (editor access)         │
└────────────────┬────────────────────────┘
                 │
                 │ CORS Protected
                 │ (only allowed domains)
                 │
┌────────────────▼────────────────────────┐
│      Frontend (GitHub Pages)            │
│  ├─ Public (no secrets)                 │
│  ├─ All code visible                    │
│  └─ Safe to expose projectId            │
└────────────────┬────────────────────────┘
                 │
                 │ HTTPS Encrypted
                 │
        ┌────────▼────────┐
        │   User Browser  │
        │ (sees live site)│
        └─────────────────┘
```

## Scaling Considerations

### Current Setup (Perfect for)
- Small to medium websites
- Corporate/agency sites
- Event websites
- Portfolio sites
- Landing pages

### If you need more scale
- Add caching layers (Cloudflare)
- Use Sanity's CDN optimizations
- Add analytics (Plausible, Fathom)
- Consider static generation (Astro, Next.js)

---

This architecture is production-ready and used by thousands of websites globally!
