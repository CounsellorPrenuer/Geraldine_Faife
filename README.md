# Professional Website with Sanity CMS

A complete, production-ready website template that runs entirely on GitHub Pages with **all content managed through Sanity CMS**. Every change you make in Sanity Studio automatically reflects on your live website.

## 🎯 Key Features

✅ **100% Sanity CMS-driven** - All content is editable in Sanity Studio  
✅ **GitHub Pages compatible** - Static hosting, no backend required  
✅ **Real-time content updates** - Changes in Sanity appear on your site  
✅ **Fully responsive** - Mobile, tablet, desktop optimized  
✅ **Professional design** - Modern UI with smooth animations  
✅ **SEO-friendly** - Semantic HTML, meta tags, accessibility  
✅ **Easy to customize** - Content schemas for every section  
✅ **Zero dependencies** - Frontend is vanilla JS + CSS  

## 📁 Project Structure

```
project/
├── frontend/                    # Public website (GitHub Pages)
│   ├── index.html              # Main HTML file
│   ├── src/
│   │   ├── styles/main.css      # All styling
│   │   ├── scripts/app.js       # Main application logic
│   │   └── utils/sanityClient.js # Sanity integration
│   ├── package.json
│   └── README.md
│
├── sanity/                      # Sanity Studio & Schemas
│   ├── schemas/
│   │   ├── site.js              # Global site config
│   │   ├── navbar.js            # Navigation links
│   │   ├── hero.js              # Hero section
│   │   ├── about.js             # About section
│   │   ├── service.js           # Services/cards
│   │   ├── contact.js           # Contact form config
│   │   └── footer.js            # Footer content
│   ├── sanity.config.js         # Studio configuration
│   ├── package.json
│   └── README.md
│
└── README.md                    # This file
```

## 🚀 Quick Start

### Step 1: Create Sanity Project

```bash
npm install -g @sanity/cli
cd sanity
sanity init
```

### Step 2: Configure Sanity

1. Copy the schema files from `sanity/schemas/` to your new Sanity project
2. Update `sanity.config.js` with your Project ID
3. Start Sanity Studio:
   ```bash
   npm run dev
   ```

### Step 3: Create Initial Content

In Sanity Studio (http://localhost:3333):

1. **Site Configuration** - Logo, colors, contact info
2. **Navigation** - Menu links
3. **Hero Section** - Main headline and CTA
4. **About Section** - Company description
5. **Services** - Add 3-4 service cards
6. **Contact Section** - Form configuration
7. **Footer** - Copyright and social links

### Step 4: Configure Frontend

Edit `frontend/src/utils/sanityClient.js`:

```javascript
const SANITY_CONFIG = {
  projectId: 'YOUR_PROJECT_ID',  // Copy from sanity.io/manage
  dataset: 'production',
  // ... rest of config
}
```

### Step 5: Setup CORS

In [sanity.io/manage](https://sanity.io/manage):
- Go to API → CORS origins
- Add:
  - `http://localhost:8000` (local dev)
  - `https://yourdomain.com` (production)

### Step 6: Run Frontend Locally

```bash
cd frontend
python -m http.server 8000
```

Visit `http://localhost:8000`

## 📝 Content Structure - Sanity Schemas

### Site Configuration
Global settings for the entire website:
- Title, description
- Logo text
- Brand colors (primary, secondary)
- Contact email, phone, address

### Navigation Bar
Editable navigation links:
- Label (e.g., "Home", "About")
- Link target (section ID or URL)
- Drag to reorder

### Hero Section
Large banner at top:
- Headline
- Subheadline
- CTA button text and link
- Gradient colors

### About Section
Company/organization info:
- Title
- Description
- Key highlights (with emoji icons)

### Services
Reusable cards for services/events/careers:
- Title
- Description
- Icon (emoji)
- Accent color
- Display order
- *(Create multiple documents)*

### Contact Section
Contact form configuration:
- Title and description
- Form fields (text, email, textarea, etc.)
- Required field toggle

### Footer
Bottom section:
- Copyright text
- Social media links (platform, URL)

## 🔌 How Content Flows

```
┌─────────────────┐
│ Sanity Studio   │  ← Edit content here
│ (CMS Interface) │
└────────┬────────┘
         │
         │ GROQ Queries
         │ (Client-side)
         ▼
┌──────────────────┐
│ Sanity API       │  ← Content delivery
│ (Rest endpoint)  │
└────────┬─────────┘
         │
         │ JSON data
         │
         ▼
┌──────────────────┐
│ Frontend         │  ← Renders website
│ (JavaScript)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Browser          │  ← Users see live site
│ (GitHub Pages)   │
└──────────────────┘
```

## 🌐 GROQ Queries Reference

All queries used by the frontend (in `frontend/src/utils/sanityClient.js`):

```groq
// Get everything efficiently
{
  "site": *[_type == "site"][0],
  "navbar": *[_type == "navbar"][0],
  "hero": *[_type == "hero"][0],
  "about": *[_type == "about"][0],
  "services": *[_type == "service"] | order(order asc),
  "contact": *[_type == "contact"][0],
  "footer": *[_type == "footer"][0]
}

// Or fetch individual sections
*[_type == "service"] | order(order asc)  // Services
*[_type == "navbar"][0].links              // Navigation
```

## 🌍 Deploy to GitHub Pages

### Method 1: Standard Deployment

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add website"
   git push origin main
   ```

2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/frontend` folder
5. Done! Site is live at `https://username.github.io/repository`

### Method 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend to Pages

on:
  push:
    branches: [ main ]
    paths: [ 'frontend/**' ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Copy frontend to build
        run: cp -r frontend build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## 🎨 Customization

### Change Colors
Edit your Sanity "Site Configuration" document:
- `primaryColor`: Main brand color (hex)
- `secondaryColor`: Accent color (hex)

### Add More Sections
1. Create schema in `sanity/schemas/newSection.js`
2. Add GROQ query to `frontend/src/utils/sanityClient.js`
3. Create render function in `frontend/src/scripts/app.js`
4. Add HTML placeholder in `frontend/index.html`

### Modify Styling
Edit `frontend/src/styles/main.css` - CSS variables at top make theming easy.

### Connect Form to Backend
In `frontend/src/scripts/app.js`, update `handleFormSubmit()`:

```javascript
async function handleFormSubmit(e) {
  e.preventDefault()
  const data = new FormData(e.target)
  
  // Send to your backend
  await fetch('https://your-backend.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(data))
  })
}
```

## 📚 GROQ Query Examples

```groq
// Get all services in order
*[_type == "service"] | order(order asc)

// Get site colors only
*[_type == "site"][0]{primaryColor, secondaryColor}

// Get services with limited fields
*[_type == "service"]{title, icon, description}

// Get navbar links
*[_type == "navbar"][0]{links[]{label, href}}
```

## 🔒 Security

- **Frontend is static** - No server-side code to hack
- **CORS configured** - Only your domain can access Sanity
- **Read-only API** - Frontend uses public read access
- **Sensitive data** - Keep API tokens in environment variables only

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### "Failed to load content"
- Check browser console (F12) for error messages
- Verify CORS origins in Sanity
- Ensure projectId is correct
- Confirm content exists in Sanity Studio

### Colors not applying
- Go to Sanity → Site Configuration
- Verify `primaryColor` and `secondaryColor` are set
- Use valid hex codes (e.g., `#667eea`)

### Form not working
- Check `handleFormSubmit()` in `app.js`
- Add your backend URL or email service
- See comments in code for Formspree/backend integration

### Content not updating
- Refresh the page (Ctrl+Shift+R for hard refresh)
- Clear browser cache
- Check if content is published in Sanity (not draft)

## 💡 Tips

- **Real-time updates**: Set `useCdn: false` in sanityClient.js for immediate updates
- **Offline mode**: Frontend works offline with cached content
- **Fallbacks**: App handles missing content gracefully
- **Monitoring**: Check browser console for any warnings

## 📖 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

## 📄 License

This template is provided as-is for personal and commercial use.

---

**Ready to get started?** Follow the Quick Start section above to begin!
