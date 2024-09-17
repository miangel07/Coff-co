import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import { useCrearTipoDocumentoMutation, useActualizarTipoDocumentoMutation } from "../../../store/api/tipoDocumentos";

const TipoDocumentoFormulario = ({ closeModal, dataValue }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [crearTipoDocumento, { isLoading: isLoadingCreate, isError: isErrorCreate, isSuccess: isSuccessCreate, data: dataResponseCreate }] = useCrearTipoDocumentoMutation();
  const [actualizarTipoDocumento, { isLoading: isLoadingUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate, data: dataResponseUpdate }] = useActualizarTipoDocumentoMutation();

  useEffect(() => {
    if (dataValue) {
      reset({ nombreDocumento: dataValue.nombreDocumento });
    } else {
      reset();
    }

    if (isSuccessCreate || isSuccessUpdate) {
      toast.success(`${dataResponseCreate?.message || dataResponseUpdate?.message}`);
      closeModal();
    } else if (isErrorCreate || isErrorUpdate) {
      toast.error("Error al procesar el tipo de documento");
    }
  }, [dataValue, isSuccessCreate, isSuccessUpdate, isErrorCreate, isErrorUpdate, reset, closeModal, dataResponseCreate, dataResponseUpdate]);

  const onSubmit = async (data) => {
    try {
      if (dataValue) {
        await actualizarTipoDocumento({ id: dataValue.idTipoDocumento, nombreDocumento: data.nombreDocumento });
      } else {
        await crearTipoDocumento({ nombreDocumento: data.nombreDocumento });
      }
    } catch (error) {
      toast.error("Error al guardar el tipo de documento");
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
            name={"nombreDocumento"}
            erros={errors}
            placeholder={"Nombre del Documento"}
            register={register}
            type={"text"}
            id={"nombreDocumento"}
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

export default TipoDocumentoFormulario;
