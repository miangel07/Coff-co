import React, { useEffect, useState } from "react";
import UserTable from "../../molecules/users/UserTable";
import CardMolecula from "../../molecules/users/CardMolecula";
import Mybutton from "../../atoms/Mybutton";
import { IoPersonAddOutline } from "react-icons/io5";
import ModalOrganismo from "../Modal/ModalOrganismo";
import Logosímbolo from "../../atoms/Logosímbolo";
import UserFrom from "../../molecules/Formulario/UserFrom";
import Input from "../../atoms/Input";
import { useForm } from "react-hook-form";
import { usePostUsersMutation } from "../../../store/api/users";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";

const UsuarioOrganismo = () => {
  const [postUsers, { isLoading, isSuccess, data, isError, error }] =
    usePostUsersMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [sucess, setsucess] = useState("");
  const handleClick = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const onsubmit = (data) => {
    console.log(data);
    postUsers(data);
    console.log(data);
  };
  useEffect(() => {
    if (isSuccess) {
      setsucess(data.message);
      window.location.reload();
    }

    if (isError) {
      console.log(error);
    }
  }, [isSuccess, error, data]);

  /* type, placeholder, id, name, erros, register */
  const modal = openModal ? (
    <ModalOrganismo
      logo={<Logosímbolo />}
      children={
        <UserFrom
          onsubmit={handleSubmit(onsubmit)}
          children={
            <>
              <Input
                register={register}
                name={"nombre_usuario"}
                erros={errors}
                id={"nombre"}
                placeholder={"Ingrese el nombre del usuario"}
                type={"text"}
              />
              <Input
                register={register}
                name={"apellido_usuario"}
                erros={errors}
                id={"apellido"}
                placeholder={"Ingrese el  apellido del usuario"}
                type={"text"}
              />
              <Input
                register={register}
                name={"correo_electronico"}
                erros={errors}
                id={"correo"}
                placeholder={"Ingrese el  correo del usuario"}
                type={"text"}
              />
              <Input
                register={register}
                name={"telefono_usuario"}
                erros={errors}
                id={"telefono"}
                placeholder={"Ingrese el   telefono del usuario"}
                type={"text"}
              />
              <Input
                register={register}
                name={"password"}
                erros={errors}
                id={"password"}
                placeholder={"Ingrese el   contraseña del usuario"}
                type={"text"}
              />
              <Input
                register={register}
                name={"rol_usuario"}
                erros={errors}
                id={"rol"}
                placeholder={"Ingrese el  rol del usuario"}
                type={"text"}
              />
              <Input
                register={register}
                name={"tipo_documento"}
                erros={errors}
                id={"tipo_documento"}
                placeholder={"Ingrese el   tipo de documento del usuario"}
                type={"text"}
              />
              <Input
                register={register}
                name={"numero_identificacion"}
                erros={errors}
                id={"numero_identificacion"}
                placeholder={"Ingrese el  numero de identificacion del usuario"}
                type={"number"}
              />
            </>
          }
        />
      }
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
