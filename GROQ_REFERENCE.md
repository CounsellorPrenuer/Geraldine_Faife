# GROQ Queries Reference Guide

GROQ = "Graph-Relational Object Queries"

This file documents all GROQ queries used in this project and provides examples for extending them.

## All Queries Used

### Located in: `frontend/src/utils/sanityClient.js`

```javascript
export const GROQ_QUERIES = {
  // Get site configuration
  SITE: '*[_type == "site"][0]',

  // Get navigation links
  NAVBAR: '*[_type == "navbar"][0].links',

  // Get hero section
  HERO: '*[_type == "hero"][0]',

  // Get about section
  ABOUT: '*[_type == "about"][0]',

  // Get all services ordered by order field
  SERVICES: '*[_type == "service"] | order(order asc)',

  // Get contact section
  CONTACT: '*[_type == "contact"][0]',

  // Get footer
  FOOTER: '*[_type == "footer"][0]',

  // Get everything in one query (recommended)
  ALL_CONTENT: `{
    "site": *[_type == "site"][0],
    "navbar": *[_type == "navbar"][0],
    "hero": *[_type == "hero"][0],
    "about": *[_type == "about"][0],
    "services": *[_type == "service"] | order(order asc),
    "contact": *[_type == "contact"][0],
    "footer": *[_type == "footer"][0]
  }`,
}
```

## Query Syntax Explained

### Basic Query Structure

```groq
*[_type == "documentType"]
│  │
│  └─ Select all documents of this type
└──── Match any document
```

### Get First Document

```groq
*[_type == "site"][0]
                   │
                   └─ Get first document [0]
                      Second would be [1], etc.
```

### Get All Documents

```groq
*[_type == "service"]
```

No index = get all matching documents

### Filter Results

```groq
*[_type == "service" && status == "published"]
                       │
                       └─ Filter by field value
```

### Order Results

```groq
*[_type == "service"] | order(order asc)
                        │      │    │
                        │      │    └─ ascending (asc) or descending (desc)
                        │      └─ field to sort by
                        └─ pipe operator (apply transformation)
```

### Select Specific Fields

```groq
*[_type == "service"]{title, description, icon}
                      │     │             │
                      └─────┴─────────────┘
                      Only return these fields
```

### Nested Object Access

```groq
*[_type == "navbar"][0].links
                        │
                        └─ Access nested array/object
```

## Common Query Patterns

### Get All Services (Ordered)
```groq
*[_type == "service"] | order(order asc)
```

Returns:
```json
[
  {
    "_id": "abc123",
    "title": "Strategic Consulting",
    "description": "...",
    "icon": "📊",
    "order": 0
  },
  {
    "_id": "def456",
    "title": "Digital Solutions",
    ...
  },
  ...
]
```

### Get Specific Fields Only
```groq
*[_type == "service"]{title, icon, "id": _id}
```

Returns:
```json
[
  {
    "title": "Strategic Consulting",
    "icon": "📊",
    "id": "abc123"
  },
  ...
]
```

### Get First Published Document
```groq
*[_type == "hero" && status == "published"][0]
```

### Count Documents
```groq
count(*[_type == "service"])
```

Returns:
```json
4
```

### Conditional Selection
```groq
*[_type == "service" && featured == true]
```

### Multiple Conditions
```groq
*[_type == "service" && status == "published" && order < 5]
```

### Project Single Value
```groq
*[_type == "site"][0].primaryColor
```

Returns:
```json
"#667eea"
```

## Advanced Patterns

### Rename Fields
```groq
*[_type == "service"]{
  title,
  description,
  "emoji": icon,
  "color": accentColor
}
```

### Combine Multiple Queries
```groq
{
  "services": *[_type == "service"] | order(order asc),
  "contactEmail": *[_type == "site"][0].email,
  "navLinks": *[_type == "navbar"][0].links
}
```

### Filter with Array Projections
```groq
*[_type == "navbar"][0].links[]{label, href}
```

### Limit Results
```groq
*[_type == "service"][0..3]
```

Returns only first 4 items (indices 0-3)

### Sort Multiple Fields
```groq
*[_type == "service"] | order(featured desc, order asc)
```

### Conditional Fields
```groq
*[_type == "service"]{
  title,
  featured,
  featured => {
    "badge": "Featured"
  }
}
```

## Troubleshooting Queries

### Query Not Returning Results
- Check `_type == "servicE"` (case-sensitive)
- Verify document exists and is published
- Check document has required fields
- Use `[0]` to get first if you want single document

### Getting "undefined" values
```groq
// Wrong - might not have icon field
*[_type == "service"]{title, icon}

// Better - provide fallback
*[_type == "service"]{title, "icon": icon || "default"}
```

### Performance Issues
```groq
// Inefficient - loads everything
*[_type == "service"]

// Better - get only needed fields
*[_type == "service"]{title, icon, _id}
```

## Validation in Sanity Studio

All queries can be tested in Sanity's Vision tool:

1. Go to Sanity Studio
2. Open **Vision** (in left sidebar)
3. Type your GROQ query
4. See results in real-time

Example test queries:

```groq
// Get all services
*[_type == "service"]

// Count services
count(*[_type == "service"])

// Get site colors only
*[_type == "site"][0]{primaryColor, secondaryColor}

// Check what fields services have
*[_type == "service"][0]
```

## Using Queries in Frontend

### Fetch Specific Section
```javascript
// In app.js
const services = await fetchSanityData(GROQ_QUERIES.SERVICES)
console.log(services) // Array of service objects
```

### Fetch Everything at Once
```javascript
// Most efficient approach
const content = await fetchAllContent()
console.log(content.services) // Access services
console.log(content.site) // Access site config
```

### Custom Query
```javascript
// Fetch custom data
const myQuery = `*[_type == "service" && featured == true]`
const featured = await fetchSanityData(myQuery)
```

## Extending with New Content Types

### Step 1: Create Schema
```javascript
// sanity/schemas/testimonial.js
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'author', type: 'string' },
    { name: 'text', type: 'text' },
    { name: 'rating', type: 'number' }
  ]
}
```

### Step 2: Add GROQ Query
```javascript
// frontend/src/utils/sanityClient.js
export const GROQ_QUERIES = {
  // ... existing queries
  TESTIMONIALS: '*[_type == "testimonial"] | order(_createdAt desc)',
}
```

### Step 3: Create Render Function
```javascript
// frontend/src/scripts/app.js
function renderTestimonials() {
  const testimonials = siteContent.testimonials || []
  // Render testimonials to DOM
}
```

### Step 4: Update ALL_CONTENT Query
```javascript
ALL_CONTENT: `{
  // ... existing
  "testimonials": *[_type == "testimonial"] | order(_createdAt desc)
}`
```

## GROQ Operators Reference

| Operator | Purpose | Example |
|----------|---------|---------|
| `*` | Match all documents | `*[_type == "X"]` |
| `[]` | Array index access | `[0]` (first), `[1]` (second) |
| `{}` | Select fields | `{title, description}` |
| `\|` | Pipe/transform | `\| order()`, `\| select()` |
| `==` | Equals | `_type == "service"` |
| `!=` | Not equals | `status != "draft"` |
| `>`, `<` | Greater/less than | `price > 100` |
| `&&` | AND | `type == "A" && status == "B"` |
| `\|\|` | OR | `type == "A" \|\| type == "B"` |
| `!` | NOT | `!draft` |

## Performance Tips

1. **Fetch once** - Use ALL_CONTENT query instead of multiple queries
2. **Select fields** - Don't fetch entire documents if you only need some fields
3. **Filter early** - Use GROQ filters instead of JavaScript
4. **Order in query** - Order in GROQ not JavaScript
5. **Cache results** - Store in variable to reuse data

Example optimized query:
```groq
// Good - efficient
{
  "services": *[_type == "service"]{title, icon, _id} | order(order asc),
  "email": *[_type == "site"][0].email
}

// Bad - fetches everything
{
  "services": *[_type == "service"],
  "site": *[_type == "site"][0]
}
```

## Testing Queries

Use Sanity's Vision tool or test with curl:

```bash
curl "https://[projectId].api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22site%22%5D%5B0%5D"
```

(URL-encode your GROQ query)

---

For more GROQ documentation: https://www.sanity.io/docs/groq
