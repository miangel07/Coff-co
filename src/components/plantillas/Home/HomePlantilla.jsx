import React from "react";
import Carousel from "../../organismo/carousel/Carousel";
import Card from "../../molecules/cards/Cards";

const HomePlantilla = () => {
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
          <div className="flex-1 items-center bg-gray-100 mt-6 mb-6 rounded-lg border border-gray-200">
            <Card
              imageSrc="/imagenes/gestionDocumental.jpg"
              altText="Imagen de gestion documental"
              footerText="Gestion Documental"
              buttonText="Ingresar"
              imageClass="object-contain mx-auto"
            />
          </div>

          {/* Contenedor 3 - Derecha */}
          <div className="flex-1 items-center justify-center bg-gray-100 mt-6 mb-6 rounded-lg border border-gray-200">
            <Card
              imageSrc="/imagenes/gestionDocumental.jpg"
              altText="Imagen de escuela nacional del cafe"
              footerText="Servicios"
              buttonText="Ingresar"
              imageClass="object-contain mx-auto"
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default HomePlantilla;
