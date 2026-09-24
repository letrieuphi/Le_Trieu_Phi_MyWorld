import type { Metadata } from 'next';
import { LocaleLink as Link, T } from '@/components/locale';
import { ContactCTA } from '@/components/layout';
import { Portrait } from '@/components/portrait';
import { profile, tools } from '@/content/profile';
import { pageSeo } from '@/content/locales/seo';
export const metadata: Metadata = { title: { absolute: pageSeo('/about').title }, description: pageSeo('/about').description, openGraph: { ...pageSeo('/about'), locale: 'vi_VN' }, twitter: { ...pageSeo('/about') } };
export default function About() {
  return <><article className="section personal-about">
    <header className="about-intro"><span className="eyebrow"><T>ABOUT ME</T></span><div className="about-identity"><Portrait size="about" /><div><span className="eyebrow">{profile.name.toUpperCase()} / {profile.nickname.toUpperCase()}</span><h1>{profile.name}<span className="orange">.</span></h1><p className="personal-title">{profile.title}</p><p className="about-short"><T>{profile.shortIntro}</T></p></div></div></header>
    <section className="about-me editorial-section" data-reveal><span className="eyebrow"><T>THE PERSON BEHIND THE FRAME</T></span><div>{profile.aboutParagraphs.map(p => <p key={p}><T>{p}</T></p>)}</div></section>
    <section className="manifesto editorial-section"><span className="eyebrow"><T>MY MANIFESTO</T></span><div>{profile.manifesto.map(p => <p key={p} data-reveal><T>{p}</T></p>)}</div></section>
    <section className="personal-values">{profile.values.map((v, i) => <div key={v.title} data-reveal><span className="eyebrow">0{i + 1} / <T>{v.title}</T></span><p><T>{v.text}</T></p></div>)}</section>
    <section className="about-tools"><div className="section-heading"><h2><T>Tools for</T><br /><em><T>the idea.</T></em></h2></div><div className="tool-grid">{Object.entries(tools).map(([group, items]) => <div key={group}><h3><T>{group}</T></h3><p><T>{items.join(' / ')}</T></p></div>)}</div></section>
    <section className="about-cv"><span className="eyebrow"><T>Experience</T></span><Link href="/cv" className="text-link"><T>Experience & CV ↗</T></Link></section>
  </article><ContactCTA /></>;
}
