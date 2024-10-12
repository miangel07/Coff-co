// // import React, { useState } from "react";
// // import FullCalendar from "@fullcalendar/react";
// // import dayGridPlugin from "@fullcalendar/daygrid";
// // import timeGridPlugin from "@fullcalendar/timegrid";
// // import interactionPlugin from "@fullcalendar/interaction";
// // import esLocale from "@fullcalendar/core/locales/es";
// // import Mybutton from "../../atoms/Mybutton";
// // import { toast } from "react-toastify";
// // import {
// //   useGetAlquilerQuery,
// //   useGetUsuariosAlquilerQuery,
// //   useRegistrarAlquilerMutation,
// // } from "../../../store/api/alquilerLaboratorio/alquilerSlice";
// // import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
// // import { useForm } from "react-hook-form";
// // import InputAtomo from "../../atoms/Input";
// // import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
// // import SelectAtomo from "../../atoms/Select";

// // const CalendarPlantilla = () => {
// //   const { data: dataAlquiler } = useGetAlquilerQuery();
// //   const { data: dataAmbientes } = useGetAmbientesQuery();
// //   const { data: dataUsuariosAlquiler } = useGetUsuariosAlquilerQuery();
// //   const [registrarReserva] = useRegistrarAlquilerMutation();
// //   const {
// //     setValue,
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { errors },
// //   } = useForm();

// //   const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
// //   const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
// //   const [modalRegistrarVisible, setModalRegistrarVisible] = useState(false);
// //   const [ambienteActual, setAmbienteActual] = useState('')

// //   // Mapeo de dataAlquiler para generar las reservas
// //   const reservas =
// //     dataAlquiler?.map((alquiler) => ({
// //       title: alquiler.nombre_completo_usuario || "Reserva",
// //       start: alquiler.fecha,
// //       end: alquiler.fecha_fin,
// //       extendedProps: {
// //         tipo_servicio: alquiler.tipo_servicio,
// //         nombre_cliente: alquiler.nombre_completo_usuario,
// //         estado: alquiler.estado,
// //         fecha_fin: alquiler.fecha_fin,
// //       },
// //     })) || [];

// //   const manejadorReservaSeleccionada = (info) => {
// //     setReservaSeleccionada(info.event);
// //     setModalDetalleVisible(true);
// //   };

// //   const cerrarModalRecervaSeleccionada = () => {
// //     setReservaSeleccionada(null);
// //     setModalDetalleVisible(false);
// //   };

// //   const handleDateClick = (arg) => {
// //     setModalRegistrarVisible(true);
// //     reset(); // Limpia el formulario al abrir el modal
// //     setValue("fecha", arg.dateStr); // Establece la fecha seleccionada en el formulario
// //   };

// //   const registrarNuevaReserva = async (nuevaReserva) => {
// //     console.log('datos para el registro: ',nuevaReserva)
// //     try {
// //       const payload={
// //         fecha:nuevaReserva.fecha,
// //         fk_idAmbiente:nuevaReserva.idAmbiente,
// //         fk_idUsuarios:2,
// //         fecha_fin:nuevaReserva.fecha_fin
// //       }

// //       await registrarReserva(payload).unwrap();
// //       reset(); // Limpia el formulario después de registrar
// //       toast.success("Reserva registrada con éxito");
// //       setModalRegistrarVisible(false);
// //     } catch (error) {
// //       console.error("Error al registrar la reserva:", error);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="w-auto h-screen flex flex-col gap-8 bg-gray-100">
// //         <div className="w-full px-20 h-auto pt-20 overflow-y-auto ">
// //           <div>
// //             <Mybutton
// //               color={"primary"}
// //               onClick={() => setModalRegistrarVisible(true)}
// //             >
// //               <b>Nueva reserva</b>
// //             </Mybutton>
// //           </div>
// //           <div className="pt-4">
// //             <FullCalendar
// //               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// //               initialView="dayGridMonth"
// //               events={reservas}
// //               // dateClick={handleDateClick}
// //               eventClick={manejadorReservaSeleccionada}
// //               locale={esLocale}
// //             />
// //           </div>
// //         </div>
// //         <div>
// //           {modalDetalleVisible && reservaSeleccionada && (
// //             <ModalOrganismo
// //               visible={modalDetalleVisible}
// //               closeModal={cerrarModalRecervaSeleccionada}
// //             >
// //               <div className="flex flex-col text-center">
// //                 <h2>
// //                   <b>{reservaSeleccionada.extendedProps.tipo_servicio}</b>
// //                 </h2>
// //                 <p>{`Nombre cliente: ${reservaSeleccionada.extendedProps.nombre_cliente}`}</p>
// //                 <p>{`Fecha inicio: ${reservaSeleccionada.startStr}`}</p>
// //                 <p>{`Fecha fin: ${reservaSeleccionada.extendedProps.fecha_fin}`}</p>
// //                 <p>{`Estado: ${reservaSeleccionada.extendedProps.estado}`}</p>
// //               </div>
// //             </ModalOrganismo>
// //           )}
// //         </div>

// //         {/* Modal para registrar nueva reserva */}
// //         {modalRegistrarVisible && (
// //           <ModalOrganismo
// //             visible={modalRegistrarVisible}
// //             closeModal={() => setModalRegistrarVisible(false)}
// //             title="Nueva reserva"
// //           >
// //             <form onSubmit={handleSubmit(registrarNuevaReserva)}>
// //               <div className="mb-10 space-y-6 ">
// //                 <InputAtomo
// //                   type="date"
// //                   id="fecha"
// //                   name="fecha"
// //                   placeholder="Fecha ingreso"
// //                   register={register}
// //                   erros={errors}
// //                 />
// //                 <SelectAtomo
// //                   data={dataAmbientes}
// //                   label="Selecciona el ambiente"
// //                   items="idAmbiente"
// //                   ValueItem="nombre_ambiente"
// //                   value={ambienteActual}
// //                   onChange={(e) => {
// //                     setValue("idAmbiente", e.target.value);
// //                     setAmbienteActual(e.target.value);
// //                   }}
// //                 />
// //                 <InputAtomo
// //                   type="date"
// //                   id="fecha_fin"
// //                   name="fecha_fin"
// //                   placeholder="Fecha final"
// //                   register={register}
// //                   erros={errors}
// //                 />
// //                 <div className="flex justify-end">
// //                   <Mybutton color={"primary"} type="submit">
// //                     Registrar Reserva
// //                   </Mybutton>
// //                 </div>
// //               </div>
// //             </form>
// //           </ModalOrganismo>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default CalendarPlantilla;


import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import {
  useActualizarAlquilerMutation,
  useGetAlquilerQuery,
  useGetUsuariosAlquilerQuery,
  useRegistrarAlquilerMutation,
} from "../../../store/api/alquilerLaboratorio/alquilerSlice";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import { useGetAmbientesQuery } from "../../../store/api/ambientes/ambientesSlice";
import SelectAtomo from "../../atoms/Select";

const CalendarPlantilla = () => {
  const { data: dataAlquiler } = useGetAlquilerQuery();
  const { data: dataAmbientes } = useGetAmbientesQuery();
  const { data: dataUsuariosAlquiler } = useGetUsuariosAlquilerQuery();
  const [registrarReserva] = useRegistrarAlquilerMutation();
  const [actualizarReserva] = useActualizarAlquilerMutation()
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

  // Mapeo de dataAlquiler para generar las reservas
  const reservas =
    dataAlquiler?.map((alquiler) => ({
      title: alquiler.nombre_completo_usuario || "Reserva",
      start: alquiler.fecha,
      end: alquiler.fecha_fin,
      extendedProps: {
        tipo_servicio: alquiler.tipo_servicio,
        nombre_cliente: alquiler.nombre_completo_usuario,
        estado: alquiler.estado,
        fecha_fin: alquiler.fecha_fin,
      },
    })) || [];

  const manejadorReservaSeleccionada = (info) => {
    setReservaSeleccionada(info.event);
    setModalDetalleVisible(true);
  };

  const cerrarModalRecervaSeleccionada = () => {
    setReservaSeleccionada(null);
    setModalDetalleVisible(false);
    reset()
  };

  const handleDateClick = (arg) => {
    setModalRegistrarVisible(true);
    reset(); // Limpia el formulario al abrir el modal
    setValue("fecha", arg.dateStr); // Establece la fecha seleccionada en el formulario
  };

  const registrarNuevaReserva = async (nuevaReserva) => {
    console.log("datos para el nueva reserva: ", nuevaReserva);
    try {
      const payload = {
        fecha: nuevaReserva.fecha,
        fk_idAmbiente: nuevaReserva.idAmbiente,
        fk_idUsuarios: 2, // Asegúrate de cambiar esto según el usuario autenticado
        fecha_fin: nuevaReserva.fecha_fin,
      };
  
      const response = await registrarReserva(payload).unwrap();
      reset(); // Limpia el formulario después de registrar
  
      // Mostrar el mensaje devuelto desde el servidor
      toast.success(response.message);  // Este mensaje proviene de tu controlador
  
      setModalRegistrarVisible(false);
    } catch (error) {
      // Si hay un error, se puede capturar el mensaje específico
      const errorMessage = error.data?.message || "Error al registrar la reserva";
      toast.error(errorMessage);
      console.error("Error al registrar la reserva:", error);
    }
  };

  const actualizarReservaExistente = async (reservaActualizada) => {
    console.log('datos para la actualizacion: ',reservaActualizada)
    // try {
    //   const payload = {
    //     id: reservaSeleccionada.id, // Asegúrate de obtener el ID de la reserva seleccionada
    //     fecha: reservaActualizada.fecha,
    //     fk_idAmbiente: reservaActualizada.idAmbiente,
    //     fk_idUsuarios: 2, // Cambia según el usuario autenticado
    //     fecha_fin: reservaActualizada.fecha_fin,
    //   };

    //   await actualizarReserva(payload).unwrap();
    //   toast.success("Reserva actualizada con éxito");
    //   setModalEditarVisible(false);
    //   setModalDetalleVisible(false); // Cerrar el modal de detalles también
    //   setReservaSeleccionada(null);
    // } catch (error) {
    //   console.error("Error al actualizar la reserva:", error);
    //   toast.error("Error al actualizar la reserva");
    // }
  };
  

  return (
    <>
      <div className="w-auto h-screen flex flex-col gap-8 bg-gray-100">
        <div className="w-full px-20 h-auto pt-20 overflow-y-auto ">
          {/* <div>
            <Mybutton
              color={"primary"}
              onClick={() => setModalRegistrarVisible(true)}
            >
              <b>Nueva reserva</b>
            </Mybutton>
          </div> */}
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
              title='Detalles de reserva'
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
                <Mybutton
                color={'primary'}
                onClick={()=>{setModalEditarVisible(true);}}
                >
                  Editar reserva
                </Mybutton>
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
                <InputAtomo
                  type="date"
                  id="fecha_fin"
                  name="fecha_fin"
                  placeholder="Fecha final"
                  register={register}
                  errors={errors}
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


