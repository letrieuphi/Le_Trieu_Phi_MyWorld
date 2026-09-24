'use client';
import { T, LanguageSwitch, useLocale } from '@/components/locale';
import { LocaleLink as Link } from '@/components/locale';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { categories } from '@/content/projects';
export function Navigation() {
  const { t } = useLocale();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [work, setWork] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const workButton = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); setWork(false); };
  return <header className="header"><Link href="/" className="wordmark" onClick={close} aria-label={t("Triệu Phi home")}><T>{"TP"}</T><span>✳</span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => { setOpen(!open); setWork(false); }}><T>{open ? 'Close −' : 'Menu +'}</T></button>
    <nav id="main-nav" aria-label={t("Main navigation")} className={open ? 'nav is-open' : 'nav'} onKeyDown={e => { if (e.key === 'Escape') { if (work) { setWork(false); workButton.current?.focus(); } else { setOpen(false); menuButton.current?.focus(); } } }}>
      <Link href="/" aria-current={path === '/' ? 'page' : undefined} onClick={close}><T>{"Home"}</T></Link>
      <div className="work-nav" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setWork(false); }}>
        <Link href="/work" aria-current={path.startsWith('/work') ? 'page' : undefined} onClick={close}><T>{"nav.work"}</T></Link>
        <button ref={workButton} aria-label={t("Work categories")} aria-expanded={work} aria-controls="work-menu" onClick={() => setWork(!work)}>{work ? '−' : '+'}</button>
        <div className="work-menu" id="work-menu" hidden={!work}>{categories.map(c => <Link key={c.slug} href={`/work/${c.slug}`} onClick={close}><T>{c.name}</T><span>↗</span></Link>)}</div>
      </div>
      {['About', 'CV', 'Contact'].map(n => <Link key={n} href={`/${n.toLowerCase()}`} aria-current={path === `/${n.toLowerCase()}` ? 'page' : undefined} onClick={close}><T>{n}</T></Link>)}
      <LanguageSwitch />
    </nav><span className="header-note"><T>{"HCMC, VIETNAM "}</T><i /></span>
  </header>;
}
