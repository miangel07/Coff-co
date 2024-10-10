import React, { useEffect, useState } from 'react';
import { Input } from "@nextui-org/react";
import Mybutton from '../../atoms/Mybutton';
import { toast } from "react-toastify";
import { useRescuperarPasswordMutation, useValidarPassordMutation, useCambiarPasswordMutation } from '../../../store/api/cambioPassword';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { InputOtp } from 'primereact/inputotp';
import ModalOrganismo from '../../organismo/Modal/ModalOrganismo';
import { Progress } from "@nextui-org/react"
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const RecuperarPassPlantilla = () => {
  const [token, setTokens] = useState('');
  const [cedula, setCedula] = useState('');
  const [IdUser, setIdUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [porcentaje, setPorcentaje] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [cambio, setcambio] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [rescuperarPassword, { isSuccess, data: dataRecuperar }] = useRescuperarPasswordMutation();
  const [validarPassord, { isSuccess: suceesValidar }] = useValidarPassordMutation();
  const [cambiarPassword, { isSuccess: successCambiar }] = useCambiarPasswordMutation();

  const navigate = useNavigate();

  const handleCambiarPassword = (e) => {
    e.preventDefault();
    toast.promise(
      rescuperarPassword({ "numero_documento": cedula }).unwrap(),
      {
        pending: "Enviando Código...",
        success: {
          render({ data }) {
            setCedula('');
            return <b>{data.message}</b>;
          }
        },
        error: {
          render({ data }) {
            return <b>{data.error}</b>;
          }
        }
      }
    );
  };

  const handleValidarCodigo = (e) => {
    e.preventDefault();
    toast.promise(
      validarPassord({ "id_usuario": IdUser, "codigo": token }).unwrap(),
      {
        pending: "Validando código...",
        success: {
          render({ data }) {
            setShowModal(true);
            return <b>{data.message}</b>;
          }
        },
        error: {
          render({ data }) {
            return <b>{data.error}</b>;
          }
        }
      }
    );
  };

  const toggleVisibility = () => setIsChecked(!isChecked);
  const toggleVisibility2 = () => setIsChecked2(!isChecked2);

  const handleCambiar = (e) => {
    e.preventDefault();
    if (porcentaje !== 100) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    toast.promise(
      cambiarPassword({ "id_usuario": IdUser, "password": password }).unwrap(),
      {
        pending: "Cambiando contraseña...",
        success: {
          render({ data }) {
            setShowModal(false);
            return <b>{data.message}</b>;
          }
        },
        error: {
          render({ data }) {
            return <b>{data.error}</b>;
          }
        }
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setIdUser(`${dataRecuperar.data[0].id_usuario}`);
    }
  }, [isSuccess]);


  useEffect(() => {
    if (password && password2) {
      if (password === password2) {
        setPorcentaje(100);
      } else {
        setPorcentaje(0);
      }
    }
    if (successCambiar) {
      navigate("/")
    }

  }, [password, password2, successCambiar]);

  return (
    <div className="flex items-center gap-10 flex-col justify-center min-h-screen bg-gray-100 p-4">


      {isSuccess ? (
        <div className="bg-slate-700 p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4 text-white">Validar Código</h2>
          <form onSubmit={handleValidarCodigo} className="flex flex-col items-center">
            <InputOtp
              value={token}
              onChange={(e) => setTokens(e.value)}
              style={{
                width: '200px',
                marginBottom: '20px',
                borderColor: 'black',
                color: 'black',
                fontSize: '24px',
                borderRadius: '5px',

              }}
              placeholder="Ingrese el código"
              length={4}
              aria-label="Ingrese el código de verificación"
            />
            <Mybutton color="primary" type="submit" className="w-full mt-4">Verificar Código</Mybutton>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-lg p-8 mx-auto w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Cambio de Contraseña</h2>
          <form className="flex flex-col gap-6" onSubmit={handleCambiarPassword}>
            <Input
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              type="text"
              label="Número de Documento"
              placeholder="Ingrese su número de identificación"
              onChange={(e) => setCedula(e.target.value)}
              required
              aria-label="Ingrese su número de identificación"
            />
            <Mybutton type="submit" color="primary" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out">
              Validar
            </Mybutton>
          </form>
        </div>
      )}

      {showModal && (
        <ModalOrganismo title="" visible={showModal} closeModal={() => setShowModal(false)}>
          <form onSubmit={handleCambiar} className="flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Cambiar Contraseña</h2>

            <div className="space-y-4">
              <Input
                label="Nueva Contraseña"
                variant="bordered"
                placeholder="Ingrese su nueva contraseña"
                endContent={
                  <button
                    className="focus:outline-none text-gray-400 hover:text-gray-600"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isChecked ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {isChecked ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                  </button>
                }
                type={isChecked ? "text" : "password"}
                className="w-full"
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Ingrese su nueva contraseña"
              />

              <Input
                label="Confirmar Contraseña"
                variant="bordered"
                placeholder="Confirme su nueva contraseña"
                endContent={
                  <button
                    className="focus:outline-none text-gray-400 hover:text-gray-600"
                    type="button"
                    onClick={toggleVisibility2}
                    aria-label={isChecked2 ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
                  >
                    {isChecked2 ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                  </button>
                }
                type={isChecked2 ? "text" : "password"}
                className="w-full"
                onChange={(e) => setPassword2(e.target.value)}
                aria-label="Confirme su nueva contraseña"
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="password-strength" className="block text-sm font-medium text-gray-700 mb-1">
                Similitud de contraseña
              </label>
              <Progress
                id="password-strength"
                color="success"
                value={porcentaje}
                className="w-full"
                aria-label="Fortaleza de la contraseña"
              />
            </div>

            <Mybutton type="submit" color="primary" className="w-full mt-6">
              Cambiar Contraseña
            </Mybutton>
          </form>
        </ModalOrganismo>
      )}
    </div>
  )
};

export default RecuperarPassPlantilla;
