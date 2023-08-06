import CV from "../assets/CV-Anko.pdf";
import { FaDownload } from "react-icons/fa6";

const About = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center">
      <h1 className="text-blue-500 font-extrabold text-lg">ABOUT ME</h1>
      <p className="text-xl md:text-2xl font-extrabold">
        A dedicated Front-End Developer based in Pemalang, Indonesia 📍
      </p>

      <p className="text-gray-500 py-6">
        As a junior Front-End Developer I possess an impressive arsenal of
        skills HTML, CSS, JavaScript, TypeScript, React JS, and Tailwind CSS. I
        excel in designing and maintaining responsive websites that offer a
        smooth experience. Engaging interfaces through writing clean and
        optimize code and utilizing cutting edge development tools and
        techniques. I have deep interest in technology and it drives me to
        constantly learning and seeking opportunities to expand my knowledge and
        improve my skills.
      </p>

      <a
        href={CV}
        download="CV-Anko"
        className="bg-blue-500 text-white py-2 px-5 rounded-full hover:scale-110 duration-500 flex items-center gap-2 w-max">
        Download CV
        <FaDownload />
      </a>
    </section>
  );
};

export default About;
