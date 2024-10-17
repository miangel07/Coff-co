import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import {
  useActualizarAlquilerMutation,
  useEliminarAlquilerMutation,
  useGetAlquilerQuery,
  useGetUsuariosAlquilerQuery,
  useRegistrarAlquilerMutation,
} from "../../../store/api/alquilerLaboratorio/alquilerSlice";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
import SelectAtomo from "../../atoms/Select";
import SelectSearch from "../../atoms/SelectSearch";
import { confirmAlert } from "react-confirm-alert";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const CalendarPlantilla = () => {
  const { data: dataAlquiler } = useGetAlquilerQuery();
  const { data: dataAmbientes } = useGetAmbientesQuery();
  const { data: dataUsuariosAlquiler } = useGetUsuariosAlquilerQuery();
  const [registrarReserva] = useRegistrarAlquilerMutation();
  const [actualizarReserva] = useActualizarAlquilerMutation();
  const [eliminarReserva] = useEliminarAlquilerMutation();
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [modalRegistrarVisible, setModalRegistrarVisible] = useState(false);
  const [ambienteActual, setAmbienteActual] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (dataAlquiler) {
      const reservasMapeadas = dataAlquiler.map((alquiler) => ({
        title: alquiler.nombre_completo_usuario || "Reserva",
        start: alquiler.fecha,
        end: alquiler.fecha_fin,
        extendedProps: {
          id_servicios: alquiler.id_servicios,
          tipo_servicio: alquiler.tipo_servicio,
          fk_id_precio:alquiler.precio,
          fk_idAmbiente: alquiler.ambiente,
          nombre_cliente: alquiler.nombre_completo_usuario,
          estado: alquiler.estado,
          fecha_fin: alquiler.fecha_fin,
        },
      }));
      setReservas(reservasMapeadas);
    }
  }, [dataAlquiler]);

  const manejadorReservaSeleccionada = (info) => {
    setReservaSeleccionada(info.event);
    setModalDetalleVisible(true);
  };

  const cerrarModalRecervaSeleccionada = () => {
    setReservaSeleccionada(null);
    setModalDetalleVisible(false);
    reset();
  };

  const handleDateClick = (arg) => {
    setModalRegistrarVisible(true);
    reset(); // Limpia el formulario al abrir el modal
    setValue("fecha", arg.dateStr); // Establece la fecha seleccionada en el formulario
  };

  const registrarNuevaReserva = async (nuevaReserva) => {
    console.log("datos para el registro: ", nuevaReserva);
    try {
      // Obtener la fecha de fin como un objeto Date
      const fechaFinCorregida = new Date(nuevaReserva.fecha_fin);

      // Establecer la hora a 23:59:59 para que incluya todo el 18
      fechaFinCorregida.setHours(23, 59, 59, 999);

      const payload = {
        fecha: nuevaReserva.fecha,
        fk_idAmbiente: nuevaReserva.idAmbiente,
        fk_idUsuarios: usuarioSeleccionado,
        // Almacena la fecha_fin como ISOString, pero se debe mostrar en el calendario como 'YYYY-MM-DD' para el final del 18
        fecha_fin: fechaFinCorregida.toISOString().split("T")[0], // Guardar como YYYY-MM-DD
      };

      // Actualiza las reservas aquí con las fechas corregidas
      const start = nuevaReserva.fecha; // La fecha de inicio
      const end = fechaFinCorregida.toISOString().split("T")[0]; // La fecha de fin corregida

      await registrarReserva(payload).unwrap();

      reset(); // Limpia el formulario después de registrar
      toast.success("Reserva registrada con éxito");
      setModalRegistrarVisible(false);
    } catch (error) {
      console.error("Error al registrar la reserva:", error);
      toast.error("Error al registrar la reserva");
    }
  };


  

  const actualizarReservaExistente = async (reservaActualizada) => {
    try {
      const payload = {
        id: reservaSeleccionada.extendedProps.id_servicios,
        fecha: reservaActualizada.fecha,
        fk_idAmbiente: reservaActualizada.idAmbiente,
        fk_idUsuarios: usuarioSeleccionado,
        fecha_fin: reservaActualizada.fecha_fin,
      };

      await actualizarReserva(payload).unwrap();

      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.extendedProps.id_servicios ===
          reservaSeleccionada.extendedProps.id_servicios
            ? {
                ...reserva,
                start: reservaActualizada.fecha,
                end: reservaActualizada.fecha_fin,
              }
            : reserva
        )
      );
      toast.success("Reserva actualizada con éxito");
      setModalEditarVisible(false);
      setModalDetalleVisible(false);
      setReservaSeleccionada(null);
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      toast.error("Error al actualizar la reserva");
    }
  };

  const manejadorEliminarReserva = async (id_servicios, nombre_cliente) => {
    confirmAlert({
      title: (
        <div>
          <b>Confirmación de eliminación</b>
        </div>
      ),
      message: (
        <div>
          ¿Estás seguro de que quieres eliminar la reserva para
          <span style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            {nombre_cliente}
          </span>
          ?
        </div>
      ),
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              await eliminarReserva(id_servicios).unwrap();
              setReservas((prevReservas) =>
                prevReservas.filter(
                  (reserva) =>
                    reserva.extendedProps.id_servicios !== id_servicios
                )
              );
              toast.success("Reserva eliminada con éxito.");
            } catch (error) {
              console.error("No se pudo eliminar la reserva.", error);
              toast.error("No se pudo eliminar la reserva.");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada"),
        },
      ],
      closeOnClickOutside: true,
    });
  };

  return (
    <>
      <div className="w-auto h-screen flex flex-col gap-8 bg-gray-100">
        <div className="w-full px-20 h-auto pt-20 overflow-y-auto ">
          <div className="pt-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={reservas}
              dateClick={handleDateClick} // Llama a handleDateClick al hacer clic en una fecha
              eventClick={manejadorReservaSeleccionada}
              locale={esLocale}
            />
          </div>
        </div>
        <div>
          {modalDetalleVisible && reservaSeleccionada && (
            <ModalOrganismo
              visible={modalDetalleVisible}
              closeModal={cerrarModalRecervaSeleccionada}
              title="Detalles de reserva"
            >
              <div className="flex flex-col text-center">
                <h2>
                  <b>{reservaSeleccionada.extendedProps.tipo_servicio}</b>
                </h2>
                <p>{`Nombre cliente: ${reservaSeleccionada.extendedProps.nombre_cliente}`}</p>
                <p>{`Fecha inicio: ${reservaSeleccionada.startStr}`}</p>
                <p>{`Fecha fin: ${reservaSeleccionada.extendedProps.fecha_fin}`}</p>
                <p>{`Estado: ${reservaSeleccionada.extendedProps.estado}`}</p>
              </div>
              <div className="flex justify-end mt-4">
                <FaRegEdit
                  size={"35px"}
                  onClick={() => {
                    // Precargar los datos de la reserva seleccionada en los inputs del modal
                    setValue("fecha", reservaSeleccionada.startStr); // Precarga la fecha de inicio
                    setValue(
                      "fecha_fin",
                      reservaSeleccionada.extendedProps.fecha_fin
                    ); // Precarga la fecha de fin
                    setValue(
                      "idAmbiente",
                      reservaSeleccionada.extendedProps.fk_idAmbiente
                    ); // Precarga el ambiente
                    setAmbienteActual(
                      reservaSeleccionada.extendedProps.id_servicios
                    ); // Selecciona el ambiente actual
                    setModalEditarVisible(true); 
                  }}
                />
                <MdDelete
                  size={"35px"}
                  onClick={() => {
                    manejadorEliminarReserva(
                      reservaSeleccionada.extendedProps.id_servicios,
                      reservaSeleccionada.extendedProps.nombre_cliente
                    );
                  }}
                />
              </div>
            </ModalOrganismo>
          )}
        </div>

        {/* Modal para editar la reserva seleccionada */}
        {modalEditarVisible && (
          <ModalOrganismo
            visible={modalEditarVisible}
            closeModal={() => setModalEditarVisible(false)}
            title="Editar reserva"
          >
            <form onSubmit={handleSubmit(actualizarReservaExistente)}>
              <div className="mb-10 space-y-6">
                <InputAtomo
                  type="date"
                  id="fecha"
                  name="fecha"
                  placeholder="Fecha inicio"
                  register={register}
                  erros={errors}
                />

                <SelectAtomo
                  data={dataAmbientes}
                  label="Selecciona el ambiente"
                  items="idAmbiente"
                  ValueItem="nombre_ambiente"
                  value={ambienteActual}
                  onChange={(e) => {
                    setValue("idAmbiente", e.target.value);
                    setAmbienteActual(e.target.value);
                  }}
                />
                <SelectSearch
                  label="Usuario"
                  valueCampos={[
                    {
                      value: "nombre_completo_usuario",
                      label: "nombre",
                    },
                  ]}
                  data={dataUsuariosAlquiler}
                  idKey="id_usuario"
                  labelKey="nombre_completo_usuario"
                  onChange={(value) => setUsuarioSeleccionado(value)}
                />

                <InputAtomo
                  type="date"
                  id="fecha_fin"
                  name="fecha_fin"
                  placeholder="Fecha final"
                  register={register}
                  erros={errors}
                />

                <div className="flex justify-end">
                  <Mybutton color={"primary"} type="submit">
                    Actualizar Reserva
                  </Mybutton>
                </div>
              </div>
            </form>
          </ModalOrganismo>
        )}

        {/* Modal para registrar nueva reserva */}
        {modalRegistrarVisible && (
          <ModalOrganismo
            visible={modalRegistrarVisible}
            closeModal={() => setModalRegistrarVisible(false)}
            title="Nueva reserva"
          >
            <form onSubmit={handleSubmit(registrarNuevaReserva)}>
              <div className="mb-10 space-y-6 ">
                <InputAtomo
                  type="date"
                  id="fecha"
                  name="fecha"
                  placeholder="Fecha inicio"
                  register={register}
                  erros={errors}
                  isReadOnly={true}
                />

                <SelectAtomo
                  data={dataAmbientes}
                  label="Selecciona el ambiente"
                  items="idAmbiente"
                  ValueItem="nombre_ambiente"
                  value={ambienteActual}
                  onChange={(e) => {
                    setValue("idAmbiente", e.target.value);
                    setAmbienteActual(e.target.value);
                  }}
                />
                <SelectSearch
                  label="Usuario"
                  valueCampos={[
                    {
                      value: "nombre_completo_usuario",
                      label: "nombre",
                    },
                  ]}
                  data={dataUsuariosAlquiler}
                  idKey="id_usuario"
                  labelKey="nombre_completo_usuario"
                  onChange={(value) => setUsuarioSeleccionado(value)}
                />

                <InputAtomo
                  type="date"
                  id="fecha_fin"
                  name="fecha_fin"
                  placeholder="Fecha final"
                  register={register}
                  erros={errors}
                />
                <div className="flex justify-end">
                  <Mybutton color={"primary"} type="submit">
                    Registrar Reserva
                  </Mybutton>
                </div>
              </div>
            </form>
          </ModalOrganismo>
        )}
      </div>
    </>
  );
};

export default CalendarPlantilla;
