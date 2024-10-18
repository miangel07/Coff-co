import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import SelectAtomo from "../../atoms/Select";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import { useRegistrarUsuarioMutation } from "../../../store/api/users";
import { useTranslation } from "react-i18next";

const ClienteFormulario = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [crearUsuario, { isLoading, isError, data: dataResponse, error, isSuccess }] = useRegistrarUsuarioMutation();
  const hasNotified = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isError ) {
        toast.error(error.errors);
        return
    }

    if (isSuccess ) {
      toast.success(`${dataResponse.message}`);
      closeModal(); 
    }
  }, [isError, isSuccess, error, closeModal]);

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        rol: 3,
        estado: 'inactivo',
        password: '123'
      };
      console.log("Datos enviados:", userData);
      await crearUsuario(userData);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
   
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-wrapper">
            <InputAtomo
              type="text"
              id="nombre"
              name="nombre"
              placeholder={t("nombre")}
              register={register}
              erros={errors}
            />
          </div>
          <div className="input-wrapper">
            <InputAtomo
              type="text"
              id="apellidos"
              name="apellidos"
              placeholder={t("apellidos")}
              register={register}
              erros={errors}
            />
          </div>
          <div className="input-wrapper">
            <InputAtomo
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              placeholder={t("correo")}
              register={register}
              erros={errors}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-wrapper">
            <InputAtomo
              type="tel"
              id="telefono"
              name="telefono"
              placeholder={t("telefono")}
              register={register}
              erros={errors}
            />
          </div>
          {/* <div className="input-wrapper">
            <InputAtomo
              type="password"
              id="password"
              name="password"
              placeholder={t("contraseña")}
              register={register}
              erros={errors}
            />
          </div> */}
          <div className="input-wrapper">
            <InputAtomo
              type="number"
              id="numero_documento"
              name="numero_documento"
              placeholder={t("NDocumento")}
              register={register}
              erros={errors}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="select-wrapper">
            <SelectAtomo
              id="tipo_documento"
              name="tipo_documento"
              label={t("tipoDocumento")}
              data={[
                { id: 'cc', nombre: 'Cédula de Ciudadanía' },
                { id: 'ti', nombre: 'Tarjeta de Identidad' },
                { id: 'nit', nombre: 'NIT' },
                { id: 'pasaporte', nombre: 'Pasaporte' }
              ]}
              onChange={(e) => setValue("tipo_documento", e.target.value)}
              items="id"
              ValueItem="nombre"
              value={watch("tipo_documento")}
            />
          </div>
          <div className="button-wrapper flex justify-end items-end">
            <Mybutton type="submit" color="primary" className="w-full md:w-auto">
              {t("registrar")}
            </Mybutton>
          </div>
        </div>
      </form>

  );
};

export default ClienteFormulario;
