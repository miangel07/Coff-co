import React, { useState } from "react";
import ItemsNavbar from "./ItemsNavbar";
import { LuArrowLeftCircle, LuArrowRightCircle } from "react-icons/lu";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Función para abrir el menú al pasar el mouse
  const handleMouseEnter = () => {
    setMenuAbierto(true);
  };

  // Función para cerrar el menú al quitar el mouse
  const handleMouseLeave = () => {
    setMenuAbierto(false);
  };

  return (
    <>
      <div
        className={`top-0 left-0 h-full text-black transition-all duration-300 ease-in-out ${
          menuAbierto ? "w-64 md:w-48 lg:w-64" : "w-16 md:w-12 lg:w-16"
        }`}
        onMouseEnter={handleMouseEnter} // Abre el menú al pasar el mouse
        onMouseLeave={handleMouseLeave} // Cierra el menú al quitar el mouse
      >
        <section className="flex-grow">
          <ItemsNavbar visiblite={menuAbierto} />
        </section>
      </div>
    </>
  );
};

export default Navbar;
