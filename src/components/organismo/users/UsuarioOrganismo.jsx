import React from "react";
import UserTable from "../../molecules/users/UserTable";
import CardMolecula from "../../molecules/users/CardMolecula";
import Mybutton from "../../atoms/Mybutton";
import { IoPersonAddOutline } from "react-icons/io5";

const UsuarioOrganismo = () => {
  return (
    <div className="max-w-full min-h-screen ">
      <div className="mt-4 ">
        <CardMolecula />
      </div>
      <div className=" w-full justify-center flex mt-16">
        <div className="w-5/6">
      
          <Mybutton color={"primary"}>Nuevo <IoPersonAddOutline/></Mybutton>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UsuarioOrganismo;
