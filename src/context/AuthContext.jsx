import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const iniciarSesion = (data) => {
    setAuthData(data);  
    //PARA VER LOS DATOS GUARDADOS EN EL CONTEXTO 
      //Aqui se ven desde la consola, formateados
      console.log(data)
    //PRUEBA PARA VER COMO SE VEN EN UNA COOKIE (Aqui no se formatean los datos)
    Cookies.set('UsuarioContext', JSON.stringify(data), { expires: 1 }); 
  };

  const cerrarSesion = () => {
    setAuthData(null);
    removeCookie("Token");  // Opcional: para eliminar la cookie
  };

  return (
    <AuthContext.Provider value={{ authData, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
