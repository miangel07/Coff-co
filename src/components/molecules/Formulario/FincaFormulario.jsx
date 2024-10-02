import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import SelectAtomo from "../../atoms/Select";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import { usePostFincaMutation } from "../../../store/api/fincas";
import { useGetMunicipioQuery } from "../../../store/api/municipio";

const FincaFormulario = ({ closeModal }) => {
  const { data: dataMunicipios, isLoading: isLoadingMunicipios, isError: MunicipioError } = useGetMunicipioQuery();
  
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const [crearFinca, { isLoading, isError, data: dataResponse, isSuccess }] = usePostFincaMutation();
  const hasNotified = useRef(false);

  useEffect(() => {
    if (isSuccess && !hasNotified.current) {
      toast.success(`${dataResponse?.message || "Finca registrada con éxito"}`);
      hasNotified.current = true;
      closeModal();
    } else if (isError && !hasNotified.current) {
      toast.error("Error al registrar la finca");
      hasNotified.current = true;
    }
  }, [isSuccess, isError, closeModal, dataResponse]);

  const onSubmit = async (data) => {
    try {
      await crearFinca(data);
    } catch (error) {
      toast.error("Error al guardar la finca");
      console.log(error);
    }
  };

  if (isLoading || isLoadingMunicipios) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-lg p-4">
        <div className="grid grid-cols-1 gap-4">
          <InputAtomo
            type="text"
            id="nombre_finca"
            name="nombre_finca"
            placeholder="Nombre de la Finca"
            register={register}
            erros={errors}
          />

          <SelectAtomo
            label="Selecciona un Municipio"
            data={dataMunicipios}
            onChange={(e) => setValue("fk_id_municipio", e.target.value)}
            items="id_municipio"
            ValueItem="nombre_municipio"
            value={watch("fk_id_municipio")}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Mybutton type="submit" color="primary">
            Registrar Finca
          </Mybutton>
        </div>
      </form>
    </section>
  );
};

export default FincaFormulario;
