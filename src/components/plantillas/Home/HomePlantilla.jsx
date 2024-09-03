import React, { useState } from "react";
import Carousel from "../../organismo/carousel/Carousel";
import Card from "../../molecules/cards/Cards";

const HomePlantilla = () => {


  return (
    <>
      {/* contenedor padre */}
      <div className="flex flex-row gap-3 bg-gray-100 h-full">
        {/* contenedor 1 del carousel */}
        <div className="flex-1 bg-gray-100 p-4">
          <Carousel />
        </div>
        {/* contenedor 2 */}
        <div className="flex flex-1 items-center justify-center bg-red-300">
          <Card
            imageSrc="/imagenes/gestionDocumental.jpg"
            altText="Woman listening to music"
            footerText="Gestion Documental"
            buttonText="Ingresar"
            imageClass="object-contain mx-auto"
          />
        </div>
        {/* contenedor 3 */}
        <div className="flex-1 bg-gray-400 p-4"></div>
      </div>
    </>
  );
};

export default HomePlantilla;
