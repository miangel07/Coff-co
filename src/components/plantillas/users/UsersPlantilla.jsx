import React, { useState, useEffect } from "react";
//Cabecera del componente
import Mybutton from "../../atoms/Mybutton";
import Search from "../../atoms/Search";
import { Switch } from "@nextui-org/react";
//Tabla y paginacion
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Tbody from "../../molecules/table/Tbody";
import { Spinner } from "@nextui-org/react"; //El cosito que gira mientras algo carga
import { FaRegEdit } from "react-icons/fa"; // Icono editar 
//Funciones crud redux
import { useActualizarEstadoMutation, useActualizarUsuarioMutation, useEliminarUsuarioMutation, useGetUsuarioQuery, useGetRolesQuery, useRegistrarUsuarioMutation } from "../../../store/api/users";
import { useGetRolQuery } from "../../../store/api/roles";
//Traduccion y alertas
import { useTranslation } from 'react-i18next';
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
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

  // FUNCIONES CRUD (Llamadas desde redux y a su vez desde el backend)
  // Redux nos provee data, isLoading entre otras, para manejar la respuesta del endpoint:
  // 'data' contiene la respuesta, 'isLoading' indica si la solicitud está en curso.
  const {data,isLoading} = useGetUsuarioQuery() //Las clave data, isLoading y refetch ya vienen con redux y las utilizamos para manejar la respuesta del endpoint
  const {data: dato} = useGetRolesQuery(); //Aqui le asignamos alias a esas clave ya que deben tener identificadores unicos, aqui: dato es un alias que trabaja como data manejando la informacion que devuelve la funcion de listar Roles
  const {data: roles}= useGetRolQuery();
  const [registrarUsuario] = useRegistrarUsuarioMutation(); //Aqui solo estamos llamando a la funcion y asignandole un identificador para utilizarla 
  const [actualizarEstado] = useActualizarEstadoMutation();
  const [actualizarUsuario]= useActualizarUsuarioMutation();

  //FILTRO DE DATOS Y TRADUCCION
  const { t } = useTranslation(); //Esto es para identificar palabras al traducir y hacerlo, esta es una funcion de react y trabaja con los archivos json que contienen las posibles palabras atraducir
  const [busqueda, setBusqueda] = useState('') // Este es un UseState comun, especificamente lo utilizamos para almacenar el texto que se introduce en el input de busqueda, lo identificamos por el nombre 'Busqueda' un UseState podria almacenar lo que fuera sabe
  const [filtroEstado, setFiltroEstado] = useState(true); //Este es un UseState que se encarga de manejar un valor como true o false y se comporta de manera diferente dependiendo de este estado, en este caso para alterar lo que muestra la tabla en su estado true, (usuarios activos o inacitvos)

  //MODAL 
  const {handleSubmit, register, watch, setValue, formState: { errors },reset,} = useForm(); // Funciones proporcionadas por userForm de react para manejar el comportamiento del formulario de registro y acutlizacion utilizado en los modales con la misma funcion

  //Abrir modal
  const [openModal, setOpenModal] = useState(false); //Abrir o cerrar modal de registro
  const [openModalActualizar, setOpenModalActualizar] = useState(false); //Abrir o cerrar modal de actualizacion

  //MODAL REGISTRAR
  const handleClick = () => {setOpenModal(true);}; //Funciona para abrir el modal de registro definiendo el estado del usestate openModal en true, lo utilizamos en el boton de 'Registrar Usuario' y mas abajo en el renderizado mostramos el modal dependiendo de si openModal es true o false 
  const closeModal = () => {setOpenModal(false);reset() //Lo mismo de la linea de arriba
  };

  //MODAL ACTUALIZAR
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); 
  // Estado que guarda el usuario seleccionado para su actualización. Inicialmente es 'null' es decir vacio, hasta que se seleccione un usuario.
  const handleClickActualizar = (usuario) => {
    console.log("Usuario seleccionado:", usuario); 
    // Imprime el usuario seleccionado en la consola para depuración, la depuracion se utiliza para verificar el funcionamiento o contenido de lo que hacemos
    setUsuarioSeleccionado(usuario);
    // Actualiza el estado con el usuario seleccionado.

    setOpenModalActualizar(true);
    // Abre el modal para actualizar la información del usuario seleccionado.
  };
  
    
  //CAMBIAR EL ESTADO DEL USUARIO
  //Despues del async le estamos pasando dos propiedas id_usuario y nombre, es decir que esta funcion espera recibir estos parametros, los cuales se los enviaremos abajo en el renderizado cuando la misma funcion sea llamada
  const handleSwitchChange = async (id_usuario, nombre) => {
    // Muestra un cuadro de confirmación antes de cambiar el estado del usuario
    confirmAlert({
      title: `${t("confirmacion")}`, 
      // Título del cuadro de confirmación traducido
      message: `¿ ${t("cambioestadousuario")}  ${nombre}?`, 
      // Mensaje que pregunta si se desea cambiar el estado del usuario con su nombre incluido
      buttons: [
        {
          label: 'Sí', 
          // Opción para confirmar el cambio de estado
          onClick: async () => {
            try {
              await actualizarEstado(id_usuario).unwrap(); 
              // Llama a la función para actualizar el estado del usuario
              toast.success(t("cambioestadoexitoso"));
              // Muestra un mensaje de éxito si el estado se cambia correctamente
            } catch (error) {
              toast.error(error.error);
              // Muestra un mensaje de error si algo falla
              console.log(t("cambioestadofallido"), error);
              // Imprime el error en la consola para depuración
            }
          }
        },
        {
          label: 'No', 
          // Opción para cancelar el cambio de estado
          onClick: () => toast.warn(t("operacioncancelada"))
          // Muestra un mensaje de advertencia indicando que la operación fue cancelada
        }
      ],
      closeOnClickOutside: true, 
      // Permite cerrar el cuadro de confirmación al hacer clic fuera de él
    });
  };
  
  //Funcion para cerrar el modal de acutlizacion lo utilizaremos cuando se clickea cerrar en el moddal o cuando se actuzaliza un usuario
  const closeModalActualizar = () => {setOpenModalActualizar(false);reset()};

  //SUBMIT REGISTRAR
  //Esta funcion espera un parametro data que le anviaremos en el formulario de registro
  const onsubmit = async (data) => {
    try {
      // Llama a la función 'registrarUsuario' con los datos proporcionados, y espera la respuesta sin envolver en error
      const response = await registrarUsuario(data).unwrap(); 
  
      // Muestra una notificación de éxito con el mensaje de la respuesta
      toast.success(response.message, {
        duration: 5000, // La notificación dura 5 segundos
        position: "top-center", // La notificación aparece en la parte superior central
        style: {
          background: "#333", // Color de fondo de la notificación
          color: "#fff", // Color del texto de la notificación
        },
        icon: <FcOk />, // Icono que se muestra en la notificación
      });
  
      // Cierra el modal después de registrar el usuario
      setOpenModal(false);
      
      // Reinicia el formulario utilizando el reset proveido por useForm de react
      reset();
    } catch (error) {
      // En caso de error, obtiene los mensajes de error y los une en una cadena
      const mensajesError = error.errors.join(', ');
  
      // Muestra una notificación de error con los mensajes de error o un mensaje genérico
      toast.error(mensajesError || "Ocurrió un error", {
        duration: 5000, // La notificación dura 5 segundos
        position: "top-center", // La notificación aparece en la parte superior central
        style: {
          background: "#333", // Color de fondo de la notificación
          color: "#fff", // Color del texto de la notificación
        },
      });
    }
  };
  
  // SUBMIT ACTUALIZAR
  const onsubmitActualizar = async (valores) => {
    // Verifica si hay un usuario seleccionado antes de continuar
    if (usuarioSeleccionado) {
      try {
        // Llama a la función asíncrona 'actualizarUsuario' pasando los valores del formulario y el ID del usuario seleccionado
        const response = await actualizarUsuario({ data: valores, id: usuarioSeleccionado.id_usuario }).unwrap();
        
        // Muestra una notificación de éxito con el mensaje de la respuesta
        toast.success(response.message, {
          duration: 5000, // La notificación dura 5 segundos
          position: "top-center", // Aparece en la parte superior central
          style: {
            background: "#333", // Color de fondo de la notificación
            color: "#fff", // Color del texto
          },
          icon: <FcOk />, // Icono que se muestra junto al mensaje
        });
  
        // Imprime en la consola los valores enviados para depuración
        console.log('Valores enviados:', valores);
        
        // Cierra el modal después de la actualización
        setOpenModalActualizar(false);
  
        // Reinicia el formulario
        reset();
      } catch (error) {
        // Maneja el error, asegurándose de que 'error.errors' exista antes de unir los mensajes
        const mensajesError = error.errors ? error.errors.join(', ') : "Ocurrió un error";
        
        // Muestra una notificación de error con los mensajes correspondientes
        toast.error(mensajesError, {
          duration: 5000, // Duración de 5 segundos
          position: "top-center", // Aparece en la parte superior central
          style: {
            background: "#333", // Color de fondo
            color: "#fff", // Color del texto
          },
        });
        
        // Imprime los mensajes de error en la consola para depuración
        console.log(mensajesError);
        
        // Imprime nuevamente los valores enviados para depuración
        console.log('Valores enviados:', valores);
      }
    }
  };
  
  // ESTADO DE CARGA DE LA TABLA 
  //Llamamos el estado isLoading de la consulta de listar usuarios y mientras carga llamamos un return que retorna el cosito de carga, esto reemplazara la tabla mientras se esta cargando
  if(isLoading){
    return(
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    )
  }

  // Verifica si 'data' existe, data viene de la funcion de listar usuarios mas arriba y tiene al menos un elemento; si es así, filtra los usuarios según la condición proporcionada. 
  // Si 'data' es null, undefined o está vacío, se devuelve un arreglo vacío.
  const filtrodeDatos = data && data.length > 0 ? data.filter((usuario) => {
    const filtroestado = filtroEstado ? "activo" : "inactivo"; // Determina el estado a filtrar (activo o inactivo) según el valor de 'filtroEstado'
    
    const nombreUsuario = busqueda === "" ||
      (usuario.nombre && usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    // Verifica si el campo de búsqueda está vacío o si el nombre del usuario incluye el texto buscado, ignorando mayúsculas y minúsculas.
    
    const usuarioEstado = usuario.estado === filtroestado;
    // Comprueba si el estado del usuario coincide con el estado determinado por 'filtroEstado'.
    
    return usuarioEstado && nombreUsuario;
    // Solo incluye el usuario en el filtro si ambos: el estado y el nombre coinciden con los criterios de búsqueda.
  }) : [];
  // Si 'data' existe y tiene longitud mayor a 0, filtra los datos de usuarios; de lo contrario, devuelve un arreglo vacío.
  
  // CONTROL DE PAGINAS DE LA TABLA
  const indiceUltimoItem = paginaActual * itemsPorPagina; 
  // Calcula el índice del último elemento a mostrar en la página actual.
  
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina; 
  // Calcula el índice del primer elemento a mostrar en la página actual.
  
  const elementosActuales = filtrodeDatos.slice(indicePrimerItem, indiceUltimoItem); 
  // Toma los datos filtrados para mostrar solo los elementos que corresponden a la página actual.
  
  const totalPages = Math.ceil((filtrodeDatos?.length || 0) / itemsPorPagina);
  // Calcula el número total de páginas dividiendo la longitud de los datos filtrados entre los ítems por página. 
  // Se usa 'Math.ceil' para redondear hacia arriba, garantizando que se incluya una última página si hay elementos sobrantes.
  
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
    <div className=" flex rounded-tl-xl flex-col gap-8 bg-gray-100 overflow-y-hidden">

    {/* TABLA */}
    <div className="flex pt-5 justify-center items-center ">
    <div>
      <Mybutton onClick={handleClick} color={"primary"}>{t("nuevoUsuario")} <IoPersonAddOutline /></Mybutton>
    </div>
    <div className="w-[550px] pl-20">
        <Search label={""} placeholder={t("buscar")} onchange={(e) => setBusqueda(e.target.value)} />
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

     {/* CARDS */}
     {dato && dato.usuariosPorRol && dato.usuariosPorRol.length > 0 ? (
    <div className="flex justify-center items-center gap-4 px-20 py-6">
    {/* Card Administrador */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
    <h2 className="text-lg font-bold mb-2">{t("admin")}</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[0]?.total_usuarios || '0'}
      />
      <i className="bi bi-person-lock text-2xl"></i>
    </div>

    {/* Card Encargado */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
    <h2 className="text-lg font-bold mb-2">{t("encargado")}</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[1]?.total_usuarios || '0'}
      />
      <i className="bi bi-person-check text-2xl"></i>
    </div>

    {/* Card Cliente */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
    <h2 className="text-lg font-bold mb-2">{t("cliente")}</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[2]?.total_usuarios || '0'}
      />
      <i className="bi bi-person text-2xl"></i>
    </div>

    {/* Card Operario */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
    <h2 className="text-lg font-bold mb-2">{t("operario")}</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato.usuariosPorRol[3]?.total_usuarios || '0'}
      />
      <i className="bi bi-person-gear text-2xl"></i>
    </div>

    {/* Card Total */}
    <div className="bg-white rounded-lg shadow-md p-6 w-40 text-center">
    <h2 className="text-lg font-bold mb-2">{t("total")}</h2>
      <input
        disabled
        type="text"
        className="w-full p-2 text-center  rounded-md"
        placeholder={dato?.total || '0'}
      />
      <i className="bi bi-people text-2xl"></i>
    </div>
    </div>
    ) : (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    )}
    
    <div className="w-full px-20 h-auto ">
      <TableMolecula className="w-full">
        <Thead>
          <Th>ID</Th>
          <Th>{t("nombre")}</Th>
          <Th>{t("apellidos")}</Th>
          <Th>{t("correo")}</Th>
          <Th>{t("telefono")}</Th>
          <Th>{t("documento")}</Th>
          <Th>{t("tipo")}</Th>
          {/* <Th>Estado</Th> */}
          <Th>{t("rol")}</Th>
          <Th>{t("editar")}</Th>
          <Th>{t("estado")}</Th>
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
                <Td>{usuario.rol}</Td>
                <Td>
                <div className="flex justify-center items-center space-x-4">
                  
                <button
                  className="group bg-none flex cursor-pointer items-center justify-center h-[30px] w-[60px] rounded-[5px] border-none hover:rounded-full hover:bg-gray-400/30"
                  onClick={() => handleClickActualizar(usuario)}
                >
                <FaRegEdit/>
                </button>
                </div>
                </Td>
                <Td>
                  <CustomSwitch
                      setisSelected={usuario.estado === "activo"}
                      onChange={() => handleSwitchChange(usuario.id_usuario, usuario.nombre)}
                  />
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
    <div className="flex justify-center mt-4 mb-5">
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
                    placeholder={t("ingreseNombreUsuario")}
                    type={"text"}
                  />
                  <InputAtomo
                    register={register}
                    name={"apellidos"}
                    erros={errors}
                    id={"apellidos"}
                    placeholder={t("ingreseApellidoUsuario")}
                    type={"text"}
                  />
                  <InputAtomo
                    register={register}
                    name={"correo_electronico"}
                    erros={errors}
                    id={"correo_electronico"}
                    placeholder={t("ingreseCorreoUsuario")}
                    type={"text"}
                  />
                  <InputAtomo
                    register={register}
                    name={"telefono"}
                    erros={errors}
                    id={"telefono"}
                    placeholder={t("ingreseTelefonoUsuario")}
                    type={"number"}
                  />
                  <InputAtomo
                    register={register}
                    name={"password"}
                    erros={errors}
                    id={"password"}
                    placeholder={t("ingreseContrasenaUsuario")}
                    type={"password"}
                  />
                  <SelectAtomo
                    data={roles.map(role => ({ value: role.idRol, label: role.rol }))} // Mapeo de roles
                    label={t("rol")} 
                    onChange={(e) => setValue("rol", e.target.value)} 
                    items={"value"} 
                    ValueItem={"label"} 
                    value={watch("rol")} 
                  />
                  <SelectAtomo
                    data={documentoOptions} 
                    label={t("tipoDocumento")} 
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
                    placeholder={t("ingreseNumeroIdentificacion")}
                    type={"number"}
                  />
                </>
              }
            />
          }
          visible={true}
          title={t("registroUsuarios")}
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
                placeholder={t("ingreseNombreUsuario")}
                type={"text"}
                defaultValue={usuarioSeleccionado?.nombre || ""}
              />
              <InputAtomoActualizar
                register={register}
                name={"apellidos"}
                errores={errors}
                id={"apellidos"}
                placeholder={t("ingreseApellidoUsuario")}
                type={"text"}
                defaultValue={usuarioSeleccionado?.apellidos || ""}
              />
              <InputAtomoActualizar
                register={register}
                name={"correo_electronico"}
                errores={errors}
                id={"correo_electronico"}
                placeholder={t("ingreseCorreoUsuario")}
                type={"text"}
                defaultValue={usuarioSeleccionado?.correo_electronico || ""}
              />
              <InputAtomoActualizar
                register={register}
                name={"telefono"}
                errores={errors}
                id={"telefono"}
                placeholder={t("ingreseTelefonoUsuario")}
                type={"text"}
                defaultValue={usuarioSeleccionado?.telefono || ""}
              />
              <SelectAtomoActualizar
                data={roles.map(role => ({ value: role.idRol, label: role.rol }))}
                label={t("rol")} 
                items={"value"}
                onChange={(e) => setValue("fk_idRol", e.target.value)}
                placeholder={usuarioSeleccionado?.rol}
                value={usuarioSeleccionado?.fk_idRol || ""}
              />

              <SelectAtomoActualizar
                data={documentoOptions}
                label={t("tipoDocumento")} 
                items={"value"}
                placeholder={usuarioSeleccionado?.tipo_documento}
                onChange={(e) => setValue("tipo_documento", e.target.value)}
                value={usuarioSeleccionado?.tipo_documento || ""}
              />

              <InputAtomoActualizar
                register={register}
                name={"numero_documento"}
                errores={errors}
                id={"numero_documento"}
                placeholder={t("ingreseNumeroIdentificacion")}
                type={"number"}
                defaultValue={usuarioSeleccionado?.numero_documento || ""}
              />
            </>
          }
        />
      }
      visible={true}
      title={t("actualizarUsuario")}
      closeModal={closeModalActualizar}
    />

    )}
    {/* FIN MODAL ACTUALIZAR*/}
    </div>
    </>
  );
};

export default UsersPlantilla;
