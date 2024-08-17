import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePages from "./pages/Home/HomePages";
import LoginPages from "./pages/login/LoginPages";
import UsersPages from "./pages/users/UsersPages";
import DocumentosPage from "./pages/documentos/DocumentosPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPages />}></Route>
        <Route path="/home" element={<HomePages />}></Route>
        <Route path="/users" element={<UsersPages />}></Route>
        <Route path="/documentos" element={<DocumentosPage />}></Route>
      </Routes>
    </>
  );
};
export default App;
