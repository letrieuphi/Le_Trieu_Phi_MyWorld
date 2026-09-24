# Triệu Phi — My World

A cinematic, editorial portfolio for D.O.P / Motion Designer / Photographer Triệu Phi. Built from the supplied portfolio brief, preserving the repository name requested by the owner.

## Stack
Next.js App Router, React, TypeScript, plain CSS. Static export with pre-rendered pages. The interactive sculpture uses CSS perspective and transforms: no WebGL bundle or animation library needed. Native scrolling remains intact.

## Local development
Node.js 20.9+ (Node 22 LTS recommended).

```sh
npm ci
npm run dev
npm run lint
npm test
npm run typecheck
npm run build
```

The production static site is generated in `out/`. Typecheck after the build includes generated route types. Do not use `next start` with static export; serve `out/` through a static web server.

## Structure
- `src/app`: home, work hub, shared category/project route, about, CV, contact, metadata and styles.
- `src/components`: navigation, layout, typed media rendering, project cards, intro and interactions.
- `src/content/projects.ts`: categories and project records.
- `src/content/profile.ts`: biography, contact, social links, CV files and tools.
- `src/content/experience.ts`: editable professional experience.
- `src/lib/site.ts`: deployment URL and optional path prefix.
- `public/projects`, `public/photography`, `public/images`, `public/videos`, `public/cv`: media locations.

## Add a project
See `MEDIA_GUIDE.md` for paste-ready examples of every image/video field, responsive sources, full-width layouts and horizontal media strips.
1. Add media to `public/projects/<slug>/`; prefer compressed WebP/AVIF and video with a poster or embed.
2. Add one typed `Project` record in `src/content/projects.ts`. Use a unique slug that does not conflict with a category slug.
3. Set `disciplines` to category slugs (for example `film`, `photography`). Set `featured: true` for the homepage.
4. Set `cover: { src: '/projects/slug/cover.webp', alt: 'Specific description', width: 1600, height: 1000 }`.
5. Optional `gallery`, `bts`, `heroMedia`, `videos`, `process`, `challenge`, `approach`, `outcome`, `tools`, `credits` and `externalLinks` render only when supplied. Embed URLs must be trusted provider embed URLs; local videos use `type: 'video'` and playback controls. No autoplay.
6. Build and deploy. No page structure needs editing.

## Photography
Add an album as a project with `disciplines: ['photography']`. Put photographs in `public/photography/` and reference them from `gallery`, including meaningful alt text and optional captions. Images have lazy loading and explicit dimensions; the static export expects pre-optimized images. For responsive sources/CDN transformations, extend `MediaView` or configure a compatible image loader.

## CV and profile
See `LOCALIZATION.md` for VI/EN translations, language persistence, SEO limits on static hosting and the data-driven personal hero/About sections.
Replace the missing CV files with the two approved PDFs named in `CONTENT_TODO.md`, then set `profile.cv.vi` and `profile.cv.en` to their `/cv/...pdf` paths. Until then, download buttons visibly say Coming soon. Update biography/contact in `profile.ts`, experience in `experience.ts`. No fake PDFs are included.

## Deployment
### Vercel (preferred)
Import this repository into Vercel. The Next.js framework is detected. Use `npm run build` and set `NEXT_PUBLIC_SITE_URL` to the final public origin, such as `https://your-project.vercel.app`. Leave `NEXT_PUBLIC_BASE_PATH` unset. No API keys or runtime server are required. Redeploy after changing the public origin so metadata and sitemap match.

### GitHub Pages
The included Actions workflow builds and publishes `out/`. In repository Settings → Pages, select GitHub Actions as the source. The workflow sets the site URL and `/Le_Trieu_Phi_MyWorld` base path. To use a custom domain, update these values and configure the domain in Pages settings.

### Other static hosts
Serve `out/`, preserving directory `index.html` routing and using `404.html` as the error page. Set `NEXT_PUBLIC_SITE_URL` to the final public URL before building. Set `NEXT_PUBLIC_BASE_PATH` only when hosting beneath a URL subpath.

## Interaction and accessibility
Intro runs once per browser session (2.8 seconds), has a skip button, focuses its control and uses inert background content. Reduced motion uses a short fade. Menus support keyboard navigation and Escape. Native cursor remains available with a subtle decorative ring on fine pointers. Hover effects are optional and all controls work on touch. Project pages work without JavaScript; reveals progressively enhance visible content.

## Content status
See `CONTENT_TODO.md`. Abstract covers are explicitly labeled placeholders. Project imagery, video and real CV files remain content dependencies. The current release is a working website, not a claim that those materials have been supplied.
