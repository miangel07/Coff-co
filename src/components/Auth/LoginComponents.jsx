import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../../store/api/auth/index.js";
import { getCookie, removeCookie } from "../../utils/index.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, { isSuccess }] = useLoginUserMutation();
const navigation = useNavigate();
  /*{} -> query's
   * [] -> mutation's*/

  const logout = () => {
    removeCookie("authToken");
    removeCookie("user");
    setIsAuthenticated(false);
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
    navigation("/home")

    }
    if (getCookie("authToken")) {
      setIsAuthenticated(true);
    }
  }, [isSuccess]);

  return (
    <>
        <div className="min-h-screen flex flex-col">
    <div className="flex flex-grow">
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="card w-full max-w-md shadow-lg rounded-md bg-white bg-opacity-90 p-8">
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            COFFCO
          </h1>
          <h2 className="text-lg font-medium text-gray-800 text-center mb-4">
            coffee control
          </h2>
        
            {!isAuthenticated && (
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text" style={{ color: "#586E26" }}>
                  Número de documento
                </span>
              </label>
              <input
              id="id"
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="12324242"
              {...register("id", {
                required: {
                  value: true,
                  message: "Por favor digitar cédula",
                },
              })}
            />
              <span className="text-amber-700">
              {errors.id?.message && errors.id.message}
            </span>
              
           
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text" style={{ color: "#586E26" }}>
                  Contraseña
                </span>
              </label>
              <input
              id="password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Por favor digitar password",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
               <span className="text-amber-700">
              {errors.password?.message && errors.password.message}
            </span>
              <label className="label">
                <a
                  className="label-text-alt link link-hover"
                  style={{ color: "#586E26" }}
                >
                  Registrarse
                </a>

                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  style={{ color: "#586E26" }}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
            <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ingresar
          </button>
            </div>
          </form>
               )}
        </div>
      </div>
    </div>
  </div>
   

      {isAuthenticated && (
        <div className="text-amber-700">
          <h2>You're signed up for your account</h2>
          <button
            onClick={() => logout()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      )}

    </>



   
  );
};
export default LoginComponent;
