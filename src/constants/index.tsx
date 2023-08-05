import { FaReact, FaHtml5 } from "react-icons/fa6";
import { SiTypescript, SiTailwindcss, SiJavascript } from "react-icons/si";

type ProjectListType = {
  title: string;
  desc: string;
  img: string;
  github: string;
  web: string;
  techs: JSX.Element[];
};

export const projectList: ProjectListType[] = [
  {
    title: "Fake Store 🛒",
    desc: "Fake store is an e-commerce web that allows users to buy or sell anything you want and spread it through the internet.",
    img: "/fakestore.png",
    github: "https://github.com/nkrqh/fake-store",
    web: "https://afakestore.netlify.app",
    techs: [
      <FaReact className="fill-sky-500" title="React JS" size={30} />,
      <SiTypescript className="fill-blue-500" title="TypeScript" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
    ],
  },
  {
    title: "AiMusic 🎵",
    desc: "AiMusic is a music player based on web that allows users to play music, search for the music you like, and manage your own music library.",
    img: "/musicplayer.png",
    github: "https://github.com/nkrqh/music-player",
    web: "https://aimusics.netlify.app",
    techs: [
      <FaHtml5 className="fill-orange-500" title="HTML" size={30} />,
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
    img: "/dekoor.png",
    github: "https://github.com/nkrqh/furniture-landing-page",
    web: "https://odekoor.netlify.app/",
    techs: [
      <FaHtml5 className="fill-orange-500" title="HTML" size={30} />,
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
    img: "/weddingcard.png",
    github: "https://github.com/nkrqh/wedding-card",
    web: "https://undangan-nikah-beik.netlify.app/",
    techs: [
      <FaReact className="fill-sky-500" title="React JS" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
    ],
  },
  {
    title: "Spotify Landing Page Clone 🎧",
    desc: "Landing page web from the official spotify website which I cloned to learn slicing ui.",
    img: "/spotifylanding.png",
    github: "https://github.com/nkrqh/cloning-spotify",
    web: "https://nkrqh.github.io/cloning-spotify",
    techs: [
      <FaHtml5 className="fill-orange-500" title="HTML" size={30} />,
      <SiTailwindcss className="fill-sky-500" title="Tailwind CSS" size={30} />,
      <SiJavascript
        className="fill-yellow-300 bg-black"
        title="JavaScript"
        size={30}
      />,
    ],
  },
];
