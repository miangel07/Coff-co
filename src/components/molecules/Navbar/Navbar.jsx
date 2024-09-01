//../src/components/molecules/Navbar/Navbar.jsx
import React from "react";
import ItemsNavbar from "./ItemsNavbar";
import { LuArrowLeftCircle, LuArrowRightCircle } from "react-icons/lu";

const Navbar = ({ menuAbierto, toggleMenu, visible }) => {
  const icons = menuAbierto ? (
    <LuArrowLeftCircle
      onClick={toggleMenu}
      size={20} // Tamaño del icono ajustado
      className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
    />
  ) : (
    <LuArrowRightCircle
      onClick={toggleMenu}
      size={20} // Tamaño del icono ajustado
      className="cursor-pointer transform transition-transform duration-300 hover:scale-125"
    />
  );

  return (
    <div
      className={`top-0 left-0 h-screen bg-black text-white transition-all duration-300 ease-in-out ${
        menuAbierto ? "w-64 md:w-48 lg:w-64" : "w-16 md:w-12 lg:w-16"
      }`}
    >
      <div
        className={`p-3 text-white transition-all duration-100 ease-in-out flex ${
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
