import agenone from '@/assets/aagenone.webp';
import modfod from '@/assets/modfod.webp';
import sosmed from '@/assets/sosmed.webp';
import fakestore from '@/assets/fakestore.webp';
import musicplayer from '@/assets/musicplayer.webp';
import dekoor from '@/assets/dekoor.webp';
import weddingcard from '@/assets/weddingcard.webp';
import spotifylanding from '@/assets/spotifylanding.webp';

export type Project = {
  title: string;
  desc: string;
  img: string;
  github: string;
  web: string;
  techs: string[];
};

export type Skill = {
  key: string;
  title: string;
  icon: string;
  category?: 'frontend' | 'backend' | 'database' | 'tools';
};

export type Contact = {
  key: string;
  title: string;
  icon: string;
  href: string;
};

export interface CelestialBody {
  id: string;
  name: string;
  codeName: string;
  type: 'star' | 'skills' | 'project' | 'phenomenon' | 'vessel' | 'station';
  planetCategory: string;
  tagline: string;
  orbitRadius: number;
  orbitSpeed: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  accentColor: string;
  hasRings?: boolean;
  ringsColor?: string;
  initialAngle: number;
  projectData?: Project;
  icon?: string;
  extraStats?: { label: string; value: string }[];
  lore?: string;
}

export const projects: Project[] = [
  {
    title: 'Agenone 📊',
    desc: 'Agenone is a digital agency that will make your business grow and succeed in the digital age.',
    img: agenone,
    github: 'https://github.com/bukananko/agenone',
    web: 'https://aagenone.vercel.app/',
    techs: ['vue', 'tailwind'],
  },
  {
    title: 'Modfod 🥗',
    desc: 'Discover nutritious recipes that are as tasty as they are good for you. Explore colorful photos of fresh ingredients and easy-to-follow cooking methods.',
    img: modfod,
    github: 'https://github.com/bukananko/modfod',
    web: 'https://modfod.netlify.app/',
    techs: ['next', 'tailwind'],
  },
  {
    title: 'Netai 📝',
    desc: 'Netai is a social media platform for sharing photos, your feelings, and connecting with friends.',
    img: sosmed,
    github: 'https://github.com/bukananko/sosmed',
    web: 'https://netai.vercel.app',
    techs: ['next', 'tailwind', 'mongo', 'express'],
  },
  {
    title: 'Fake Store 🛒',
    desc: 'Fake store is an e-commerce web that allows users to buy or sell anything you want and spread it through the internet.',
    img: fakestore,
    github: 'https://github.com/bukananko/fake-store',
    web: 'https://afakestore.netlify.app',
    techs: ['react', 'tailwind'],
  },
  {
    title: 'AiMusic 🎵',
    desc: 'AiMusic is a music player based on web that allows users to play music, search for the music you like, and manage your own music library.',
    img: musicplayer,
    github: 'https://github.com/bukananko/music-player',
    web: 'https://aimusics.netlify.app',
    techs: ['html', 'tailwind', 'js'],
  },
  {
    title: 'Dekoor 🛋️',
    desc: 'Dekoor is a landing page web that contains information about furniture.',
    img: dekoor,
    github: 'https://github.com/bukananko/furniture-landing-page',
    web: 'https://odekoor.netlify.app/',
    techs: ['html', 'tailwind', 'js'],
  },
  {
    title: 'Wedding Invitation Card 💍',
    desc: 'A web-based wedding invitation card that you can give online to your friends or family.',
    img: weddingcard,
    github: 'https://github.com/bukananko/wedding-card',
    web: 'https://undangan-nikah-beik.netlify.app/',
    techs: ['react', 'tailwind'],
  },
  {
    title: 'Spotify Landing Page 🎧',
    desc: 'Landing page web from the official spotify website which I cloned to learn slicing ui.',
    img: spotifylanding,
    github: 'https://github.com/bukananko/cloning-spotify',
    web: 'https://bukananko.github.io/cloning-spotify',
    techs: ['html', 'tailwind', 'js'],
  },
];

export const skills: Skill[] = [
  { key: 'vue', title: 'Vue JS', icon: 'devicon:vuejs', category: 'frontend' },
  { key: 'react', title: 'React JS', icon: 'vscode-icons:file-type-reactjs', category: 'frontend' },
  { key: 'next', title: 'Next JS', icon: 'ri:nextjs-fill', category: 'frontend' },
  { key: 'svelte', title: 'Svelte/Kit', icon: 'material-icon-theme:svelte', category: 'frontend' },
  { key: 'ts', title: 'TypeScript', icon: 'devicon:typescript', category: 'frontend' },
  { key: 'js', title: 'JavaScript', icon: 'vscode-icons:file-type-js-official', category: 'frontend' },
  { key: 'tailwind', title: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind', category: 'frontend' },
  { key: 'html', title: 'HTML', icon: 'vscode-icons:file-type-html', category: 'frontend' },
  { key: 'css', title: 'CSS', icon: 'vscode-icons:file-type-css', category: 'frontend' },
  { key: 'node', title: 'Node JS', icon: 'vscode-icons:file-type-node', category: 'backend' },
  { key: 'express', title: 'Express JS', icon: 'skill-icons:expressjs-light', category: 'backend' },
  { key: 'mongo', title: 'MongoDB', icon: 'vscode-icons:file-type-mongo', category: 'database' },
  { key: 'postgres', title: 'PostgreSQL', icon: 'devicon:postgresql', category: 'database' },
  { key: 'prisma', title: 'Prisma', icon: 'lineicons:prisma', category: 'database' },
];

export const contacts: Contact[] = [
  { key: 'email', title: 'Email', icon: 'logos:google-gmail', href: 'mailto:ankoo890@gmail.com' },
  { key: 'linkedin', title: 'LinkedIn', icon: 'devicon:linkedin', href: 'https://www.linkedin.com/in/angkomj/' },
  { key: 'github', title: 'GitHub', icon: 'mdi:github', href: 'https://github.com/bukananko' },
];

export const solarSystemBodies: CelestialBody[] = [
  {
    id: 'sun',
    name: 'Anko // Core Star',
    codeName: 'SOL-ANKO',
    type: 'star',
    planetCategory: 'sun',
    tagline: 'Solar Core & Full-Stack Developer',
    orbitRadius: 0,
    orbitSpeed: 0,
    baseRadius: 40,
    color: '#ffaa00',
    glowColor: 'rgba(255, 170, 0, 0.65)',
    accentColor: '#ff4400',
    initialAngle: 0,
  },
  {
    id: 'skills',
    name: 'Tech Matrix',
    codeName: 'ORB-SKILLS',
    type: 'skills',
    planetCategory: 'cyber',
    tagline: 'Planetary Engineering Knowledge Core',
    orbitRadius: 100,
    orbitSpeed: 0.42,
    baseRadius: 18,
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.55)',
    accentColor: '#1d4ed8',
    hasRings: true,
    ringsColor: 'rgba(0, 240, 255, 0.5)',
    initialAngle: 0.8,
  },
  {
    id: 'project-agenone',
    name: 'Agenone',
    codeName: 'PLN-AGENONE',
    type: 'project',
    planetCategory: 'gas-giant',
    tagline: 'Digital Agency Scaling Engine',
    orbitRadius: 155,
    orbitSpeed: 0.34,
    baseRadius: 20,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    accentColor: '#b45309',
    hasRings: true,
    ringsColor: 'rgba(245, 158, 11, 0.45)',
    initialAngle: 2.1,
    projectData: projects[0],
  },
  {
    id: 'project-modfod',
    name: 'Modfod',
    codeName: 'PLN-MODFOD',
    type: 'project',
    planetCategory: 'terrestrial',
    tagline: 'Nutritious Recipe Planetary Biosphere',
    orbitRadius: 210,
    orbitSpeed: 0.28,
    baseRadius: 17,
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    accentColor: '#047857',
    initialAngle: 4.2,
    projectData: projects[1],
  },
  {
    id: 'project-netai',
    name: 'Netai',
    codeName: 'PLN-NETAI',
    type: 'project',
    planetCategory: 'rings-giant',
    tagline: 'Social Neural Connectome Network',
    orbitRadius: 265,
    orbitSpeed: 0.23,
    baseRadius: 21,
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.55)',
    accentColor: '#6b21a8',
    hasRings: true,
    ringsColor: 'rgba(168, 85, 247, 0.45)',
    initialAngle: 1.2,
    projectData: projects[2],
  },
  {
    id: 'project-fakestore',
    name: 'Fake Store',
    codeName: 'PLN-MERCATUS',
    type: 'project',
    planetCategory: 'gas-giant',
    tagline: 'Interstellar E-Commerce Marketplace',
    orbitRadius: 320,
    orbitSpeed: 0.18,
    baseRadius: 18,
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    accentColor: '#0369a1',
    initialAngle: 5.4,
    projectData: projects[3],
  },
  {
    id: 'project-aimusic',
    name: 'AiMusic',
    codeName: 'PLN-MELODIA',
    type: 'project',
    planetCategory: 'rings-giant',
    tagline: 'Acoustic Pulsar & Wave Player',
    orbitRadius: 375,
    orbitSpeed: 0.15,
    baseRadius: 19,
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    accentColor: '#9d174d',
    hasRings: true,
    ringsColor: 'rgba(236, 72, 153, 0.45)',
    initialAngle: 3.5,
    projectData: projects[4],
  },
  {
    id: 'project-dekoor',
    name: 'Dekoor',
    codeName: 'PLN-ARCHI-9',
    type: 'project',
    planetCategory: 'desert',
    tagline: 'Aesthetic Interior Design & Furniture',
    orbitRadius: 430,
    orbitSpeed: 0.12,
    baseRadius: 16,
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    accentColor: '#9a3412',
    initialAngle: 0.2,
    projectData: projects[5],
  },
  {
    id: 'project-wedding',
    name: 'Wedding Card',
    codeName: 'PLN-AMORE',
    type: 'project',
    planetCategory: 'terrestrial',
    tagline: 'Binary Orbit Invitation Realm',
    orbitRadius: 485,
    orbitSpeed: 0.09,
    baseRadius: 15,
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    accentColor: '#9f1239',
    initialAngle: 2.7,
    projectData: projects[6],
  },
  {
    id: 'project-spotify',
    name: 'Spotify Landing',
    codeName: 'PLN-ECHO',
    type: 'project',
    planetCategory: 'ice',
    tagline: 'Harmonic Audio Streaming Frequency',
    orbitRadius: 540,
    orbitSpeed: 0.07,
    baseRadius: 18,
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.5)',
    accentColor: '#166534',
    hasRings: true,
    ringsColor: 'rgba(34, 197, 94, 0.45)',
    initialAngle: 4.8,
    projectData: projects[7],
  },
];


