import Documentos from "../../components/plantillas/Documentos/Documentos";
import Header from "../../components/molecules/layout/Header";
import Footer from "../../components/molecules/Footer/Footer";
import { useState } from "react";
import Navbar from "../../components/molecules/Navbar/Navbar";
const DocumentosPage = () => {

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <>
      <div className="h-screen flex flex-col overflow-x-hidden ">
        <Header contenido={"Coffco"} />
        <div className="flex flex-grow">
          <div
            className={`transition-all duration-300 ease-in-out ${
              menuAbierto ? "w-60" : "w-16"
            }bg-gray-100`}
          >
            <Navbar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
          </div>
          <div className="w-full  bg-gray-100">
            <Documentos/>
          </div>
        </div>
        <div className="mt-auto w-screen">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DocumentosPage;
