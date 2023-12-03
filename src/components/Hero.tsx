import { FaEnvelopeOpenText } from "react-icons/fa6";
import { SiTelegram } from "react-icons/si";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center min-h-screen">
      <div className="md:flex">
        <div className="flex-1 mt-3 md:mt-0 flex flex-col justify-center gap-5">
          <h1 className="font-extrabold text-3xl md:text-5xl">
            Hi, I'm Anko
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Front-End Developer
            </span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mr-10">
            I'm interested with the modern web development. I build app using on
            demand technologies such as React JS, Next JS and Tailwind CSS. Feel
            free to contact me :)
          </p>

          <div className="flex gap-5 md:gap-10">
            <a
              href="mailto:ankoo890@gmail.com"
              target="_blank"
              className="flex gap-2 items-center group">
              <FaEnvelopeOpenText
                size={28}
                title="Email"
                className="fill-blue-500 group-hover:fill-blue-400"
              />
              <p className="font-extrabold text-blue-500 group-hover:text-blue-400">
                Email
              </p>
            </a>

            <a
              href="https://t.me/bukananko"
              target="_blank"
              className="flex gap-2 items-center group">
              <SiTelegram
                size={28}
                title="Telegram"
                className="fill-sky-500 group-hover:fill-sky-400"
              />
              <p className="font-extrabold text-sky-500 group-hover:text-sky-400">
                Telegram
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
