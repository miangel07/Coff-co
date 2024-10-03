// import React, { useContext, useState, useEffect } from "react";
// import Mybutton from "../../atoms/Mybutton";
// import {
//   useActualizarEstadoServicioMutation,
//   useGetServicioQuery,
//   useObtenerVariablesParaActualizarServicioMutation,
// } from "../../../store/api/servicio/serviciosSlice";
// import { Spinner, Switch } from "@nextui-org/react";
// import TableMolecula from "../../molecules/table/TableMolecula";
// import Thead from "../../molecules/table/Thead";
// import Th from "../../atoms/Th";
// import Td from "../../atoms/Td";
// import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
// import Tbody from "../../molecules/table/Tbody";
// import { toast } from "react-toastify";
// import { confirmAlert } from "react-confirm-alert";
// import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
// import { useForm } from "react-hook-form";
// import SelectAtomo from "../../atoms/Select";
// import InputAtomo from "../../atoms/Input";
// import { AuthContext } from "../../../context/AuthContext";

// import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";
// import {
//   useObtenerVariablesParaServicioMutation,
//   useRegistrarServicioMutation,
// } from "../../../store/api/servicio/serviciosSlice";
// import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
// import { useGetMuestrasQuery } from "../../../store/api/muestra";
// import { useGetPreciosQuery } from "../../../store/api/precios/preciosSlice";
// import { useGetUsuarioQuery } from "../../../store/api/users";

// const ServiciosPlantilla = () => {

//   //   //acceso al contexto de autenticacion
//   const { authData } = useContext(AuthContext);

//   const {data: dataServicios,isLoading: isLoadingServicios,refetch,} = useGetServicioQuery();

//   //   // Trae los datos de los tipos de servicios
//   const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =useGetTipoServicioQuery();

//   //   // Slice que permite la obtencion de las variables para registrar servicio
//   const [obtenerVariables] = useObtenerVariablesParaServicioMutation();
//  //   // Slice para la obtencion de variables ya registradas segun el servicio
//   const [obtencionVariablesUpdate] = useObtenerVariablesParaActualizarServicioMutation();

//   //   //Slice que permite el registro de un servicio
//   const [registrarServicio] = useRegistrarServicioMutation();

//   //   // Trae los datos de ambientes, muestras, precios y usuarios
//   const { data: dataAmbientes } = useGetAmbientesQuery();
//   const { data: dataMuestras } = useGetMuestrasQuery();
//   const { data: dataUsuarios } = useGetUsuarioQuery();

//   const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();

//   const {
//     setValue,
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [paginaActual, setPaginaActual] = useState(1);
//   const itemsPorPagina = 3;

//   const totalPaginas = Math.ceil((dataServicios?.length || 0) / itemsPorPagina);

//   const indiceUltimoItem = paginaActual * itemsPorPagina;
//   const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
//   const itemsActualesServicios = dataServicios
//     ? dataServicios.slice(indicePrimerItem, indiceUltimoItem)
//     : [];

//   //estados para el manejo de la informacion de los select
//   // const [tipoServicioActual, setTipoServicioActual] = useState("");
//   const [tipoServicioActual, setTipoServicioActual] = useState(null);
//   const [variables, setVariables] = useState([]);
//   console.log("variables para registro: ", variables);
//   const [variablesUpdate, setVariablesUpdate] = useState([]);
//   console.log("variables para actualizacion: ", variablesUpdate);
//   const [ambienteActual, setAmbienteActual] = useState("");
//   const [muestraActual, setMuestraActual] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [servicioSeleccionado, setServicioSeleccionado] = useState(null);



//   if (isLoadingServicios) {
//     return (
//       <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
//     );
//   }

  // Función que maneja el cambio de selección en el select
  // const manejadorobtencionTipoServicio = async (e) => {
  //   const idTipoServicio = e.target.value;
  //   setTipoServicioActual(idTipoServicio);


  //   try {
  //     // Llama a la mutación para obtener las variables con base en el idTipoServicio
  //     const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();
  //     setVariables(respuesta);
  //     // toast.success("Variables obtenidas con éxito!");
  //   } catch (error) {
  //     console.error("Error al obtener las variables: " + error.message);
  //   }
  // };

  
  


//   const abrirModal = async (servicio) => {
//   console.log('servicios cargados al abrir el modal: ',servicio)
//     if (servicio) {
//       setServicioSeleccionado(servicio)
//       setTipoServicioActual(servicio.tipo_servicio)
//       setAmbienteActual(servicio.nombre_ambiente)
//       setMuestraActual(servicio.codigo_muestra)

//       try {
//         // Llamar a la mutación para obtener las variables asociadas al servicio
//         const respuesta = await obtencionVariablesUpdate({ idTipoServicio: servicio.id_servicios }).unwrap();
//         setVariablesUpdate(respuesta); // Establece las variables obtenidas
//       } catch (error) {
//         console.error("Error al obtener las variables para la edición: " + error.message);
//       }


//     }
  
//     setModalVisible(true); 
//   };
  

  


//  // Función para cerrar el modal
//  const cerrarModal = () => {
//   setModalVisible(false);
//   reset();  // Limpia los valores del formulario
//   setTipoServicioActual("");  // Reinicia el tipo de servicio seleccionado
//   setVariables([]);  // Limpia las variables
//   setAmbienteActual("");
//   setMuestraActual("");
//   setServicioSeleccionado(null); // Limpia el servicio seleccionado
// };


// const onSubmit = async (datosDelFormulario) => {
//   const valoresVariables = {};
//   variables.forEach((variable) => {
//     const valor = datosDelFormulario[`variable_${variable.idVariable}`];
//     if (valor !== undefined && valor !== "") {
//       valoresVariables[variable.idVariable] = valor;
//     }
//   });

//   const payload = {
//     fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
//     fk_idAmbiente: datosDelFormulario.idAmbiente,
//     fk_idMuestra: datosDelFormulario.id_muestra,
//     fk_idUsuarios: authData.usuario.id,
//     valoresVariables,
//   };

//   try {
//     if (servicioSeleccionado) {
//       // Editar el servicio existente
//       await actualizarServicio({
//         id: servicioSeleccionado.id_servicios,
//         ...payload,
//       }).unwrap();
//       toast.success("Servicio actualizado con éxito!");
//     } else {
//       // Registrar nuevo servicio
//       await registrarServicio(payload).unwrap();
//       toast.success("Servicio registrado con éxito!");
//     }
//     cerrarModal();
//     refetch();
//   } catch (error) {
//     toast.error("Error al procesar el servicio: " + error.message);
//   }
// };


//   const manejadorCambioEstadoSwitch = (checked, id, nombre) => {
//     console.log(nombre);
  
//     const nuevoEstado = checked ? "en proceso" : "terminado";
  
//     const servicioActual = dataServicios.find(
//       (servicio) => servicio.id_servicios === id
//     );
  
//     if (!servicioActual) {
//       toast.error("Registro de servicio no encontrado");
//       return;
//     }
  
//     const payload = {
//       id: id,
//       estado: nuevoEstado,
//     };
  
//     const mensajeConfirmacion = checked
//       ? `¿Está seguro de que desea cambiar el estado a "En proceso" para el servicio ${nombre}?`
//       : `¿Está seguro de que desea cambiar el estado a "Terminado" para el servicio ${nombre}?`;
  
//     confirmAlert({
//       title: "Confirmación de cambio de estado",
//       message: mensajeConfirmacion, // Cambiado a string
//       buttons: [
//         {
//           label: "Sí",
//           onClick: () => {
//             actualizarEstadoServicio(payload)
//               .unwrap()
//               .then(() => {
//                 toast.success("Estado actualizado con éxito");
//                 refetch();
//               })
//               .catch((error) => {
//                 console.error(
//                   "Error al actualizar el estado del servicio",
//                   error
//                 );
//                 toast.error("Error al actualizar el estado del servicio");
//               });
//           },
//         },
//         {
//           label: "No",
//           onClick: () => toast.info("Cambio de estado cancelado"),
//         },
//       ],
//     });
//   };
  

//   return (
//     <>
//       <div className="w-auto h-screen  flex flex-col gap-8 bg-gray-100">
//         <div className="pt-10 pl-20">
//           <Mybutton color={"primary"} onClick={() => abrirModal(null)}>
//             <b>Nuevo Servicio</b>
//           </Mybutton>
//         </div>
//         <div className="w-full px-20 h-auto overflow-y-auto">
//           <TableMolecula>
//             <Thead>
//               <Th>ID</Th>
//               <Th>Tipo servicio</Th>
//               <Th>Fecha</Th>
//               <Th>Nombre ambiente</Th>
//               <Th>Codigo muestra</Th>
//               <Th>Precio servicio</Th>
//               <Th>Encargado</Th>
//               <Th>Rol</Th>
//               <Th>Estado</Th>
//               <Th>Acciones</Th>
//             </Thead>
//             <Tbody>
//               {itemsActualesServicios.length > 0 ? (
//                 itemsActualesServicios.map((servicio) => (
//                   <tr
//                     className="hover:bg-slate-200"
//                     key={servicio.id_servicios}
//                   >
//                     <Td>{servicio.id_servicios}</Td>
//                     <Td>{servicio.tipo_servicio}</Td>
//                     <Td>{servicio.fecha}</Td>
//                     <Td>{servicio.nombre_ambiente}</Td>
//                     <Td>{servicio.codigo_muestra}</Td>
//                     <Td>{servicio.precio}</Td>
//                     <Td>{servicio.nombre_completo_usuario}</Td>
//                     <Td>{servicio.rol_usuario}</Td>
//                     <Td>
//                       {" "}
//                       <Switch
//                         color={
//                           servicio.estado === "en proceso"
//                             ? "success"
//                             : "default"
//                         }
//                         isSelected={servicio.estado === "en proceso"}
//                         onValueChange={(checked) =>
//                           manejadorCambioEstadoSwitch(
//                             checked,
//                             servicio.id_servicios,
//                             servicio.nombre
//                           )
//                         }
//                       >
//                         {servicio.estado}
//                       </Switch>
//                     </Td>
//                     <Td>
//                       <Mybutton onClick={() => abrirModal(servicio)}>
//                         Editar
//                       </Mybutton>
//                     </Td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={10} className="text-center">
//                     <h1 className="text-2xl">
//                       <b>No hay datos</b>
//                     </h1>
//                   </td>
//                 </tr>
//               )}
//             </Tbody>
//           </TableMolecula>
//         </div>
//         <div>
//           <PaginationMolecula
//             total={totalPaginas}
//             initialPage={paginaActual}
//             onChange={(pagina) => setPaginaActual(pagina)}
//           />
//         </div>
//       </div>
//       <div className="flex">
//         <ModalOrganismo
//           visible={modalVisible}
//           closeModal={cerrarModal}
//           // onSubmit={handleSubmit(onSubmit)}
//         >
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-10 space-y-6 ">

//             <SelectAtomo
//                 data={dataTipoServicio}
//                 label="Selecciona Tipo de Servicio"
//                 items="idTipoServicio"
//                 ValueItem="nombreServicio"
//                 value={tipoServicioActual}
//                 onChange={(e) => {
//                   const idTipoServicio = e.target.value;
//                   setTipoServicioActual(idTipoServicio);
//                   manejadorobtencionTipoServicio(e);
//                   setValue("fk_idTipoServicio", idTipoServicio);
//                 }}
//               />

//               <SelectAtomo
//                 data={dataAmbientes}
//                 label="Selecciona Ambiente"
//                 items="idAmbiente"
//                 ValueItem="nombre_ambiente"
//                 value={ambienteActual}
//                 onChange={(e) => {
//                   setValue("idAmbiente", e.target.value);
//                   setAmbienteActual(e.target.value);
//                 }}
//               />

//               <SelectAtomo
//                 data={dataMuestras}
//                 label="Selecciona Muestra"
//                 items="id_muestra"
//                 ValueItem="codigo_muestra"
//                 value={muestraActual}
//                 onChange={(e) => {
//                   setValue("id_muestra", e.target.value);
//                   setMuestraActual(e.target.value);
//                 }}
//               />

//             </div>

//             {/* contenedor del select y el mapeo para mostrar variables */}
//             <div>

//               {variables.length > 0 && (
//                 <div className="mt-4">
//                   <div>
//                     <h2>Variables del servicio:</h2>
//                   </div>
//                   {variables.map((variable) => {
//                     return (
//                       <div
//                         key={`variable_${variable.idVariable}`}
//                         className="mb-10"
//                       >
//                         <InputAtomo
//                           type={
//                             variable.variable_tipo_dato === "number"
//                               ? "number"
//                               : "text"
//                           }
//                           placeholder={`Ingrese ${variable.variable_nombre}`}
//                           id={`variable_${variable.idVariable}`}
//                           name={`variable_${variable.idVariable}`}
//                           register={register}
//                           erros={errors}
//                         />
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-center mt-6">
//               <Mybutton color={"primary"} type="submit">
//                 Enviar
//               </Mybutton>
//             </div>
//           </form>
//         </ModalOrganismo>
//       </div>
//     </>
//   );
// };

// export default ServiciosPlantilla;



import React, { useContext, useState, useEffect } from "react";
import Mybutton from "../../atoms/Mybutton";
import {
  useActualizarEstadoServicioMutation,
  useGetServicioQuery,
  useObtenerVariablesParaActualizarServicioMutation,
} from "../../../store/api/servicio/serviciosSlice";
import { Spinner, Switch } from "@nextui-org/react";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Tbody from "../../molecules/table/Tbody";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { useForm } from "react-hook-form";
import SelectAtomo from "../../atoms/Select";
import InputAtomo from "../../atoms/Input";
import { AuthContext } from "../../../context/AuthContext";

import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";
import {
  useObtenerVariablesParaServicioMutation,
  useRegistrarServicioMutation,
} from "../../../store/api/servicio/serviciosSlice";
import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
import { useGetMuestrasQuery } from "../../../store/api/muestra";
import { useGetPreciosQuery } from "../../../store/api/precios/preciosSlice";
import { useGetUsuarioQuery } from "../../../store/api/users";

const ServiciosPlantilla = () => {

  //   //acceso al contexto de autenticacion
  const { authData } = useContext(AuthContext);

  const {data: dataServicios,isLoading: isLoadingServicios,refetch,} = useGetServicioQuery();

  //   // Trae los datos de los tipos de servicios
  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =useGetTipoServicioQuery();

  //   // Slice que permite la obtencion de las variables
  const [obtenerVariables] = useObtenerVariablesParaServicioMutation();
  //   //Slice que permite el registro de un servicio
 //   // Slice para la obtencion de variables ya registradas segun el servicio
  const [obtencionVariablesUpdate] = useObtenerVariablesParaActualizarServicioMutation();
  const [registrarServicio] = useRegistrarServicioMutation();

  //   // Trae los datos de ambientes, muestras, precios y usuarios
  const { data: dataAmbientes } = useGetAmbientesQuery();
  const { data: dataMuestras } = useGetMuestrasQuery();
  const { data: dataUsuarios } = useGetUsuarioQuery();

  const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 3;

  const totalPaginas = Math.ceil((dataServicios?.length || 0) / itemsPorPagina);

  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const itemsActualesServicios = dataServicios
    ? dataServicios.slice(indicePrimerItem, indiceUltimoItem)
    : [];

  //estados para el manejo de la informacion de los select
  // const [tipoServicioActual, setTipoServicioActual] = useState("");
  const [tipoServicioActual, setTipoServicioActual] = useState(null);
  const [variables, setVariables] = useState([]);
  // console.log("variables: ", variables);
  const [variablesUpdate, setVariablesUpdate] = useState([]);
  console.log("variables para actualizacion: ", variablesUpdate);
  const [ambienteActual, setAmbienteActual] = useState("");
  const [muestraActual, setMuestraActual] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);



  if (isLoadingServicios) {
    return (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    );
  }


  const manejadorobtencionTipoServicio = async (e) => {
    const idTipoServicio = e.target.value;
    setTipoServicioActual(idTipoServicio);


    try {
      // Llama a la mutación para obtener las variables con base en el idTipoServicio
      const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();
      setVariables(respuesta);
      // toast.success("Variables obtenidas con éxito!");
    } catch (error) {
      console.error("Error al obtener las variables: " + error.message);
    }
  };


  const abrirModal = async (servicio) => {
  console.log('servicios cargados al abrir el modal: ',servicio)
    if (servicio) {
      setServicioSeleccionado(servicio)
      setTipoServicioActual(servicio.tipo_servicio)
      setAmbienteActual(servicio.nombre_ambiente)
      setMuestraActual(servicio.codigo_muestra)

      try {
        // Llamar a la mutación para obtener las variables asociadas al servicio
        const respuesta = await obtencionVariablesUpdate({ idTipoServicio: servicio.id_servicios }).unwrap();
        setVariablesUpdate(respuesta); // Establece las variables obtenidas
      } catch (error) {
        console.error("Error al obtener las variables para la edición: " + error.message);
      }


    }
  
    setModalVisible(true); 
  };
  
  


 // Función para cerrar el modal
 const cerrarModal = () => {
  setModalVisible(false);
  reset();  // Limpia los valores del formulario
  setTipoServicioActual("");  // Reinicia el tipo de servicio seleccionado
  setVariables([]);  // Limpia las variables
  setAmbienteActual("");
  setMuestraActual("");
  setServicioSeleccionado(null); // Limpia el servicio seleccionado
};


const onSubmit = async (datosDelFormulario) => {
  const valoresVariables = {};

  variables.forEach((variable) => {
    const valor = datosDelFormulario[`variable_${variable.idVariable}`];
    if (valor !== undefined && valor !== "") {
      valoresVariables[variable.idVariable] = valor;
    }
  });

  const payload = {
    fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
    fk_idAmbiente: datosDelFormulario.idAmbiente,
    fk_idMuestra: datosDelFormulario.id_muestra,
    fk_idUsuarios: authData.usuario.id,
    valoresVariables,
  };

  try {
    if (servicioSeleccionado) {
      // Editar el servicio existente
      await actualizarServicio({
        id: servicioSeleccionado.id_servicios,
        ...payload,
      }).unwrap();
      toast.success("Servicio actualizado con éxito!");
    } else {
      // Registrar nuevo servicio
      await registrarServicio(payload).unwrap();
      toast.success("Servicio registrado con éxito!");
    }
    cerrarModal();
    refetch();
  } catch (error) {
    toast.error("Error al procesar el servicio: " + error.message);
  }
};


  const manejadorCambioEstadoSwitch = (checked, id, nombre) => {
    console.log(nombre);
  
    const nuevoEstado = checked ? "en proceso" : "terminado";
  
    const servicioActual = dataServicios.find(
      (servicio) => servicio.id_servicios === id
    );
  
    if (!servicioActual) {
      toast.error("Registro de servicio no encontrado");
      return;
    }
  
    const payload = {
      id: id,
      estado: nuevoEstado,
    };
  
    const mensajeConfirmacion = checked
      ? `¿Está seguro de que desea cambiar el estado a "En proceso" para el servicio ${nombre}?`
      : `¿Está seguro de que desea cambiar el estado a "Terminado" para el servicio ${nombre}?`;
  
    confirmAlert({
      title: "Confirmación de cambio de estado",
      message: mensajeConfirmacion, // Cambiado a string
      buttons: [
        {
          label: "Sí",
          onClick: () => {
            actualizarEstadoServicio(payload)
              .unwrap()
              .then(() => {
                toast.success("Estado actualizado con éxito");
                refetch();
              })
              .catch((error) => {
                console.error(
                  "Error al actualizar el estado del servicio",
                  error
                );
                toast.error("Error al actualizar el estado del servicio");
              });
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Cambio de estado cancelado"),
        },
      ],
    });
  };
  

  return (
    <>
      <div className="w-auto h-screen  flex flex-col gap-8 bg-gray-100">
        <div className="pt-10 pl-20">
          <Mybutton color={"primary"} onClick={() => abrirModal(null)}>
            <b>Nuevo Servicio</b>
          </Mybutton>
        </div>
        <div className="w-full px-20 h-auto overflow-y-auto">
          <TableMolecula>
            <Thead>
              <Th>ID</Th>
              <Th>Tipo servicio</Th>
              <Th>Fecha</Th>
              <Th>Nombre ambiente</Th>
              <Th>Codigo muestra</Th>
              <Th>Precio servicio</Th>
              <Th>Encargado</Th>
              <Th>Rol</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Thead>
            <Tbody>
              {itemsActualesServicios.length > 0 ? (
                itemsActualesServicios.map((servicio) => (
                  <tr
                    className="hover:bg-slate-200"
                    key={servicio.id_servicios}
                  >
                    <Td>{servicio.id_servicios}</Td>
                    <Td>{servicio.tipo_servicio}</Td>
                    <Td>{servicio.fecha}</Td>
                    <Td>{servicio.nombre_ambiente}</Td>
                    <Td>{servicio.codigo_muestra}</Td>
                    <Td>{servicio.precio}</Td>
                    <Td>{servicio.nombre_completo_usuario}</Td>
                    <Td>{servicio.rol_usuario}</Td>
                    <Td>
                      {" "}
                      <Switch
                        color={
                          servicio.estado === "en proceso"
                            ? "success"
                            : "default"
                        }
                        isSelected={servicio.estado === "en proceso"}
                        onValueChange={(checked) =>
                          manejadorCambioEstadoSwitch(
                            checked,
                            servicio.id_servicios,
                            servicio.nombre
                          )
                        }
                      >
                        {servicio.estado}
                      </Switch>
                    </Td>
                    <Td>
                      <Mybutton onClick={() => abrirModal(servicio)}>
                        Editar
                      </Mybutton>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center">
                    <h1 className="text-2xl">
                      <b>No hay datos</b>
                    </h1>
                  </td>
                </tr>
              )}
            </Tbody>
          </TableMolecula>
        </div>
        <div>
          <PaginationMolecula
            total={totalPaginas}
            initialPage={paginaActual}
            onChange={(pagina) => setPaginaActual(pagina)}
          />
        </div>
      </div>
      <div className="flex">
        <ModalOrganismo
          visible={modalVisible}
          closeModal={cerrarModal}
          // onSubmit={handleSubmit(onSubmit)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 space-y-6 ">

            <SelectAtomo
                data={dataTipoServicio}
                label="Selecciona Tipo de Servicio"
                items="idTipoServicio"
                ValueItem="nombreServicio"
                value={tipoServicioActual}
                onChange={(e) => {
                  const idTipoServicio = e.target.value;
                  setTipoServicioActual(idTipoServicio);
                  manejadorobtencionTipoServicio(e);
                  setValue("fk_idTipoServicio", idTipoServicio);
                }}
              />

              <SelectAtomo
                data={dataAmbientes}
                label="Selecciona Ambiente"
                items="idAmbiente"
                ValueItem="nombre_ambiente"
                value={ambienteActual}
                onChange={(e) => {
                  setValue("idAmbiente", e.target.value);
                  setAmbienteActual(e.target.value);
                }}
              />

              <SelectAtomo
                data={dataMuestras}
                label="Selecciona Muestra"
                items="id_muestra"
                ValueItem="codigo_muestra"
                value={muestraActual}
                onChange={(e) => {
                  setValue("id_muestra", e.target.value);
                  setMuestraActual(e.target.value);
                }}
              />

            </div>

            {/* contenedor del select y el mapeo para mostrar variables */}
            <div>

              {variables.length > 0 && (
                <div className="mt-4">
                  <div>
                    <h2>Variables del servicio:</h2>
                  </div>
                  {variables.map((variable) => {
                    return (
                      <div
                        key={`variable_${variable.idVariable}`}
                        className="mb-10"
                      >
                        <InputAtomo
                          type={
                            variable.variable_tipo_dato === "number"
                              ? "number"
                              : "text"
                          }
                          placeholder={`Ingrese ${variable.variable_nombre}`}
                          id={`variable_${variable.idVariable}`}
                          name={`variable_${variable.idVariable}`}
                          register={register}
                          erros={errors}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <Mybutton color={"primary"} type="submit">
                Enviar
              </Mybutton>
            </div>
          </form>
        </ModalOrganismo>
      </div>
    </>
  );
};

export default ServiciosPlantilla;

