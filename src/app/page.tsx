import { T, LocaleSection } from '@/components/locale';
import { LocaleLink as Link } from '@/components/locale';
import { Portrait } from '@/components/portrait';
import { profile } from '@/content/profile';
import { LightSculpture } from '@/components/interaction';
import { ProjectCard, CategoryList, Artwork } from '@/components/work';
import { ContactCTA } from '@/components/layout';
import { projects } from '@/content/projects';
import { experience } from '@/content/experience';
export default function Home() {
  return <>
    <section className="hero personal-hero">
      <div className="journal-top"><span className="eyebrow">01 / <T>LIGHT / MOTION / IMAGE</T></span><span className="eyebrow">PORTFOLIO / VOL. 01</span></div>
      <div className="journal-composition"><div className="journal-copy"><span className="eyebrow journal-enter"><T>{"HELLO, I'M"}</T></span><h1 className="journal-enter">{profile.name.toUpperCase()}</h1><p className="personal-title journal-enter">{profile.title.toUpperCase()}</p><p className="journal-intro journal-enter"><T>{profile.shortIntro}</T></p></div><Portrait /><div className="journal-actions journal-enter"><Link className="text-link" href="/work"><T>Explore the work ↗</T></Link><Link className="text-link" href="/about"><T>About me ↗</T></Link></div></div>
      <div className="hero-baseline"><span><T>LIGHT × MOTION × CURIOSITY</T></span><Link href="#selected"><T>SCROLL TO EXPLORE ↓</T></Link></div>
    </section>
    <section className="light-experiment"><div><span className="eyebrow">02 / <T>A small experiment in light</T></span></div><LightSculpture /></section>
    <section id="selected" className="section"><div className="section-heading" data-reveal><div><span className="eyebrow"><T>{"01 / SELECTED PROJECTS"}</T></span><h2><T>{"A few things"}</T><br /><em><T>{"I’ve put myself into."}</T></em></h2></div><Link className="text-link" href="/work"><T>{"Explore all work ↗"}</T></Link></div><div className="project-grid">{projects.filter(p => p.featured).map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}</div><p className="asset-note"><T>{"Project visuals are being curated. Abstract covers are placeholders, not final project imagery."}</T></p></section>
    <section className="section disciplines"><div className="section-heading" data-reveal><div><span className="eyebrow"><T>{"02 / DIFFERENT MEDIUMS. SAME CURIOSITY."}</T></span><h2><T>{"One practice."}</T><br /><em><T>{"Many perspectives."}</T></em></h2></div></div><CategoryList /></section>
    <section className="about-preview section" data-reveal><span className="eyebrow"><T>{"03 / THE PERSON BEHIND THE FRAME"}</T></span><div><h2><T>{"An eye for light."}</T><br /><T>{"An appetite for"}</T><br /><em><T>{"the unfamiliar."}</T></em></h2><p><T>{"I’m Triệu Phi — a D.O.P, Motion Designer and Photographer based in Ho Chi Minh City. I’m drawn to projects that give me something new to learn, and another way to tell a story."}</T></p><Link href="/about" className="text-link"><T>{"A little more about me ↗"}</T></Link></div><span className="large-star" aria-hidden="true">✳</span></section>
    <section className="section experience-preview"><div className="section-heading"><div><span className="eyebrow"><T>{"04 / ALONG THE WAY"}</T></span><h2><T>{"Creative work."}</T><br /><em><T>{"Shared experiences."}</T></em></h2></div><Link href="/cv" className="text-link"><T>{"View CV ↗"}</T></Link></div>{experience.slice(0, 2).map(e => <div className="experience-row" key={e.company} data-reveal><h3><T>{e.company}</T></h3><span><T>{e.role}</T></span><span><T>{e.dates}</T></span></div>)}</section>
    <LocaleSection className="visual-strip" aria-label="Photography collection preview"><Link href="/work/photography"><Artwork kind="photo" /><div><span className="eyebrow"><T>{"THROUGH THE VIEWFINDER"}</T></span><h2><T>{"Look a little"}</T><br /><em><T>{"closer."}</T></em></h2><span className="text-link"><T>{"Photography collection ↗"}</T></span></div></Link></LocaleSection>
    <ContactCTA />
  </>;
}
