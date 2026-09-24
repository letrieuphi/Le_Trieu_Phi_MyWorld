'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, isLocale, translate, type Locale } from '@/content/locales';
import { pageSeo } from '@/content/locales/seo';
type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue>({ locale: DEFAULT_LOCALE, setLocale: () => {} });
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, update] = useState<Locale>(DEFAULT_LOCALE);
  const path = usePathname();
  useEffect(() => {
    let value: string | null = null;
    try { value = localStorage.getItem(LOCALE_STORAGE_KEY); } catch { /* Storage is optional. */ }
    const timer = window.setTimeout(() => { if (isLocale(value)) update(value); }, 0);
    const sync = (e: StorageEvent) => { if (e.key === LOCALE_STORAGE_KEY) update(isLocale(e.newValue) ? e.newValue : DEFAULT_LOCALE); };
    window.addEventListener('storage', sync);
    return () => { clearTimeout(timer); window.removeEventListener('storage', sync); };
  }, []);
  const setLocale = useCallback((next: Locale) => { update(next); try { localStorage.setItem(LOCALE_STORAGE_KEY, next); } catch {} }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    const seo = pageSeo(path, locale);
    document.title = seo.title;
    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.appendChild(node); }
      node.content = content;
    };
    setMeta('name', 'description', seo.description);
    setMeta('property', 'og:title', seo.title); setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:locale', locale === 'vi' ? 'vi_VN' : 'en_US');
    setMeta('name', 'twitter:title', seo.title); setMeta('name', 'twitter:description', seo.description);
  }, [locale, path]);
  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() { const context = useContext(LocaleContext); return { ...context, t: (key: string | number | undefined, values?: Record<string, string | number>) => translate(context.locale, key, values) }; }
/** Text-only node: preserves the original DOM, layout and animation targets. */
export function T({ children, values }: { children?: string | number; values?: Record<string, string | number> }) { const { t } = useLocale(); return <>{t(children, values)}</>; }
export function LocaleLink(props: React.ComponentProps<typeof Link>) { const { t } = useLocale(); return <Link {...props} aria-label={props['aria-label'] ? t(props['aria-label']) : undefined} />; }
export function LocaleSection(props: React.ComponentProps<'section'>) { const { t } = useLocale(); return <section {...props} aria-label={props['aria-label'] ? t(props['aria-label']) : undefined} />; }
export function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale();
  return <div className="language-switch" role="group" aria-label={t('Language')}><button lang="vi" aria-label="Tiếng Việt" aria-pressed={locale === 'vi'} onClick={() => setLocale('vi')}>VI</button><span aria-hidden="true">/</span><button lang="en" aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button></div>;
}
