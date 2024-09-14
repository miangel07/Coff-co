import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const cookieData = Cookies.get('UsuarioContext');
    return cookieData ? JSON.parse(cookieData) : null;
  });

  // Función para iniciar sesión y guardar los datos tanto en el estado como en la cookie
  const iniciarSesion = (data) => {
    setAuthData(data);  
    console.table("Datos enviados al contexto:", JSON.stringify(data, null, 2));
    Cookies.set('UsuarioContext', JSON.stringify(data), { expires: 1 }); 
  };

  // Función para eliminar el contexto cuando se cierra la sesion
  const cerrarSesion = () => {
    setAuthData(null);
    Cookies.remove('UsuarioContext');  
  };

  useEffect(() => {
    // Ver los datos guardados en el contexto cada vez que authData cambia
    console.log("Datos guardados en el contexto de Autentificación:", authData);
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

