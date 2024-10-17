import React, { useEffect, useState } from "react";
import {
  useActualizarEstadoServicioMutation,
  useGetServicioQuery,
  useObtenerVariablesParaActualizarServicioMutation,
} from "../../../store/api/servicio/serviciosSlice";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import Td from "../../atoms/Td";
import Mybutton from "../../atoms/Mybutton";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import { Spinner, Switch } from "@nextui-org/react";
import ModalServicioTerminado from "./ModalServicioTerminadoOrganismo";
import { toast } from "react-toastify";
import EditarServicioOrganismo from "./EditarServicioOrganismo";
import { FaRegEdit } from "react-icons/fa";

const MostrarServicios = ({ filtro }) => {
  const {
    data: dataServicios,
    isLoading: isLoadingServicios,
    refetch,
  } = useGetServicioQuery();
  const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();
  const [obtencionVariablesUpdate] =
    useObtenerVariablesParaActualizarServicioMutation();
  const [variablesUpdate, setVariablesUpdate] = useState([]);
  console.log("variables con valores: ", variablesUpdate);
  const [modalServicioTerminado, setModalServicioTerminado] = useState(false); // Para controlar la visibilidad del modal
  const [abrirModalEditarValores, setAbrirModalEditarValores] = useState(false);
  const [servicioId, setServicioId] = useState(null); // Para almacenar el ID del servicio seleccionado

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

  if (isLoadingServicios) {
    return (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    );
  }

  const abrirModalServicioTerminado = (id) => {
    const servicioActualTerminado = dataServicios.find(
      (servicio) => servicio.id_servicios === id
    );

    if (servicioActualTerminado) {
      let idServicio = servicioActualTerminado.id_servicios;

      // Guardamos el id del servicio en el estado
      setServicioId(idServicio);
    } else {
      console.log("Servicio no encontrado");
    }

    setModalServicioTerminado(true);
  };

  const cerrarModalServicioTerminado = () => {
    // setServicioId(null);
    setModalServicioTerminado(false);
    // reset();
  };

  const abrirModalEditarValor = async (servicio) => {
    console.log("servicio pasado al abrir : ", servicio);
    try {
      const respuesta = await obtencionVariablesUpdate({
        id_servicios: servicio.id_servicios,
      }).unwrap();
      setVariablesUpdate(respuesta);
    } catch (error) {}
  
    // Aquí pasamos el servicio completo al modal
    setServicioId(servicio);  // Guarda el servicio completo en vez de solo el id
    setAbrirModalEditarValores(true);
  };

  const cerrarModal = () => {
    setAbrirModalEditarValores(false); // Cierra el modal
    setVariablesUpdate([]); // Limpia las variables cargadas previamente
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

    // Verificacion si el servicio ya ha terminado
    if (servicioActual.estado === "terminado" && nuevoEstado === "en proceso") {
      toast.error("Este servicio ya ha terminado.");
      return; // Detenemos aquí si se intenta revertir a "en proceso"
    }

    // Cuando se intenta marcar como terminado, abrimos el modal antes de cambiar el estado
    if (nuevoEstado === "terminado") {
      abrirModalServicioTerminado(id); // Abre el modal para registrar la cantidad de salida
      return; // Detenemos aquí para no cambiar el estado aún
    }

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
      <div>
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
                            servicio.tipo_servicio
                          )
                        }
                      >
                        {servicio.estado}
                      </Switch>
                    </Td>
                    <Td>
                        <div className="flex flex-row gap-6">
                        <FaRegEdit
                        size={"35px"}
                        onClick={() => abrirModalEditarValor(servicio)}
                      />
                        </div>
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
        <div>
          {/* Aquí se incluye el modal para el servicio terminado */}
          <ModalServicioTerminado
            visible={modalServicioTerminado}
            cerrarModal={cerrarModalServicioTerminado}
            servicioId={servicioId}
            refetch={refetch} // Pasamos la función para actualizar los datos
          />
        </div>
        <div>
          <EditarServicioOrganismo
            visible={abrirModalEditarValores}
            closeModal={cerrarModal}
            title="Editar valores del servicio"
            variablesUpdate={variablesUpdate}
            servicio={servicioId} 
          />
        </div>
      </div>
    </>
  );
};

export default MostrarServicios;
