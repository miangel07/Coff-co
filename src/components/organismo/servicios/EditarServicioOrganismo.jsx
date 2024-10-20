import React, { useContext, useEffect } from "react";
import {
  useEditarValoresPorServicioMutation,
  useRegistrarCambioDelServicioMutation,
} from "../../../store/api/servicio/serviciosSlice";
import ModalOrganismo from "../Modal/ModalOrganismo";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
const EditarServicioOrganismo = ({
  visible,
  closeModal,
  variablesUpdate,
  servicio,
}) => {
  const { authData } = useContext(AuthContext);

  const {t} = useTranslation()

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [editarValoresVariables,{isSuccess:isSuccessEditarValores,isError:isErrorEditarVariables,error:errorEditarVariables}] = useEditarValoresPorServicioMutation();
  const [registrarCambio] = useRegistrarCambioDelServicioMutation();

  const cerrarModal = () => {
    reset(); // Resetea los valores del formulario
    closeModal(); // Llama a la función que cierra el modal
  };

  useEffect(()=>{
    if(isErrorEditarVariables){
      toast.error(`${errorEditarVariables.error}`)
    }
  },[isErrorEditarVariables,errorEditarVariables])



  useEffect(() => {
    if (servicio) {
      reset({
        tipo_servicio: servicio.tipo_servicio,
        codigo_muestra: servicio.codigo_muestra,
        presentacion: servicio.presentacion,
        nombre_ambiente: servicio.nombre_ambiente,
      });
    }
  }, [servicio, reset]);

  const onsubmitEditarValoresVariables = async (
    datosEditarValoresVariables
  ) => {
    const valoresVariables = {};
    variablesUpdate.forEach((variable) => {
      const valor =
        datosEditarValoresVariables[`variable_${variable.idVariable}`];
      if (valor !== undefined && valor !== "") {
        valoresVariables[variable.idVariable] = valor;
      }
    });

    const payload = {
      id_servicios: servicio.id_servicios,
      valoresVariables,
    };

    const payloadCambio = {
      descripcion: datosEditarValoresVariables.descripcion,
      fk_id_servicio: servicio.id_servicios,
      fk_id_usuario: authData.usuario.id,
    };

    try {
      const resultadoCambio = await registrarCambio(payloadCambio).unwrap();

      const resultadoEdicion = await editarValoresVariables(payload).unwrap();

      toast.success("Valores editados con exito!.");
      cerrarModal();
    } catch (error) {
      console.error("Error al procesar el servicio: " + error.message);
    }
  };

  return (
    <>
      <div>
        <ModalOrganismo
          visible={visible}
          closeModal={cerrarModal}
          title={t('Editar valores del servicio')}
        >
          <form onSubmit={handleSubmit(onsubmitEditarValoresVariables)}>
            <div className="mb-10 space-y-6 ">

              {variablesUpdate.length > 0 && (
                <div className="mt-4">
                  <div>
                    <h2>{t('Variables del servicio')}</h2>
                  </div>
                  {variablesUpdate.map((variable) => {
                    return (
                      <div
                        key={`variable_${variable.idVariable}`}
                        className="mb-10"
                      >
                        <InputAtomo
                          type={
                            variable.tipo_dato === "number" ? "number" : "text"
                          }
                          id={`variable_${variable.idVariable}`}
                          name={`variable_${variable.idVariable}`}
                          placeholder={`${t('Ingrese')} ${variable.nombre_variable}`}
                          register={register}
                          defaultValue={variable.valor || ""}
                          erros={errors}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <InputAtomo
                type="text"
                id="descripcion"
                name="descripcion"
                placeholder="descripción del cambio "
                register={register}
                erros={errors}
              />
            </div>
            <div className="flex justify-center mt-6">
              <Mybutton color={"primary"} type="submit">
                {t('Enviar')}
              </Mybutton>
            </div>
          </form>
        </ModalOrganismo>
      </div>
    </>
  );
};

export default EditarServicioOrganismo;