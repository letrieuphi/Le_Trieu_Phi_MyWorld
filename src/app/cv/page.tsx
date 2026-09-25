import { T, LocaleSection } from '@/components/locale';
import { pageSeo } from '@/content/locales/seo';
import type { Metadata } from 'next';
import { PageHeading } from '@/components/layout';
import { Portrait } from '@/components/portrait';
import { profile, skills } from '@/content/profile';
import { cvTools, awards } from '@/content/cv';
import { experience } from '@/content/experience';
import { asset } from '@/lib/site';
export const metadata: Metadata = { title: { absolute: pageSeo('/cv').title }, description: pageSeo('/cv').description, openGraph: { ...pageSeo('/cv'), locale: 'vi_VN' }, twitter: { ...pageSeo('/cv') } };
export default function CV() { return <section className="section cv-page">
  <div className="cv-identity"><Portrait src={profile.cvImage} /><PageHeading label="EXPERIENCE / EDUCATION / PRACTICE" title="Lê Triệu Phi" text={profile.title} /></div>
  <div className="cv-downloads">{(['vi', 'en'] as const).map(lang => profile.cv[lang] ? <a key={lang} className="pill-link" href={asset(profile.cv[lang])} download><T>{lang === 'vi' ? 'Download CV — Vietnamese' : 'Download CV — English'}</T> ↓</a> : <button key={lang} className="pill-link" disabled><T>{lang === 'vi' ? 'Download CV — Vietnamese' : 'Download CV — English'}</T> <span><T>Coming soon</T></span></button>)}</div>
  <div className="cv-columns">
    <aside className="cv-details">
      <section><h2><T>Education</T></h2><p><T>Van Lang University</T><br /><T>Digital Art &amp; Design</T></p><p><T>Third-year student · K30</T></p></section>
      <section><h2><T>Languages</T></h2><p><T>Vietnamese — Native</T><br /><T>English — VSTEP B2</T></p></section>
      <section><h2><T>Skills</T></h2><p><T>{skills.join(' · ')}</T></p></section>
      <section><h2><T>Tools</T></h2><div className="cv-tool-groups">{cvTools.map(group => <div key={group.group}><h3><T>{group.group}</T></h3><div className="cv-tool-icons">{group.items.map(([name,icon]) => <span key={name} title={name} tabIndex={0}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(`/icons/${icon}.svg`)} alt={name} width={28} height={28} loading="lazy" /><span className="tool-tooltip" aria-hidden="true">{name}</span>
      </span>)}</div></div>)}</div></section>
      <section><h2><T>Awards</T></h2><ul className="cv-awards">{awards.map(award => <li key={award}><T>{award}</T></li>)}</ul></section>
      <section><h2><T>Contact</T></h2><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.phoneHref}>{profile.phone}</a></section>
    </aside>
    <div className="cv-career"><h2 className="cv-section-title"><T>Experience</T></h2><LocaleSection className="cv-experience-list" aria-label="Experience">{experience.map(e => <section className="cv-experience" key={e.company}><span className="eyebrow"><T>{e.dates}</T></span><h3><T>{e.role}</T></h3><h4><T>{e.company}</T></h4><p><T>{e.detail}</T></p></section>)}</LocaleSection></div>

  </div>
</section>; }
