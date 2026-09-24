# Media: add content, keep the layout

All media comes from `src/content/projects.ts`. `MediaView`, `MediaGallery` and `MediaPlaceholder` are reusable; no image or video URL is hardcoded in them. Image/video fields are optional. An absent or failed local/direct asset gets a styled placeholder. Third-party embed playback is controlled by the provider; a private/deleted embed can display its own error.

## Example project fields

Copy the relevant fields into a real project record. The sample paths below are documentation, not supplied project assets.

```ts
cover: {
  src: '/projects/lac/cover.webp',
  alt: 'Describe the actual frame',
  width: 1600, height: 1000,
},
heroMedia: {
  type: 'video',
  src: '/videos/lac-trailer.mp4',
  poster: '/projects/lac/hero.webp',
  alt: 'LẠC trailer',
  captions: [{ src: '/videos/lac-vi.vtt', language: 'vi', label: 'Vietnamese' }],
},
gallery: [
  { src: '/projects/lac/frame-01.webp', alt: 'Describe frame one' },
  { src: '/projects/lac/frame-02.webp', alt: 'Describe frame two' },
  { src: '/projects/lac/wide.webp', alt: 'Describe wide image', layout: 'full', fit: 'contain' },
  { alt: 'Future production still', placeholder: 'Production stills coming soon' },
],
bts: [
  { src: '/projects/lac/bts-01.webp', alt: 'Describe the lighting setup', caption: 'Lighting setup' },
],
process: [{
  title: 'Lighting tests', text: 'Add the actual process notes.',
  media: [{ src: '/projects/lac/test.webp', alt: 'Describe the lighting test' }],
}],
videos: [
  { type: 'embed', src: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID', alt: 'Film on YouTube', layout: 'full' },
  { type: 'embed', src: 'https://vimeo.com/YOUR_NUMERIC_ID', alt: 'Film on Vimeo', layout: 'full' },
  { type: 'video', src: 'https://your-media-host.example/film.mp4', alt: 'Full film', layout: 'full' },
],
mediaSections: [{
  title: 'Frame studies', layout: 'strip',
  items: [{ src: '/projects/lac/study.webp', alt: 'Describe the study' }],
}],
```

## Supported inputs
- Cover: image, or video with `poster` for non-interactive card preview (avoids nested video controls inside a navigation link).
- Hero: image, local MP4, direct HTTPS video URL or YouTube/Vimeo link.
- Gallery/BTS/process: any mix of media; `layout: 'full'` spans the gallery width. `fit: 'contain'` preserves the entire composition.
- YouTube watch/share/shorts/embed URLs and Vimeo public/unlisted/player URLs are normalized automatically; arbitrary iframe origins are rejected.
- Local MP4: place under `public/videos/` and reference `/videos/file.mp4`.
- Direct video: use `type: 'video'` for signed URLs without a video extension.
- Responsive images: optionally set `sources: [{ src: '/projects/lac/cover-640.webp', width: 640 }, { src: '/projects/lac/cover-1600.webp', width: 1600 }]`. Generate compressed variants before upload. Static hosting cannot transform files at request time.
- Specify actual width/height for each image to reserve the correct aspect ratio.
- No asset: omit `src`, supply `placeholder` text. Entire optional sections can be omitted.

External media must be public and allow embedding/hotlinking. No autoplay is used. Videos load on demand, iframe embeds lazy-load, images below the fold lazy-load. Rebuild/redeploy after content changes; no layout edits are needed.
