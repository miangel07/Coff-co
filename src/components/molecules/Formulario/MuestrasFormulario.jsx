import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import SelectAtomo from "../../atoms/Select";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import {
  usePostMuestraMutation,
  usePutMuestraMutation,
} from "../../../store/api/muestra";
import { useGetFincasQuery } from "../../../store/api/fincas";
import { useGetUsuarioQuery } from "../../../store/api/users";
import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";

const MuestrasFormulario = ({ closeModal, dataValue }) => {
  const { data: dataUsuarios, isLoading: isLoadingUsuarios, isError: UsuarioError } = useGetUsuarioQuery();
  const { data: dataFincas, isLoading: isLoadingFincas, isError: FincaError } = useGetFincasQuery();
  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio, isError: TipoServicioError } = useGetTipoServicioQuery(); 
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [crearMuestra, { isLoading, isError, data: dataResponse, isSuccess }] = usePostMuestraMutation();
  const [editarMuestra, { isLoading: isLoadingEdit, isError: isErrorEdit, data: dataResponseEdit, isSuccess: isSuccessEdit }] = usePutMuestraMutation();
  
  const hasNotified = useRef(false);

  // Estado para controlar la visibilidad del input de código externo
  const [mostrarCodigoExterno, setMostrarCodigoExterno] = useState(false);

  useEffect(() => {
    if (dataValue) {
      reset({
        codigo_muestra: dataValue.codigo_muestra,
        cantidadEntrada: dataValue.cantidadEntrada,
        fecha_muestra: dataValue.fecha_muestra,
        fk_id_finca: dataValue.fk_id_finca,
        fk_id_usuarios: dataValue.fk_id_usuarios,
        estado: dataValue.estado,
        altura: dataValue.altura,          
        variedad: dataValue.variedad,      
        observaciones: dataValue.observaciones,
        codigoExterno: dataValue.codigoExterno,
        fk_id_tipo_servicio: dataValue.fk_id_tipo_servicio, 
      });

      setValue("fk_id_finca", dataValue.fk_id_finca);
      setValue("fk_id_usuarios", dataValue.fk_id_usuarios);
      setValue("fk_idTipoServicio", dataValue.fk_idTipo_servicio); 
    } else {
      reset();
    }

    if ((isSuccess || isSuccessEdit) && !hasNotified.current) {
      toast.success(`${dataResponse?.message || dataResponseEdit?.message}`);
      hasNotified.current = true;
      closeModal();
    } else if ((isError || isErrorEdit) && !hasNotified.current) {
      toast.error("Error al procesar la muestra");
      hasNotified.current = true;
    }
  }, [dataValue, isSuccess, isSuccessEdit, isError, isErrorEdit, reset, closeModal, dataResponse, dataResponseEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      if (dataValue) {
        await editarMuestra({
          id: dataValue.id_muestra,
          ...data
        });
      } else {
        await crearMuestra(data);
      }
    } catch (error) {
      toast.error("Error al guardar la muestra");
      console.log(error);
    }
  };
  

  if (isLoading || isLoadingEdit || isLoadingUsuarios || isLoadingFincas || isLoadingTipoServicio) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-lg p-4">
        {/* Inputs en filas de 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <InputAtomo
            type="text"
            id="codigo_muestra"
            name="codigo_muestra"
            placeholder="Código"
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="number"
            id="cantidadEntrada"
            name="cantidadEntrada"
            placeholder="Cantidad (Kg)"
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
          <InputAtomo
            type="number"
            id="altura"
            name="altura"
            placeholder="Altura (en metros)"
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="text"
            id="variedad"
            name="variedad"
            placeholder="Variedad"
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="text"
            id="observaciones"
            name="observaciones"
            placeholder="Observaciones"
            register={register}
            erros={errors}
          />

          {/* Botón para mostrar/ocultar el input de código externo */}
          <div className="flex items-center">
            <Mybutton type="button" onClick={() => setMostrarCodigoExterno(!mostrarCodigoExterno)}>
              {mostrarCodigoExterno ? "Ocultar Código Externo" : "Agregar Código Externo"}
            </Mybutton>
          </div>

          {/* Input de código externo (solo visible si mostrarCodigoExterno es true) */}
          {mostrarCodigoExterno && (
            <InputAtomo
              type="text"
              id="codigoExterno"
              name="codigoExterno"
              placeholder="Código Externo (si aplica)"
              register={register}
              erros={errors}
            />
          )}
        </div>

        {/* Selects (Usuario, Finca, Tipo de Servicio) en una fila */}
        <div className="flex flex-col md:flex-row gap-4">
          <SelectAtomo
            label="Selecciona un Usuario"
            data={dataUsuarios}
            onChange={(e) => setValue("fk_id_usuarios", e.target.value)}
            items="id_usuario"
            ValueItem="nombre"
            value={watch("fk_id_usuarios")}
          />
          <SelectAtomo
            label="Selecciona una Finca"
            data={dataFincas}
            onChange={(e) => setValue("fk_id_finca", e.target.value)}
            items="id_finca"
            ValueItem="nombre_finca"
            value={watch("fk_id_finca")}
          />
          <SelectAtomo
            label="Selecciona un Tipo de Servicio" // Nuevo select para TipoServicio
            data={dataTipoServicio}
            onChange={(e) => setValue("fk_idTipoServicio", e.target.value)}
            items="idTipoServicio"
            ValueItem="nombreServicio"
            value={watch("fk_idTipoServicio")}
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
