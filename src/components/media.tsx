'use client';
import { useState } from 'react';
import type { Media } from '@/content/projects';
import { asset } from '@/lib/site';
import { embedUrl, safeMediaUrl } from '@/lib/media';

export function MediaPlaceholder({ label = 'Visuals coming soon' }: { label?: string }) {
  return <div className="media-placeholder" role="img" aria-label={label}><span aria-hidden="true">✳</span><p>{label}</p><small>LIGHT × MOTION × CURIOSITY</small></div>;
}
export function MediaView({ media, priority = false, preview = false }: { media: Media; priority?: boolean; preview?: boolean }) {
  // Keyed child resets failure state when a content source is replaced.
  return <MediaContent key={`${media.src}-${media.type}`} media={media} priority={priority} preview={preview} />;
}
function MediaContent({ media, priority, preview }: { media: Media; priority: boolean; preview: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = safeMediaUrl(media.src);
  const embed = embedUrl(src);
  const type = media.type || (embed ? 'embed' : /\.(mp4|webm|mov)(?:\?|$)/i.test(src || '') ? 'video' : 'image');
  const poster = safeMediaUrl(media.poster);
  const imageSrc = preview && type !== 'image' ? poster : src;
  const fallback = <MediaPlaceholder label={media.placeholder || (failed ? 'Media unavailable' : 'Visuals coming soon')} />;
  return <figure className={`media-view media-${media.layout || 'grid'} fit-${media.fit || 'cover'}`}>
    {failed || !src ? fallback : (type === 'image' || preview) ? imageSrc ? /* Static export: pre-optimized files + optional responsive source set. */
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset(imageSrc)} alt={media.alt} width={media.width || 1600} height={media.height || 1000} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" srcSet={!preview ? media.sources?.filter(s => safeMediaUrl(s.src)).map(s => `${asset(s.src)} ${s.width}w`).join(', ') : undefined} sizes="(max-width: 700px) 100vw, 90vw" onError={() => setFailed(true)} /> : fallback
      : type === 'embed' ? embed ? <iframe src={embed} title={media.alt} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onError={() => setFailed(true)} /> : fallback
      : <video controls playsInline preload="none" aria-label={media.alt} src={asset(src)} poster={poster ? asset(poster) : undefined} onError={() => setFailed(true)}>{media.captions?.filter(t => safeMediaUrl(t.src)).map(t => <track key={t.src} kind="captions" src={asset(t.src)} srcLang={t.language} label={t.label} />)}Your browser does not support this video.</video>}
    {media.caption && <figcaption>{media.caption}</figcaption>}
  </figure>;
}
export function MediaGallery({ items, layout = 'grid', label = 'Project visuals' }: { items: Media[]; layout?: 'grid' | 'strip'; label?: string }) {
  return <div className={layout === 'strip' ? 'media-strip' : 'gallery'} aria-label={label}>{items.map((m, i) => <MediaView key={`${m.src || 'placeholder'}-${i}`} media={m} />)}</div>;
}
