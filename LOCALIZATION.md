# VI / EN and personal profile content

Vietnamese is the default, including pre-rendered HTML. The existing English copy remains the source/fallback. No route or page tree is duplicated.

- `src/content/locales/vi.ts`: Vietnamese translations keyed by English source copy. Supplied Vietnamese wording is preserved.
- `src/content/locales/en.ts`: English values for semantic/interpolated keys; all other English source strings fall back verbatim.
- `src/content/locales/index.ts`: shared lookup, interpolation and fallback; only this module branches on language.
- `src/components/locale.tsx`: provider, text-only `T`, accessible links/sections and VI / EN switch. The switch lives inside mobile navigation and in the desktop header.
- `tp-locale` in localStorage remembers the selection. Invalid/unavailable storage falls back to Vietnamese without breaking navigation. Changes from another tab are synchronized.
- New paragraphs, captions and accessible labels can use the English source as a key and add the matching Vietnamese value. Proper names, project slugs, media paths and professional titles do not change.

## SEO behavior on static hosting
Vietnamese metadata is present in the exported HTML. On switching languages, the document language, page title, description, Open Graph and Twitter text update. All languages share the same URLs, so crawlers without JavaScript receive the default Vietnamese version; this is not separate `/en` indexing. Canonical URLs and routing are unchanged.

## Hero and About content
Edit `src/content/profile.ts`: name, nickname, title, shortIntro, location, aboutParagraphs, manifesto, values and profileImage. Translate the corresponding source copy in `vi.ts`. Layout code does not need to change.

Add the approved portrait at `public/images/profile/portrait.jpg`, then set `portraitAvailable: true`. Missing/failed portraits have a small editorial placeholder. No synthetic portrait is used. Homepage width is 180–260px on desktop and 140px on mobile; About is up to 360px on desktop and 170px on mobile. Hover zoom is 1.015 and disabled for reduced motion.

The hero/About refinements are scoped in `src/app/personal.css`. Work, project, CV and media retain their existing structure; translation-related wrapping adjustments keep longer Vietnamese text contained.

## Checks
Run `npm run lint`, `npm test`, `npm run build`, `npm run typecheck`.
Browser checks: switch both directions, reload, navigate, mobile menu switch, translated project narrative/CV/contact, default Vietnamese intro, correct title/description, and no horizontal overflow at 390px.
