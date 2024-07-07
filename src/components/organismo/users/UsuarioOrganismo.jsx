import React, { useState } from "react";
import UserTable from "../../molecules/users/UserTable";
import CardMolecula from "../../molecules/users/CardMolecula";
import Mybutton from "../../atoms/Mybutton";
import { IoPersonAddOutline } from "react-icons/io5";
import { useEffect } from "react";
import ModalOrganismo from "../Modal/ModalOrganismo";
import Logosímbolo from "../../atoms/Logosímbolo";

const UsuarioOrganismo = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const modal = openModal ? (
    <ModalOrganismo
      logo={<Logosímbolo />}
      visible={true}
      title={"Registro de Usuarios"}
      closeModal={closeModal}
    />
  ) : (
    ""
  );
  return (
    <div className="max-w-full min-h-screen ">
      <div className="mt-4 ">
        <CardMolecula />
      </div>
      <div className=" w-full justify-center flex mt-16">
        {modal}
        <div className=" w-[90%] ml-8  mr-8">
          <Mybutton onClick={handleClick} color={"primary"}>
            Nuevo <IoPersonAddOutline />
          </Mybutton>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UsuarioOrganismo;
