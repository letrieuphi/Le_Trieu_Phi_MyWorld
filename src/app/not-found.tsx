import Link from 'next/link';
import { PageHeading } from '@/components/layout';
export default function NotFound() { return <section className="section"><PageHeading label="404 / OUT OF FRAME" title="A different direction" text="This page could not be found. Let’s get you back to the work." /><Link href="/work" className="pill-link">Explore the work ↗</Link></section>; }
