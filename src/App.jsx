import './App.css'
import {Route,  Routes} from "react-router-dom";

import HomePages from './pages/Home/HomePages';
import LoginPages from './pages/login/LoginPages';

const  App=()=> {
    return (
      <>
        <Routes>
          <Route path="/" element={<LoginPages />}></Route>
          <Route path="/home" element={<HomePages />}></Route>
        </Routes>
      </>
    );
}
export default App
