import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, projects } from '@/content/projects';
import { Artwork, ProjectCard } from '@/components/work';
import { MediaView, MediaGallery } from '@/components/media';
import { PageHeading, ContactCTA } from '@/components/layout';
import { siteUrl } from '@/lib/site';
export const dynamicParams = false;
export function generateStaticParams() { return [...categories, ...projects].map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const c = categories.find(c => c.slug === slug); const p = projects.find(p => p.slug === slug); const title = c?.name || p?.title || 'Work'; const description = c?.text || p?.summary; return { title, description, alternates: { canonical: `${siteUrl}/work/${slug}/` }, openGraph: { title, description } }; }
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const category = categories.find(c => c.slug === slug);
  if (category) { const items = projects.filter(p => p.disciplines.includes(slug)); return <><section className="section"><Link href="/work" className="text-link">← All disciplines</Link><PageHeading label="MY WORK / DISCIPLINE" title={category.name} text={category.text} />{slug === 'photography' && <p className="camera-note">CURRENT KIT / Sony A7C II · Tamron 28–75mm F/2.8 G2</p>}{items.length ? <div className="project-grid">{items.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}</div> : <div className="empty-category"><Artwork kind={category.art} /><div><h2>A space for<br /><em>what comes next.</em></h2><p>Selected {category.name.toLowerCase()} work is being curated. New projects will appear here.</p><Link href="/work" className="text-link">Explore selected work ↗</Link></div></div>}</section><ContactCTA /></>; }
  const p = projects.find(p => p.slug === slug); if (!p) notFound();
  const next = projects.find(item => item.slug === p.nextProject) || projects[(projects.indexOf(p) + 1) % projects.length];
  const meta = [['Category', p.category], ['Year', p.year], ['Role', p.roles?.join(' / ')], ['Team', p.team], ['Client', p.client], ['Duration', p.duration], ['Camera', p.camera], ['Lens', p.lens], ['Lighting', p.lighting]].filter(([, value]) => value);
  return <><article className="section project-detail"><Link className="text-link" href="/work">← All work</Link><PageHeading label="SELECTED PROJECT" title={p.title} text={p.summary} /><div className="project-hero">{p.heroMedia ? <MediaView media={p.heroMedia} priority /> : p.cover ? <MediaView media={p.cover} priority /> : <Artwork kind={p.art} title={p.title} />}</div><dl className="project-facts">{meta.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
    {p.description && <section className="story-block"><h2>Overview</h2><p>{p.description}</p></section>}{p.synopsis && <section className="story-block"><h2>Synopsis</h2><p>{p.synopsis}</p></section>}
    {!!p.gallery?.length && <MediaGallery items={p.gallery} label="Selected visuals" />}
    {!!p.process?.length && <section className="story-block"><h2>Behind the process</h2><div>{p.process.map(s => <div key={s.title}><h3>{s.title}</h3><p>{s.text}</p>{!!s.media?.length && <MediaGallery items={s.media} label={s.title} />}</div>)}</div></section>}
    {!!p.bts?.length && <MediaGallery items={p.bts} label="Behind the scenes" />}
    {p.mediaSections?.map((s, i) => <section className="media-section" key={i}>{s.title && <h2>{s.title}</h2>}<MediaGallery items={s.items} layout={s.layout} label={s.title} /></section>)}
    {[["The challenge", p.challenge], ["The approach", p.approach], ["The outcome", p.outcome]].map(([title, text]) => text && <section className="story-block" key={title}><h2>{title}</h2><p>{text}</p></section>)}
    {!!p.videos?.length && <MediaGallery items={p.videos} label="Project films" />}
    {!!p.tools?.length && <section className="story-block"><h2>Tools & medium</h2><p>{p.tools.join(' · ')}</p></section>}
    {!!p.credits?.length && <section className="story-block"><h2>Credits</h2><ul>{p.credits.map(c => <li key={c}>{c}</li>)}</ul></section>}
    {p.externalLinks?.map(l => <a className="pill-link" key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
    {!p.heroMedia && !p.cover && <p className="asset-note">Visual placeholder. Project imagery and additional production details will be added when available.</p>}
    <Link className="next-project" href={`/work/${next.slug}`}><span className="eyebrow">NEXT PROJECT</span><span>{next.title} ↗</span></Link></article><ContactCTA /></>;
}
