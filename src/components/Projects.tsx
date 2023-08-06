import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { projectList } from "../constants";

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <h1 className="text-blue-500 font-extrabold text-lg">PORTFOLIO</h1>
      <p className="text-xl md:text-2xl font-extrabold">
        Each Project is a unique piece of development 🧩
      </p>

      <ul className="space-y-20 mt-10">
        {projectList.map((project) => (
          <li
            key={project.title}
            className="flex flex-col md:flex-row gap-10 md:gap-20 md:even:flex-row-reverse">
            <div className="md:w-3/5 aspect-video">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full rounded-md drop-shadow-2xl shadow-xl shadow-black/40 object-cover"
              />
            </div>

            <div className="md:w-2/5 flex flex-col justify-center text-center gap-4">
              <h1 className="text-xl font-extrabold">{project.title}</h1>
              <p className="text-gray-500">{project.desc}</p>

              <div className="flex justify-center gap-3">
                {project.techs.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>

              <div className="flex gap-5 mt-5 justify-center">
                <a
                  href={project.web}
                  target="_blank"
                  className="flex gap-1 items-center hover:text-blue-500">
                  Live Demo
                  <FaArrowUpRightFromSquare title="Live Demo" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  className="flex items-center gap-1 hover:text-gray-500">
                  Code
                  <FaGithub size={22} title="Github" />
                </a>
              </div>
              <hr className="border border-gray-200" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
