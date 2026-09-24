import Link from 'next/link';
import type { Project } from '@/content/projects';
import { categories } from '@/content/projects';
import { MediaView } from './media';
export function Artwork({ kind, title, small = false }: { kind: string; title?: string; small?: boolean }) {
  return <div className={`artwork art-${kind}${small ? ' small-art' : ''}`} aria-hidden="true"><div className="art-inner"><i /><i /><i /><b>{kind === 'light' ? 'LẠC' : kind === 'red' ? 'CỔ\nSẮC' : kind === 'frames' ? 'DA&A' : kind === 'motion' ? 'Aa' : kind === 'type' ? 'FORM.' : kind === 'photo' ? '◯' : '✳'}</b></div><span className="art-caption">{title ? `${title} / ` : ''}VISUAL PLACEHOLDER</span></div>;
}
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link href={`/work/${project.slug}`} className={`project-card card-${project.art}`} data-reveal aria-label={`View ${project.title}`}>
    <div className="card-image">{project.cover ? <MediaView media={project.cover} preview /> : <Artwork kind={project.art} />}<span className="card-arrow">↗</span></div>
    <div className="card-meta"><span>{String(index + 1).padStart(2, '0')} / {project.category}</span><span>{project.year || 'SELECTED WORK'}</span></div>
    <h3>{project.title}</h3><p>{project.summary}</p>{!!project.roles?.length && <span className="role">{project.roles.join(' / ')}</span>}
  </Link>;
}
export function CategoryList({ previews = false }: { previews?: boolean }) {
  return <div className="category-list">{categories.map((c, i) => <Link href={`/work/${c.slug}`} key={c.slug} className="category-row" data-reveal><span className="eyebrow">0{i + 1}</span>{previews && <Artwork kind={c.art} small />}<div><h3>{c.name}</h3><p>{c.text}</p></div><span className="category-arrow">↗</span></Link>)}</div>;
}
