import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../../../store/api/auth/index.js";
import { getCookie, removeCookie } from "../../../utils/index.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { rol } from "../../../utils/rol.js";
import Mybutton from "../../atoms/Mybutton.jsx";
import Input from "../../atoms/Input.jsx";

const LoginComponent = () => {
  const [loginUser, { isSuccess }] = useLoginUserMutation();
  const navigation = useNavigate();
  /*{} -> query's
   * [] -> mutation's*/

  const logout = () => {
    removeCookie("authToken");
    removeCookie("user");
    setIsAuthenticated(false);
  };
  const roles = () => {
    rol();
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("User has logged in, successfully");
      navigation("/home");
    }
  }, [isSuccess]);

  return (
    <>
      <div className=" rounded-lg shadow-xl w-fit ">
        <div className="lg:w-[450px] lg:h-[400px] md:w-96 w-72 ">
          <div className="card-header">
            <h1 className="card-title text-center justify-center mt-6">
              COFFCO
            </h1>
          </div>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control gap-3">
              <label className="label">
                <span className="label-text" style={{ color: "#586E26" }}>
                  Número de documento
                </span>
              </label>
              <Input
                id={"id"}
                type={"text"}
                register={register}
                name={"id"}
                erros={errors}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text" style={{ color: "#586E26" }}>
                  Contraseña
                </span>
              </label>

              <Input
                id={"password"}
                type={"password"}
                register={register}
                name={"password"}
                erros={errors}
              />

              <label className="label">
                <a
                  className="label-text-alt link link-hover"
                  style={{ color: "#586E26" }}
                >
                  Registrarse
                </a>

                <a href="#" className="label-text-alt link link-hover  ">
                  ¿Olvidaste tu contraseña?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <Mybutton type={"submit"} >
                ingresar
              </Mybutton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginComponent;
