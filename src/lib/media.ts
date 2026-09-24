/** Accept public HTTPS media URLs or local root-relative assets. */
export function safeMediaUrl(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith('/') && !src.startsWith('//')) return src;
  try { const url = new URL(src); return url.protocol === 'https:' ? url.href : undefined; } catch { return undefined; }
}
/** Normalize ordinary share/watch links. Never render arbitrary iframe origins. */
export function embedUrl(src?: string): string | undefined {
  if (!src) return undefined;
  try {
    const url = new URL(src);
    if (url.protocol !== 'https:') return undefined;
    const host = url.hostname.replace(/^www\./, '');
    const parts = url.pathname.split('/').filter(Boolean);
    if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'youtu.be'].includes(host)) {
      const id = host === 'youtu.be' ? parts[0] : url.searchParams.get('v') || (['embed', 'shorts'].includes(parts[0]) ? parts[1] : undefined);
      if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parts.find(part => /^\d+$/.test(part));
      const hash = url.searchParams.get('h') || (parts[0] === id ? parts[1] : undefined);
      if (id) return `https://player.vimeo.com/video/${id}${hash && /^[a-zA-Z0-9]+$/.test(hash) ? `?h=${hash}` : ''}`;
    }
  } catch { return undefined; }
}
