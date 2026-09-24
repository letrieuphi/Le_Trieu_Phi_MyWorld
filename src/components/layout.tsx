import { T } from '@/components/locale';
import { LocaleLink as Link } from '@/components/locale';
import { profile } from '@/content/profile';
export function ContactCTA() {
  return <section className="contact-cta" data-reveal><span className="eyebrow"><T>{"HAVE A STORY IN MIND?"}</T></span><Link href="/contact"><T>{"Let’s make"}</T><br /><em><T>{"something move."}</T></em><span>↗</span></Link><p><T>{"Collaborations, creative projects, or just a hello."}</T></p></section>;
}
export function Footer() {
  return <footer className="footer"><Link className="wordmark" href="/"><T>{"TP"}</T><span>✳</span></Link><span>© {new Date().getFullYear()}{' '}<T>{"TRIỆU PHI"}</T></span><span><T>{"LIGHT × MOTION × CURIOSITY"}</T></span><a href={profile.instagram} target="_blank" rel="noreferrer"><T>{"Instagram ↗"}</T></a><a href={`mailto:${profile.email}`}><T>{"Email ↗"}</T></a><a href="#top"><T>{"Back to top ↑"}</T></a></footer>;
}
export function PageHeading({ label, title, text }: { label: string; title: string; text?: string }) {
  return <div className="page-heading"><span className="eyebrow"><T>{label}</T></span><h1><T>{title}</T><span className="orange">.</span></h1>{text && <p><T>{text}</T></p>}</div>;
}
