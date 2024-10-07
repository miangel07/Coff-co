import { useEffect, useState, useContext } from "react";
import { useLoginUserMutation } from "../../../store/api/auth/index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Mybutton from "../../atoms/Mybutton.jsx";
import Input from "../../atoms/Input.jsx";
import Label from "../../atoms/Label.jsx";

const LoginComponent = () => {
  const [LoginSuccessful, setLoginSuccessful] = useState(false);
  const [loginUser, { isSuccess, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { iniciarSesion } = useContext(AuthContext); //LLAMDO DEL CONTEXTO

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
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


  const errorLogin = isError ? (
    <p className="text-red-400 font-calibri">{error.error}</p>
  ) : (
    ""
  );

  return (
    <>
      {LoginSuccessful ? <App /> : (
        <div className="rounded-lg shadow-xl w-fit">
          <div className="lg:w-[450px] lg:h-[425px] md:w-96 w-72">
            <div className="card-header justify-center flex flex-col items-center gap-1">
              <h1 className="card-title text-center justify-center mt-6 font-sans text-2xl">
                COFFCO
              </h1>
              {errorLogin}
            </div>
            <form className="card-body mt-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control gap-1">
                <Label>Numero de cedula</Label>
                <Input
                  id={"id"}
                  type={"number"}
                  register={register}
                  name={"id"}
                  erros={errors}
                />
              </div>
              <div className="form-control">
                <Label>Contraseña</Label>
                <Input
                  id={"password"}
                  type={"password"}
                  register={register}
                  name={"password"}
                  erros={errors}
                />
                <label className="label">
                  <Link to="/password" className="label-text-alt link link-hover">
                    <Label>Registrarse</Label>
                  </Link>
                  <Link to="/password" className="label-text-alt link link-hover ">
                    <Label >¿Olvido su Contraseña?</Label>
                  </Link>
                </label>
              </div>
              <div className="form-control">
                <Mybutton type={"submit"}>Ingresar</Mybutton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginComponent;
