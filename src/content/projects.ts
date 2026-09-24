export const categories = [
  { slug: 'graphic-design', name: 'Graphic Design', text: 'Ideas made visible. Identity, composition and communication.', art: 'type' },
  { slug: 'video-editor', name: 'Video Editor', text: 'Finding rhythm between the frames.', art: 'motion' },
  { slug: 'film', name: 'Film', text: 'Stories shaped by light, movement and a point of view.', art: 'light' },
  { slug: 'motion-graphic', name: 'Motion Graphic', text: 'Typography, form and ideas in motion.', art: 'motion' },
  { slug: '3d', name: '3D', text: 'Experiments in depth, material and imagined spaces.', art: 'sculpture' },
  { slug: 'photography', name: 'Photography', text: 'A pause. A detail. Another way of seeing.', art: 'photo' },
];
export type Media = {
  src?: string; alt: string; caption?: string;
  type?: 'image' | 'video' | 'embed';
  width?: number; height?: number;
  layout?: 'grid' | 'full' | 'wide';
  fit?: 'cover' | 'contain';
  poster?: string; placeholder?: string;
  sources?: { src: string; width: number }[];
  captions?: { src: string; language: string; label: string }[];
};
export type Project = {
  slug: string; title: string; category: string; disciplines: string[]; roles?: string[];
  year?: number; featured?: boolean; art: string; cover?: Media; summary: string; description?: string;
  tools?: string[]; team?: string; client?: string; duration?: string; synopsis?: string;
  camera?: string; lens?: string; lighting?: string; heroMedia?: Media; gallery?: Media[];
  process?: { title: string; text: string; media?: Media[] }[]; bts?: Media[]; videos?: Media[];
  mediaSections?: { title?: string; layout?: 'grid' | 'strip'; items: Media[] }[];
  challenge?: string; approach?: string; outcome?: string; credits?: string[];
  externalLinks?: { label: string; url: string }[]; previousProject?: string; nextProject?: string;
};
export const projects: Project[] = [
  { slug: 'lac', title: 'LẠC', category: 'Stop Motion / Film', disciplines: ['film'], featured: true, art: 'light', summary: 'A careful study of light, one frame at a time.', description: 'A stop-motion film with a strong focus on lighting and carefully executed production.',
    year: undefined, roles: [], team: '', duration: '', synopsis: '', camera: '', lens: '', lighting: '', process: [], bts: [], videos: [] }, // TODO: exact role, production details, final film and real media
  { slug: 'co-sac', title: 'CỔ SẮC', category: 'Documentary / Film', disciplines: ['film'], roles: ['D.O.P', 'Camera Operator'], featured: true, art: 'red', summary: 'A documentary seen through a cinematographer’s lens.', description: 'A documentary film with Triệu Phi working as D.O.P and Camera Operator.',
    year: undefined, team: '', duration: '', synopsis: '', camera: '', lens: '', lighting: '', challenge: '', bts: [], videos: [] }, // TODO: synopsis, team, equipment, footage and BTS
  { slug: 'daa-stopmotion', title: 'DA&A StopMotion', category: 'Creative Technology / Experimental', disciplines: ['film'], roles: ['End-to-end development'], year: 2026, featured: true, art: 'frames', summary: 'Building the tool that the production needed.', description: 'Previously KILN Motion. A stop-motion software project for students and people who want to learn or work with stop-motion, created during a school production. A creative technology project rooted in self-learning, initiative and production problem solving.',
    tools: ['C#', '.NET', 'WPF', 'XAML', 'Camera SDK', 'Git', 'GitHub', 'Visual Studio'],
    challenge: 'Dragonframe was expensive, free alternatives lacked required features, and cracked software introduced reliability and security risks. The team needed a workflow suited to its production.',
    approach: 'Capture → Animate → Review → Organize → Export. Research and development spans Camera Capture, Live View, Onion Skin, Frame Management, Timeline, Motion Guide, increment and graph-style planning, Chroma Preview, Flicker Detection, Preview Animation, Project / Take Management and export. Camera integration direction includes Sony, Canon and Nikon.',
    process: [{ title: 'A production problem becomes a learning process', text: 'Phi was involved comprehensively in developing the software. AI/Codex supported research, feature planning, implementation, debugging, UI/UX iteration and documentation.' }],
    outcome: 'A software project built around the needs of stop-motion production. Explore the public product website for more information.',
    externalLinks: [{ label: 'Explore DA&A StopMotion', url: 'https://kilnstopmotion.github.io/KILN_StopMotion/' }] },
  { slug: 'photography-collection', title: 'Photography Collection', category: 'Photography', disciplines: ['photography'], featured: true, art: 'photo', summary: 'Light, observed. Moments, collected.', gallery: [] }, // TODO: supplied photographs, albums, captions
  { slug: 'motion-design-collection', title: 'Motion Design Collection', category: 'Motion Graphic', disciplines: ['motion-graphic'], featured: true, art: 'motion', summary: 'An ongoing exploration of form and rhythm.', videos: [] }, // TODO: actual motion reels and project details
];
