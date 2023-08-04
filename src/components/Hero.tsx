import profile from "/profile.jpg";
import { SiTailwindcss, SiJavascript, SiTypescript } from "react-icons/si";
import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="flex flex-col min-h-screen justify-center md:pt-0 pt-10">
      <div className="md:flex">
        <div className="md:w-1/2 mt-3 md:mt-0 flex flex-col justify-center gap-5">
          <h1 className="font-extrabold text-4xl md:text-5xl">
            Front-End Web Developer 👋
          </h1>
          <p className="text-gray-500">
            Hi, I'm Angko Musyafa Jalil. A passionate Front-End Web Developer
            based in Pemalang, Indonesia 📍
          </p>
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/angkomj" target="_blank">
              <FaLinkedin
                title="Linkedin"
                size={30}
                className="fill-blue-500"
              />
            </a>
            <a href="https://github.com/nkrqh" target="_blank">
              <FaGithub title="Github" size={30} />
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-5 md:mt-0 md:w-1/2">
          <img
            src={profile}
            alt="Profile"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex gap-10 mt-10 md:mt-20 justify-center md:justify-start items-center">
        <h4 className="font-extrabold md:text-xl">Tech Stack</h4>
        <span className="text-gray-400">|</span>

        <div className="flex flex-wrap gap-5 md:gap-10 flex-1 justify-center md:justify-start">
          <FaHtml5 size={30} className="fill-orange-500" title="HTML" />
          <FaCss3Alt size={30} className="fill-blue-500" title="CSS" />
          <SiJavascript
            size={30}
            className="fill-yellow-300 bg-black"
            title="JavaScript"
          />
          <SiTypescript
            size={30}
            className="fill-blue-500"
            title="TypeScript"
          />
          <SiTailwindcss
            size={30}
            className="fill-sky-500"
            title="Tailwind CSS"
          />
          <FaReact size={30} className="fill-sky-500" title="React JS" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
