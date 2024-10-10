import React, { useState, useEffect } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Tbody from "../../molecules/table/Tbody";
import Search from "../../atoms/Search";
import { useTranslation } from 'react-i18next';
import { useActualizarEstadoMutation, useActualizarUsuarioMutation, useEliminarUsuarioMutation, useGetUsuarioQuery, useRegistrarUsuarioMutation } from "../../../store/api/users";
import { Spinner } from "@nextui-org/react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { Switch } from "@nextui-org/react";

//Importaciones para el modal
import { IoPersonAddOutline } from "react-icons/io5";
import SelectAtomo from "../../atoms/Select";
import SelectAtomoActualizar from "../../atoms/SelectActualizar";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import Logosímbolo from "../../atoms/Logosímbolo";
import UserFrom from "../../molecules/Formulario/UserFrom";
import InputAtomo from "../../atoms/Input";
import InputAtomoActualizar from "../../atoms/InputActualizar";
import CustomSwitch from "../../atoms/CustomSwitch";
import { useForm } from "react-hook-form";
import { FcOk } from "react-icons/fc";
import Td from "../../atoms/Td";

const RegistrarsePlantilla = () => {

  const [registrarUsuario, { isSuccess, datos, isError, error }] = useRegistrarUsuarioMutation();

  //MODAL 
  const {handleSubmit, register, watch, setValue, formState: { errors },reset,} = useForm();

  //ROLES
  const [roles, setRoles] = useState([]); 
  useEffect(() => {
      // Función para obtener los roles desde el backend
      const fetchRoles = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/rol/listar'); 
          const data = await response.json();
          setRoles(data);
        } catch (error) {
          console.error('Error al obtener los roles:', error);
        }
      };
      fetchRoles();
  }, []);

  const [sucess, setsucess] = useState("");

  //SUBMIT REGISTRAR
  const onsubmit = (data) => {
    registrarUsuario(data);
    reset();
    toast.success("Usuario registrado con éxito");
  };

  //Para registrar
  useEffect(() => {
    if (isSuccess) {
      setsucess(datos?.message);
      toast.success(datos?.message, {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: <FcOk />,
      });
    }

    if (isError) {
      console.log(error);
      toast.error(error?.error || "Ocurrió un error", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [isSuccess, isError, error, datos]);

  const defaultValue = 4

  useEffect(() => {
    setValue("rol", defaultValue);
  }, [setValue, defaultValue]);


  //OPCIONES PARA LOS SELECT 
  const estadoOptions = [
    { value: "activo", label: "Activo" },
    { value: "inactivo", label: "Inactivo" }
  ];

  const documentoOptions = [
    { value: "cc", label: "cc" },
    { value: "ti", label: "ti" },
    { value: "nit", label: "nit" },
    { value: "pasaporte", label: "pasaporte" },
  ];
  
  return (
    <>
    {/* MODAL REGISTRO*/}

            <UserFrom
              onsubmit={handleSubmit(onsubmit)}
              children={
                <>
                  <InputAtomo
                  register={register}
                  name={"nombre"}
                  erros={errors}
                  id={"nombre"}
                  placeholder={"Ingrese el nombre del usuario"}
                  type={"text"}
                />
                <InputAtomo
                  register={register}
                  name={"apellidos"}
                  erros={errors}
                  id={"apellidos"}
                  placeholder={"Ingrese el  apellido del usuario"}
                  type={"text"}
                />
                <InputAtomo
                  register={register}
                  name={"correo_electronico"}
                  erros={errors}
                  id={"correo_electronico"}
                  placeholder={"Ingrese el  correo del usuario"}
                  type={"email"}
                />
                <InputAtomo
                  register={register}
                  name={"telefono"}
                  erros={errors}
                  id={"telefono"}
                  placeholder={"Ingrese el telefono del usuario"}
                  type={"number"}
                />
                <InputAtomo
                  register={register}
                  name={"password"}
                  erros={errors}
                  id={"password"}
                  placeholder={"Ingrese la contraseña del usuario"}
                  type={"password"}
                />

                <SelectAtomo
                data={roles.map(role => ({ value: role.idRol, label: role.rol }))} 
                label={"Rol"}
                onChange={(e) => setValue("rol", e.value)} 
                items={"value"}
                ValueItem={"label"}
                value={watch("rol") || defaultValue} 
                habilitado={true} 
                />

                <SelectAtomo
                  data={estadoOptions} 
                  label={"Estado"} 
                  onChange={(e) => setValue("estado", e.target.value)} 
                  items={"value"} 
                  ValueItem={"label"} 
                  value={watch("estado")} 
                />

                <SelectAtomo
                  data={documentoOptions} 
                  label={"Tipo Documento"} 
                  onChange={(e) => setValue("tipo_documento", e.target.value)} 
                  items={"value"} 
                  ValueItem={"label"} 
                  value={watch("tipo_documento")} 
                />

                <InputAtomo
                  register={register}
                  name={"numero_documento"}
                  erros={errors}
                  id={"numero_documento"}
                  placeholder={"Ingrese el numero de identificación del usuario"}
                  type={"number"}
                />
                </>
              }
            />
    
    {/* FIN MODAL REGISTRO*/}
    </>
  );
};

export default RegistrarsePlantilla;
