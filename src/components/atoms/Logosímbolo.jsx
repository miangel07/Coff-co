import React from "react";
import img from "../../../public/logo-sena-verde.jpg";

const Logosímbolo = () => {
  return (
    <div
      className="w-[85px] h-[85px] bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
    </div>
  );
};

export default Logosímbolo;
