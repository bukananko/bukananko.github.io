import { useState } from "react";
import { FaAlignRight, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="py-5 px-4 md:px-10 flex justify-between sticky top-0 bg-white z-50">
      <h1 className="font-extrabold text-xl">
        <a href="#">Anko.dev</a>
      </h1>

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
        {isOpen ? (
          <FaXmark size={24} title="Menu"></FaXmark>
        ) : (
          <FaAlignRight size={24} title="Menu"></FaAlignRight>
        )}
      </button>

      <ul
      onClick={handleMenu}
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-10 top-20 flex flex-col items-center px-10 gap-5 bg-white shadow-xl shadow-black/30 drop-shadow-2xl py-4 rounded-md`}>
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
    </nav>
  );
};

export default Navbar;
