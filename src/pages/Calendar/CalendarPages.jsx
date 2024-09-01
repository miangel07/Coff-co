import CalendarPlantilla from "../../components/plantillas/Calendar/CalendarPlantilla.jsx"
import Navbar from "../../components/molecules/Navbar/Navbar.jsx";
import { useState } from "react";




const CalendarPages = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);


    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);

    };
    return (
        <div className="flex">
            <Navbar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
            <div className={`transition-all duration-300 ease-in-out ${menuAbierto ? "ml-64" : "ml-16"
                } w-full`}>

                <CalendarPlantilla />
            </div>

        </div>

    )

}
export default CalendarPages