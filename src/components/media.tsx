'use client';
import { T, useLocale } from '@/components/locale';
import { useState } from 'react';
import type { Media } from '@/content/projects';
import { asset } from '@/lib/site';
import { embedUrl, safeMediaUrl } from '@/lib/media';

export function MediaPlaceholder({ label = 'Visuals coming soon' }: { label?: string }) {
  const { t } = useLocale();
  return <div className="media-placeholder" role="img" aria-label={t(label)}><span aria-hidden="true">✳</span><p><T>{label}</T></p><small><T>{"LIGHT × MOTION × CURIOSITY"}</T></small></div>;
}
export function MediaView({ media, priority = false, preview = false }: { media: Media; priority?: boolean; preview?: boolean }) {
  // Keyed child resets failure state when a content source is replaced.
  return <MediaContent key={`${media.src}-${media.type}`} media={media} priority={priority} preview={preview} />;
}
function MediaContent({ media, priority, preview }: { media: Media; priority: boolean; preview: boolean }) {
  const { t } = useLocale();
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
      <img src={asset(imageSrc)} alt={t(media.alt)} width={media.width || 1600} height={media.height || 1000} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" srcSet={!preview ? media.sources?.filter(s => safeMediaUrl(s.src)).map(s => `${asset(s.src)} ${s.width}w`).join(', ') : undefined} sizes="(max-width: 700px) 100vw, 90vw" onError={() => setFailed(true)} /> : fallback
      : type === 'embed' ? embed ? <iframe src={embed} title={t(media.alt)} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onError={() => setFailed(true)} /> : fallback
      : <video controls playsInline preload="none" aria-label={t(media.alt)} src={asset(src)} poster={poster ? asset(poster) : undefined} onError={() => setFailed(true)}>{media.captions?.filter(t => safeMediaUrl(t.src)).map(track => <track key={track.src} kind="captions" src={asset(track.src)} srcLang={track.language} label={t(track.label)} />)}<T>{"Your browser does not support this video."}</T></video>}
    {media.caption && <figcaption><T>{media.caption}</T></figcaption>}
  </figure>;
}
export function MediaGallery({ items, layout = 'grid', label = 'Project visuals' }: { items: Media[]; layout?: 'grid' | 'strip'; label?: string }) {
  const { t } = useLocale();
  return <div className={layout === 'strip' ? 'media-strip' : 'gallery'} aria-label={t(label)}>{items.map((m, i) => <MediaView key={`${m.src || 'placeholder'}-${i}`} media={m} />)}</div>;
}
