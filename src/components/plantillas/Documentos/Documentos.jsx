import DocumentosOrganismo from "../../organismo/documentos/DocumentosOrganismo";
import Navbar from "../../molecules/Navbar/Navbar";
import { useState } from "react";

const Documentos = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);


  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);

  };

  return (
    <div className="flex">
      <Navbar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
      <div
        className={`transition-all duration-300 ease-in-out ${menuAbierto ? "ml-64" : "ml-16"
          } w-full`}
      >
        <DocumentosOrganismo />
      </div>
    </div>
  );
};

export default Documentos;
