import React, { useState } from "react";
import TipoDocumentoPlantilla from "../../components/plantillas/tipoDocumento/tipoDocumentoPlantilla.jsx";
import Navbar from "../../components/molecules/Navbar/Navbar";
import Header from "../../components/molecules/layout/Header";
import Footer from "../../components/molecules/Footer/Footer";

const TipoDocumentoPage = () => {
    const [menuAbierto, setMenuAbierto] = useState(true);

    const toggleMenu = () => {
      setMenuAbierto(!menuAbierto);
    }
  return (
    <>
      <div className="h-screen flex flex-col overflow-x-hidden">
        <Header contenido={"Coffco"} />
        <div className="flex flex-grow">
          <div
            className={`transition-all duration-300 ease-in-out`}>
            <Navbar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
          </div>
          <div className="w-full overflow-auto bg-gray-100">
            <TipoDocumentoPlantilla />
          </div>
        </div>
        <div className="mt-auto w-screen">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TipoDocumentoPage