import profile from "../assets/nkrqh.webp";

import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="flex flex-col min-h-screen justify-center md:pt-0 pt-10">
      <div className="md:flex">
        <div className="flex-1 mt-3 md:mt-0 flex flex-col justify-center gap-5">
          <h1 className="font-extrabold text-3xl md:text-5xl bg-gradient-to-l from-blue-500 to-black bg-clip-text text-transparent">
            Front-End Developer
          </h1>
          <p className="text-gray-500 md:pr-10">
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

        <div className="flex justify-center mt-5 md:mt-0">
          <img
            src={profile}
            alt="Profile"
            width={300}
            height={300}
            className="animate-bloop shadow-2xl shadow-black drop-shadow-2xl "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
