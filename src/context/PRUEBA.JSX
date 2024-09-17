import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); 

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario); 
    Cookies.set('UsuarioContext', JSON.stringify(datosUsuario), { expires: 1 }); 
  };

  const cerrarSesion = () => {
    setUsuario(null);
    Cookies.remove('UsuarioContext'); 
  };

  useEffect(() => {
    const usuarioGuardado = Cookies.get('UsuarioContext');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
