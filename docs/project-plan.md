# Project Plan — Raisa Pierre Portfolio Site

_Last updated: April 13, 2026_

---

## Project Overview

Build a professional portfolio website for Raisa Pierre — Senior UX/UI Designer & Researcher with 16+ years of experience. The site will showcase case studies, design leadership, and career expertise, targeting senior/lead design roles in iGaming and product design.

**Current portfolio:** raisapierre.myportfolio.com
**Domain:** raisapierre.com (registered on Cloudflare, April 13 2026)
**Hosting:** GitHub Pages (planned)
**Registrar:** Cloudflare

---

## Our Workflow — How We Work Together

### Roles

**Raisa (Design & Content Owner)**
- Defines design direction, visual identity, and brand voice
- Writes case study narratives and content
- Creates mockups/wireframes in Figma
- Reviews and approves all changes before they go live
- Makes final decisions on design and content

**Claude (Development & Documentation Partner)**
- Writes and maintains all code (HTML, CSS, JS, Astro components)
- Sets up and manages the Git repository
- Handles deployment and hosting configuration
- Creates and maintains project documentation
- Provides research, recommendations, and best practices
- Helps optimize for performance, SEO, and accessibility

### Communication Protocol
- All work is documented in the `/docs` folder as `.md` files
- Every session starts with a check-in: what's next on the plan?
- Changes are tracked through Git commits with clear messages
- We review progress against the phase milestones below

---

## Project Documentation Structure

```
portfolio-site/
├── docs/
│   ├── portfolio-research.md      ✅ Research findings & inspiration
│   ├── project-plan.md            ✅ This file — plan & workflow
│   ├── domain-guide.md            ✅ Domain registration steps
│   ├── content-plan.md            📋 All copy, page content, meta descriptions
│   ├── design-system.md           📋 Colors, typography, spacing, components
│   ├── brand-guidelines.md        📋 Voice, tone, visual identity
│   ├── accessibility.md           📋 WCAG compliance requirements
│   ├── seo-strategy.md            📋 Keywords, meta tags, strategy
│   ├── deployment.md              📋 Hosting, domain, build instructions
│   └── case-studies/
│       ├── [project-1].md         📋 One file per case study
│       ├── [project-2].md         📋
│       └── [project-3].md         📋
├── src/                           🔧 Source code (created in Phase 3)
├── public/                        🔧 Static assets (images, fonts)
├── .gitignore                     🔧
├── package.json                   🔧
└── README.md                      🔧
```

✅ = Created | 📋 = To be created | 🔧 = Created during development

---

## Git Strategy

### Repository Setup
- **Platform:** GitHub (free, integrates with Cloudflare Pages)
- **Repo name:** `raisapierre-portfolio` (or similar)
- **Visibility:** Private during development, can be made public later

### Branching Model (GitHub Flow)
```
main                    ← Always production-ready, deployed automatically
├── feature/[name]      ← New sections or components
├── content/[name]      ← Case study content, copy updates
├── fix/[name]          ← Bug fixes
└── docs/[name]         ← Documentation updates
```

### Commit Convention
We use Conventional Commits for clear history:
- `feat: add hero section component`
- `content: add Betsson case study`
- `fix: mobile navigation alignment`
- `docs: update content plan`
- `style: refine typography scale`
- `perf: optimize image loading`

### Workflow for Each Change
1. Create a branch from `main`
2. Make changes, commit with clear messages
3. Review the changes together
4. Merge to `main` → auto-deploys to live site

---

## Project Phases

### Phase 1: Planning & Strategy (Week 1-2)
- [x] Research portfolio best practices and inspiration
- [x] Define project structure and workflow
- [x] Set up documentation folder
- [x] Register domain (raisapierre.com on Cloudflare — April 13 2026)
- [x] Identify case study candidates (see case-study-candidates.md)
- [ ] Choose technology stack (confirm Astro vs Framer vs other)
- [ ] Confirm hosting (GitHub Pages)
- [ ] Define site map and page structure
- [ ] Write content-plan.md — all pages, sections, copy outline
- [ ] Create design-system.md — colors, typography, spacing
- [ ] Confirm final case study selection (3-5 from candidates list)

### Phase 2: Design (Week 3-4)
- [ ] Create wireframes for all pages (Figma)
- [ ] Define component library (cards, buttons, navigation)
- [ ] Create visual mockups — homepage, case study template, about, contact
- [ ] Write brand-guidelines.md
- [ ] Review and approve designs

### Phase 3: Development Setup (Week 5)
- [ ] Initialize Astro project (or chosen framework)
- [ ] Configure Tailwind CSS and design tokens
- [ ] Set up GitHub repository with branch protection
- [ ] Connect to Cloudflare Pages for auto-deployment
- [ ] Write deployment.md with all configs
- [ ] Create README.md with project setup instructions

### Phase 4: Build Components (Week 6-7)
- [ ] Build layout components (header, footer, navigation)
- [ ] Build page templates (homepage, case study, about, contact)
- [ ] Implement responsive design (mobile-first)
- [ ] Add animations and micro-interactions
- [ ] Implement SEO (meta tags, structured data, sitemap)

### Phase 5: Content & Case Studies (Week 8-9)
- [ ] Write and add all case study content
- [ ] Optimize and add images (WebP, lazy loading)
- [ ] Write meta descriptions for all pages
- [ ] Add alt text to all images
- [ ] Write seo-strategy.md

### Phase 6: Testing & Optimization (Week 10)
- [ ] Lighthouse audit (target: >90 on all metrics)
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing (iOS, Android)
- [ ] Performance optimization (Core Web Vitals)
- [ ] Write accessibility.md with audit results

### Phase 7: Launch (Week 11)
- [ ] Connect custom domain
- [ ] Final QA on production URL
- [ ] Set up Google Search Console and analytics
- [ ] Soft launch — share with trusted colleagues for feedback
- [ ] Official launch — update LinkedIn, resume, social profiles

### Phase 8: Post-Launch (Ongoing)
- [ ] Monitor analytics and search performance
- [ ] Gather and act on feedback
- [ ] Add new case studies quarterly
- [ ] Keep content fresh and relevant

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-13 | Project initiated | Career growth initiative — replace myportfolio.com with custom domain |
| 2026-04-13 | Docs-first approach | All decisions documented in /docs as .md files for traceability |
| 2026-04-13 | Git for version control | Enables rollback, tracks all changes, professional workflow |
| 2026-04-13 | Domain: raisapierre.com | Registered on Cloudflare — at-cost pricing, fastest DNS, pairs with future hosting |
| 2026-04-13 | Hosting: GitHub Pages | Free, simple, deploys from Git, custom domain support — can migrate later if needed |
| 2026-04-13 | Design tool: Figma | Raisa designs in Figma, Claude translates to code |

---

## Next Steps (Immediate)

1. ~~Register domain~~ ✅ `raisapierre.com` on Cloudflare
2. **Raisa:** Confirm technology choice (Astro recommended — Claude codes, you design in Figma)
3. **Raisa:** Select final 3-5 case studies from candidates list (see case-study-candidates.md)
4. **Together:** Start content-plan.md — outline what goes on each page
4. **Together:** Register domain (see domain-guide.md)
5. **Together:** Begin content-plan.md
