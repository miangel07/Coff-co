import React, { useEffect, useState } from "react";
import ModalOrganismo from "../Modal/ModalOrganismo";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import {
  useActualizarEstadoServicioMutation,
  useObtenerDatosDeLaMuestraSegunServicioQuery,
  useServicioTerminadoMutation,
} from "../../../store/api/servicio/serviciosSlice";
import { useTranslation } from "react-i18next";

const ModalServicioTerminado = ({
  visible,
  cerrarModal,
  servicioId,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {t} = useTranslation()

  const [registroServicioTerminado] = useServicioTerminadoMutation();
  const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();
  const { data: dataDelaMuestra } = useObtenerDatosDeLaMuestraSegunServicioQuery(servicioId);

  const [unidadMedidaMuestra, setUnidadMedidaMuestra] = useState("");

  useEffect(() => {
    if (dataDelaMuestra && dataDelaMuestra.length > 0) {
      const muestra = dataDelaMuestra[0]; 
      if (muestra.UnidadMedida) {
        setUnidadMedidaMuestra(muestra.UnidadMedida);
      } else {
        console.log('No se encontró UnidadMedida en la muestra');
      }
    }
  }, [dataDelaMuestra]);
  

  const onSubmitServicioTerminado = async (data) => {
    const payload = {
      id: servicioId,
      cantidad_salida: data.cantidad_salida,
    };

    try {
      await registroServicioTerminado(payload).unwrap();

      toast.success("Servicio terminado con éxito!");

      // Ahora sí cambiamos el estado del servicio a "terminado"
      actualizarEstadoServicio({ id: servicioId, estado: "terminado" })
        .unwrap()
        .then(() => {
          toast.success("Estado cambiado a 'Terminado' con éxito!");
          refetch();
        })
        .catch((error) => {
          toast.error(
            "Error al actualizar el estado a 'Terminado': " + error.message
          );
        });

      cerrarModal();
    } catch (error) {
      toast.error("Error al registrar el servicio terminado: " + error.message);
    }
  };

  return (
    <>
      <div>
        <ModalOrganismo
          visible={visible}
          closeModal={cerrarModal}
          title={t("Registro termino de servicio")}
        >
          <form onSubmit={handleSubmit(onSubmitServicioTerminado)}>
            <InputAtomo
              type="number"
              id="cantidad_salida"
              name="cantidad_salida"
              placeholder={`${t('Cantidad de salida en')} (${unidadMedidaMuestra})`} 
              register={register}
              erros={errors}
            />
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

export default ModalServicioTerminado;
