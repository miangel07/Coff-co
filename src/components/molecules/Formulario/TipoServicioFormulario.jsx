import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import { usePostTipoServicioMutation, usePutTipoServicioMutation } from "../../../store/api/TipoServicio";

const TipoServicioFormulario = ({ closeModal, dataValue }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [crearTipoServicio, { isLoading: isLoadingCreate, isError: isErrorCreate, isSuccess: isSuccessCreate, data: dataResponseCreate }] = usePostTipoServicioMutation();
  const [actualizarTipoServicio, { isLoading: isLoadingUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate, data: dataResponseUpdate }] = usePutTipoServicioMutation();

  useEffect(() => {
    if (dataValue) {
      reset({ 
        nombreServicio: dataValue.nombreServicio,
        codigoTipoServicio: dataValue.codigoTipoServicio
      });
    } else {
      reset();
    }

    if (isSuccessCreate || isSuccessUpdate) {
      toast.success(`${dataResponseCreate?.message || dataResponseUpdate?.message}`);
      closeModal();
    } else if (isErrorCreate || isErrorUpdate) {
      toast.error("Error al procesar el tipo de servicio");
    }
  }, [dataValue, isSuccessCreate, isSuccessUpdate, isErrorCreate, isErrorUpdate, reset, closeModal, dataResponseCreate, dataResponseUpdate]);

  const onSubmit = async (data) => {
    try {
      if (dataValue) {
        await actualizarTipoServicio({ id: dataValue.idTipoServicio, nombreServicio: data.nombreServicio, codigoTipoServicio: data.codigoTipoServicio });
      } else {
        await crearTipoServicio({ nombreServicio: data.nombreServicio, codigoTipoServicio: data.codigoTipoServicio });
      }
    } catch (error) {
      toast.error("Error al guardar el tipo de servicio");
    }
  };

  if (isLoadingCreate || isLoadingUpdate) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full overflow-auto justify-center items-center flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-6 p-4"
      >
        <div className="flex flex-col gap-4">
          <InputAtomo
            name={"nombreServicio"}
            erros={errors}
            placeholder={"Nombre del servicio"}
            register={register}
            type={"text"}
            id={"nombreServicio"}
          />
          <InputAtomo
            name={"codigoTipoServicio"}
            erros={errors}
            placeholder={"Código del servicio"}
            register={register}
            type={"text"}
            id={"codigoTipoServicio"}
          />
        </div>
        <div className="flex justify-center">
          <Mybutton type="submit" color="primary">
            {dataValue ? "Actualizar" : "Registrar"}
          </Mybutton>
        </div>
      </form>
    </section>
  );
};

export default TipoServicioFormulario;
