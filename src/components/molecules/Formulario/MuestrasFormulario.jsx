import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import SelectSearch from "../../atoms/SelectSearch";
import SelectAtomo from "../../atoms/Select";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import {
  usePostMuestraMutation,
  usePutMuestraMutation,
} from "../../../store/api/muestra";
import { useGetFincasQuery } from "../../../store/api/fincas";
import { useGetClientesQuery } from "../../../store/api/users";
import { useGetTipoServicioActivoQuery } from "../../../store/api/TipoServicio";
import { useTranslation } from "react-i18next";

const MuestrasFormulario = ({ closeModal, dataValue }) => {
  const [UnidadMedida, setUnidadMedida] = useState("");
  const [usuario, setUsuario] = useState("");
  const [Finca, setFinca] = useState("");
  const [Servicio, setServicio] = useState("");
  const { data: dataUsuarios, isLoading: isLoadingUsuarios } = useGetClientesQuery();
  const { data: dataFincas, isLoading: isLoadingFincas } = useGetFincasQuery();
  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } = useGetTipoServicioActivoQuery();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  console.log(dataValue)
  const [crearMuestra, { isLoading, isError, data: dataResponse, isSuccess }] = usePostMuestraMutation();
  const [editarMuestra, { isLoading: isLoadingEdit, isError: isErrorEdit, data: dataResponseEdit, isSuccess: isSuccessEdit }] = usePutMuestraMutation();

  const hasNotified = useRef(false);
  const [mostrarCodigoExterno, setMostrarCodigoExterno] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/Bogota',
    });

    if (dataValue) {
      reset({
        cantidadEntrada: dataValue?.cantidadEntrada || '',
        fecha_muestra: dataValue?.fecha_muestra || today,
        altura: dataValue?.altura || '',
        variedad: dataValue?.variedad || '',
        observaciones: dataValue?.observaciones || '',
        codigoExterno: dataValue?.codigoExterno || '',
      })
      setUnidadMedida(dataValue.UnidadMedida || '');
    } else {
      reset({
        fecha_muestra: today,
      });
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
      const formData = new FormData();

      formData.append('cantidadEntrada', data.cantidadEntrada);
      formData.append('fk_id_finca', Finca);
      formData.append('fecha_muestra', data.fecha_muestra);
      formData.append('fk_id_usuarios', usuario);
      formData.append('variedad', data.variedad);
      formData.append('altura', data.altura);
      formData.append('observaciones', data.observaciones);
      formData.append('codigoExterno', data?.codigoExterno || null);
      formData.append('fk_idTipoServicio', Servicio);
      formData.append('UnidadMedida', UnidadMedida);
      formData.append('fotoMuestra', previewImage);
      if(!previewImage){
        toast.error("La imagen es Obligatoria");
        return;
      }
      if(UnidadMedida === "" ){
        toast.error("La unidad de medida es obligatoria");
        return;
      }
      await crearMuestra(formData);
    } catch (error) {
      toast.error("Error al guardar la muestra");
      console.error(error);
    }
  };

  const hadleEditar = async(data) => {
    const formData = new FormData();
    formData.append('cantidadEntrada', data.cantidadEntrada);
    formData.append('id_muestra', dataValue.id_muestra);
    formData.append('fk_id_finca', Finca);
    formData.append('fecha_muestra', data.fecha_muestra);
    formData.append('fk_id_usuarios', usuario);
    formData.append('variedad', data.variedad);
    formData.append('altura', data.altura);
    formData.append('observaciones', data.observaciones);
    formData.append('codigoExterno', data?.codigoExterno || null);
    formData.append('fk_idTipoServicio', Servicio);
    formData.append('UnidadMedida', UnidadMedida);
    if(UnidadMedida === "" ){
      toast.error("La unidad de medida es obligatoria");
      return;
    }
    if(previewImage){
      formData.append('fotoMuestra', previewImage);
    }
    await editarMuestra(formData);
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    
    reader.onloadend = () => {
      setPreviewImage(file);
      setImagePreviewUrl(reader.result);
    }
    
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const unidadMedidas = [
    { value: "Lb", label: "Libras" },
    { value: "Kg", label: "Kilogramos" },
  ];

  if (isLoading || isLoadingEdit || isLoadingUsuarios || isLoadingFincas || isLoadingTipoServicio) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit(dataValue ? hadleEditar : onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fotoMuestra">
              {t("subirImagen")}
            </label>
            <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-6 hover:bg-gray-50 transition duration-300 ease-in-out">
              <input
                type="file"
                name="fotoMuestra"
                id="fotoMuestra"
                accept=".png,.jpg,.svg,.gif,.webp,.eps,.ai,.pdf,.jpeg" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreviewUrl ? (
                <img src={imagePreviewUrl} alt="Preview" className="mx-auto h-32 w-auto object-cover" />
              ) : (
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    {t("seleccionaArchivo")}
                    </span> {t("arrastraSuelta")}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {t("hasta")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <InputAtomo
            type="number"
            id="cantidadEntrada"
            name="cantidadEntrada"
            placeholder={t("cantidad")}
            register={register}
            erros={errors}
          />
          <SelectAtomo
            value={UnidadMedida}
            data={unidadMedidas}
            items={"value"}
            label={t("unidadMedida")}
            ValueItem={"label"}
            onChange={(e) => setUnidadMedida(e.target.value)}
          />
          <InputAtomo
            type="date"
            id="fecha_muestra"
            name="fecha_muestra"
            placeholder={t("fecha")}
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="number"
            id="altura"
            name="altura"
            placeholder={t("alturaMetros")}
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="text"
            id="variedad"
            name="variedad"
            placeholder={t("variedad")}
            register={register}
            erros={errors}
          />
          <InputAtomo
            type="text"
            id="observaciones"
            name="observaciones"
            placeholder={t("observaciones")}
            register={register}
            erros={errors}
          />
        </div>

        <div className="mt-6 space-y-6">
          <SelectSearch
            label={t("usuario")}
            valueCampos={[
              { value: "nombre_cliente", label: "Nombre" },
              { value: "numero_documento", label: "Documento" }
            ]}
            data={dataUsuarios}
            idKey="id_usuario"
            labelKey="nombre_cliente"
            onChange={(value) => setUsuario(value)}
          />

          <SelectSearch
            label={t("finca")}
            valueCampos={[
              { value: "nombre_finca", label: "Nombre" },
              { value: "id_finca", label: "ID" }
            ]}
            data={dataFincas}
            idKey="id_finca"
            labelKey="nombre_finca"
            onChange={(value) => setFinca(value)}
          />

          <SelectSearch
            label={t("servicios")}
            valueCampos={[
              { value: "nombreServicio", label: "Nombre" },
              { value: "idTipoServicio", label: "ID" }
            ]}
            data={dataTipoServicio}
            idKey="idTipoServicio"
            labelKey="nombreServicio"
            onChange={(value) => setServicio(value)}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <Mybutton type="button" onClick={() => setMostrarCodigoExterno(!mostrarCodigoExterno)}>
            {mostrarCodigoExterno ? t("ocultarCodExterno") : t("añadirCodExterno")}
          </Mybutton>
        </div>

        {mostrarCodigoExterno && (
          <div className="mt-4">
            <InputAtomo
              type="text"
              id="codigoExterno"
              name="codigoExterno"
              placeholder={t("CodExternoAplica")}
              register={register}
              erros={errors}
            />
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Mybutton type="submit" color="primary">
            {dataValue ? t("actualizar") : t("registrar")}
          </Mybutton>
        </div>
      </form>
    </section>
  );
};

export default MuestrasFormulario;