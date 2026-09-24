import { categories, projects } from '../projects';
import { profile } from '../profile';
import { translate, type Locale } from './index';
const homeTitle = 'Triệu Phi — D.O.P, Motion Designer & Photographer';
const homeDescription = 'Portfolio of Triệu Phi, a D.O.P, Motion Designer and Photographer focused on cinematography, lighting, photography, motion and visual storytelling.';
export function pageSeo(path: string, locale: Locale = 'vi') {
  const route = path.replace(/^\/Le_Trieu_Phi_MyWorld(?=\/|$)/, '').replace(/\/$/, '') || '/';
  let title = ''; let description = homeDescription;
  if (route === '/work') { title = 'My Work'; description = 'Selected film, photography, motion, design and creative technology projects by Triệu Phi.'; }
  else if (route === '/about') { title = 'About'; description = profile.about[0]; }
  else if (route === '/cv') { title = 'CV'; description = 'Experience, education and creative practice of Lê Triệu Phi.'; }
  else if (route === '/contact') { title = 'Contact'; description = 'Get in touch with Triệu Phi for creative collaborations, photography, film and motion projects.'; }
  else if (route.startsWith('/work/')) { const slug = route.split('/')[2]; const c = categories.find(c => c.slug === slug); const p = projects.find(p => p.slug === slug); title = c?.name || p?.title || 'A different direction'; description = c?.text || p?.summary || homeDescription; }
  else if (route !== '/') title = 'A different direction';
  return { title: title ? `${translate(locale, title)} — Triệu Phi` : homeTitle, description: translate(locale, description) };
}
