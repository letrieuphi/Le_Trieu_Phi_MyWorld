import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeading, ContactCTA } from '@/components/layout';
import { LightSculpture } from '@/components/interaction';
import { profile, tools } from '@/content/profile';
export const metadata: Metadata = { title: 'About', description: profile.about[0] };
export default function About() { return <><section className="section"><PageHeading label="THE PERSON BEHIND THE FRAME" title="Always curious" /><div className="about-layout"><LightSculpture /><div className="about-copy"><span className="eyebrow">TRIỆU PHI / HACHI</span>{profile.about.map(p => <p key={p}>{p}</p>)}<Link className="text-link" href="/cv">Experience & CV ↗</Link></div></div><div className="values">Passionate. Hardworking.<br /><em>Self-learning. Experimental.</em></div><div className="section-heading"><h2>Tools for<br /><em>the idea.</em></h2></div><div className="tool-grid">{Object.entries(tools).map(([group, items]) => <div key={group}><h3>{group}</h3><p>{items.join(' / ')}</p></div>)}</div></section><ContactCTA /></>; }
