import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import SelectAtomo from "../../atoms/Select";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import { usePostFincaMutation } from "../../../store/api/fincas";
import { useGetMunicipioQuery } from "../../../store/api/municipio";
import { useTranslation } from "react-i18next";

const FincaFormulario = ({ closeModal }) => {
  const { data: dataMunicipios, isLoading: isLoadingMunicipios, isError: MunicipioError } = useGetMunicipioQuery();
  
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const [crearFinca, { isLoading, isError, data: dataResponse, error, isSuccess }] = usePostFincaMutation();
  const hasNotified = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess ) {
      toast.success(dataResponse?.message || "Finca registrada con éxito");
      closeModal();
      reset(); 

    } 
    if (isError ) {
      toast.error(error?.error || "Error al registrar la finca");
      closeModal();
      reset(); 

      return
    }


  }, [isSuccess, isError, closeModal, dataResponse, error, reset]);

  useEffect(() => {
    if (MunicipioError) {
      toast.error("Error al cargar los municipios");
    }
  }, [MunicipioError]);

  const onSubmit = async (data) => {
    try {
      await crearFinca(data);
    } catch (error) {
      console.error("Error al guardar la finca:", error);
    }
  };

  if (isLoading || isLoadingMunicipios) {
    return <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <section className="w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-lg p-4">
        <div className="grid grid-cols-1 gap-4">
          <InputAtomo
            type="text"
            id="nombre_finca"
            name="nombre_finca"
            placeholder={t("nombreFinca")}
            register={register}
            erros={errors}
            required
          />
          <InputAtomo
            type="text"
            id="vereda"
            name="vereda"
            placeholder={t("nombreVereda")}
            register={register}
            erros={errors}
            required
          />
          <SelectAtomo
            label={t("seleccioneMunicipio")}
            data={dataMunicipios}
            onChange={(e) => setValue("fk_id_municipio", e.target.value)}
            items="id_municipio"
            ValueItem="nombre_municipio"
            value={watch("fk_id_municipio")}
            required
          />
        </div>

        <div className="flex justify-center mt-4">
          <Mybutton type="submit" color="primary" disabled={isLoading}>
            {isLoading ? t("registrando") : t("registrar")}
          </Mybutton>
        </div>
      </form>
    </section>
  );
};

export default FincaFormulario;