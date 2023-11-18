import { skillList } from "../constants";

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center">
      <h1 className="text-blue-500 font-extrabold text-lg">SKILLS</h1>
      <p className="text-xl md:text-2xl font-extrabold">
        List of the technologies that I've use ⚙️
      </p>

      <div className="flex flex-wrap gap-2 w-full mt-10">
        {skillList.map((skill, i) => (
          <div
            key={i}
            className="flex gap-2 items-center py-2 px-3 bg-gray-100 rounded-md w-max hover:bg-gray-200">
            {skill.icon}
            <p>{skill.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
