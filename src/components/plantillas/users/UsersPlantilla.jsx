import React, { useState, useEffect } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import { useActualizarUsuarioMutation, useEliminarUsuarioMutation, useGetUsuarioQuery, useRegistrarUsuarioMutation } from "../../../store/api/users";
import { Spinner } from "@nextui-org/react";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
//Importaciones para el modal
import { IoPersonAddOutline } from "react-icons/io5";
import SelectAtomo from "../../atoms/Select";
import SelectAtomoActualizar from "../../atoms/SelectActualizar";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import Logosímbolo from "../../atoms/Logosímbolo";
import UserFrom from "../../molecules/Formulario/UserFrom";
import InputAtomo from "../../atoms/Input";
import InputAtomoActualizar from "../../atoms/InputActualizar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcOk } from "react-icons/fc";
import Td from "../../atoms/Td";

const UsersPlantilla = () => {

  //CONTROL DE LA PAGINACION
  const [paginaActual,setPaginaActual]= useState(1)
  const itemsPorPagina = 7

  // FUNCIONES CRUD
  const {data,isLoading, refetch} = useGetUsuarioQuery()
  const [registrarUsuario, { isSuccess, datos, isError, error }] = useRegistrarUsuarioMutation();
  const [actualizarUsuario, { correcto, valores, problema, hayerror }]= useActualizarUsuarioMutation()
  const [eliminarUsuario]= useEliminarUsuarioMutation()

  //MODAL 
  const {handleSubmit, register, watch, setValue, formState: { errors },reset,} = useForm();

  const [roles, setRoles] = useState([]); // Estado para almacenar los roles

  useEffect(() => {
    // Función para obtener los roles desde el backend
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/rol/listar'); // Ajusta la URL según tu backend
        const data = await response.json();
        setRoles(data); // Almacena los roles en el estado
      } catch (error) {
        console.error('Error al obtener los roles:', error);
      }
    };

    fetchRoles();
  }, []);

    //Abrir modal
    const [openModal, setOpenModal] = useState(false);
    const [openModalActualizar, setOpenModalActualizar] = useState(false);
    const [sucess, setsucess] = useState("");

    //Modal registrar
  const handleClick = () => {setOpenModal(true);};
  const closeModal = () => {setOpenModal(false);reset()};

    //Modal Actualizar
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const handleClickActualizar = (usuario) => {
    console.log("Usuario seleccionado:", usuario); 
    setUsuarioSeleccionado(usuario);
    setOpenModalActualizar(true);
  };
  
  const closeModalActualizar = () => {setOpenModalActualizar(false);reset()};

  //SUBMIT REGISTRAR
  const onsubmit = (data) => {
    registrarUsuario(data);
    reset();
    setOpenModal(false);
  };

  //SUBMIT ACTUALIZAR
  const onsubmitActualizar = (valores) => {
    if (usuarioSeleccionado) {
      console.log("valores enviados:", valores);
      actualizarUsuario({ data: valores, id: usuarioSeleccionado.id_usuario });
      reset();
      setOpenModalActualizar(false);
    }
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

  //Para actualizar
  useEffect(() => {
    if (correcto) {
      setsucess(valores?.message);
      toast.success(valores?.message, {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: <FcOk />,
      });
    }

    if (problema) {
      console.log(hayerror);
      toast.error(hayerror?.hayerror || "Ocurrió un error", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [correcto, problema, hayerror, valores]);


  // ESTADO DE CARGA DE LA TABLA 
  if(isLoading){
    return(
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    )
  }

  // CONTROL DE PAGINAS DE LA TABLA
  const indiceUltimoItem = paginaActual * itemsPorPagina
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina
  const elementosActuales = data ? data.slice(indicePrimerItem,indiceUltimoItem):[]
  const totalPages = Math.ceil((data?.length||0)/itemsPorPagina)

  //OPCIONES PARA LOS SELECT 
  const estadoOptions = [
    { value: "activo", label: "Activo" },
    { value: "inactivo", label: "Inactivo" }
  ];

  const documentoOptions = [
    { value: "cc", label: "C.C" },
    { value: "ti", label: "T.I" },
    { value: "nit", label: "N.I.T" },
    { value: "pasaporte", label: "Pasaporte" },
  ];
  

  return (
    <>
      <div className="w-auto h-screen flex flex-col gap-8 bg-gray-100">

      {/* TABLA */}
        <div className="pt-10 pl-20">
          <Mybutton onClick={handleClick} color={"primary"}>Nuevo usuario <IoPersonAddOutline/></Mybutton>
        </div>
        <div className="w-full px-20 h-auto overflow-y-auto">
          <TableMolecula lassName="w-full">
            <Thead>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Correo</Th>
              <Th>Telefono</Th>
              <Th>Documento</Th>
              <Th>Tipo</Th>
              <Th>Estado</Th>
              <Th>Rol</Th>
              <Th>Acciones</Th>
            </Thead>
            <Tbody>
              {elementosActuales.length>0?(
                elementosActuales.map((usuario)=>(
                  <tr className="'hover:bg-slate-200" key={usuario.id_usuario}>
                    <Td>{usuario.id_usuario}</Td>
                    <Td>{usuario.nombre}</Td>
                    <Td>{usuario.apellidos}</Td>
                    <Td>{usuario.correo_electronico}</Td>
                    <Td>{usuario.telefono}</Td>
                    <Td>{usuario.numero_documento}</Td>
                    <Td>{usuario.tipo_documento}</Td>
                    <Td>{usuario.estado}</Td>
                    <Td>{usuario.rol}</Td>
                    <Td>
                    <div className="flex justify-center items-center space-x-4">
                      <Mybutton color={"primary"} onClick={() => handleClickActualizar(usuario)}>Actualizar</Mybutton>
                      <Mybutton color={"danger"} onClick={() => eliminarUsuario(usuario.id_usuario)}> Eliminar </Mybutton>
                    </div>
                    </Td>
                  </tr>
                ))
              ):(
                <tr>
                <td colSpan={9} className="text-center">
                  <h1 className="text-2xl">
                    <b>No hay datos</b>
                  </h1>
                </td>
              </tr>
              )
              }

            </Tbody>
          </TableMolecula>
        </div>
        <div className="flex justify-center mt-4">
            <PaginationMolecula
            total={totalPages}
            initialPage={paginaActual}
            onChange={(pagina)=>setPaginaActual(pagina)}
            />
        </div>
      {/* FIN TABLA */}

     {/* MODAL REGISTRO*/}
      {openModal && (
            <ModalOrganismo
            logo={<Logosímbolo />}
            children={
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
                    data={roles.map(role => ({ value: role.idRol, label: role.rol }))} // Mapeo de roles
                    label={"Rol"} 
                    onChange={(e) => setValue("rol", e.target.value)} 
                    items={"value"} 
                    ValueItem={"label"} 
                    value={watch("rol")} 
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
            }
            visible={true}
            title={"Registro de Usuarios"}
            closeModal={closeModal}
          />
      )}
     {/* FIN MODAL REGISTRO*/}

     {/* MODAL ACTUALIZAR*/}
     {openModalActualizar && (
    <ModalOrganismo
      logo={<Logosímbolo />}
      children={
        <UserFrom
          onsubmit={handleSubmit(onsubmitActualizar)}
          children={
            <>
              <InputAtomoActualizar
                register={register}
                name={"nombre"}
                errores={errors}
                id={"nombre"}
                placeholder={"Ingrese el nombre del usuario"}
                type={"text"}
                defaultValue={usuarioSeleccionado?.nombre || ""}
              />
              <InputAtomoActualizar
                register={register}
                name={"apellidos"}
                errores={errors}
                id={"apellidos"}
                placeholder={"Ingrese el apellido del usuario"}
                type={"text"}
                defaultValue={usuarioSeleccionado?.apellidos || ""}
              />
              <InputAtomoActualizar
                register={register}
                name={"correo_electronico"}
                errores={errors}
                id={"correo_electronico"}
                placeholder={"Ingrese el correo del usuario"}
                type={"text"}
                defaultValue={usuarioSeleccionado?.correo_electronico || ""}
              />
              <InputAtomoActualizar
                register={register}
                name={"telefono"}
                errores={errors}
                id={"telefono"}
                placeholder={"Ingrese el teléfono del usuario"}
                type={"text"}
                defaultValue={usuarioSeleccionado?.telefono || ""}
              />
              <InputAtomoActualizar
                register={register}
                name={"password"}
                errores={errors}
                id={"password"}
                placeholder={"Ingrese la contraseña del usuario"}
                type={"password"}
                defaultValue={usuarioSeleccionado?.password || ""}
              />

              <SelectAtomoActualizar
                data={roles.map(role => ({ value: role.idRol, label: role.rol }))}
                label={"Rol"}
                onChange={(e) => setValue("rol", e.target.value)}
                items={"value"}
                ValueItem={"label"}
                placeholder={usuarioSeleccionado?.rol}
                value={usuarioSeleccionado?.fk_idRol || ""}
              />

              <SelectAtomoActualizar
                data={estadoOptions}
                label={"Estado"}
                onChange={(e) => setValue("estado", e.target.value)}
                items={"value"}
                ValueItem={"label"}
                placeholder={usuarioSeleccionado?.estado}
                value={'inactivo'}
              />

              <SelectAtomoActualizar
                data={documentoOptions}
                label={"Tipo Documento"}
                onChange={(e) => setValue("tipo_documento", e.target.value)}
                items={"value"}
                ValueItem={"label"}
                placeholder={usuarioSeleccionado?.tipo_documento}
                value={usuarioSeleccionado?.tipo_documento || ""}
              />

              <InputAtomoActualizar
                register={register}
                name={"numero_documento"}
                errores={errors}
                id={"numero_documento"}
                placeholder={"Ingrese el número de identificación del usuario"}
                type={"number"}
                defaultValue={usuarioSeleccionado?.numero_documento || ""}
              />
            </>
          }
        />
      }
      visible={true}
      title={"Actualizar Usuario"}
      closeModal={closeModalActualizar}
    />
  )}
     {/* FIN MODAL ACTUALIZAR*/}
      </div>
    </>
  );
};

export default UsersPlantilla;
