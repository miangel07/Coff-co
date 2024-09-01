import React, { useEffect, useState } from "react";
import { TextField, FormControl, Select, InputLabel } from '@mui/material';
import axios from 'axios';
import UserTable from "../../molecules/users/UserTable";
import CardMolecula from "../../molecules/users/CardMolecula";
import Mybutton from "../../atoms/Mybutton";
import styled from 'styled-components';

const UsuarioOrganismo = () => {

    const endpoint = 'http://localhost:3000/api/usuario/registrar';

    //VALORES GLOBALES Y VALORES EN EL REGISTRO
    const [values, setValues] = useState({
      id_usuario: "",
      nombre: "",
      apellidos: ""	,
      correo_electronico: "",
      telefono: "",
      password:"",
      numero_documento: "",	
      tipo_documento: "",	
      estado: "",	
      fk_idRol: ""
    });

    const handleInputChange = (event) => {
      setValues({...values,
      [event.target.name] : event.target.value,
      });
    };

    //REGISTRAR USARIO
    const registrarUsuario = async (event) => {
      // event.preventDefault();
      try {
        console.log('Valores a enviar al servidor:', values); 
    
        const response = await axios.post(endpoint, values);
    
        if (response.status === 200) {
          setOpenModal(false);
          console.log('REGISTRADO')
        }
      } catch (error) {
        console.log(error.response.data);
    }
    };

    //ROL
    const apiRol = 'http://localhost:3000/api/rol/listar';
    const [rolUsuario, setRolUsuario] = useState([]);
    const getRol = async () => {
        try {
            const respuesta = await axios.get(`${apiRol}`);
            setRolUsuario(respuesta.data);
        } catch (error) {
            console.log("Error al obtener rol", error);
        }
    };

    const [openModal, setOpenModal] = useState(false);

        // FUNCIONES QUE SON CONSTANTES
        useEffect(()=>{
          getRol();
        }, []);

  return (
    <StyledContainer>

    <div className="max-w-full min-h-screen ">
      <div className="mt-4 ">
        <CardMolecula />
      </div>
      <div className=" w-full justify-center flex mt-16">
        <div className=" w-[90%] ml-8  mr-8">
          <Mybutton onClick={()=>setOpenModal(true)} color={"primary"}>
            Nuevo 
          </Mybutton>
          <UserTable />
        </div>
      </div>
    </div>

    { openModal && (
      <form onSubmit={registrarUsuario}>
      <div className='ModalPrincipal'>
          <div className='ModalPrincipal2'>
            <div className="TituloModal">
                  <h4>Registrar Usuario</h4>
                  <p>Ingresa los datos.</p>
            </div>

            <div className='ContenidoFormulario'>
            <div className="ContenedorFormulario">
            <div className="ContenedorFormulario2">
            
                <TextField
                  
                  label="Identificacion"
                  variant='outlined'  
                  type="number"
                  name="numero_documento"
                  value={values.numero_documento}
                  onChange={handleInputChange}
                />

              <StyledFormControl>
              <InputLabel>Tipo Documento</InputLabel>
                  <StyledSelect 
                  variant='outlined'  
                  type="number"
                  name="tipo_documento"
                  value={values.tipo_documento}
                  onChange={handleInputChange}

                  native
                  >
                  <option value="" disabled hidden></option>
                  <option value="cc">Cedula Ciudadania</option>
                  <option value="ti">Tarjeta Identidad</option>
                  <option value="nit">N.I.T</option>
                  <option value="pasaporte">Pasaporte</option>

                  </StyledSelect>
              </StyledFormControl>

                <TextField
                  label="Nombres"
                  variant='outlined'  
                  type="text"
                  name="nombre"    
                  value={values.nombre}
                  onChange={handleInputChange}
                />

                <TextField

                  label="Apellidos"  
                  type="text"
                  name="apellidos"
                  value={values.apellidos}
                  onChange={handleInputChange}
                />


                <TextField
                  label="Correo"
                  variant='outlined'  
                  type="email"
                  name="correo_electronico"
                  value={values.correo_electronico}
                  onChange={handleInputChange}
                />
            </div>

            <div className="ContenedorFormulario3">
              <TextField

              label="Telefono"
              variant='outlined'  
              type="number"
              name="telefono"
              value={values.telefono}
              onChange={handleInputChange}
              />
              <TextField

              label="Contraseña"
              variant='outlined'  
              type="text"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              />

            <StyledFormControl>
              <InputLabel>Seleccione una Estado</InputLabel>
                  <StyledSelect 

                  label="Seleccione una Unidad"                    
                  value={values.estado} 
                  onChange={handleInputChange} 
                  name="estado" 
                  native
                  >
                  <option value="" disabled hidden></option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>

                  </StyledSelect>
              </StyledFormControl>

              <StyledFormControl>
              <InputLabel>Seleccione una Rol</InputLabel>
                  <StyledSelect 

                  label="Seleccione un Rol"                    
                  value={values.fk_idRol} 
                  onChange={handleInputChange} 
                  name="fk_idRol" 
                  native
                  >
                    {/* <option value="" disabled hidden></option>
                        {rolUsuario.map(rolUsuario => (
                            
                        <option key={rolUsuario.idRol} value={rolUsuario.idRol}>{rolUsuario.rol}</option>
                    ))} */}
                  </StyledSelect>
              </StyledFormControl>

            </div>
            </div>

            </div>
              
            <div className="Botones">
            <button type="button" className="BtnCancelar" 
            onClick={() => {setOpenModal(false);
          }}
          >CANCELAR
          </button>
            <button type="submit" className="BtnRegistrar">
                REGISTRAR
            </button>
            </div>
          </div>
      </div>
    </form>
    )}

    </StyledContainer>
  );
};

const StyledFormControl = styled(FormControl)`
  width: 300px; 
`;

const StyledSelect = styled(Select)`
  width: 100%;  
`;

const StyledContainer = styled.div`
  .ModalPrincipal{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;  
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);     
  justify-content: center;
  align-items: center;
  
  .ModalPrincipal2{
  background-color: #ffffff;
  padding: 2rem; /* Equivalente a p-5 en Tailwind */
  border-radius: 0.75rem; /* Equivalente a rounded-md en Tailwind */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem; /* Equivalente a gap-5 en Tailwind */
  
  .TituloModal{
  width: 100%;
  h4{
  padding: 0.25rem; /* Equivalente a p-1 en Tailwind */
  font-size: 25px;
  } 
  p{
  padding: 0.25rem; 
  font-weight: normal;
  } 
  }
  
  .ContenedorFormulario {
  display: flex;
  gap: 0.5rem;
  }
  
  .ContenidoFormulario {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  }
  
  .ContenedorFormulario2 {
  margin-bottom: 1rem; 
  margin-right: 1rem;
  justify-content: center;
  }
  
  .ContenedorFormulario3 {
  padding: 0.50rem;
  margin-bottom: 1rem; 
  }
  
  .ContenedorFormulario2,
  .ContenedorFormulario3 {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  }
  
  .Botones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  
  .BtnCancelar {
  padding: 0.4rem 4.5rem;
  background-color: #ffffff; /* Color de fondo del botón */
  color: #000000; /* Color del texto */
  border: 2px solid #000000; /* Borde negro */
  border-radius: 0.5rem;
  cursor: pointer; 
  }
  
  .BtnRegistrar {
  padding: 0.5rem 4.5rem;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  }
  }
  }
}
`;

export default UsuarioOrganismo;
