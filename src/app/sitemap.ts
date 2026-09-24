import type { MetadataRoute } from 'next';
import { categories, projects } from '@/content/projects';
import { siteUrl } from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/work', '/about', '/cv', '/contact', ...categories.map(c => `/work/${c.slug}`), ...projects.map(p => `/work/${p.slug}`)].map(path => ({ url: `${siteUrl}${path}/` })); }
