import React, { useState } from 'react';
import Navbar from "../../molecules/Navbar/Navbar";
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import { CiCalendarDate } from "react-icons/ci";
import "dayjs/locale/es";
import Mybutton from "../../atoms/Mybutton";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import InputAtomo from "../../atoms/Input";
import { useForm } from "react-hook-form";

dayjs.locale("es");

function CalendarPlantilla() {
    const localizer = dayjsLocalizer(dayjs);

    const [events, setEvents] = useState([]);

    
    const [isModalVisible, setModalVisible] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fecha_inicio_alquiler: dayjs().format('YYYY-MM-DDTHH:mm'), 
        }
    });

    const openModal = () => setModalVisible(true);

    const closeModal = () => setModalVisible(false);

    
    const onSubmit = data => {

        const newEvent = {
            start: dayjs(data.fecha_inicio_alquiler).toDate(),
            end: dayjs(data.fecha_fin_alquiler).toDate(),
            title: data['Observaciones-laboratorio'],
            client: data.cliente,
        };

        setEvents([...events, newEvent]);

        
        closeModal();
    };

    const EventComponent = ({ event }) => (
        <div className="flex items-center">
            <CiCalendarDate className="mr-2" />
            {event.title} - {event.client}
        </div>
    );

    return (
        <>
            <div className="flex justify-center">
                <h1 className="text-4xl font-bold">Alquiler de Laboratorio</h1>
            </div>
            <div className="w-full absolute">
                <Navbar />
            </div>
            <div className="flex justify-center items-center h-screen flex-col">
                <div style={{ width: '80%', maxWidth: '800px', marginBottom: '20px' }}>
                    <Mybutton 
                        onClick={openModal}
                        color={"primary"}
                    >
                        Agregar Evento
                    </Mybutton>
                    <Calendar
                        events={events}
                        localizer={localizer}
                        style={{
                            height: '500px',
                            width: '100%',
                        }}
                        components={{
                            event: EventComponent
                        }}
                        min={dayjs('2024-07-30T08:00:00').toDate()}
                        max={dayjs('2024-07-30T20:00:00').toDate()}
                    />
                </div>
            </div>

            <ModalOrganismo 
                visible={isModalVisible}
                closeModal={closeModal}
                title="Registrar Evento"
                logo={<CiCalendarDate />}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <InputAtomo 
                            type="datetime-local"
                            placeholder="Fecha Inicio Alquiler"
                            id="fecha_inicio_alquiler"
                            name="fecha_inicio_alquiler"
                            register={register}
                            erros={errors}
                        />
                    </div>
                    <div className="mb-4">
                        <InputAtomo 
                            type="datetime-local"
                            placeholder="Fecha Fin Alquiler"
                            id="fecha_fin_alquiler"
                            name="fecha_fin_alquiler"
                            register={register}
                            erros={errors}
                        />
                    </div>
                    <div className="mb-4">
                        <InputAtomo 
                            type="text"
                            placeholder="Observaciones Laboratorio"
                            id="Observaciones-laboratorio"
                            name="Observaciones-laboratorio"
                            register={register}
                            erros={errors}
                        />
                    </div>
                    <div className="mb-4">
                        <InputAtomo 
                            type="text"
                            placeholder="Cliente"
                            id="cliente"
                            name="cliente"
                            register={register}
                            erros={errors}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Mybutton type="submit" color={"primary"}>
                            Registrar Evento
                        </Mybutton>
                    </div>
                </form>
            </ModalOrganismo>
        </>
    );
}

export default CalendarPlantilla;
