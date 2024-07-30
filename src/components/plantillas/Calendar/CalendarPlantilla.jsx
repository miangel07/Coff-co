import Navbar from "../../molecules/Navbar/Navbar";
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import { CiCalendarDate } from "react-icons/ci";
import "dayjs/locale/es"

dayjs.locale("es")

function CalendarPlantilla() {
    const localizer = dayjsLocalizer(dayjs);
    const events = [
        {
            start: dayjs('2024-07-30T9:00:00').toDate(),
            end: dayjs('2024-07-30T17:00:00').toDate(),
            title: "Evento 1"
        }
    ];

    const EventComponent = ({ event }) => (
        <div className="flex items-center">
            <CiCalendarDate className="mr-2" />
            {event.title}
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
            <div className="flex justify-center items-center h-screen">
                <div style={{ width: '80%', maxWidth: '800px' }}>
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
                        min={dayjs('2024-07-30T8:00:00').toDate()}
                        max={dayjs('2024-07-30T20:00:00').toDate()}
                    />
                </div>
            </div>
        </>
    );
}

export default CalendarPlantilla;

