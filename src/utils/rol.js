import { getCookie } from "../utils/index.js";
import { jwtDecode } from "jwt-decode";


export const rol = () => {
   const rol=getCookie("authToken");
   const decoded = jwtDecode(rol);
   const roles =decoded.user[0].rol_usuario;
   return(roles);
};