import { FaReact, FaHtml5 } from "react-icons/fa6";
import { SiTypescript, SiTailwindcss, SiJavascript } from "react-icons/si";

export const projectList = [
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
];
