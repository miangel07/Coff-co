// import React, { useState, useEffect } from 'react';
// import Navbar from "../../molecules/Navbar/Navbar";
// import { Calendar, dayjsLocalizer } from 'react-big-calendar';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import dayjs from 'dayjs';
// import { CiCalendarDate } from "react-icons/ci";
// import "dayjs/locale/es";
// import Mybutton from "../../atoms/Mybutton";
// import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
// import InputAtomo from "../../atoms/Input";
// import { useForm } from "react-hook-form";
// import { useGetAlquilerQuery } from '../../../store/api/alquilerLaboratorio';
// import { usePostFormularioMutation } from '../../../store/api/servicio';
// import { Spinner } from '@nextui-org/react';

// dayjs.locale("es");

// function CalendarPlantilla() {
//     const [isModalVisible, setModalVisible] = useState(false);
//     const { data, isLoading, isError, error } = useGetAlquilerQuery();
//     const [postFormulario, { isSuccess, data: dataVariables, isError: variablesIsError, error: errorVariable }] = usePostFormularioMutation();
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         defaultValues: {
//             fecha_inicio_alquiler: dayjs().format('YYYY-MM-DD'),
//         }
//     });
//     const localizer = dayjsLocalizer(dayjs);

//     console.log(data)

//     if (isLoading) return <Spinner />;
//     if (isError) return <div>Error: {error.message}</div>;
//     const handleClick = async () => {
//         setModalVisible(true)
//         try {

//             const data = {
//                 "idTipoFormulario": 8
//             }
//             await postFormulario(
//                 data
//             )

//         } catch (e) {
//             console.log(e)
//         }

//     };
//     console.log("data", dataVariables)

//     const closeModal = () => setModalVisible(false);

//     const onSubmit = (data) => {
//         console.log("hola", data)

//         //data aca trae el evento que es la consula que ya trae esa info
//         setEvents([data]);

//         closeModal();
//     };

//     const EventComponent = ({ event }) => (
//         <div className="flex items-center">
//             <CiCalendarDate className="mr-2" />
//             {event.title} - {event.client}
//         </div>
//     );

//     return (
//         <>
//             <div className="flex justify-center">
//                 <h1 className="text-4xl font-bold">Alquiler de Laboratorio</h1>
//             </div>

//             <div className="flex justify-center items-center h-screen flex-col">
//                 <div style={{ width: '80%', maxWidth: '800px', marginBottom: '20px' }}>
//                     <Mybutton

//                         onClick={() => handleClick()}
//                         color={"primary"}
//                     >
//                         Agregar Evento
//                     </Mybutton>
//                     <Calendar
//                         events={data}
//                         localizer={localizer}
//                         style={{
//                             height: '500px',
//                             width: '100%',
//                         }}
//                         components={{
//                             event: EventComponent
//                         }}
//                         min={dayjs('2024-07-30T08:00:00').toDate()}
//                         max={dayjs('2024-07-30T20:00:00').toDate()}
//                     />
//                 </div>
//             </div>

//             <ModalOrganismo
//                 visible={isModalVisible}
//                 closeModal={closeModal}
//                 title="Registrar Evento"
//                 logo={<CiCalendarDate />}
//             >
//                 <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3 flex-col'>
//                     {/* aca mete los valores estaticos del formulario ose los que no son variables */}
//                     <div>
//                     <InputAtomo
//                         type={"text"}
//                         placeholder={" Ingrese el nombre del servicio"}
//                         id={"servicio_nombre"}
//                         name={"servicio_nombre"}
//                         register={register}
//                         erros={errors}
//                     />
//                    {/* select tipo servicio */}
//                   {/* select de precios */}
//                    {/* select de usuarios */}
//                    {/* select de ambiente */}
//                     </div>
//                     {/* hasta aca */}
//                     {isSuccess &&

//                         dataVariables?.map((items) => (

//                             <div className="mb-4" key={items.id} >
//                                 <InputAtomo
//                                     type={items.tipo_dato}
//                                     placeholder={items.nombre}
//                                     id={items.nombre}
//                                     name={items.nombre}
//                                     register={register}
//                                     erros={errors}
//                                 />
//                             </div>

//                         ))

//                     }

//                     <div className="flex justify-end mt-4">
//                         <Mybutton type="submit" color={"primary"}>
//                             Registrar Evento
//                         </Mybutton>
//                     </div>
//                 </form>
//             </ModalOrganismo>
//         </>
//     );
// }

// export default CalendarPlantilla;

import React from "react";

const CalendarPlantilla = () => {
  return (
    <>
      <h1>soy calendario</h1>
    </>
  );
};

export default CalendarPlantilla;
