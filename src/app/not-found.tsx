import { T } from '@/components/locale';
import { LocaleLink as Link } from '@/components/locale';
import { PageHeading } from '@/components/layout';
export default function NotFound() { return <section className="section"><PageHeading label="404 / OUT OF FRAME" title="A different direction" text="This page could not be found. Let’s get you back to the work." /><Link href="/work" className="pill-link"><T>{"Explore the work ↗"}</T></Link></section>; }
