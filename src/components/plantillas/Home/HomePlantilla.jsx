import React from "react";
import Footer from "../../molecules/Footer/Footer";
import Cards from '../../molecules/cards/Cards'
import { IoDocumentAttachSharp } from "react-icons/io5";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { MdEditDocument } from "react-icons/md";

const HomePlantilla = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen ">
      <div className="w-full h-[20px] bg-yellow-200">
        Aquí la barra de navegación
      </div>
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row bg-blue-300  gap-4 justify-between mt-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Cards
            title={"Gestion documental"}
            span={"Organiza y administra tus documentos"}
            icon1={<IoDocumentAttachSharp className="ml-4 text-3xl" />}
            icon2={<HiDocumentMagnifyingGlass className="ml-4 text-3xl" />}
            icon3={<MdEditDocument className="ml-4 text-3xl" />}
          />
        </div>
        <div className="w-full md:w-1/2 h-64 bg-green-300">
          <Cards
            title={"Servicios"}
            span={"Nuestra gama de productos y servicios."}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePlantilla;

{
  /* <div className="w-1/2 h-full  bg-slate-700"></div>
        <div className="w-1/2 h-full  bg-yellow-700"></div> */
}
