import { FaEnvelopeOpenText, FaGithub, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex justify-between flex-col-reverse md:flex-row gap-4 items-center px-5 lg:px-40 py-5 dark:bg-[#121212] border-t border-t-gray-200 dark:border-t-white/10">
      <p className="font-extrabold text-sm">
        &copy; {new Date().getFullYear()} Bukan Anko
      </p>

      <div className="flex gap-5">
        <a href="https://github.com/bukananko" target="_blank">
          <FaGithub size={26} title="Github" />
        </a>
        <a
          href="mailto:ankoo890@gmail.com"
          target="_blank"
          className="flex gap-5 items-center">
          <FaEnvelopeOpenText
            size={25}
            title="Email"
            className="fill-blue-500"
          />
        </a>
        <a
          href="https://t.me/bukananko"
          target="_blank"
          className="flex gap-5 items-center">
          <FaTelegram size={26} title="Telegram" className="fill-sky-500" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
