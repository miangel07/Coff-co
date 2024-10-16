import React, { useState } from "react";
import ModalOrganismo from "../Modal/ModalOrganismo";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import {
  useActualizarEstadoServicioMutation,
  useServicioTerminadoMutation,
} from "../../../store/api/servicio/serviciosSlice";

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
  const [registroServicioTerminado] = useServicioTerminadoMutation();
  const [actualizarEstadoServicio] = useActualizarEstadoServicioMutation();

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
          title="Registro termino de servicio"
        >
          <form onSubmit={handleSubmit(onSubmitServicioTerminado)}>
            <InputAtomo
              type="number"
              id="cantidad_salida"
              name="cantidad_salida"
              placeholder="cantidad de salida"
              register={register}
              erros={errors}
            />
            <div className="flex justify-center mt-6">
              <Mybutton color={"primary"} type="submit">
                Enviar
              </Mybutton>
            </div>
          </form>
        </ModalOrganismo>
      </div>
    </>
  );
};

export default ModalServicioTerminado;
