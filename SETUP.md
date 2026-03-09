# Setup Guide - Step by Step

This guide walks you through setting up the complete system: Sanity CMS backend + Frontend on GitHub Pages.

## Prerequisites

- Node.js 18+ installed
- Git and GitHub account
- A code editor (VS Code recommended)
- ~15 minutes

## Phase 1: Setup Sanity CMS (Backend)

### Step 1.1: Create Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Navigate to sanity folder
cd sanity

# Initialize new project
sanity init
```

Follow the prompts:
- **Project name**: `professional-website-cms`
- **Dataset**: `production`
- **Use TypeScript**: Your choice (optional)
- **Project template**: Start with blank schema

### Step 1.2: Copy Schemas

After `sanity init` creates the project, the CLI will open a URL to create your first schema. Close that and use the schemas provided in this template instead:

1. In your Sanity project folder, navigate to `schemas/`
2. Replace the contents with files from `sanity/schemas/` in this repository:
   - `site.js`
   - `navbar.js`
   - `hero.js`
   - `about.js`
   - `service.js`
   - `contact.js`
   - `footer.js`

3. Update `schemaTypes.js` to import all schemas (see file in this repo)
4. Update `sanity.config.js` (see file in this repo)

### Step 1.3: Get Your Project ID

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Find your project
3. Click on it to open settings
4. Copy the **Project ID**
5. Paste it in `sanity/sanity.config.js` in the `projectId` field

### Step 1.4: Start Sanity Studio

```bash
cd sanity
npm install
npm run dev
```

Visit `http://localhost:3333` - You should see Sanity Studio!

### Step 1.5: Create Initial Content

In Sanity Studio, create these documents (in any order):

#### 1. Site Configuration
- **Document type**: Site
- **Title**: "Professional Solutions"
- **Description**: "Delivering excellence through innovation"
- **Logo**: "PS"
- **Primary Color**: "#667eea"
- **Secondary Color**: "#764ba2"
- **Email**: "hello@example.com"
- **Phone**: "+1 (555) 123-4567"
- **Address**: "123 Business St, City, State"

#### 2. Navigation
- **Document type**: Navbar
- **Links**: (Add 4 links)
  - Home → #home
  - About → #about
  - Services → #services
  - Contact → #contact

#### 3. Hero Section
- **Document type**: Hero
- **Headline**: "Transform Your Vision Into Reality"
- **Subheadline**: "Professional solutions tailored to your unique needs"
- **CTA Text**: "Get Started"
- **CTA Link**: "#contact"
- **Background Gradient**:
  - From: "#667eea"
  - To: "#764ba2"

#### 4. About Section
- **Document type**: About
- **Title**: "About Us"
- **Description**: "We are a team of passionate professionals..."
- **Highlights**: (Add 4)
  - "10+ Years of Experience" (✓)
  - "500+ Happy Clients" (😊)
  - "Award-Winning Team" (🏆)
  - "24/7 Support" (⭐)

#### 5. Services (Create Multiple)
- **Document type**: Service (create 4 separate documents)

Service 1:
- Title: "Strategic Consulting"
- Icon: "📊"
- Description: "Expert guidance to navigate challenges"
- Color: "#667eea"
- Order: 0

Service 2:
- Title: "Digital Solutions"
- Icon: "💻"
- Description: "Cutting-edge technology implementations"
- Color: "#764ba2"
- Order: 1

Service 3:
- Title: "Team Training"
- Icon: "👥"
- Description: "Empower your team with skills"
- Color: "#f093fb"
- Order: 2

Service 4:
- Title: "Analytics & Insights"
- Icon: "📈"
- Description: "Data-driven insights for decisions"
- Color: "#4facfe"
- Order: 3

#### 6. Contact Section
- **Document type**: Contact
- **Title**: "Get In Touch"
- **Description**: "Have questions? We'd love to hear from you"
- **Form Fields**: (Add these in order)
  - Name: "fullName", Type: "text", Placeholder: "Your Full Name", Required: Yes
  - Name: "email", Type: "email", Placeholder: "Your Email", Required: Yes
  - Name: "subject", Type: "text", Placeholder: "Subject", Required: Yes
  - Name: "message", Type: "textarea", Placeholder: "Your Message", Required: Yes

#### 7. Footer
- **Document type**: Footer
- **Copyright**: "© 2024 Professional Solutions. All rights reserved."
- **Social Links**: (Add 3)
  - LinkedIn → https://linkedin.com
  - Twitter → https://twitter.com
  - GitHub → https://github.com

### Step 1.6: Setup CORS

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Find your project → Settings → API
3. In **CORS Origins** section, add:
   - `http://localhost:8000`
   - `http://localhost:3000`
   - `https://yourusername.github.io` (when you deploy)

## Phase 2: Setup Frontend (GitHub Pages)

### Step 2.1: Configure Frontend

Edit `frontend/src/utils/sanityClient.js`:

Find this section:
```javascript
const SANITY_CONFIG = {
  projectId: 'YOUR_PROJECT_ID',  // ← Replace this
  dataset: 'production',
  // ...
}
```

Replace `YOUR_PROJECT_ID` with your actual Sanity Project ID from Step 1.3.

### Step 2.2: Test Locally

```bash
# Navigate to frontend folder
cd frontend

# Start local server
python -m http.server 8000
```

Visit `http://localhost:8000` in your browser.

**You should see your website with all content from Sanity!**

If you see errors:
1. Open browser console (F12)
2. Check error messages
3. Verify projectId is correct
4. Verify CORS is set up
5. Confirm content exists in Sanity Studio

### Step 2.3: Deploy to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Add website with Sanity CMS integration"

# Add GitHub remote (replace username and repo)
git remote add origin https://github.com/yourusername/professional-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2.4: Enable GitHub Pages

1. Go to your GitHub repository
2. Settings → Pages
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/frontend`
4. Click Save

**Your site is now live at**: `https://yourusername.github.io/professional-website`

(Note: Update the URL with your actual username and repository name)

### Step 2.5: Update Frontend CORS

Back in Step 1.6, add your live domain to Sanity CORS origins:
- Add: `https://yourusername.github.io`

## Phase 3: Testing the Full Integration

### Test Content Changes

1. Go to Sanity Studio at `http://localhost:3333`
2. Edit any content (e.g., change Hero headline)
3. Go to your website: `http://localhost:8000` or your live GitHub Pages URL
4. **Refresh the page** (Ctrl+Shift+R for hard refresh)
5. **Your changes appear!** ✅

Try editing:
- Hero headline
- Service titles
- Colors in Site Configuration
- Any text in any section

## Troubleshooting

### Website shows "Loading website content..." forever

**Problem**: Content isn't loading from Sanity
**Solutions**:
1. Open browser console (F12)
2. Look for error messages
3. Check:
   - CORS origins are configured
   - projectId matches your actual ID
   - Network tab shows Sanity API requests
   - Content exists in Sanity (published, not draft)

### "Cannot read property of undefined"

**Problem**: Schema or content structure mismatch
**Solution**:
- Verify all schemas are created in Sanity
- Create dummy content in each schema type
- Check browser console for specific field names

### Changes in Sanity don't appear on website

**Problem**: Caching or published status
**Solutions**:
1. Hard refresh browser (Ctrl+Shift+R)
2. In Sanity Studio, click "Publish" on documents (not just "Save")
3. Wait a few seconds for CDN to update
4. Try in incognito/private browser window

### CORS Error

**Problem**: Browser blocks Sanity API request
**Solutions**:
1. Go to sanity.io/manage → API → CORS Origins
2. Verify your domain is listed exactly as it appears in browser URL
3. Wait 5 minutes for changes to propagate
4. Try in different browser or incognito mode

## Next Steps

Once everything is working:

1. **Customize styling** - Edit `frontend/src/styles/main.css`
2. **Add more content** - Create more Service cards in Sanity
3. **Connect form** - Update `handleFormSubmit()` in `app.js` to send to a backend
4. **Custom domain** - Set up with GitHub Pages custom domain
5. **Analytics** - Add Google Analytics or Plausible
6. **SEO** - Add more meta tags and structured data

## Support

If you get stuck:
- Check [Sanity docs](https://sanity.io/docs)
- Review [GROQ documentation](https://www.sanity.io/docs/groq)
- Check browser console for error messages
- Verify your CORS configuration in Sanity

Enjoy your CMS-powered website! 🚀
