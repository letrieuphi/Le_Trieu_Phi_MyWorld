import Link from 'next/link';
import { LightSculpture } from '@/components/interaction';
import { ProjectCard, CategoryList, Artwork } from '@/components/work';
import { ContactCTA } from '@/components/layout';
import { projects } from '@/content/projects';
import { experience } from '@/content/experience';
export default function Home() {
  return <>
    <section className="hero"><div className="hero-top"><span className="eyebrow"><i className="status-dot" /> AN INDEPENDENT CREATIVE PRACTICE</span><span className="eyebrow">BASED IN HO CHI MINH CITY</span></div>
      <h1>TRIỆU PHI<span className="hero-asterisk">✳</span></h1><div className="hero-sub"><p>D.O.P · MOTION DESIGNER · PHOTOGRAPHER</p><span>PORTFOLIO / VOL. 01</span></div>
      <div className="hero-body"><div className="hero-statement"><span className="eyebrow">A WAY OF SEEING</span><h2>Chasing light.<br />Shaping motion.<br /><em>Staying curious.</em></h2><p>Exploring stories through<br />light, motion and imagery.</p><Link className="circle-link" href="#selected" aria-label="Scroll to selected work">↓</Link></div><LightSculpture /></div>
      <div className="hero-baseline"><span>LIGHT × MOTION × CURIOSITY</span><Link href="#selected">SCROLL TO EXPLORE ↓</Link></div>
    </section>
    <section id="selected" className="section"><div className="section-heading" data-reveal><div><span className="eyebrow">01 / SELECTED PROJECTS</span><h2>A few things<br /><em>I’ve put myself into.</em></h2></div><Link className="text-link" href="/work">Explore all work ↗</Link></div><div className="project-grid">{projects.filter(p => p.featured).map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}</div><p className="asset-note">Project visuals are being curated. Abstract covers are placeholders, not final project imagery.</p></section>
    <section className="section disciplines"><div className="section-heading" data-reveal><div><span className="eyebrow">02 / DIFFERENT MEDIUMS. SAME CURIOSITY.</span><h2>One practice.<br /><em>Many perspectives.</em></h2></div></div><CategoryList /></section>
    <section className="about-preview section" data-reveal><span className="eyebrow">03 / THE PERSON BEHIND THE FRAME</span><div><h2>An eye for light.<br />An appetite for<br /><em>the unfamiliar.</em></h2><p>I’m Triệu Phi — a D.O.P, Motion Designer and Photographer based in Ho Chi Minh City. I’m drawn to projects that give me something new to learn, and another way to tell a story.</p><Link href="/about" className="text-link">A little more about me ↗</Link></div><span className="large-star" aria-hidden="true">✳</span></section>
    <section className="section experience-preview"><div className="section-heading"><div><span className="eyebrow">04 / ALONG THE WAY</span><h2>Creative work.<br /><em>Shared experiences.</em></h2></div><Link href="/cv" className="text-link">View CV ↗</Link></div>{experience.slice(0, 2).map(e => <div className="experience-row" key={e.company} data-reveal><h3>{e.company}</h3><span>{e.role}</span><span>{e.dates}</span></div>)}</section>
    <section className="visual-strip" aria-label="Photography collection preview"><Link href="/work/photography"><Artwork kind="photo" /><div><span className="eyebrow">THROUGH THE VIEWFINDER</span><h2>Look a little<br /><em>closer.</em></h2><span className="text-link">Photography collection ↗</span></div></Link></section>
    <ContactCTA />
  </>;
}
