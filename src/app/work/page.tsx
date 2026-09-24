import { T } from '@/components/locale';
import { pageSeo } from '@/content/locales/seo';
import type { Metadata } from 'next';
import { PageHeading, ContactCTA } from '@/components/layout';
import { CategoryList, ProjectCard } from '@/components/work';
import { projects } from '@/content/projects';
export const metadata: Metadata = { title: { absolute: pageSeo('/work').title }, description: pageSeo('/work').description, openGraph: { ...pageSeo('/work'), locale: 'vi_VN' }, twitter: { ...pageSeo('/work') } };
export default function Work() { return <><section className="section"><PageHeading label="THE WORK / AN ONGOING EXPLORATION" title="My Work" text="Across images, moving frames and unexpected experiments. Follow a discipline, or explore the selected projects below." /><CategoryList previews /><div className="section-heading spaced"><h2><T>{"Selected "}</T><em><T>{"projects."}</T></em></h2><span className="eyebrow">{projects.length}{' '}<T>{"STORIES"}</T></span></div><div className="project-grid">{projects.map((p, i) => <ProjectCard project={p} index={i} key={p.slug} />)}</div></section><ContactCTA /></>; }
