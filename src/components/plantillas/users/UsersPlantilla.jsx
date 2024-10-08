import React, { useState, useEffect } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Tbody from "../../molecules/table/Tbody";
import Search from "../../atoms/Search";
import { useTranslation } from 'react-i18next';
import { useActualizarEstadoMutation, useActualizarUsuarioMutation, useEliminarUsuarioMutation, useGetUsuarioQuery, useGetRolesQuery, useRegistrarUsuarioMutation } from "../../../store/api/users";
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

const UsersPlantilla = () => {

  //CONTROL DE LA PAGINACION
  const [paginaActual,setPaginaActual]= useState(1)
  const itemsPorPagina = 7

  // FUNCIONES CRUD
  const {data,isLoading, refetch} = useGetUsuarioQuery()
  const { data: dato, isLoading: cargando } = useGetRolesQuery();
  const [registrarUsuario, { isSuccess, datos, isError, error }] = useRegistrarUsuarioMutation();
  const [actualizarEstado] = useActualizarEstadoMutation();
  const [actualizarUsuario]= useActualizarUsuarioMutation();
  const [eliminarUsuario] = useEliminarUsuarioMutation();

  //FILTRO DE DATOS
  const { t } = useTranslation();
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState(true);

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

  //Abrir modal
  const [openModal, setOpenModal] = useState(false);
  const [openModalActualizar, setOpenModalActualizar] = useState(false);
  const [sucess, setsucess] = useState("");

  //MODAL REGISTRAR
  const handleClick = () => {setOpenModal(true);};
  const closeModal = () => {setOpenModal(false);reset()};

  //MODAL ACTUALIZAR
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const handleClickActualizar = (usuario) => {
    console.log("Usuario seleccionado:", usuario); 
    setUsuarioSeleccionado(usuario);
    setOpenModalActualizar(true);
  };
    
  //CAMBIAR EL ESTADO DEL USUARIO
  const handleSwitchChange = async (id_usuario, nombre) => {
    confirmAlert({
      title: 'Confirmación',
      message: `¿Cambiar el estado del usuario  ${nombre}?`,
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              await actualizarEstado(id_usuario).unwrap();
              toast.success("Estado actualizado con éxito");
            } catch (error) {
              console.error('Error al actualizar el estado:', error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.warn('Operacion cancelada')
        }
      ],
      closeOnClickOutside: true,
    });
  };  

  useEffect(() => {
    console.log("Usuario seleccionado en modal:", usuarioSeleccionado);
    console.log("Valor actual de tipo_documento:", usuarioSeleccionado?.tipo_documento);
  }, [usuarioSeleccionado]);
  
  const closeModalActualizar = () => {setOpenModalActualizar(false);reset()};

  //SUBMIT REGISTRAR
  const onsubmit = (data) => {
    registrarUsuario(data);
    reset();
    toast.success("Usuario registrado con éxito");
    setOpenModal(false);
  };

  //SUBMIT ACTUALIZAR
  const onsubmitActualizar = (valores) => {
    if (usuarioSeleccionado) {
      console.log("valores enviados:", valores);
      actualizarUsuario({ data: valores, id: usuarioSeleccionado.id_usuario });
      toast.success("Usuario actualizado con éxito");
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

  // ESTADO DE CARGA DE LA TABLA 
  if(isLoading){
    return(
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    )
  }

  const filtrodeDatos = data && data.length > 0 ? data.filter((usuario) => {
    const filtroestado = filtroEstado ? "activo" : "inactivo"
    const nombreUsuario = busqueda === "" ||
      (usuario.nombre && usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    const usuarioEstado = usuario.estado === filtroestado
    return usuarioEstado && nombreUsuario
  }) : []

  // CONTROL DE PAGINAS DE LA TABLA
  const indiceUltimoItem = paginaActual * itemsPorPagina
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina
  const elementosActuales = filtrodeDatos.slice(indicePrimerItem,indiceUltimoItem);
  const totalPages = Math.ceil((data?.length||0)/itemsPorPagina)

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
    <div className="w-auto h-screen flex flex-col gap-8 bg-gray-100">

    {/* CARDS */}
    {dato && dato.usuariosPorRol && dato.usuariosPorRol.length > 0 ? (
    <div className="flex justify-center items-center gap-4 px-20 py-6">
    {/* Card Administrador */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
      <h2 className="text-lg font-bold mb-2">Admin</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[0]?.total_usuarios || '0'}
      />
    </div>

    {/* Card Encargado */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
      <h2 className="text-lg font-bold mb-2">Encargado</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[1]?.total_usuarios || '0'}
      />
    </div>

    {/* Card Cliente */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
      <h2 className="text-lg font-bold mb-2">Cliente</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[2]?.total_usuarios || '0'}
      />
    </div>

    {/* Card Operario */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
      <h2 className="text-lg font-bold mb-2">Operario</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[3]?.total_usuarios || '0'}
      />
    </div>

    {/* Card Total */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
      <h2 className="text-lg font-bold mb-2">Total</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato?.total || '0'}
      />
    </div>
    </div>
    ) : (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    )}

    {/* TABLA */}
    <div className="flex justify-center items-center space-x-64">
    <div className="pl-20">
      <Mybutton onClick={handleClick} color={"primary"}>Nuevo usuario <IoPersonAddOutline/></Mybutton>
    </div>
    <div className="w-[550px] pl-20">
        <Search label={""} placeholder={"Buscar..."} onchange={(e) => setBusqueda(e.target.value)} />
    </div>
    <div className="pl-20">
        <Switch
          color={filtroEstado ? "success" : "default"}
          isSelected={filtroEstado}
          onValueChange={(checked) =>setFiltroEstado(checked)}>
          {t("estado")}
        </Switch>
      </div>
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
          {/* <Th>Estado</Th> */}
          <Th>Rol</Th>
          <Th>Editar</Th>
          <Th>Estado</Th>
        </Thead>
        <Tbody>
          {elementosActuales.length>0?(
            elementosActuales.map((usuario)=>(
              <tr className="hover:bg-slate-200" key={usuario.id_usuario}>
                <Td>{usuario.id_usuario}</Td>
                <Td>{usuario.nombre}</Td>
                <Td>{usuario.apellidos}</Td>
                <Td>{usuario.correo_electronico}</Td>
                <Td>{usuario.telefono}</Td>
                <Td>{usuario.numero_documento}</Td>
                <Td>{usuario.tipo_documento}</Td>
                {/* <Td>{usuario.estado}</Td> */}
                <Td>{usuario.rol}</Td>
                <Td>
                <div className="flex justify-center items-center space-x-4">
                  
                <button
                  className="group bg-none flex cursor-pointer items-center justify-center h-[30px] w-[60px] rounded-[5px] border-none hover:rounded-full hover:bg-gray-400/30"
                  onClick={() => handleClickActualizar(usuario)}
                >
                <svg
                  className="icon-default block group-hover:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                <svg
                  className="icon-hover hidden group-hover:block"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                </svg>
                </button>
                  {/* <Mybutton color={"primary"} onClick={() => handleClickActualizar(usuario)}>Actualizar</Mybutton> */}
                </div>
                </Td>
                <Td>
                  <CustomSwitch
                      setisSelected={usuario.estado === "activo"}
                      onChange={() => handleSwitchChange(usuario.id_usuario, usuario.nombre)}
                  />
                  {/* <Mybutton color={"danger"} onClick={() => eliminarUsuario(usuario.id_usuario)}> Eliminar </Mybutton> */}
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
      // logo={<Logosímbolo />}
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
              {/* 
              <InputAtomoActualizar
                register={register}
                name={"password"}
                errores={errors}
                id={"password"}
                placeholder={"Ingrese la contraseña del usuario"}
                type={"password"}
                defaultValue={usuarioSeleccionado?.password || ""}
              /> */}

              <SelectAtomoActualizar
                data={roles.map(role => ({ value: role.idRol, label: role.rol }))}
                label={"Rol"}
                items={"value"}
                onChange={(e) => setValue("fk_idRol", e.target.value)}
                placeholder={usuarioSeleccionado?.rol}
                value={usuarioSeleccionado?.fk_idRol || ""}
              />

              <SelectAtomoActualizar
                data={documentoOptions}
                label={"Tipo Documento"}
                items={"value"}
                placeholder={usuarioSeleccionado?.tipo_documento}
                onChange={(e) => setValue("tipo_documento", e.target.value)}
                value={usuarioSeleccionado?.tipo_documento || ""}
              />

              {/* <SelectAtomo
                data={estadoOptions}
                label={"Estado"}
                onChange={(e) => setValue("estado", e.target.value)}
                items={"value"}
                ValueItem={"label"}
                placeholder={usuarioSeleccionado?.estado}
                value={usuarioSeleccionado?.estado || ""}
              /> */}
                
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
