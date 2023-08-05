import { useState } from "react";
import { FaAlignRight, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleMenu = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <nav className="py-5 px-5 flex justify-between fixed right-0 left-0 top-0 bg-white z-50">
      <a href="#" className="text-xl font-extrabold">
        Anko.dev
      </a>

      <ul className="hidden md:flex justify-center items-center gap-5">
        <li className="hover:text-blue-500">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-blue-500">
          <a href="#projects">Projects</a>
        </li>
        <li className="hover:text-blue-500">
          <a href="#contact">Contact</a>
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
        <ul className="absolute right-6 flex flex-col items-center px-10 gap-5 bg-white shadow-xl shadow-black/30 drop-shadow-2xl py-10 rounded-xl">
          <li className="hover:text-blue-500">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-blue-500">
            <a href="#projects">Projects</a>
          </li>
          <li className="hover:text-blue-500">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
