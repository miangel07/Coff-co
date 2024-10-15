import React from "react";
import Carousel from "../../organismo/carousel/Carousel";
import Card from "../../molecules/cards/Cards";
import GraficaDocumento from "../../molecules/graficas/GraficaDocumento";
import Mybutton from "../../atoms/Mybutton";
import { useNavigate } from "react-router-dom";
import ReportesGrafica from "../../molecules/graficas/ReportesGrafica";

const HomePlantilla = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Contenedor padre */}
      <div className="flex flex-col bg-gray-100 h-full overflow-auto">

        {/* Contenedor del Carousel */}
        <div className="w-full p-4">
          <Carousel />
        </div>

        {/* Contenedor inferior */}
        <div className="flex flex-col lg:flex-row flex-1 gap-3 p-4">

          {/* Contenedor 2 - Izquierda */}
          <div className="flex-1 items-center bg-gray-100 mt-6 mb-6 rounded-lg border border-gray-200 justify-center">
            <GraficaDocumento />
            <div className="w-full justify-end flex">
              <Mybutton color={"sena"} onClick={() => navigate("/documentos")}>Ingresar</Mybutton>
            </div>
          </div>


          <div className="flex-1 flex flex-col  items-center justify-between   mt-6 mb-6 rounded-lg border border-gray-200">
            <ReportesGrafica />
            <div className="w-full justify-end flex ">
              <Mybutton color={"sena"} onClick={() => navigate("/servicios")}>Ingresar</Mybutton>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default HomePlantilla;
