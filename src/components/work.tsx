import { T } from '@/components/locale';
import { LocaleLink as Link } from '@/components/locale';
import type { Project } from '@/content/projects';
import { categories } from '@/content/projects';
import { MediaView } from './media';
export function Artwork({ kind, title, small = false }: { kind: string; title?: string; small?: boolean }) {
  return <div className={`artwork art-${kind}${small ? ' small-art' : ''}`} aria-hidden="true"><div className="art-inner"><i /><i /><i /><b>{kind === 'light' ? 'LẠC' : kind === 'red' ? 'CỔ\nSẮC' : kind === 'frames' ? 'DA&A' : kind === 'motion' ? 'Aa' : kind === 'type' ? 'FORM.' : kind === 'photo' ? '◯' : '✳'}</b></div><span className="art-caption">{title && <><T>{title}</T> / </>}<T>{"VISUAL PLACEHOLDER"}</T></span></div>;
}
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link href={`/work/${project.slug}`} className={`project-card card-${project.art}`} data-reveal aria-label={`View ${project.title}`}>
    <div className="card-image">{project.cover ? <MediaView media={project.cover} preview /> : <Artwork kind={project.art} />}<span className="card-arrow">↗</span></div>
    <div className="card-meta"><span>{String(index + 1).padStart(2, '0')} / <T>{project.category}</T></span><span><T>{project.year || 'SELECTED WORK'}</T></span></div>
    <h3><T>{project.title}</T></h3><p><T>{project.summary}</T></p>{!!project.roles?.length && <span className="role"><T>{project.roles.join(' / ')}</T></span>}
  </Link>;
}
export function CategoryList({ previews = false }: { previews?: boolean }) {
  return <div className="category-list">{categories.map((c, i) => {
    const content = <><span className="eyebrow">0{i + 1}</span>{previews && <Artwork kind={c.art} small />}<div><h3><T>{c.name}</T></h3><p><T>{c.text}</T></p></div><span className="category-arrow">↗</span></>;
    return 'externalUrl' in c
      ? <a href={c.externalUrl} key={c.slug} className="category-row" data-reveal target="_blank" rel="noopener noreferrer">{content}</a>
      : <Link href={`/work/${c.slug}`} key={c.slug} className="category-row" data-reveal>{content}</Link>;
  })}</div>;
}
