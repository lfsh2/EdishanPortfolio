# Edishan Lee Tenorio: Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. Fully static, with no CMS and no client data fetching.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerendered)
npm run format     # prettier
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel to the production domain. Canonicals, the sitemap and OG URLs read from it.

## Where things live

| What | File |
| --- | --- |
| Contact details, calendar link, proof metrics | `lib/site.ts` |
| Projects + case studies (one schema drives /work, /work/[slug], homepage, service pages, sitemap, OG) | `lib/projects.ts` |
| Services, process, experience, testimonials, FAQ, skills | `lib/content.ts` |
| Design tokens (colour, type scale, motion) | `app/globals.css` → `@theme` |
| Screenshots (static imports → auto width/height + blur) | `assets/` |

**Add a case study:** add a `Project` with a `caseStudy` block in `lib/projects.ts`. The route, sitemap entry, OG image and Work listing all generate from it.
**Add an archive project:** add a `Project` without `caseStudy` (give it `liveUrl` or `href` if it should link somewhere).

## Routes

`/` · `/work` · `/work/ai-lead-qualification` · `/work/teethly` · `/work/meeplecrate` · `/services/ai-automation` · `/services/full-stack-development` · `/about`
