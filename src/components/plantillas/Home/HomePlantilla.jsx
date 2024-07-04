import React from "react";
import Footer from "../../molecules/Footer/Footer";
import Cards from '../../molecules/cards/Cards'

const HomePlantilla = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-stone-500">
      <div className="w-full h-[20px] bg-yellow-200">
        Aquí la barra de navegación
      </div>
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row gap-4 justify-between mt-4">
        <div className="w-full md:w-1/2  bg-blue-300 mb-4 md:mb-0">
          <Cards title='Gestion documental'/>
        </div>
        <div className="w-full md:w-1/2 h-64 bg-green-300">
          Contenido de la columna derecha
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomePlantilla;

{
  /* <div className="w-1/2 h-full  bg-slate-700"></div>
        <div className="w-1/2 h-full  bg-yellow-700"></div> */
}
