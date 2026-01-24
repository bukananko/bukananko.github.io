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
};

export type Contact = Skill & { href: string };

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
    title: 'Spotify Landing Page Clone 🎧',
    desc: 'Landing page web from the official spotify website which I cloned to learn slicing ui.',
    img: spotifylanding,
    github: 'https://github.com/bukananko/cloning-spotify',
    web: 'https://bukananko.github.io/cloning-spotify',
    techs: ['html', 'tailwind', 'js'],
  },
];

export const skills: Skill[] = [
  { key: 'html', title: 'HTML', icon: 'vscode-icons:file-type-html' },
  { key: 'css', title: 'CSS', icon: 'vscode-icons:file-type-css' },
  { key: 'js', title: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
  { key: 'ts', title: 'TypeScript', icon: 'devicon:typescript' },
  { key: 'tailwind', title: 'Tailwind CSS', icon: 'vscode-icons:file-type-tailwind' },
  { key: 'mongo', title: 'MongoDB', icon: 'vscode-icons:file-type-mongo' },
  { key: 'express', title: 'Express JS', icon: 'skill-icons:expressjs-light' },
  { key: 'react', title: 'React JS', icon: 'vscode-icons:file-type-reactjs' },
  { key: 'next', title: 'Next JS', icon: 'ri:nextjs-fill' },
  { key: 'vue', title: 'Vue JS', icon: 'devicon:vuejs' },
  { key: 'node', title: 'Node JS', icon: 'vscode-icons:file-type-node' },
  { key: 'prisma', title: 'Prisma', icon: 'lineicons:prisma' },
  { key: 'postgres', title: 'PostgreSQL', icon: 'devicon:postgresql' },
  { key: 'svelte', title: 'Svelte/Kit', icon: 'material-icon-theme:svelte' },
];

export const contacts: Contact[] = [
  { key: 'email', title: 'Email', icon: 'logos:google-gmail', href: 'mailto:ankoo890@gmail.com' },
  { key: 'linkedin', title: 'LinkedIn', icon: 'devicon:linkedin', href: 'https://www.linkedin.com/in/angkomj/' },
];
