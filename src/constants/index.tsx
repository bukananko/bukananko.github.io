import fakestore from "../assets/fakestore.webp";
import musicplayer from "../assets/musicplayer.webp";
import dekoor from "../assets/dekoor.webp";
import weddingcard from "../assets/weddingcard.webp";
import spotifylanding from "../assets/spotifylanding.webp";
import {
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiCss3,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiHtml5,
  SiReact,
} from "react-icons/si";

interface ProjectListType {
  title: string;
  desc: string;
  img: string;
  github: string;
  web: string;
  techs: JSX.Element[];
}

interface SkillListType {
  title: string;
  icon: JSX.Element;
}

export const projectList: ProjectListType[] = [
  {
    title: "Fake Store 🛒",
    desc: "Fake store is an e-commerce web that allows users to buy or sell anything you want and spread it through the internet.",
    img: fakestore,
    github: "https://github.com/nkrqh/fake-store",
    web: "https://afakestore.netlify.app",
    techs: [
      <SiReact className="fill-sky-500" title="React JS" size={30} />,
      <SiTypescript className="fill-blue-500" title="TypeScript" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
    ],
  },
  {
    title: "AiMusic 🎵",
    desc: "AiMusic is a music player based on web that allows users to play music, search for the music you like, and manage your own music library.",
    img: musicplayer,
    github: "https://github.com/nkrqh/music-player",
    web: "https://aimusics.netlify.app",
    techs: [
      <SiHtml5 className="fill-orange-500" title="HTML" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
      <SiJavascript
        className="fill-yellow-300 bg-black"
        title="JavaScript"
        size={30}
      />,
    ],
  },
  {
    title: "Dekoor 🛋️",
    desc: "Dekoor is a landing page web that contains information about furniture.",
    img: dekoor,
    github: "https://github.com/nkrqh/furniture-landing-page",
    web: "https://odekoor.netlify.app/",
    techs: [
      <SiHtml5 className="fill-orange-500" title="HTML" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
      <SiJavascript
        className="fill-yellow-300 bg-black"
        title="JavaScript"
        size={30}
      />,
    ],
  },
  {
    title: "Wedding Invitation Card 💍",
    desc: "A web-based wedding invitation card that you can give online to your friends or family.",
    img: weddingcard,
    github: "https://github.com/nkrqh/wedding-card",
    web: "https://undangan-nikah-beik.netlify.app/",
    techs: [
      <SiReact className="fill-sky-500" title="React JS" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
    ],
  },
  {
    title: "Spotify Landing Page Clone 🎧",
    desc: "Landing page web from the official spotify website which I cloned to learn slicing ui.",
    img: spotifylanding,
    github: "https://github.com/nkrqh/cloning-spotify",
    web: "https://nkrqh.github.io/cloning-spotify",
    techs: [
      <SiHtml5 className="fill-orange-500" title="HTML" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
      <SiJavascript
        className="fill-yellow-300 bg-black"
        title="JavaScript"
        size={30}
      />,
    ],
  },
];

export const skillList: SkillListType[] = [
  {
    title: "HTML",
    icon: <SiHtml5 className="fill-orange-500" title="HTML" size={30} />,
  },
  {
    title: "CSS",
    icon: <SiCss3 className="fill-blue-500" title="CSS" size={30} />,
  },
  {
    title: "JavaScript",
    icon: (
      <SiJavascript
        className="fill-yellow-300 bg-black"
        title="JavaScript"
        size={30}
      />
    ),
  },
  {
    title: "TypeScript",
    icon: (
      <SiTypescript className="fill-blue-500" title="TypeScript" size={30} />
    ),
  },
  {
    title: "Tailwind CSS",
    icon: (
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />
    ),
  },
  {
    title: "Mongo DB",
    icon: <SiMongodb className="fill-green-500" title="Mongo DB" size={30} />,
  },
  {
    title: "Express JS",
    icon: <SiExpress className="fill-black" title="Express JS" size={30} />,
  },
  {
    title: "React JS",
    icon: <SiReact className="fill-sky-500" title="React JS" size={30} />,
  },
  {
    title: "Node JS",
    icon: <SiNodedotjs className="fill-green-500" title="Node JS" size={30} />,
  },
];
