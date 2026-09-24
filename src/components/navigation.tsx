'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { categories } from '@/content/projects';
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [work, setWork] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const workButton = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); setWork(false); };
  return <header className="header"><Link href="/" className="wordmark" onClick={close} aria-label="Triệu Phi home">TP<span>✳</span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => { setOpen(!open); setWork(false); }}>{open ? 'Close −' : 'Menu +'}</button>
    <nav id="main-nav" aria-label="Main navigation" className={open ? 'nav is-open' : 'nav'} onKeyDown={e => { if (e.key === 'Escape') { if (work) { setWork(false); workButton.current?.focus(); } else { setOpen(false); menuButton.current?.focus(); } } }}>
      <Link href="/" aria-current={path === '/' ? 'page' : undefined} onClick={close}>Home</Link>
      <div className="work-nav" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setWork(false); }}>
        <Link href="/work" aria-current={path.startsWith('/work') ? 'page' : undefined} onClick={close}>My Work</Link>
        <button ref={workButton} aria-label="Work categories" aria-expanded={work} aria-controls="work-menu" onClick={() => setWork(!work)}>{work ? '−' : '+'}</button>
        <div className="work-menu" id="work-menu" hidden={!work}>{categories.map(c => <Link key={c.slug} href={`/work/${c.slug}`} onClick={close}>{c.name}<span>↗</span></Link>)}</div>
      </div>
      {['About', 'CV', 'Contact'].map(n => <Link key={n} href={`/${n.toLowerCase()}`} aria-current={path === `/${n.toLowerCase()}` ? 'page' : undefined} onClick={close}>{n}</Link>)}
    </nav><span className="header-note">HCMC, VIETNAM <i /></span>
  </header>;
}
