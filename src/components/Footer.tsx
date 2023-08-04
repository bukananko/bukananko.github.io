import {
  FaEnvelopeOpenText,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex justify-between flex-col-reverse md:flex-row gap-4 items-center md:px-40 py-5 bg-black text-white">
      <p className="font-extrabold text-sm">
        &copy; 2023 Anko.dev. All rights reserved
      </p>

      <div className="flex gap-5">
        <a href="https://linkedin.com/in/angkomj" target="_blank">
          <FaLinkedin size={25} title="LinkedIn" className="fill-blue-500" />
        </a>
        <a href="https://github.com/nkrqh" target="_blank">
          <FaGithub size={25} title="Github" />
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
          href="https://wa.me/6289630138117"
          target="_blank"
          className="flex gap-5 items-center">
          <FaWhatsapp size={25} title="Whatsapp" className="fill-green-500" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
