import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../../../store/api/auth/index.js";
import { getCookie, removeCookie } from "../../../utils/index.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { rol } from "../../../utils/rol.js";
import Mybutton from "../../atoms/Mybutton.jsx";
import Input from "../../atoms/Input.jsx";
import Label from "../../atoms/Label.jsx";

const LoginComponent = () => {
  const [loginUser, { isSuccess, isError, error }] = useLoginUserMutation();
  const navigation = useNavigate();
  /*{} -> query's
   * [] -> mutation's*/

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data);
  };
  const errorLogin = isError ? (
    <p className="text-red-400 font-calibri">{error.error}</p>
  ) : (
    ""
  );

  useEffect(() => {
    if (isSuccess) {
      console.log("User has logged in, successfully");
      navigation("/home");
    }
  }, [isSuccess]);

  return (
    <div className=" rounded-lg shadow-xl w-fit   ">
      <div className="lg:w-[450px] lg:h-[425px] md:w-96 w-72 ">
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
          <div className="form-control ">
            <Label>Contraseña</Label>

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
                <Label>Registrarse</Label>
              </a>

              <a href="#" className="label-text-alt link link-hover  ">
                <Label>¿Olvido su Contraseña?</Label>
              </a>
            </label>
          </div>
          <div className="form-control ">
            <Mybutton type={"submit"}>Ingresar</Mybutton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginComponent;
