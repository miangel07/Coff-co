import React from "react";
import UsuarioOrganismo from "../../organismo/users/UsuarioOrganismo";
import Navbar from "../../molecules/Navbar/Navbar"

const UsersPlantilla = () => {
  return (
    <div className=" min-w-full  min-h-screen ">
      <div>
        <Navbar/>
      </div>
      <div className="md:mt-32">
      <UsuarioOrganismo />

      </div>
    </div>
  );
};

export default UsersPlantilla;
