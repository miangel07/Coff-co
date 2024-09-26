import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//ESTA FUNCION 
export function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Token invalido", error);
      return null;
    }
}

const ProtectedRoute = () => {
    const Token = Cookies.get('Token');
    const SesionExistente = (Token && parseJwt(Token).exp * 1000 > Date.now());   

    return(
        <>
        {SesionExistente ? <Outlet/> : <Navigate to="/login"/>}
        </>
    )
}

export default ProtectedRoute;