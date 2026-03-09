# Troubleshooting Guide

## Common Issues & Solutions

### ⚠️ Frontend Issues

#### Website shows "Loading website content..." forever

**Problem**: Content isn't loading from Sanity

**Checklist**:
1. Open browser developer console (F12)
2. Check Network tab for API requests
3. Look for error messages

**Solutions**:
- ✅ Verify `SANITY_PROJECT_ID` is correct (sanity.io/manage)
- ✅ Confirm content documents exist in Sanity Studio
- ✅ Check CORS origins in Sanity (API section)
- ✅ Verify dataset name is `production`
- ✅ Hard refresh browser (Ctrl+Shift+R)
- ✅ Try incognito/private browser window

#### "CORS error" or "Failed to fetch"

**Problem**: Browser blocks Sanity API request

**Console Error Example**:
```
Access to fetch at 'https://abc123.api.sanity.io/...'
from origin 'http://localhost:8000' has been blocked by CORS policy
```

**Solutions**:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Find your project → API
3. Add CORS origins:
   - `http://localhost:8000` (local)
   - `http://localhost:3000` (alternative)
   - `https://yourusername.github.io` (production)
4. Wait 5 minutes for changes to propagate
5. Clear browser cache and try again

#### Console shows "undefined" errors

**Example Error**:
```javascript
Cannot read properties of undefined (reading 'map')
at renderServices (app.js:150)
```

**Solutions**:
- ✅ Check that service documents exist in Sanity
- ✅ Verify documents are published (not draft)
- ✅ Check field names match schema definitions
- ✅ Add fallback values in app.js:
  ```javascript
  const services = siteContent.services || []
  ```

#### Theme colors not applying

**Problem**: Site shows default colors instead of Sanity colors

**Solutions**:
1. Go to Sanity → Site Configuration document
2. Verify fields exist:
   - `primaryColor` (e.g., `#667eea`)
   - `secondaryColor` (e.g., `#764ba2`)
3. Use valid hex color codes (6 digits)
4. Check browser console for errors
5. Hard refresh page (Ctrl+Shift+R)

#### Mobile menu doesn't work

**Problem**: ☰ button doesn't toggle navigation

**Solutions**:
- ✅ Check browser console for JavaScript errors
- ✅ Verify navbar links exist in Sanity
- ✅ Test in different browser
- ✅ Check CSS media query breakpoints in main.css
- ✅ Clear browser cache

#### Form submission doesn't work

**Problem**: "Send Message" button does nothing or shows error

**Solutions**:
- ✅ Check browser console (F12)
- ✅ Verify form fields exist in Sanity contact document
- ✅ Check `handleFormSubmit()` function in app.js
- ✅ For actual email, integrate:
   - Formspree: `await fetch('https://formspree.io/f/YOUR_ID')`
   - Netlify Forms: Add form name to HTML
   - Backend API: Point to your server
- ✅ Test form in incognito mode

---

### ⚠️ Sanity Issues

#### Can't connect to Sanity Studio

**Problem**: `npm run dev` shows error or won't start

**Solutions**:
```bash
# Make sure you're in sanity folder
cd sanity

# Install dependencies
npm install

# Try again
npm run dev
```

If still failing:
- ✅ Check Node.js version: `node --version` (need 18+)
- ✅ Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- ✅ Try using different port: `sanity dev --port 3334`

#### Sanity Studio won't load at localhost:3333

**Problem**: Browser shows "Cannot GET /studio"

**Solutions**:
- ✅ Verify CLI started studio: `npm run dev`
- ✅ Check terminal shows "Studio ready at..."
- ✅ Verify URL: `http://localhost:3333` (not 3000)
- ✅ Check if port 3333 is in use: `lsof -i :3333`
- ✅ Kill process and restart: `npm run dev`

#### Schema validation error

**Problem**: Red error box in Sanity Studio

**Example**:
```
Schema error: Field "title" is required
```

**Solutions**:
- ✅ Fill in required fields (marked with red *)
- ✅ Check schema file for validation rules
- ✅ Ensure field types match (string, number, etc.)
- ✅ Look at `validation()` in schema definitions

#### Can't create documents

**Problem**: No "+" button to create new document type

**Solutions**:
- ✅ Verify schema is imported in `schemaTypes.js`
- ✅ Check `sanity.config.js` desk structure
- ✅ Reload Sanity Studio (⌘+⇧+R or Ctrl+Shift+R)
- ✅ Check schema name doesn't have spaces
- ✅ Verify `type: 'document'` in schema

#### Changes don't publish

**Problem**: Content updates don't appear on website

**Solutions**:
- ✅ Click blue "Publish" button (not just Save)
- ✅ Verify "Publish" status shows green checkmark
- ✅ Wait 30 seconds for CDN cache to update
- ✅ Hard refresh website (Ctrl+Shift+R)
- ✅ Check deployment logs if using GitHub Actions

---

### ⚠️ Deployment Issues

#### GitHub Pages shows 404

**Problem**: Site shows GitHub "File not found" error

**Solutions**:
1. Go to repository Settings → Pages
2. Verify:
   - ✅ Source: "Deploy from a branch"
   - ✅ Branch: `main`
   - ✅ Folder: `/frontend`
3. Check branch name:
   ```bash
   git branch
   ```
   (Shows current branch)
4. Try redeploying:
   ```bash
   git add .
   git commit -m "Redeploy"
   git push
   ```

#### Site loads but no content appears

**Problem**: GitHub Pages works but website is blank

**Solutions**:
1. Check browser console (F12) for errors
2. Verify CORS includes GitHub Pages domain:
   - Go to [sanity.io/manage](https://sanity.io/manage) → API
   - Add: `https://yourusername.github.io`
3. Clear browser cache
4. Try in incognito mode

#### GitHub Actions deployment fails

**Problem**: Red X next to commit, deployment doesn't work

**Solutions**:
- ✅ Check Actions tab for error details
- ✅ Verify workflow file syntax (YAML)
- ✅ Check branch name matches (main vs master)
- ✅ Verify directory paths are correct
- ✅ Check file permissions

---

### ⚠️ Configuration Issues

#### Wrong Project ID

**Problem**: "Sanity project not found" or blank page

**How to fix**:
1. Get correct ID from [sanity.io/manage](https://sanity.io/manage)
2. Update `frontend/src/utils/sanityClient.js`:
   ```javascript
   projectId: 'your_actual_project_id'
   ```
3. Hard refresh website (Ctrl+Shift+R)

#### Wrong Dataset Name

**Problem**: Content loads but shows incomplete data

**Solution**:
1. Verify dataset name in Sanity
2. Update if needed in `sanityClient.js`:
   ```javascript
   dataset: 'production'  // or whatever yours is called
   ```

#### Missing Environment Variables

**Problem**: Variables undefined, API calls fail

**Solutions**:
- ✅ Check `.env` file exists in frontend/
- ✅ Restart dev server after adding .env
- ✅ Use environment variables in sanityClient.js:
   ```javascript
   projectId: process.env.SANITY_PROJECT_ID
   ```
- ✅ For GitHub Pages, use hardcoded values (not secrets in client-side code)

---

### ⚠️ Performance Issues

#### Website loads slowly

**Solutions**:
- ✅ Check network tab (F12) - see what's slow
- ✅ Use CDN: `useCdn: true` in sanityClient.js
- ✅ Reduce query complexity
- ✅ Minify CSS/JS (if deploying to production)
- ✅ Check browser extensions aren't blocking resources

#### Too many API calls

**Solutions**:
- ✅ Use ALL_CONTENT query instead of individual queries
- ✅ Fetch once on page load, reuse data
- ✅ Cache results in localStorage:
   ```javascript
   localStorage.setItem('content', JSON.stringify(data))
   ```

---

### ⚠️ Browser Issues

#### Works in Chrome but not Safari

**Problem**: Site works on some browsers but not others

**Solutions**:
- ✅ Check CSS variables support (older Safari)
- ✅ Test in all browsers: Chrome, Firefox, Safari, Edge
- ✅ Use CSS fallbacks for older browsers
- ✅ Check console for JavaScript errors in each browser

#### Mobile view broken

**Problem**: Responsive design doesn't work on phone

**Solutions**:
- ✅ Check viewport meta tag in index.html
- ✅ Test breakpoints: 480px, 768px, 1024px, 1200px
- ✅ Use browser DevTools mobile emulation
- ✅ Test on real device
- ✅ Check CSS media queries in main.css

---

## Debugging Tools

### Browser DevTools

Press **F12** to open:

**Console Tab**:
- See JavaScript errors
- Check API responses
- Test JavaScript commands

**Network Tab**:
- See API calls to Sanity
- Check response times
- Look for failed requests (red)
- Verify CORS headers

**Application Tab**:
- View localStorage
- Check cookies
- Debug service workers

### Sanity Vision Tool

In Sanity Studio:
1. Click **Vision** (left sidebar)
2. Type GROQ query
3. See results in real-time
4. Debug query issues

### Testing URLs

Check if Sanity API responds:
```
https://[projectId].api.sanity.io/v2024-01-01/data/query/production?query=*[_type=="site"][0]
```

Replace `[projectId]` with your actual ID.

---

## Getting Help

### Before asking for help

- [ ] Check browser console (F12)
- [ ] Verify CORS configuration
- [ ] Test in incognito mode
- [ ] Try different browser
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Check all field names match schemas
- [ ] Verify content is published

### Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Guide](https://www.sanity.io/docs/groq)
- [GitHub Pages Help](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org)

### Creating a Minimal Test Case

If you need to report an issue:
1. Check if it happens in incognito mode
2. Share exact error message
3. Share GROQ query if relevant
4. Share browser console output
5. Share which steps you followed from SETUP.md

---

## Common Error Messages & Meanings

| Error | Means | Fix |
|-------|-------|-----|
| "CORS error" | Domain not in CORS whitelist | Add domain to Sanity API settings |
| "Cannot GET /" | Wrong server port or path | Check localhost:8000 or :3333 |
| "Cannot read properties of undefined" | Missing data/schema mismatch | Verify document exists in Sanity |
| "projectId is undefined" | Configuration missing | Check sanityClient.js SANITY_CONFIG |
| "No studio found" | Sanity not running | Run `npm run dev` in sanity/ folder |
| "TypeError: fetch is not defined" | Old Node.js version | Update to Node 18+ |

---

**Still stuck?** Refer back to specific documentation files:
- Setup issues → [SETUP.md](SETUP.md)
- Architecture questions → [ARCHITECTURE.md](ARCHITECTURE.md)
- GROQ syntax → [GROQ_REFERENCE.md](GROQ_REFERENCE.md)
- Frontend details → [frontend/README.md](frontend/README.md)
- Sanity details → [sanity/README.md](sanity/README.md)
