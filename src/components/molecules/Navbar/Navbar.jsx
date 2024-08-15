import React, { useState } from "react";
import ItemsNavbar from "./ItemsNavbar";
import { LuArrowLeftCircle } from "react-icons/lu";
import { LuArrowRightCircle } from "react-icons/lu";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [Items, setItmes] = useState(false);
  const [icon, seticon] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    seticon(true);
    setItmes(!Items);
  };
  const icons = icon ? (
    <LuArrowRightCircle
      onClick={toggleMenu}
      size={32}
      className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
    />
  ) : (

    <LuArrowLeftCircle
      onClick={toggleMenu}
      size={32}
      className="cursor-pointer transform transition-transform duration-300 hover:scale-125"
    />
  );
  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-slate-800  text-white transition-all duration-300 ease-in-out ${menuAbierto ? "w-64 " : "w-16"
          }`}
      >
        <div
          className={`p-4 text-white transition-all duration-100 ease-in-out flex ${menuAbierto ? "justify-end" : "justify-center"
            }`}
        >
          {icons}
        </div>
        <section className="p-2">
          <ItemsNavbar visiblite={Items} />
        </section>
      </div>
    </div>
  );
};

export default Navbar;
