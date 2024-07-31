import React from "react";
import Navbar from "../../molecules/Navbar/Navbar";
import Footer from "../../molecules/Footer/Footer";
import Cards from "../../molecules/cards/Cards";
// iconso de gestion documental
import { IoDocumentAttachSharp } from "react-icons/io5";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { MdEditDocument } from "react-icons/md";
//iconos de servicios
import { GiTestTubes } from "react-icons/gi";
import { GiDrippingTube } from "react-icons/gi";
import { GiCoffeeBeans } from "react-icons/gi";
import { PiCoffeeBeanFill } from "react-icons/pi";

const HomePlantilla = () => {
  const iconGestion = [
    {
      icon: <IoDocumentAttachSharp />,
      description: "Sube y almacena tus documentos",
    },
    {
      icon: <HiDocumentMagnifyingGlass />,
      description: "Busca y accede a tus archivos",
    },
    {
      icon: <MdEditDocument />,
      description: "Edita tus documentos",
    },
  ];

  const iconServicios = [
    { icon: <GiTestTubes />, description: "Alquilar el laboratorio" },
    { icon: <GiDrippingTube />, description: "Análisis físico sensorial" },
    { icon: <GiCoffeeBeans />, description: "Servicio de trilla" },
    { icon: <PiCoffeeBeanFill />, description: "Servicio de tostion" },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen overflow-hidden ">
        <div className="w-full absolute">
          <Navbar />
        </div>
        <div className=" w-full max-w-screen-lg flex flex-col md:flex-row gap-10 justify-between mt-28">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <Cards
              title="Gestión Documental"
              span="Organiza y administra tus documentos"
              icons={iconGestion}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Cards
              title={"Servicios"}
              span={"Nuestra gama de productos y servicios."}
              icons={iconServicios}
            />
          </div>
        </div>
        <div className="mt-auto w-screen">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePlantilla;
