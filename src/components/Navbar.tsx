import { useState } from "react";
import { FaAlignRight, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleMenu = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <nav className="py-3 px-5 lg:px-40 flex justify-between fixed right-0 left-0 top-0 bg-white dark:bg-[#121212] z-50 mb-10">
      <a href="#" className="text-xl font-extrabold">
        <img src="./logo.webp" alt="ai" width={40} height={40} />
      </a>

      <ul className="hidden md:flex justify-center items-center gap-5">
        <li className="hover:text-blue-500">
          <a href="#skills">Skills</a>
        </li>
        <li className="hover:text-blue-500">
          <a href="#projects">Projects</a>
        </li>
      </ul>

      <button type="button" onClick={handleMenu} className="md:hidden">
        {isActive ? (
          <FaXmark size={24} title="Menu"></FaXmark>
        ) : (
          <FaAlignRight size={24} title="Menu"></FaAlignRight>
        )}
      </button>

      <div
        onClick={handleMenu}
        className={`${
          isActive ? "block" : "hidden"
        } absolute top-14 bottom-0 right-0 left-0 min-h-screen`}>
        <ul className="absolute right-6 flex flex-col items-center px-10 gap-7 bg-white dark:bg-[#121212] shadow-xl shadow-black/30 dark:shadow-white/20 drop-shadow-2xl py-10 rounded-xl">
          <li className="hover:text-blue-500">
            <a href="#skills">Skills</a>
          </li>
          <li className="hover:text-blue-500">
            <a href="#projects">Projects</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
