import React, { useState } from "react";
import Carousel from "../../organismo/carousel/Carousel";
//importacion de un Dropdown desplega un menu
import DropDown from "../../organismo/dropdown/DropDown";


const HomePlantilla = () => {

  const gestionDocumentalItems=[
    {key:'uno', label:'gestion uno'},
    {key:'uno', label:'gestion uno'},
    {key:'uno', label:'gestion uno'},
    {key:'uno', label:'gestion uno'},
    {key:'uno', label:'gestion uno'},
    {key:'uno', label:'gestion uno'},
  ]


  return (
    <>
      {/* contenedor padre */}
      <div className="flex flex-row gap-3 bg-gray-100 h-full">
        {/* contenedor 1 del carousel */}
        <div className="flex-1 bg-gray-100 p-4">
          <Carousel />
        </div>
        {/* contenedor 2 */}
        <div className="flex-1 bg-gray-100 space-y-11 justify-center items-center p-4">
          <DropDown nombreBoton={'Gestion Documental'} items={gestionDocumentalItems} />
        </div>
        {/* contenedor 3 */}
        <div className="flex-1 bg-gray-400 p-4"></div>
      </div>
    </>
  );
};

export default HomePlantilla;
