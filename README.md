# Rahimi Tech Solution — Website

A complete, production-ready React website for Rahimi Tech Solution, converted from the original HTML and expanded into a full multi-page site.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 18 + Vite** | Fast dev, HMR, modern React |
| Routing | **React Router v6** | Clean multi-page navigation |
| Styling | **Custom CSS with CSS Variables** | Full brand control, no Bootstrap bloat |
| Icons | **Font Awesome 6 (CDN)** | Same icons as original |
| Fonts | **Barlow + Lato (Google Fonts)** | Premium display + readable body |

---

## Pages (13 total)

| Route | Page |
|---|---|
| `/` | Home — hero, solutions, services, tech tabs, industries, process, portfolio, testimonials, partners, insights |
| `/about` | About — story, mission/vision/values, timeline |
| `/services` | Services — 9 service cards with detail lists |
| `/technologies` | Technologies — 5 categories, 40 tech cards |
| `/portfolio` | Portfolio — filterable project grid |
| `/careers` | Careers — perks, 6 job listings |
| `/careers/:id` | Job Detail — full description + application form |
| `/team` | Team — 8 team member cards |
| `/testimonials` | Testimonials — 8 full reviews |
| `/partners` | Partners — 8 partner cards |
| `/contact` | Contact — info + contact form |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/insights` | Blog / IT Insights — 6 articles |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Key Features

- **Mobile-first responsive** — all pages tested from 320px up
- **Sticky header** with mega menus (desktop) + hamburger (mobile)
- **Animated stats counter** on homepage hero
- **Portfolio filter** — all / web / app / mobile / infrastructure
- **Technology tabs** — frontend / backend / mobile / cloud / databases  
- **Application form** on Job Detail page — form validation, success state, file upload UI
- **Contact form** with success state
- **WhatsApp float** button with pulse animation
- **Scroll-to-top** button
- **Smooth page transitions** via ScrollToTop on route change
- **Brand consistent** — all brand colors via CSS variables

---

## Customization

- Brand colors: edit `:root` in `src/styles/globals.css`
- Content: edit data arrays at the top of each page file
- Navigation: edit `navItems` array in `src/components/Header.jsx`
- Footer links: edit `src/components/Footer.jsx`

---

## Connecting a Backend

The application forms (Contact, Job Application, Hero Quote form) are set up for easy backend integration. Each form has:
- Controlled React state
- Submit handler (`handleSubmit`)
- Success state

To connect (e.g. Supabase):
```js
const handleSubmit = async (e) => {
  e.preventDefault()
  const { error } = await supabase.from('applications').insert([form])
  if (!error) setSubmitted(true)
}
```

---

## Deployment

The project builds to a `/dist` folder — deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: drag `/dist` to Netlify dashboard
- **AWS S3 + CloudFront**: upload `/dist` contents

For Vercel/Netlify with React Router, add a redirect rule:
```
/* → /index.html (200)
```
