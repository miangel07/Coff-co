import React from "react";
import Navbar from "../../molecules/Navbar/Navbar";
import Footer from "../../molecules/Footer/Footer";
import Cards from "../../molecules/cards/Cards";
// iconos de servicios
import { GiTestTubes } from "react-icons/gi";
import { GiDrippingTube } from "react-icons/gi";
import { GiCoffeeBeans } from "react-icons/gi";
import { PiCoffeeBeanFill } from "react-icons/pi";

const ServiciosPlantilla = () => {
  const servicios = [
    {
      icon: <GiTestTubes />,
      title: "Alquiler Laboratorio",
      description: "Accede a nuestro laboratorio para tus análisis.",
    },
    {
      icon: <GiCoffeeBeans />,
      title: "Servicio de Trilla",
      description: "Realiza el proceso de trilla con los mejores equipos.",
    },
    {
      icon: <PiCoffeeBeanFill />,
      title: "Servicio de Tostión",
      description: "Tosta tus granos con precisión y calidad.",
    },
    {
      icon: <GiDrippingTube />,
      title: "Análisis Físico y Sensorial",
      description: "Obtén un análisis detallado de tus productos.",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen overflow-hidden ">
        <div className="w-full absolute">
          <Navbar />
        </div>
        <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-10 justify-between mt-28">
          {servicios.map((servicio, index) => (
            <div key={index} className="w-full mb-4">
              <Cards
                title={servicio.title}
                span={servicio.description}
                icons={[{ icon: servicio.icon }]}
              />
            </div>
          ))}
        </div>
        <div className="mt-auto w-screen">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ServiciosPlantilla;
