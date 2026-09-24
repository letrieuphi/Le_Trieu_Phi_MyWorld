'use client';
import { T, useLocale } from '@/components/locale';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function Intro() {
  const { t } = useLocale();
  const [show, setShow] = useState(false);
  const skip = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('tp-intro') === 'seen'; } catch { /* restricted storage still allows the page */ }
    if (seen) return;
    const start = window.setTimeout(() => setShow(true), 0);
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 450 : 2800;
    const finish = window.setTimeout(() => { setShow(false); try { sessionStorage.setItem('tp-intro', 'seen'); } catch {} }, duration);
    return () => { clearTimeout(start); clearTimeout(finish); };
  }, []);
  useEffect(() => {
    if (!show) return;
    const main = document.querySelector<HTMLElement>('#site-content');
    if (main) main.inert = true;
    skip.current?.focus();
    return () => { if (main) main.inert = false; document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true }); };
  }, [show]);
  if (!show) return null;
  return <div className="intro" role="dialog" aria-modal="true" aria-label={t("Triệu Phi introduction")} onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); skip.current?.focus(); } }}>
    <span className="eyebrow"><T>{"LIGHT × MOTION × CURIOSITY"}</T></span><div className="intro-name"><T>{"TRIỆU PHI"}</T><span>✳</span></div>
    <p><T>{"D.O.P · MOTION DESIGNER · PHOTOGRAPHER"}</T></p>
    <button ref={skip} onClick={() => { setShow(false); try { sessionStorage.setItem('tp-intro', 'seen'); } catch {} }}><T>{"Skip intro ↗"}</T></button>
  </div>;
}
export function MotionSystem() {
  const path = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }), { threshold: 0.06 });
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
    return () => { observer.disconnect(); document.querySelectorAll('.will-reveal').forEach(el => el.classList.remove('will-reveal')); };
  }, [path]);
  useEffect(() => {
    const fine = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const move = (e: PointerEvent) => { if (fine.matches && cursor.current) { cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`; cursor.current.style.opacity = '1'; } };
    const hide = () => { if (cursor.current) cursor.current.style.opacity = '0'; };
    window.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', hide);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); };
  }, []);
  return <div ref={cursor} className="cursor" aria-hidden="true" />;
}
export function LightSculpture() {
  const ref = useRef<HTMLDivElement>(null);
  return <div className="light-stage" onPointerMove={e => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches || !ref.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${(e.clientY - r.top - r.height / 2) / r.height * -15}deg`);
    ref.current.style.setProperty('--ry', `${(e.clientX - r.left - r.width / 2) / r.width * 20}deg`);
  }} onPointerLeave={() => { ref.current?.style.setProperty('--rx', '0deg'); ref.current?.style.setProperty('--ry', '0deg'); }}>
    <div className="frame-corner top" /><div className="frame-corner bottom" />
    <span className="stage-label"><T>{"EXPLORATION 001 — THE SHAPE OF LIGHT"}</T></span>
    <div className="sculpture" ref={ref} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}</div>
    <div className="stage-bottom"><span><T>{"LIGHT STUDY / INTERACTIVE"}</T></span><span><T>{"↔ MOVE TO EXPLORE"}</T></span></div>
  </div>;
}
export function CopyEmail({ email }: { email: string }) {
  const [message, setMessage] = useState('Copy email ↗');
  return <><button className="text-link" onClick={async () => { try { await navigator.clipboard.writeText(email); setMessage('Email copied ✓'); } catch { setMessage('Select the email above to copy'); } }}><T>{message}</T></button><span className="sr-only" role="status"><T>{message === 'Copy email ↗' ? '' : message}</T></span></>;
}
