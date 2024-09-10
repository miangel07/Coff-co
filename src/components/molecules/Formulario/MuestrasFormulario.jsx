import React, { useEffect, useState } from "react";
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
  const [currentFinca, setCurrentFinca] = useState(null);
  const [currentUsuarios, setCurrentUsuarios] = useState(null);

  const { data: dataFincas, isLoading: isLoadingFincas } = useGetFincasQuery();

  const { data: dataUsuarios, isLoading: isLoadingUsuarios } =
    useGetUsuarioQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
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
  console.log(dataValue.cantidadEntrada);

  const handleEdit = async (data) => {
    try {
      if (data) {
        await editarMuestra({
          id: dataValue.id_muestra,
          cantidadEntrada: data.cantidadEntrada,
          fechaMuestra: data.fechaMuestra,
          codigoMuestra: data.codigoMuestra,
          fk_id_finca: data.fk_id_finca,
          fk_id_usuarios: data.fk_id_usuarios,
          estado: data.estado,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (dataValue) {
      reset({ cantidadEntrada: dataValue.cantidadEntrada });
      reset({ fechaMuestra: dataValue.fechaMuestra });
      reset({ codigoMuestra: dataValue.codigoMuestra });
      reset({ fk_id_finca: dataValue.fk_id_finca });
      reset({ fk_id_usuarios: dataValue.fk_id_usuarios });
      reset({ estado: dataValue.estado });
    } else {
      reset();
    }
    if (isSuccess || isSuccessEdit) {
      toast.success(`${dataResponse?.menssage || dataResponseEdit?.menssage}`);
      closeModal();
    }
  }, [dataValue, dataResponse, setValue, isSuccess, isSuccessEdit]);
  console.log(dataValue);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (dataValue) {
        await handleEdit(data);
      } else {
        await crearMuestra({
          cantidadEntrada: data.cantidadEntrada,
          fechaMuestra: data.fechaMuestra,
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
  if (isLoading || isLoadingEdit) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full overflow-auto justify-center items-center flex">
      <form
        onSubmit={handleSubmit(dataValue ? handleEdit : onsubmit)}
        className="  flex flex-col  justify-between "
      >
        <div className="flex w-[230px] h-[155px]   flex-col gap-5">
          <InputAtomo
            type={"text"}
            id={"codigo_muestra"}
            name={"codigo_muestra"}
            placeholder={"Código de la muestra"}
            register={register}
            erros={errors}
          />
          <InputAtomo
            type={"number"}
            id={"cantidadEntrada"}
            name={"cantidadEntrada"}
            placeholder="Cantidad de entrada"
            register={register}
            erros={errors}
          />

          <InputAtomo
            type={"date"}
            id={"fecha_muestra"}
            name={"fecha_muestra"}
            register={register}
            erros={errors}
          />

        </div>
        <div className="flex w-[230px] mt-10 flex-col ">
          <Mybutton type={"onsubmit"} color={"primary"}>
            {dataValue ? "Actualizar" : "Registrar"}
          </Mybutton>
        </div>
      </form>
    </section>
  );
};

export default MuestrasFormulario;
          {/* <div className="flex flex-col sm:flex-row sm:gap-4">
            <Select
              isRequired
              variant={"flat"}
              label={"usuario"}
              className="w-full"
              onChange={(e) => setCurrentUsuarios(parseInt(e.target.value))}
            >
              {dataUsuarios.map((items) => (
                <SelectItem key={items.id_usuario} value={items.id_usuario}>
                  {items.nombre}
                </SelectItem>
              ))}
            </Select>
            <Select
              isRequired
              variant={"flat"}
              label={"finca"}
              className="w-full"
              onChange={(e) => setCurrentFinca(parseInt(e.target.value))}
            >
              {dataFincas.map((items) => (
                <SelectItem key={items.id_finca} value={items.id_finca}>
                  {items.nombre_finca}
                </SelectItem>
              ))}
            </Select>
          </div> */}