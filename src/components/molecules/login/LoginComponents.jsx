import { useEffect, useState, useContext } from "react";
import { useLoginUserMutation } from "../../../store/api/auth/index.js";
import {useRegistrarUsuarioMutation } from "../../../store/api/users";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FcOk } from "react-icons/fc";

import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import Logosímbolo from "../../atoms/Logosímbolo";
import SelectAtomo from "../../atoms/Select";
import InputAtomo from "../../atoms/Input";
import Mybutton from "../../atoms/Mybutton.jsx";
import Input from "../../atoms/Input.jsx";
import Label from "../../atoms/Label.jsx";
import UserFrom from "../../molecules/Formulario/UserFrom";


const LoginComponent = () => {
  //USE STATES
  const [LoginSuccessful, setLoginSuccessful] = useState(false);
  const [ modalRegistro, setModalRegistro ]= useState(false)
  const [sucess, setsucess] = useState("");
  const [ver, setVer] = useState(true);

  //MUTACIONES
  const [registrarUsuario, { isSuccess, datos, isError, error }] = useRegistrarUsuarioMutation();
  const [loginUser, {isError: isErrorLogin, error: errorLogin}] = useLoginUserMutation();

  //FUNCIONES
   //Use Form del formulario de registro y del Login
    const {handleSubmit: handleSubmitLogin, register: registerLogin, formState: { errors: errorsLogin }, } = useForm();
    const {handleSubmit: handleSubmitRegistro, register: registerRegistro, formState: { errors: errorsRegistro }, watch: watchRegistro, setValue: setValueRegistro, reset: resetRegistro } = useForm();
  const { iniciarSesion } = useContext(AuthContext); //LLAMDO DEL CONTEXTO
  const closeModal = () => {setModalRegistro(false); resetRegistro()};
  const navigate = useNavigate();

  //ROLES
  const [roles, setRoles] = useState([]); 
  useEffect(() => {
      // Función para obtener los roles desde el backend
      const fetchRoles = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/rol/listar`); 
          const data = await response.json();
          setRoles(data);
        } catch (error) {
          console.error('Error al obtener los roles:', error);
        }
      };
      fetchRoles();
  }, []);

  //SUBMIT REGISTRAR
  const onsubmitRegistrar = async (data) => {
    try {
      const response = await registrarUsuario(data).unwrap(); 
      setsucess(response.message); 
  
      toast.success(response.message, {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: <FcOk />,
      });

      setOpenModal(false);
      reset();
    } catch (error) {
      const mensajesError = error.errors.join(', ');
      toast.error(mensajesError || "Ocurrió un error", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };


  //SUBMIT LOGIN
  const onSubmitLogin = async (datos) => {
    try {
      const response = await loginUser(datos).unwrap();
      if (response) {
        iniciarSesion(response);
        setLoginSuccessful(true);
        console.log("Sesión Iniciada");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  //ALERTAS DE REGISTRO
  useEffect(() => {
    if (isSuccess) {
      setsucess(datos?.message);
      toast.success(datos?.message, {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: <FcOk />,
      });
    }

    if (isError) {
      console.log(error);
      toast.error(error?.error || "Ocurrió un error", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [isSuccess, isError, error, datos]);

  //USUARIO POR DEFECTO 'OPERARIO'
  const defaultValue = 4
  useEffect(() => {
    setValueRegistro("rol", defaultValue);
  }, [setValueRegistro, defaultValue]);

  //ESTADO POR DEFECTO 'ACTIVO'
  useEffect(() => {
    setValueRegistro("estado", "activo");
  }, [setValueRegistro]);

  //OPCIONES PARA LOS SELECT 
  const estadoOptions = [
    { value: "activo", label: "Activo" },
    { value: "inactivo", label: "Inactivo" }
  ];
  const documentoOptions = [
    { value: "cc", label: "cc" },
    { value: "ti", label: "ti" },
    { value: "nit", label: "nit" },
    { value: "pasaporte", label: "pasaporte" },
  ];

  //MANEJO DE ERRORES EN LOS INPUTS
  const errorInputLogin = isErrorLogin ? (
    <p className="text-red-400 font-calibri">{errorLogin.error}</p>
  ) : ("");

  return (
    <>
      {LoginSuccessful ? <App /> : (
        <div className="rounded-lg shadow-xl w-fit mx-auto bg-white p-8 lg:w-[450px] lg:h-auto md:w-96">
        <div className="card-header flex flex-col items-center gap-2">
          <h1 className="card-title text-center mt-6 font-sans text-3xl font-bold text-gray-800">
            COFFCO
          </h1>
          {errorInputLogin && <div className="text-red-400">{errorInputLogin}</div>}
        </div>
      
        <form className="card-body mt-4" onSubmit={handleSubmitLogin(onSubmitLogin)}>
          <div className="form-control mb-4">
            <Label className="font-semibold text-gray-700">Número de cédula</Label>
            <Input
              id="id"
              type="number"
              register={registerLogin}
              name="id"
              erros={errorsLogin}
              className="input input-bordered w-full p-2 mt-1 border rounded-md focus:border-indigo-500"
            />
          </div>
      
          <div className="form-control mb-4">
            <Label className="font-semibold text-gray-700">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={ver ? "password" : "text"}
                register={registerLogin}
                name="password"
                erros={errorsLogin}
                className="input input-bordered w-full p-2 mt-1 border rounded-md focus:border-indigo-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setVer(!ver)}
                aria-label="toggle password visibility"
              >
                {ver ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
              </span>
            </div>
          </div>
      
          <div className="form-control mb-4">
            <Link to="/password" className="text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
      
          <div className="form-control">
            <Mybutton className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700" type="submit">
              Ingresar
            </Mybutton>
          </div>
        </form>
      
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <button
              className="text-indigo-600 hover:underline focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                setModalRegistro(true);
              }}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>      
      )}

      { modalRegistro && ( 
         <ModalOrganismo
         logo={<Logosímbolo />}
         children={
          <UserFrom
          onsubmit={handleSubmitRegistro(onsubmitRegistrar)}
          children={
            <>
              <InputAtomo
              register={registerRegistro}
              name={"nombre"}
              erros={errorsRegistro}
              id={"nombre"}
              placeholder={"Ingrese el nombre del usuario"}
              type={"text"}
            />
            <InputAtomo
              register={registerRegistro}
              name={"apellidos"}
              erros={errorsRegistro}
              id={"apellidos"}
              placeholder={"Ingrese el  apellido del usuario"}
              type={"text"}
            />
            <InputAtomo
              register={registerRegistro}
              name={"correo_electronico"}
              erros={errorsRegistro}
              id={"correo_electronico"}
              placeholder={"Ingrese el  correo del usuario"}
              type={"email"}
            />
            <InputAtomo
              register={registerRegistro}
              name={"telefono"}
              erros={errorsRegistro}
              id={"telefono"}
              placeholder={"Ingrese el telefono del usuario"}
              type={"number"}
            />
            <InputAtomo
              register={registerRegistro}
              name={"password"}
              erros={errorsRegistro}
              id={"password"}
              placeholder={"Ingrese la contraseña del usuario"}
              type={"password"}
            />
            <SelectAtomo
              data={documentoOptions} 
              label={"Tipo Documento"} 
              onChange={(e) => setValueRegistro("tipo_documento", e.target.value)} 
              items={"value"} 
              ValueItem={"label"} 
              value={watchRegistro("tipo_documento")} 
            />
            <InputAtomo
              register={registerRegistro}
              name={"numero_documento"}
              erros={errorsRegistro}
              id={"numero_documento"}
              placeholder={"Ingrese el numero de identificación del usuario"}
              type={"number"}
            />
            <SelectAtomo
              data={roles.map(role => ({ value: role.idRol, label: role.rol }))} 
              label={"Rol"}
              onChange={(e) => setValueRegistro("rol", e.value)} 
              items={"value"}
              ValueItem={"label"}
              value={watchRegistro("rol") || defaultValue} 
              habilitado={true} 
            />
            <SelectAtomo
              data={estadoOptions}
              label={"Estado"}
              onChange={(e) => setValueRegistro("estado", e.target.value)}
              items={"value"}
              ValueItem={"label"}
              value={watchRegistro("estado")}
              habilitado={true} 
            />
            </>
          }
          />
         }
         visible={true}
         title={"Registrate"}
         closeModal={closeModal}
       />
      )}
    </>
  );
};

export default LoginComponent;
