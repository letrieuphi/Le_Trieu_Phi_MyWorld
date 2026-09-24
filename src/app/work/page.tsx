import type { Metadata } from 'next';
import { PageHeading, ContactCTA } from '@/components/layout';
import { CategoryList, ProjectCard } from '@/components/work';
import { projects } from '@/content/projects';
export const metadata: Metadata = { title: 'My Work', description: 'Selected film, photography, motion, design and creative technology projects by Triệu Phi.' };
export default function Work() { return <><section className="section"><PageHeading label="THE WORK / AN ONGOING EXPLORATION" title="My Work" text="Across images, moving frames and unexpected experiments. Follow a discipline, or explore the selected projects below." /><CategoryList previews /><div className="section-heading spaced"><h2>Selected <em>projects.</em></h2><span className="eyebrow">{projects.length} STORIES</span></div><div className="project-grid">{projects.map((p, i) => <ProjectCard project={p} index={i} key={p.slug} />)}</div></section><ContactCTA /></>; }
