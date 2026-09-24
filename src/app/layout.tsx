import { T, LocaleProvider } from '@/components/locale';
import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { Intro, MotionSystem } from '@/components/interaction';
import { Footer } from '@/components/layout';
import { profile } from '@/content/profile';
import { siteUrl, asset } from '@/lib/site';
import './globals.css';
import './personal.css';
import { pageSeo } from '@/content/locales/seo';
const title = 'Triệu Phi — D.O.P, Motion Designer & Photographer';
const description = pageSeo('/').description;
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: title, template: '%s — Triệu Phi' }, description, openGraph: { locale: 'vi_VN', title, description, type: 'website', url: siteUrl, images: [{ url: `${siteUrl}/og.svg`, width: 1200, height: 630 }] }, icons: { icon: asset('/icon.svg') }, twitter: { card: 'summary_large_image', title, description } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body id="top"><LocaleProvider><Intro /><MotionSystem /><div id="site-content"><a className="skip-link" href="#main"><T>{"Skip to content"}</T></a><Navigation /><main id="main" tabIndex={-1}>{children}</main><Footer /></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.fullName, alternateName: ['Triệu Phi', 'Hachi'], url: siteUrl, jobTitle: profile.title, sameAs: [profile.instagram] }).replace(/</g, '\\u003c') }} /></LocaleProvider></body></html>;
}
