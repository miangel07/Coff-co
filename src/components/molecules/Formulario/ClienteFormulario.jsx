import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import InputAtomo from "../../atoms/Input";
import SelectAtomo from "../../atoms/Select";
import Mybutton from "../../atoms/Mybutton";
import { toast } from "react-toastify";
import { useRegistrarUsuarioMutation } from "../../../store/api/users";

const ClienteFormulario = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [crearUsuario, { isLoading, isError, data: dataResponse, isSuccess }] = useRegistrarUsuarioMutation();
  const hasNotified = useRef(false);

  useEffect(() => {
    if (isSuccess && !hasNotified.current) {
      toast.success(`${dataResponse?.message || "Usuario registrado con éxito"}`);
      hasNotified.current = true;
      closeModal();
    } else if (isError && !hasNotified.current) {
      toast.error("Error al registrar el usuario");
      hasNotified.current = true;
    }
  }, [isSuccess, isError, closeModal, dataResponse]);

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        rol: 3,
        estado: 'activo'
      };
      console.log("Datos enviados:", userData);
      await crearUsuario(userData);
    } catch (error) {
      toast.error("Error al guardar el usuario");
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Cliente</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputAtomo
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            register={register}
            erros={errors}
            className="w-full"
          />
          <InputAtomo
            type="text"
            id="apellidos"
            name="apellidos"
            placeholder="Apellidos"
            register={register}
            erros={errors}
            className="w-full"
          />
          <InputAtomo
            type="email"
            id="correo_electronico"
            name="correo_electronico"
            placeholder="Correo Electrónico"
            register={register}
            erros={errors}
            className="w-full"
          />
          <InputAtomo
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            register={register}
            erros={errors}
            className="w-full"
          />
          <InputAtomo
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            register={register}
            erros={errors}
            className="w-full"
          />
          <InputAtomo
            type="number"
            id="numero_documento"
            name="numero_documento"
            placeholder="Número de Documento"
            register={register}
            erros={errors}
            className="w-full"
          />
        </div>

        <div className="w-full md:w-1/3 mx-auto">
          <SelectAtomo
            id="tipo_documento"
            name="tipo_documento"
            label="Tipo de Documento"
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
            className="w-full"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Mybutton type="submit" color="primary" className="px-6 py-2 text-lg">
            Registrar Usuario
          </Mybutton>
        </div>
      </form>
    </section>
  );
};

export default ClienteFormulario;