import React, { useState } from "react";
import ItemsNavbar from "./ItemsNavbar";
import { LuArrowLeftCircle, LuArrowRightCircle } from "react-icons/lu";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(true); 

  const toggleMenu = () => {
    setMenuAbierto((prevMenuAbierto) => !prevMenuAbierto);
  };

  const icons = menuAbierto ? (
    <LuArrowLeftCircle
      onClick={toggleMenu}
      size={20} 
      className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
    />
  ) : (
    <LuArrowRightCircle
      onClick={toggleMenu}
      size={20} 
      className="cursor-pointer transform transition-transform duration-300 hover:scale-125"
    />
  );

  return (
    <div
      className={`top-0 left-0 h-screen text-black transition-all duration-300 ease-in-out ${
        menuAbierto ? "w-64 md:w-48 lg:w-64" : "w-16 md:w-12 lg:w-16"
      }`}
    >
      <div
        className={`p-3 text-black transition-all duration-100 ease-in-out flex ${
          menuAbierto ? "justify-end" : "justify-center"
        }`}
      >
        {icons}
      </div>
      <section>
        <ItemsNavbar visiblite={menuAbierto} />
      </section>
    </div>
  );
};

export default Navbar;
