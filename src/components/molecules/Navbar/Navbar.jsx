import React, { useState } from "react";
import ItemsNavbar from "./ItemsNavbar";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleMouseEnter = () => {
    setMenuAbierto(true);
  };

  const handleMouseLeave = () => {
    setMenuAbierto(false);
  };

  return (
    <>
      <div
        className={`relative transition-all duration-300 ease-in-out overflow-hidden ${menuAbierto ? "w-64" : "w-16"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <section className={`flex flex-col mt-4 transition-opacity duration-300 ease-in-out ${!menuAbierto ? "opacity-100 ml-1 mr-1 space-x-2" : "opacity-100 ml-1 mr-1 space-x-2"}`}>
          <ItemsNavbar visiblite={menuAbierto} />
        </section>
      </div>
    </>
  );
};

export default Navbar;
