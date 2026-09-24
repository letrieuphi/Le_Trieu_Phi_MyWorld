import { T } from '@/components/locale';
import type { Metadata } from 'next';
import { LocaleLink as Link } from '@/components/locale';
import { notFound } from 'next/navigation';
import { categories, projects } from '@/content/projects';
import { Artwork, ProjectCard } from '@/components/work';
import { MediaView, MediaGallery } from '@/components/media';
import { PageHeading, ContactCTA } from '@/components/layout';
import { pageSeo } from '@/content/locales/seo';
import { siteUrl } from '@/lib/site';
export const dynamicParams = false;
export function generateStaticParams() { return [...categories, ...projects].map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const { title, description } = pageSeo('/work/' + slug); return { title: { absolute: title }, description, alternates: { canonical: `${siteUrl}/work/${slug}/` }, openGraph: { title, description } }; }
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const category = categories.find(c => c.slug === slug);
  if (category) { const items = projects.filter(p => p.disciplines.includes(slug)); return <><section className="section"><Link href="/work" className="text-link"><T>{"← All disciplines"}</T></Link><PageHeading label="MY WORK / DISCIPLINE" title={category.name} text={category.text} />{slug === 'photography' && <p className="camera-note"><T>{"CURRENT KIT / Sony A7C II · Tamron 28–75mm F/2.8 G2"}</T></p>}{items.length ? <div className="project-grid">{items.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}</div> : <div className="empty-category"><Artwork kind={category.art} /><div><h2><T>{"A space for"}</T><br /><em><T>{"what comes next."}</T></em></h2><p><T values={{ category: category.name.toLowerCase() }}>category.pending</T></p><Link href="/work" className="text-link"><T>{"Explore selected work ↗"}</T></Link></div></div>}</section><ContactCTA /></>; }
  const p = projects.find(p => p.slug === slug); if (!p) notFound();
  const next = projects.find(item => item.slug === p.nextProject) || projects[(projects.indexOf(p) + 1) % projects.length];
  const meta = [['Category', p.category], ['Year', p.year], ['Role', p.roles?.join(' / ')], ['Team', p.team], ['Client', p.client], ['Duration', p.duration], ['Camera', p.camera], ['Lens', p.lens], ['Lighting', p.lighting]].filter(([, value]) => value);
  return <><article className="section project-detail"><Link className="text-link" href="/work"><T>{"← All work"}</T></Link><PageHeading label="SELECTED PROJECT" title={p.title} text={p.summary} /><div className="project-hero">{p.heroMedia ? <MediaView media={p.heroMedia} priority /> : p.cover ? <MediaView media={p.cover} priority /> : <Artwork kind={p.art} title={p.title} />}</div><dl className="project-facts">{meta.map(([key, value]) => <div key={key}><dt><T>{key}</T></dt><dd><T>{value}</T></dd></div>)}</dl>
    {p.description && <section className="story-block"><h2><T>{"Overview"}</T></h2><p><T>{p.description}</T></p></section>}{p.synopsis && <section className="story-block"><h2><T>{"Synopsis"}</T></h2><p><T>{p.synopsis}</T></p></section>}
    {!!p.gallery?.length && <MediaGallery items={p.gallery} label="Selected visuals" />}
    {!!p.process?.length && <section className="story-block"><h2><T>{"Behind the process"}</T></h2><div>{p.process.map(s => <div key={s.title}><h3><T>{s.title}</T></h3><p><T>{s.text}</T></p>{!!s.media?.length && <MediaGallery items={s.media} label={s.title} />}</div>)}</div></section>}
    {!!p.bts?.length && <MediaGallery items={p.bts} label="Behind the scenes" />}
    {p.mediaSections?.map((s, i) => <section className="media-section" key={i}>{s.title && <h2><T>{s.title}</T></h2>}<MediaGallery items={s.items} layout={s.layout} label={s.title} /></section>)}
    {[["The challenge", p.challenge], ["The approach", p.approach], ["The outcome", p.outcome]].map(([title, text]) => text && <section className="story-block" key={title}><h2><T>{title}</T></h2><p><T>{text}</T></p></section>)}
    {!!p.videos?.length && <MediaGallery items={p.videos} label="Project films" />}
    {!!p.tools?.length && <section className="story-block"><h2><T>{"Tools & medium"}</T></h2><p><T>{p.tools.join(' · ')}</T></p></section>}
    {!!p.credits?.length && <section className="story-block"><h2><T>{"Credits"}</T></h2><ul>{p.credits.map(c => <li key={c}><T>{c}</T></li>)}</ul></section>}
    {p.externalLinks?.map(l => <a className="pill-link" key={l.url} href={l.url} target="_blank" rel="noreferrer"><T>{l.label}</T> ↗</a>)}
    {!p.heroMedia && !p.cover && <p className="asset-note"><T>{"Visual placeholder. Project imagery and additional production details will be added when available."}</T></p>}
    <Link className="next-project" href={`/work/${next.slug}`}><span className="eyebrow"><T>{"NEXT PROJECT"}</T></span><span><T>{next.title}</T> ↗</span></Link></article><ContactCTA /></>;
}
