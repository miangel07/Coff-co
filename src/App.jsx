import './App.css'
import {Route,  Routes} from "react-router-dom";
import LoginPages from "./pages/auth/LoginPages.jsx";
const  App=()=> {
    return (
        <>
<Routes>
    <Route path='/' element={<LoginPages/>}></Route>
    <Route path='/inicio' element={<LoginPages/>}></Route>
</Routes>

</>
    )
}
export default App
