import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import SelectAtomo from "../../atoms/Select";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
// importando los metodos del form
import {
  usePostMuestraMutation,
  usePutMuestraMutation,
} from "../../../store/api/muestra";

// importando los datos de las llaves foraneas
import { useGetFincasQuery } from "../../../store/api/fincas";
import { useGetUsuarioQuery } from "../../../store/api/users";

const MuestrasFormulario = ({ closeModal, dataValue }) => {
  const { data: dataUsuarios, isLoading: isLoadingUsuarios } = useGetUsuarioQuery();
  const { data: dataFincas, isLoading: isLoadingFincas } = useGetFincasQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [
    crearMuestra,
    { isLoading, isError, error, data: dataResponse, isSuccess },
  ] = usePostMuestraMutation();

  const [
    editarMuestra,
    {
      isLoading: isLoadingEdit,
      isError: isErrorEdit,
      error: ErrorEdit,
      data: dataResponseEdit,
      isSuccess: isSuccessEdit,
    },
  ] = usePutMuestraMutation();

  const usuarioValue = watch("fk_id_usuarios");
  const fincaValue = watch("fk_id_finca");

  const handleSelectChange = (field) => (e) => {
    setValue(field, e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      if (dataValue) {
        await editarMuestra({
          id: dataValue.id_muestra,
          cantidadEntrada: data.cantidadEntrada,
          fecha_muestra: data.fecha_muestra,
          codigoMuestra: data.codigoMuestra,
          fk_id_finca: data.fk_id_finca,
          fk_id_usuarios: data.fk_id_usuarios,
          estado: data.estado,
        });
      } else {
        await crearMuestra({
          cantidadEntrada: data.cantidadEntrada,
          fecha_muestra: data.fecha_muestra,
          codigoMuestra: data.codigoMuestra,
          fk_id_finca: data.fk_id_finca,
          fk_id_usuarios: data.fk_id_usuarios,
          estado: data.estado,
        });
      }
    } catch (error) {
      toast.error("Error al crear la muestra");
      console.log(error);
    }
  };

  if (isLoading || isLoadingEdit || isLoadingUsuarios || isLoadingFincas) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-lg p-4">
        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <InputAtomo
            type="text"
            id="codigo_muestra"
            name="codigo_muestra"
            placeholder="Código de la muestra"
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="number"
            id="cantidadEntrada"
            name="cantidadEntrada"
            placeholder="Cantidad de entrada"
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="date"
            id="fecha_muestra"
            name="fecha_muestra"
            placeholder="Fecha Muestra"
            register={register}
            erros={errors}
          />
        </div>

        {/* Selects (Usuario y Finca) en una fila */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Select para Usuarios (fk_id_usuarios) */}
          <SelectAtomo
            label="Selecciona un Usuario"
            data={dataUsuarios}
            onChange={handleSelectChange("fk_id_usuarios")}
            items="id_usuario"
            ValueItem="nombre"
            value={usuarioValue}
          />

          {/* Select para Fincas (fk_id_finca) */}
          <SelectAtomo
            label="Selecciona una Finca"
            data={dataFincas}
            onChange={handleSelectChange("fk_id_finca")}
            items="id_finca"
            ValueItem="nombre_finca"
            value={fincaValue}
          />
        </div>

        {/* Botón debajo de los selects */}
        <div className="flex justify-center mt-4">
          <Mybutton type="submit" color="primary">
            {dataValue ? "Actualizar" : "Registrar"}
          </Mybutton>
        </div>
      </form>
    </section>
  );
};

export default MuestrasFormulario;
