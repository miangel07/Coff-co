import './App.css'
import {Route,  Routes} from "react-router-dom";
import LoginPages from "./pages/Auth/LoginPages";
import HomePages from './pages/Home/HomePages';

const  App=()=> {
    return (
        <>
<Routes>
    <Route path='/' element={<LoginPages/>}></Route>
    <Route path='/home' element={<HomePages/>}></Route>
</Routes>

</>
    )
}
export default App
