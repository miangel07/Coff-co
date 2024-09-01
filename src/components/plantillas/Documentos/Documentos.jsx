import DocumentosOrganismo from "../../organismo/documentos/DocumentosOrganismo";
import Navbar from "../../molecules/Navbar/Navbar";
import { useState } from "react";

const Documentos = () => {
  const [menuAbierto, setMenuAbierto] = useState(true);


  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);

  };

  return (
    <div className="flex h-screen">
      <Navbar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
      <div
        className={`transition-all duration-300 ease-in-out ${menuAbierto ? "ml-28" : "ml-16"
          } w-full`}
      >
        <DocumentosOrganismo />
      </div>
    </div>
  );
};

export default Documentos;
