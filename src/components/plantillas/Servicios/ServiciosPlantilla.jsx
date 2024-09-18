import React, { useContext, useState } from "react";
import Mybutton from "../../atoms/Mybutton";
import {
  useActualizarEstadoServicioMutation,
  useGetServicioQuery,
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

  const {
    data: dataServicios,
    isLoading: isLoadingServicios,
    refetch,
  } = useGetServicioQuery();

  //   // Trae los datos de los tipos de servicios
  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =useGetTipoServicioQuery();

//   // Slice que permite la obtencion de las variables
  const [obtenerVariables] = useObtenerVariablesParaServicioMutation();
//   //Slice que permite el registro de un servicio
  const [registrarServicio] = useRegistrarServicioMutation();



  //   // Trae los datos de ambientes, muestras, precios y usuarios
  const { data: dataAmbientes } = useGetAmbientesQuery();
  const { data: dataMuestras } = useGetMuestrasQuery();
  const { data: dataPrecios } = useGetPreciosQuery();
  const { data: dataUsuarios } = useGetUsuarioQuery();

  const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();

  const {
    setValue,
    register,
    handleSubmit,
    control,
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
  const [tipoServicioActual, setTipoServicioActual] = useState("");
  const [variables, setVariables] = useState([]);
  // console.log("variables: ", variables);
  const [ambienteActual, setAmbienteActual] = useState("");
  const [muestraActual, setMuestraActual] = useState("");
  const [precioActual, setPrecioActual] = useState("");
  const [modalVisible, SetModalVisible] = useState(false);
  

  if (isLoadingServicios) {
    return (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    );
  }

    // Función que maneja el cambio de selección en el select
  const manejadorobtencionTipoServicio = async (e) => {
    const idTipoServicio = e.target.value;
    setTipoServicioActual(idTipoServicio);

    try {
      // Llama a la mutación para obtener las variables con base en el idTipoServicio
      const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();
      setVariables(respuesta);
      toast.success("Variables obtenidas con éxito!");
    } catch (error) {
      toast.error("Error al obtener las variables: " + error.message);
    }
  };


  const abrirModal = () => {
    if(servicio){

    }
    SetModalVisible(true);
  };

  const cerrarModal = () => {
    SetModalVisible(false);
    reset()
  };

  const onSubmit = async (datosDelFormulario) => {
    console.log("Valores del formulario:", datosDelFormulario);

    const valoresVariables = {};

    variables.forEach((variable) => {
      const valor = datosDelFormulario[`variable_${variable.idVariable}`];
      if (valor !== undefined && valor !== "") {
        valoresVariables[variable.idVariable] = valor;
      }
    });

    console.log("Valores de variables:", valoresVariables);

    const payload = {
      nombre: datosDelFormulario.nombre,
      fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
      fk_idAmbiente: datosDelFormulario.idAmbiente,
      fk_idMuestra: datosDelFormulario.id_muestra,
      fk_idPrecio: datosDelFormulario.idPrecio,
      fk_idUsuarios: authData.usuario.id,
      valoresVariables,
    };

    console.log("Datos del payload", payload);

    try {
      await registrarServicio(payload).unwrap();
      toast.success("Datos enviados con éxito!");
      cerrarModal()
      refetch()
    } catch (error) {
      toast.error("Error al enviar los datos: " + error.message);
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

    confirmAlert({
      title: (
        <div>
          <span>
            <b>Confirmación de cambio de estado</b>
          </span>
        </div>
      ),
      message: (
        <div>
          {checked
            ? `¿Está seguro de que desea cambiar el estado a "En proceso" para el servicio ${nombre}?`
            : `¿Está seguro de que desea cambiar el estado a "Terminado" para el servicio ${nombre}?`}
        </div>
      ),
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
              <Th>Nombre Servicio</Th>
              <Th>Tipo servicio</Th>
              <Th>Fecha</Th>
              <Th>Nombre ambiente</Th>
              <Th>Codigo muestra</Th>
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
                    <Td>{servicio.nombre}</Td>
                    <Td>{servicio.tipo_servicio}</Td>
                    <Td>{servicio.fecha}</Td>
                    <Td>{servicio.nombre_ambiente}</Td>
                    <Td>{servicio.codigo_muestra}</Td>
                    <Td>{servicio.nombre_completo_usuario}</Td>
                    <Td>{servicio.rol_usuario}</Td>
                    <Switch
                      color={
                        servicio.estado === "en proceso" ? "success" : "default"
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10 space-y-6 ">
              <InputAtomo
                type="text"
                placeholder="Nombre del Servicio"
                id="nombre"
                name="nombre"
                register={register}
                erros={errors}
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

              <SelectAtomo
                data={dataPrecios}
                label="Selecciona Precio"
                items="idPrecio"
                ValueItem="precio"
                value={precioActual}
                onChange={(e) => {
                  setValue("idPrecio", e.target.value);
                  setPrecioActual(e.target.value);
                }}
              />
            </div>

            {/* contenedor del select y el mapeo para mostrar variables */}
            <div>
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

              {variables.length > 0 && (
                <div className="mt-4">
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

// import { useState, useContext } from "react";
// import { toast } from "react-toastify";
// import SelectAtomo from "../../atoms/Select";
// import InputAtomo from "../../atoms/Input";
// import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";
// import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
// import { useGetUsuarioQuery } from "../../../store/api/users";
// import { useGetMuestrasQuery } from "../../../store/api/muestra";
// import {
//   useObtenerVariablesParaServicioMutation,
//   useRegistrarServicioMutation,
// } from "../../../store/api/servicio/serviciosSlice";
// import { useForm, Controller } from "react-hook-form";
// import Mybutton from "../../atoms/Mybutton";
// import { AuthContext } from "../../../context/AuthContext";

// const ComponenteSelectServicio = () => {
//   //acceso al contexto de autenticacion
//   const { authData } = useContext(AuthContext);

//   // Trae los datos de los tipos de servicios
//   const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =
//     useGetTipoServicioQuery();

//   // Slice que permite la obtencion de las variables
//   const [obtenerVariables] = useObtenerVariablesParaServicioMutation();
//   //Slice que permite el registro de un servicio
//   const [registrarServicio] = useRegistrarServicioMutation();

//   // Trae los datos de ambientes, muestras, precios y usuarios
//   const { data: dataAmbientes } = useGetAmbientesQuery();
//   const { data: dataMuestras } = useGetMuestrasQuery();
//   const { data: dataPrecios } = useGetPreciosQuery();
//   const { data: dataUsuarios } = useGetUsuarioQuery();

//   //estados para el manejo de la informacion de los select
//   const [tipoServicioActual, setTipoServicioActual] = useState("");
//   const [variables, setVariables] = useState([]);
//   // console.log("variables: ", variables);
//   const [ambienteActual, setAmbienteActual] = useState("");
//   const [muestraActual, setMuestraActual] = useState("");
//   const [precioActual, setPrecioActual] = useState("");
//   // const [datosUsuario, setDatosUsuario] = useState(null)

//   const {
//     setValue,
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   // Función que maneja el cambio de selección en el select
//   const manejadorobtencionTipoServicio = async (e) => {
//     const idTipoServicio = e.target.value;
//     setTipoServicioActual(idTipoServicio);

//     try {
//       // Llama a la mutación para obtener las variables con base en el idTipoServicio
//       const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();
//       setVariables(respuesta);
//       toast.success("Variables obtenidas con éxito!");
//     } catch (error) {
//       toast.error("Error al obtener las variables: " + error.message);
//     }
//   };

//   const onSubmit = async (datosDelFormulario) => {
//     console.log("Valores del formulario:", datosDelFormulario);

//     const valoresVariables = {};

//     variables.forEach((variable) => {
//       const valor = datosDelFormulario[`variable_${variable.idVariable}`];
//       if (valor !== undefined && valor !== "") {
//         valoresVariables[variable.idVariable] = valor;
//       }
//     });

//     console.log("Valores de variables:", valoresVariables);

//     const payload = {
//       nombre: datosDelFormulario.nombre,
//       fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
//       fk_idAmbiente: datosDelFormulario.idAmbiente,
//       fk_idMuestra: datosDelFormulario.id_muestra,
//       fk_idPrecio: datosDelFormulario.idPrecio,
//       fk_idUsuarios: authData.usuario.id,
//       valoresVariables,
//     };

//     console.log("Datos del payload", payload);

//     try {
//       await registrarServicio(payload).unwrap();
//       toast.success("Datos enviados con éxito!");
//     } catch (error) {
//       toast.error("Error al enviar los datos: " + error.message);
//     }
//   };

//   return (
//     <div className="w-auto h-auto max-h-screen flex flex-col gap-8 bg-gray-100 overflow-y-auto p-4">
//       <div className="">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-10 space-y-6 ">
//             <InputAtomo
//               type="text"
//               placeholder="Nombre del Servicio"
//               id="nombre"
//               name="nombre"
//               register={register}
//               erros={errors}
//             />

//             <SelectAtomo
//               data={dataAmbientes}
//               label="Selecciona Ambiente"
//               items="idAmbiente"
//               ValueItem="nombre_ambiente"
//               value={ambienteActual}
//               onChange={(e) => {
//                 setValue("idAmbiente", e.target.value);
//                 setAmbienteActual(e.target.value);
//               }}
//             />

//             <SelectAtomo
//               data={dataMuestras}
//               label="Selecciona Muestra"
//               items="id_muestra"
//               ValueItem="codigo_muestra"
//               value={muestraActual}
//               onChange={(e) => {
//                 setValue("id_muestra", e.target.value);
//                 setMuestraActual(e.target.value);
//               }}
//             />

//             <SelectAtomo
//               data={dataPrecios}
//               label="Selecciona Precio"
//               items="idPrecio"
//               ValueItem="precio"
//               value={precioActual}
//               onChange={(e) => {
//                 setValue("idPrecio", e.target.value);
//                 setPrecioActual(e.target.value);
//               }}
//             />
//           </div>

//           {/* contenedor del select y el mapeo para mostrar variables */}
//           <div>
//             <SelectAtomo
//               data={dataTipoServicio}
//               label="Selecciona Tipo de Servicio"
//               items="idTipoServicio"
//               ValueItem="nombreServicio"
//               value={tipoServicioActual}
//               onChange={(e) => {
//                 const idTipoServicio = e.target.value;
//                 setTipoServicioActual(idTipoServicio);
//                 manejadorobtencionTipoServicio(e);
//                 setValue("fk_idTipoServicio", idTipoServicio);
//               }}
//             />

//             {variables.length > 0 && (
//               <div className="mt-4">
//                 {variables.map((variable) => {
//                   return (
//                     <div
//                       key={`variable_${variable.idVariable}`}
//                       className="mb-10"
//                     >
//                       <InputAtomo
//                         type={
//                           variable.variable_tipo_dato === "number"
//                             ? "number"
//                             : "text"
//                         }
//                         placeholder={`Ingrese ${variable.variable_nombre}`}
//                         id={`variable_${variable.idVariable}`}
//                         name={`variable_${variable.idVariable}`}
//                         register={register}
//                         erros={errors}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//           <div className="flex justify-center mt-6">
//             <Mybutton color={"primary"} type="submit">
//               Enviar
//             </Mybutton>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ComponenteSelectServicio;
