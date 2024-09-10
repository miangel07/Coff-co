import { Route, Routes } from "react-router-dom";

import HomePages from "./pages/Home/HomePages";
import LoginPages from "./pages/login/LoginPages";
import CalendarPages from "./pages/Calendar/CalendarPages";
import DocumentosPage from "./pages/documentos/DocumentosPage";
import AmbientesPage from "./pages/ambientes/AmbientesPage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AmbientesPlantilla from "./components/plantillas/ambientes/AmbientesPlantilla";
// import DashBoardPage from "./pages/dashBoardPage/DashBoardPage";
import PreciosPage from "./pages/precios/PreciosPage";
import UsersPages from "./pages/users/UsersPages";
import ServicioPage from "./pages/servicios/ServicioPage";
import VariablePages from "./pages/variable/VariablePages";
import MuestrasPage from "./pages/muestras/MuestrasPage";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="dark"
      />

      <Routes>
        {/* <Route path="/" element={<LoginPages />}></Route> */}
        <Route path="/*" element={<HomePages />}></Route>
        <Route path="/users" element={<UsersPages/>}></Route>
        <Route path="/alquiler" element={<CalendarPages />}></Route>
        <Route path="/documentos" element={<DocumentosPage />}></Route>
        <Route path="/ambientes" element={<AmbientesPage />}></Route>
        <Route path="/precios" element={<PreciosPage/>}></Route>
        <Route path="/servicios" element={<ServicioPage/>}></Route>
        <Route path="/varibles" element={<VariablePages/>}></Route>
        <Route path="/muestras" element={<MuestrasPage/>}></Route>

      </Routes>
    </>
  );
};
export default App;
