import React, { useContext, useState } from "react";
import Mybutton from "../../atoms/Mybutton";
import {
  useActualizarEstadoServicioMutation,
  useGetServicioQuery,
  useObtenerMuestrasParaServicioQuery,
  useObtenerPrecioSegunTipoServicioMutation,
  useObtenerVariablesParaActualizarServicioMutation,
  useServicioTerminadoMutation,
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
import Search from "../../atoms/Search";

const ServiciosPlantilla = () => {
  //   //acceso al contexto de autenticacion
  const { authData } = useContext(AuthContext);

  const {
    data: dataServicios,
    isLoading: isLoadingServicios,
    refetch,
  } = useGetServicioQuery();

  //   // Trae los datos de los tipos de servicios
  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =
    useGetTipoServicioQuery();

  //   // Slice que permite la obtencion de las variables
  const [obtenerVariables] = useObtenerVariablesParaServicioMutation();
  //   // Slice para la obtencion de variables ya registradas segun el servicio
  const [obtencionVariablesUpdate] =
    useObtenerVariablesParaActualizarServicioMutation();
  //   //Slice que trae precio segun el tipo de servicio
  const [obtenerPrecio] = useObtenerPrecioSegunTipoServicioMutation();

  //   //Slice que permite el registro de un servicio
  const [registrarServicio] = useRegistrarServicioMutation();

  // Slice que permite el registro al cambiar el estado a terminado
  const [registroServicioTerminado] = useServicioTerminadoMutation();

  //   // Trae los datos de ambientes, muestras, precios y usuarios
  const { data: dataAmbientes } = useGetAmbientesQuery();
  const { data: dataMuestras } = useObtenerMuestrasParaServicioQuery();
  console.log('datos de la muestra: ',dataMuestras)
  const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Estado para el filtro por codigo de muestra
  const [filtro, setFiltro] = useState("");
  // estado para controlar el id de terminacion de servicio
  const [servicioId, setServicioId] = useState(null);
  // const [mostrarInputsTerminados, setMostrarInputsTerminados] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 3;

  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;

  const itemsActualesServicios =
    dataServicios && dataServicios.length > 0
      ? dataServicios.filter((item) => {
          return (
            filtro === "" ||
            (item.codigo_muestra &&
              item.codigo_muestra.toLowerCase().includes(filtro.toLowerCase()))
          );
        })
      : [];



  const totalPaginas = Math.ceil((dataServicios?.length || 0) / itemsPorPagina);
  const DataArrayPaginacion = itemsActualesServicios.slice(
    indicePrimerItem,
    indiceUltimoItem
  );

  //estados para el manejo de la informacion de los select
  const [tipoServicioActual, setTipoServicioActual] = useState(null);
  const [precios, setPrecios] = useState([]);
  const [precioActual, setPrecioActual] = useState("");
  const [ambienteActual, setAmbienteActual] = useState("");
  const [muestraActual, setMuestraActual] = useState("");
  console.log('muestra actual: ',muestraActual)
  console.log('set muestra actual: ',setMuestraActual)
  const [variables, setVariables] = useState([]);
  const [variablesUpdate, setVariablesUpdate] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
  const [modalServicioTerminado, setModalServicioTerminado] = useState(false);
  const variablesParaRenderizar = servicioSeleccionado
    ? variablesUpdate
    : variables;

  if (isLoadingServicios) {
    return (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    );
  }

  const manejadorobtencionTipoServicio = async (e) => {

    const idTipoServicio = e.target.value;
    setTipoServicioActual(idTipoServicio);
    manejadorObtencionPrecioParaTipoServicio(idTipoServicio);

    try {
      // Llama a la mutación para obtener las variables con base en el idTipoServicio
      const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();
      setVariables(respuesta);
    } catch (error) {
      console.error("Error al obtener las variables: " + error.message);
    }
  };

  const manejadorObtencionPrecioParaTipoServicio = async (idTipoServicio) => {
    try {
      const respuesta = await obtenerPrecio({ idTipoServicio }).unwrap();
      setPrecios(respuesta);
    } catch (error) {
      console.error("Error al obtener los precios: " + error.message);
    }
  };

  const abrirModalRegistro = async (servicio) => {
    if (servicio) {
      setServicioSeleccionado(servicio);
      setTipoServicioActual(servicio.tipo_servicio);
      setPrecioActual(servicio.presentacion);
      setAmbienteActual(servicio.nombre_ambiente);
      setMuestraActual(servicio.codigo_muestra);

      try {
        // Llamar a la mutación para obtener las variables asociadas al servicio
        const respuesta = await obtencionVariablesUpdate({
          idTipoServicio: servicio.id_servicios,
        }).unwrap();
        setVariablesUpdate(respuesta); // Establece las variables obtenidas

        // Cargar los valores de las variables en el formulario
        respuesta.forEach((variable) => {
          setValue(`variable_${variable.idVariable}`, variable.valor); // Setea el valor de cada variable
        });
      } catch (error) {
        console.error(
          "Error al obtener las variables para la edición: " + error.message
        );
      }
      setVariables();
    }
    setModalRegistroVisible(true);
  };

  // Función para cerrar el modal
  const cerrarModalRegistro = () => {
    setModalRegistroVisible(false);
    reset(); // Limpia los valores del formulario
    setTipoServicioActual(""); // Reinicia el tipo de servicio seleccionado
    setVariables([]); // Limpia las variables
    setAmbienteActual("");
    setMuestraActual("");
    setServicioSeleccionado(null); // Limpia el servicio seleccionado
  };

  const onSubmitRegistroEdicion = async (datosDelFormulario) => {

    const valoresVariables = {};
    variables.forEach((variable) => {
      const valor = datosDelFormulario[`variable_${variable.idVariable}`];
      if (valor !== undefined && valor !== "") {
        valoresVariables[variable.idVariable] = valor;
      }
    });

    const payload = {
      fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
      fk_id_precio: datosDelFormulario.fk_idPrecio,
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
      cerrarModalRegistro();
      refetch();
    } catch (error) {
      toast.error("Error al procesar el servicio: " + error.message);
    }
  };

  const abrirModalServicioTerminado = (id) => {
    const servicioActualTerminado = dataServicios.find(
      (servicio) => servicio.id_servicios === id
    );
    
    if (servicioActualTerminado) {
      let idServicio = servicioActualTerminado.id_servicios;
      console.log('id servicio extraido', idServicio);
      
      // Guardamos el id del servicio en el estado
      setServicioId(idServicio);
    } else {
      console.log('Servicio no encontrado');
    }
  
    setModalServicioTerminado(true);
  };
  

  const cerrarModalServicioTerminado = () => {
    setModalServicioTerminado(false);
    setServicioId(null)
  };

  const onSubmitServicioTerminado = async (data) => {
    const payload = {
      id: servicioId,
      cantidad_salida: data.cantidad_salida,
    };
  
    try {
      await registroServicioTerminado(payload).unwrap();
  
      toast.success("Servicio terminado registrado con éxito!");
  
      // Ahora sí cambiamos el estado del servicio a "terminado"
      actualizarEstadoServicio({ id: servicioId, estado: "terminado" })
        .unwrap()
        .then(() => {
          toast.success("Estado cambiado a 'Terminado' con éxito!");
          refetch();
        })
        .catch((error) => {
          toast.error("Error al actualizar el estado a 'Terminado': " + error.message);
        });
  
      cerrarModalServicioTerminado();
    } catch (error) {
      toast.error("Error al registrar el servicio terminado: " + error.message);
    }
  };

  const manejadorCambioEstadoSwitch = (checked, id, tipo_servicio) => {
    const nuevoEstado = checked ? "en proceso" : "terminado";
  
    const servicioActual = dataServicios.find(
      (servicio) => servicio.id_servicios === id
    );
  
    if (!servicioActual) {
      toast.error("Registro de servicio no encontrado");
      return;
    }
  
    // Cuando se intenta marcar como terminado, abrimos el modal antes de cambiar el estado
    if (nuevoEstado === "terminado") {
      abrirModalServicioTerminado(id); // Abre el modal para registrar la cantidad de salida
      return; // Detenemos aquí para no cambiar el estado aún
    }
  
    // Si se trata de cambiar a "en proceso", simplemente procedemos
    const payload = {
      id: id,
      estado: nuevoEstado,
    };
  
    const mensajeConfirmacion = checked
      ? `¿Está seguro de que desea cambiar el estado a "En proceso" para el servicio ${tipo_servicio}?`
      : `¿Está seguro de que desea cambiar el estado a "Terminado" para el servicio ${tipo_servicio}?`;
  
    confirmAlert({
      title: "Confirmación de cambio de estado",
      message: mensajeConfirmacion,
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
                console.error("Error al actualizar el estado del servicio", error);
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
        <div className="flex ">
          <div className="pt-10 pl-20">
            <Mybutton
              color={"primary"}
              onClick={() => abrirModalRegistro(null)}
            >
              <b>Nuevo Servicio</b>
            </Mybutton>
          </div>
          <div className="pl-20 w-[500px]">
            <Search
              label={"Filtrar"}
              placeholder={"Filtro por muestra..."}
              onchange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full px-20 h-auto overflow-y-auto">
          <TableMolecula>
            <Thead>
              <Th>ID</Th>
              <Th>Tipo servicio</Th>
              <Th>Fecha</Th>
              <Th>Nombre ambiente</Th>
              <Th>Codigo muestra</Th>
              <Th>Presentación</Th>
              <Th>Encargado</Th>
              <Th>Rol</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Thead>
            <Tbody>
              {DataArrayPaginacion.length > 0 ? (
                DataArrayPaginacion.map((servicio) => (
                  <tr
                    className="hover:bg-slate-200"
                    key={servicio.id_servicios}
                  >
                    <Td>{servicio.id_servicios}</Td>
                    <Td>{servicio.tipo_servicio}</Td>
                    <Td>{servicio.fecha}</Td>
                    <Td>{servicio.nombre_ambiente}</Td>
                    <Td>{servicio.codigo_muestra}</Td>
                    <Td>{servicio.presentacion}</Td>
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
                            servicio.tipo_servicio,
                          )
                        }
                      >
                        {servicio.estado}
                      </Switch>
                    </Td>
                    <Td>
                      <Mybutton onClick={() => abrirModalRegistro(servicio)}>
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
        {/* Modal de Registro */}
        {modalRegistroVisible && (
          <ModalOrganismo
            visible={modalRegistroVisible}
            closeModal={cerrarModalRegistro}
            title="Registrar Servicio"
          >
            <form onSubmit={handleSubmit(onSubmitRegistroEdicion)}>
              <div className="mb-10 space-y-6 ">
              <SelectAtomo
                  data={dataMuestras}
                  label="Selecciona una muestra"
                  items="id_muestra"
                  ValueItem="codigo_muestra"
                  value={muestraActual}
                  onChange={(e) => {
                    setValue("id_muestra", e.target.value);
                    setMuestraActual(e.target.value);

                    const idTipoServicio = e.target.value;
                    setTipoServicioActual(idTipoServicio);
                    manejadorobtencionTipoServicio(e);
                    setValue("fk_idTipoServicio", idTipoServicio);
                  }}
                />
                
                <SelectAtomo
                  data={precios} // Precios obtenidos según el tipo de servicio
                  label="Selecciona la Presentación"
                  items="idPrecio"
                  ValueItem="presentacion"
                  value={precioActual}
                  onChange={(e) => {
                    const idPrecio = e.target.value;
                    setPrecioActual(idPrecio);
                    manejadorObtencionPrecioParaTipoServicio(e);
                    setValue("fk_idPrecio", idPrecio);
                  }}
                />

                <SelectAtomo
                  data={dataAmbientes}
                  label="Selecciona el Ambiente"
                  items="idAmbiente"
                  ValueItem="nombre_ambiente"
                  value={ambienteActual}
                  onChange={(e) => {
                    setValue("idAmbiente", e.target.value);
                    setAmbienteActual(e.target.value);
                  }}
                />
              </div>
              {/* contenedor del select y el mapeo para mostrar variables */}
              <div>
                {variablesParaRenderizar.length > 0 && (
                  <div className="mt-4">
                    <div>
                      <h2>Variables del servicio:</h2>
                    </div>
                    {variablesParaRenderizar.map((variable) => {
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
        )}

        {/* Modal registro de salida*/}
        {modalServicioTerminado && (
          <ModalOrganismo
            visible={modalServicioTerminado}
            closeModal={cerrarModalServicioTerminado}
            title="Registro termino de servicio"
          >
            <form onSubmit={handleSubmit(onSubmitServicioTerminado)}>
              <InputAtomo
                type="number"
                id="cantidad_salida"
                name="cantidad_salida"
                placeholder="cantidad de salida"
                register={register}
                erros={errors}
              />
              <div className="flex justify-center mt-6">
                <Mybutton color={"primary"} type="submit">
                  Enviar
                </Mybutton>
              </div>
            </form>
          </ModalOrganismo>
        )}
      </div>
    </>
  );
};

export default ServiciosPlantilla;

// import React, { useContext, useState } from "react";
// import Mybutton from "../../atoms/Mybutton";
// import {
//   useActualizarEstadoServicioMutation,
//   useGetServicioQuery,
//   useObtenerMuestrasParaServicioQuery,
//   useObtenerPrecioSegunTipoServicioMutation,
//   useObtenerVariablesParaActualizarServicioMutation,
//   useServicioTerminadoMutation,
// } from "../../../store/api/servicio/serviciosSlice";
// import {
//   Autocomplete,
//   AutocompleteItem,
//   Spinner,
//   Switch,
// } from "@nextui-org/react";
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
// import Search from "../../atoms/Search";

// const ServiciosPlantilla = () => {
//   //   //acceso al contexto de autenticacion
//   const { authData } = useContext(AuthContext);

//   const {
//     data: dataServicios,
//     isLoading: isLoadingServicios,
//     refetch,
//   } = useGetServicioQuery();

//   //   // Trae los datos de los tipos de servicios
//   const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =
//     useGetTipoServicioQuery();

//   //   // Slice que permite la obtencion de las variables
//   const [obtenerVariables] = useObtenerVariablesParaServicioMutation();
//   //   // Slice para la obtencion de variables ya registradas segun el servicio
//   const [obtencionVariablesUpdate] =
//     useObtenerVariablesParaActualizarServicioMutation();
//   //   //Slice que trae precio segun el tipo de servicio
//   const [obtenerPrecio] = useObtenerPrecioSegunTipoServicioMutation();

//   //   //Slice que permite el registro de un servicio
//   const [registrarServicio] = useRegistrarServicioMutation();

//   // Slice que permite el registro al cambiar el estado a terminado
//   const [registroServicioTerminado] = useServicioTerminadoMutation();

//   //   // Trae los datos de ambientes, muestras, precios y usuarios
//   const { data: dataAmbientes } = useGetAmbientesQuery();
//   const { data: dataMuestras } = useObtenerMuestrasParaServicioQuery();
//   console.log("datos de la muestra: ", dataMuestras);
//   const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();
//   const {
//     setValue,
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Estado para el filtro por codigo de muestra
//   const [filtro, setFiltro] = useState("");
//   // estado para controlar el id de terminacion de servicio
//   const [servicioId, setServicioId] = useState(null);
//   // const [mostrarInputsTerminados, setMostrarInputsTerminados] = useState(false);
//   const [paginaActual, setPaginaActual] = useState(1);
//   const itemsPorPagina = 3;

//   const indiceUltimoItem = paginaActual * itemsPorPagina;
//   const indicePrimerItem = indiceUltimoItem - itemsPorPagina;

//   const itemsActualesServicios =
//     dataServicios && dataServicios.length > 0
//       ? dataServicios.filter((item) => {
//           return (
//             filtro === "" ||
//             (item.codigo_muestra &&
//               item.codigo_muestra.toLowerCase().includes(filtro.toLowerCase()))
//           );
//         })
//       : [];

//   const totalPaginas = Math.ceil((dataServicios?.length || 0) / itemsPorPagina);
//   const DataArrayPaginacion = itemsActualesServicios.slice(
//     indicePrimerItem,
//     indiceUltimoItem
//   );

//   //estados para el manejo de la informacion de los select
//   const [tipoServicioActual, setTipoServicioActual] = useState(null);
//   const [precios, setPrecios] = useState([]);
//   const [precioActual, setPrecioActual] = useState("");
//   const [ambienteActual, setAmbienteActual] = useState("");
//   const [muestraActual, setMuestraActual] = useState("");
//   console.log("muestra actual: ", muestraActual);
//   console.log("set muestra actual: ", setMuestraActual);
//   const [variables, setVariables] = useState([]);
//   const [variablesUpdate, setVariablesUpdate] = useState([]);
//   const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
//   const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
//   const [modalServicioTerminado, setModalServicioTerminado] = useState(false);
//   const variablesParaRenderizar = servicioSeleccionado
//     ? variablesUpdate
//     : variables;

//   if (isLoadingServicios) {
//     return (
//       <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
//     );
//   }

//   console.log("Data Muestras:", dataMuestras);

//   const opcionesMuestras = dataMuestras
//     ? dataMuestras.map((muestra) => ({
//         label: muestra.codigo_muestra,
//         id_muestra: muestra.id_muestra,
//         id_tipo_servicio: muestra.fk_idTipoServicio,
//         key: muestra.id_muestra, // Asegúrate de incluir una clave única
//       }))
//     : [];

//   console.log("mapeo del data muestras ", opcionesMuestras);

//   // Manejador para cuando se selecciona una muestra en el Autocomplete
//   const manejadorSeleccionMuestras = async (muestra) => {
//     if (muestra) {
//       // Actualiza el estado de la muestra actual
//       setMuestraActual(muestra.value);
//       setValue("id_muestra", muestra.value); // Si usas react-hook-form o similar

//       console.log("Muestra seleccionada:", muestra);

//       // Ahora obtén el idTipoServicio basado en la muestra seleccionada
//       const idTipoServicio = muestra.value; // Asigna el idTipoServicio según tu lógica
//       setTipoServicioActual(idTipoServicio);
//       setValue("fk_idTipoServicio", idTipoServicio);

//       // Ejecuta las funciones necesarias
//       await manejadorObtencionPrecioParaTipoServicio(idTipoServicio);
//       await manejadorobtencionTipoServicio({
//         target: { value: idTipoServicio },
//       });
//     }
//   };

//   const manejadorobtencionTipoServicio = async (e) => {
//     const idTipoServicio = e.target.value;
//     setTipoServicioActual(idTipoServicio);
//     manejadorObtencionPrecioParaTipoServicio(idTipoServicio);

//     try {
//       // Llama a la mutación para obtener las variables con base en el idTipoServicio
//       const respuesta = await obtenerVariables({ idTipoServicio }).unwrap();
//       setVariables(respuesta);
//     } catch (error) {
//       console.error("Error al obtener las variables: " + error.message);
//     }
//   };

//   const manejadorObtencionPrecioParaTipoServicio = async (idTipoServicio) => {
//     try {
//       const respuesta = await obtenerPrecio({ idTipoServicio }).unwrap();
//       setPrecios(respuesta);
//     } catch (error) {
//       console.error("Error al obtener los precios: " + error.message);
//     }
//   };

//   const abrirModalRegistro = async (servicio) => {
//     if (servicio) {
//       setServicioSeleccionado(servicio);
//       setTipoServicioActual(servicio.tipo_servicio);
//       setPrecioActual(servicio.presentacion);
//       setAmbienteActual(servicio.nombre_ambiente);
//       setMuestraActual(servicio.codigo_muestra);

//       try {
//         // Llamar a la mutación para obtener las variables asociadas al servicio
//         const respuesta = await obtencionVariablesUpdate({
//           idTipoServicio: servicio.id_servicios,
//         }).unwrap();
//         setVariablesUpdate(respuesta); // Establece las variables obtenidas

//         // Cargar los valores de las variables en el formulario
//         respuesta.forEach((variable) => {
//           setValue(`variable_${variable.idVariable}`, variable.valor); // Setea el valor de cada variable
//         });
//       } catch (error) {
//         console.error(
//           "Error al obtener las variables para la edición: " + error.message
//         );
//       }
//       setVariables();
//     }
//     setModalRegistroVisible(true);
//   };

//   const cerrarModalRegistro = () => {
//     setModalRegistroVisible(false);
//     reset(); // Limpia los valores del formulario
//     setTipoServicioActual(""); // Reinicia el tipo de servicio seleccionado
//     setVariables([]); // Limpia las variables
//     setAmbienteActual("");
//     setMuestraActual("");
//     setServicioSeleccionado(null); // Limpia el servicio seleccionado
//   };

//   const onSubmitRegistroEdicion = async (datosDelFormulario) => {
//     const valoresVariables = {};
//     variables.forEach((variable) => {
//       const valor = datosDelFormulario[`variable_${variable.idVariable}`];
//       if (valor !== undefined && valor !== "") {
//         valoresVariables[variable.idVariable] = valor;
//       }
//     });

//     const payload = {
//       fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
//       fk_id_precio: datosDelFormulario.fk_idPrecio,
//       fk_idAmbiente: datosDelFormulario.idAmbiente,
//       fk_idMuestra: datosDelFormulario.id_muestra,
//       fk_idUsuarios: authData.usuario.id,
//       valoresVariables,
//     };

//     try {
//       if (servicioSeleccionado) {
//         // Editar el servicio existente
//         await actualizarServicio({
//           id: servicioSeleccionado.id_servicios,
//           ...payload,
//         }).unwrap();
//         toast.success("Servicio actualizado con éxito!");
//       } else {
//         // Registrar nuevo servicio
//         await registrarServicio(payload).unwrap();
//         toast.success("Servicio registrado con éxito!");
//       }
//       cerrarModalRegistro();
//       refetch();
//     } catch (error) {
//       toast.error("Error al procesar el servicio: " + error.message);
//     }
//   };

//   const abrirModalServicioTerminado = (id) => {
//     const servicioActualTerminado = dataServicios.find(
//       (servicio) => servicio.id_servicios === id
//     );

//     if (servicioActualTerminado) {
//       let idServicio = servicioActualTerminado.id_servicios;
//       console.log("id servicio extraido", idServicio);

//       // Guardamos el id del servicio en el estado
//       setServicioId(idServicio);
//     } else {
//       console.log("Servicio no encontrado");
//     }

//     setModalServicioTerminado(true);
//   };

//   const cerrarModalServicioTerminado = () => {
//     setModalServicioTerminado(false);
//     setServicioId(null);
//   };

//   const onSubmitServicioTerminado = async (data) => {
//     const payload = {
//       id: servicioId,
//       cantidad_salida: data.cantidad_salida,
//     };

//     try {
//       await registroServicioTerminado(payload).unwrap();

//       toast.success("Servicio terminado registrado con éxito!");

//       // Ahora sí cambiamos el estado del servicio a "terminado"
//       actualizarEstadoServicio({ id: servicioId, estado: "terminado" })
//         .unwrap()
//         .then(() => {
//           toast.success("Estado cambiado a 'Terminado' con éxito!");
//           refetch();
//         })
//         .catch((error) => {
//           toast.error(
//             "Error al actualizar el estado a 'Terminado': " + error.message
//           );
//         });

//       cerrarModalServicioTerminado();
//     } catch (error) {
//       toast.error("Error al registrar el servicio terminado: " + error.message);
//     }
//   };

//   const manejadorCambioEstadoSwitch = (checked, id, tipo_servicio) => {
//     const nuevoEstado = checked ? "en proceso" : "terminado";

//     const servicioActual = dataServicios.find(
//       (servicio) => servicio.id_servicios === id
//     );

//     if (!servicioActual) {
//       toast.error("Registro de servicio no encontrado");
//       return;
//     }

//     // Cuando se intenta marcar como terminado, abrimos el modal antes de cambiar el estado
//     if (nuevoEstado === "terminado") {
//       abrirModalServicioTerminado(id); // Abre el modal para registrar la cantidad de salida
//       return; // Detenemos aquí para no cambiar el estado aún
//     }

//     // Si se trata de cambiar a "en proceso", simplemente procedemos
//     const payload = {
//       id: id,
//       estado: nuevoEstado,
//     };

//     const mensajeConfirmacion = checked
//       ? `¿Está seguro de que desea cambiar el estado a "En proceso" para el servicio ${tipo_servicio}?`
//       : `¿Está seguro de que desea cambiar el estado a "Terminado" para el servicio ${tipo_servicio}?`;

//     confirmAlert({
//       title: "Confirmación de cambio de estado",
//       message: mensajeConfirmacion,
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
//         <div className="flex ">
//           <div className="pt-10 pl-20">
//             <Mybutton
//               color={"primary"}
//               onClick={() => abrirModalRegistro(null)}
//             >
//               <b>Nuevo Servicio</b>
//             </Mybutton>
//           </div>
//           <div className="pl-20 w-[500px]">
//             <Search
//               label={"Filtrar"}
//               placeholder={"Filtro por muestra..."}
//               onchange={(e) => setFiltro(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="w-full px-20 h-auto overflow-y-auto">
//           <TableMolecula>
//             <Thead>
//               <Th>ID</Th>
//               <Th>Tipo servicio</Th>
//               <Th>Fecha</Th>
//               <Th>Nombre ambiente</Th>
//               <Th>Codigo muestra</Th>
//               <Th>Presentación</Th>
//               <Th>Encargado</Th>
//               <Th>Rol</Th>
//               <Th>Estado</Th>
//               <Th>Acciones</Th>
//             </Thead>
//             <Tbody>
//               {DataArrayPaginacion.length > 0 ? (
//                 DataArrayPaginacion.map((servicio) => (
//                   <tr
//                     className="hover:bg-slate-200"
//                     key={servicio.id_servicios}
//                   >
//                     <Td>{servicio.id_servicios}</Td>
//                     <Td>{servicio.tipo_servicio}</Td>
//                     <Td>{servicio.fecha}</Td>
//                     <Td>{servicio.nombre_ambiente}</Td>
//                     <Td>{servicio.codigo_muestra}</Td>
//                     <Td>{servicio.presentacion}</Td>
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
//                             servicio.tipo_servicio
//                           )
//                         }
//                       >
//                         {servicio.estado}
//                       </Switch>
//                     </Td>
//                     <Td>
//                       <Mybutton onClick={() => abrirModalRegistro(servicio)}>
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
//         {/* Modal de Registro */}
//         {modalRegistroVisible && (
//           <ModalOrganismo
//             visible={modalRegistroVisible}
//             closeModal={cerrarModalRegistro}
//             title="Registrar Servicio"
//           >
//             <form onSubmit={handleSubmit(onSubmitRegistroEdicion)}>
//               <div className="mb-10 space-y-6 ">
//                 {/* <SelectAtomo
//                   data={dataMuestras}
//                   label="Selecciona una muestra"
//                   items="id_muestra"
//                   ValueItem="codigo_muestra"
//                   value={muestraActual}
//                   onChange={(e) => {
//                     setValue("id_muestra", e.target.value);
//                     setMuestraActual(e.target.value);

//                     const idTipoServicio = e.target.value;
//                     setTipoServicioActual(idTipoServicio);
//                     manejadorobtencionTipoServicio(e);
//                     setValue("fk_idTipoServicio", idTipoServicio);
//                   }}
//                 /> */}

//                 <Autocomplete
//                   options={opcionesMuestras}
//                   onSelect={manejadorSeleccionMuestras}
//                   renderItem={(item) => (
//                     <AutocompleteItem key={item.key} {...item} />
//                   )}
//                 />

//                 <SelectAtomo
//                   data={precios} // Precios obtenidos según el tipo de servicio
//                   label="Selecciona la Presentación"
//                   items="idPrecio"
//                   ValueItem="presentacion"
//                   value={precioActual}
//                   onChange={(e) => {
//                     const idPrecio = e.target.value;
//                     setPrecioActual(idPrecio);
//                     manejadorObtencionPrecioParaTipoServicio(e);
//                     setValue("fk_idPrecio", idPrecio);
//                   }}
//                 />

//                 <SelectAtomo
//                   data={dataAmbientes}
//                   label="Selecciona el Ambiente"
//                   items="idAmbiente"
//                   ValueItem="nombre_ambiente"
//                   value={ambienteActual}
//                   onChange={(e) => {
//                     setValue("idAmbiente", e.target.value);
//                     setAmbienteActual(e.target.value);
//                   }}
//                 />
//               </div>
//               {/* contenedor del select y el mapeo para mostrar variables */}
//               <div>
//                 {variablesParaRenderizar.length > 0 && (
//                   <div className="mt-4">
//                     <div>
//                       <h2>Variables del servicio:</h2>
//                     </div>
//                     {variablesParaRenderizar.map((variable) => {
//                       return (
//                         <div
//                           key={`variable_${variable.idVariable}`}
//                           className="mb-10"
//                         >
//                           <InputAtomo
//                             type={
//                               variable.variable_tipo_dato === "number"
//                                 ? "number"
//                                 : "text"
//                             }
//                             placeholder={`Ingrese ${variable.variable_nombre}`}
//                             id={`variable_${variable.idVariable}`}
//                             name={`variable_${variable.idVariable}`}
//                             register={register}
//                             erros={errors}
//                           />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//               <div className="flex justify-center mt-6">
//                 <Mybutton color={"primary"} type="submit">
//                   Enviar
//                 </Mybutton>
//               </div>
//             </form>
//           </ModalOrganismo>
//         )}

//         {/* Modal registro de salida*/}
//         {modalServicioTerminado && (
//           <ModalOrganismo
//             visible={modalServicioTerminado}
//             closeModal={cerrarModalServicioTerminado}
//             title="Registro termino de servicio"
//           >
//             <form onSubmit={handleSubmit(onSubmitServicioTerminado)}>
//               <InputAtomo
//                 type="number"
//                 id="cantidad_salida"
//                 name="cantidad_salida"
//                 placeholder="cantidad de salida"
//                 register={register}
//                 erros={errors}
//               />
//               <div className="flex justify-center mt-6">
//                 <Mybutton color={"primary"} type="submit">
//                   Enviar
//                 </Mybutton>
//               </div>
//             </form>
//           </ModalOrganismo>
//         )}
//       </div>
//     </>
//   );
// };

// export default ServiciosPlantilla;
