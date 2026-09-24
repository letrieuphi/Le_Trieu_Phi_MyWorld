import Link from 'next/link';
import { profile } from '@/content/profile';
export function ContactCTA() {
  return <section className="contact-cta" data-reveal><span className="eyebrow">HAVE A STORY IN MIND?</span><Link href="/contact">Let’s make<br /><em>something move.</em><span>↗</span></Link><p>Collaborations, creative projects, or just a hello.</p></section>;
}
export function Footer() {
  return <footer className="footer"><Link className="wordmark" href="/">TP<span>✳</span></Link><span>© {new Date().getFullYear()} TRIỆU PHI</span><span>LIGHT × MOTION × CURIOSITY</span><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={`mailto:${profile.email}`}>Email ↗</a><a href="#top">Back to top ↑</a></footer>;
}
export function PageHeading({ label, title, text }: { label: string; title: string; text?: string }) {
  return <div className="page-heading"><span className="eyebrow">{label}</span><h1>{title}<span className="orange">.</span></h1>{text && <p>{text}</p>}</div>;
}
