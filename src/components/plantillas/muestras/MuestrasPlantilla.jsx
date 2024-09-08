import React, { useState } from "react";
import { Spinner, Switch } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import {
  useGetMuestrasQuery,
  usePostMuestraMutation,
  usePutMuestraMutation,
  useDeleteMuestraMutation,
} from "../../../store/api/muestra";

const MuestrasPlantilla = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;
  const { data, isLoading, refetch } = useGetMuestrasQuery();
  const [crearMuestra] = usePostMuestraMutation();
  const [actualizarMuestra] = usePutMuestraMutation();
  const [eliminarMuestra] = useDeleteMuestraMutation();

  const [visible, setVisible] = useState(false);
  const [muestraSeleccionada, setMuestraSeleccionada] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  if (isLoading) {
    return (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    );
  }

  const abrirModal = (muestra) => {
    if (muestra) {
      setMuestraSeleccionada(muestra);
      reset({
        cantidadEntrada: muestra.cantidadEntrada,
        fk_id_finca: muestra.fk_id_finca,
        fecha_muestra: muestra.fecha_muestra,
        codigo_muestra: muestra.codigo_muestra,
        fk_id_usuarios: muestra.fk_id_usuarios,
      });
    } else {
      setMuestraSeleccionada(null);
      reset({
        cantidadEntrada: "",
        fk_id_finca: "",
        fecha_muestra: "",
        codigo_muestra: "",
        fk_id_usuarios: "",
      });
    }
    setVisible(true);
  };

  const cerrarModal = () => {
    setVisible(false);
    reset();
  };

  const onSubmit = async (datos) => {
    try {
      const payload = {
        cantidadEntrada: datos.cantidadEntrada,
        fk_id_finca: datos.fk_id_finca,
        fecha_muestra: datos.fecha_muestra,
        codigo_muestra: datos.codigo_muestra,
        fk_id_usuarios: datos.fk_id_usuarios,
      };
      if (muestraSeleccionada) {
        await actualizarMuestra({
          id: muestraSeleccionada.id_muestra,
          ...payload,
        }).unwrap();
        toast.success("Muestra actualizada con éxito");
      } else {
        await crearMuestra (payload).unwrap();
        toast.success("Muestra registrada con éxito");
      }
      cerrarModal();
      refetch();
    } catch (error) {
      console.error("Error al crear/actualizar muestra:", error);
      toast.error("Error al crear/actualizar muestra");
    }
  }
  const handleUpdateMuestra = (id) => {
    const muestraActual = data.find((muestra) => muestra.idMuestra === id);
  
    if (!muestraActual) {
      toast.error("Muestra no encontrada");
      return;
    }
  
    const payload = {
      id: id,
      cantidadEntrada: muestraActual.cantidadEntrada,
      fk_id_finca: muestraActual.fk_id_finca,
      fecha_muestra: muestraActual.fecha_muestra,
      codigo_muestra: muestraActual.codigo_muestra,
      fk_id_usuarios: muestraActual.fk_id_usuarios,
    };
  
    actualizarMuestra(payload)
      .unwrap()
      .then(() => {
        toast.success("Muestra actualizada con éxito");
        refetch(); // Volver a cargar los datos si es necesario
      })
      .catch((error) => {
        console.error("Error al actualizar la muestra", error);
        toast.error("Error al actualizar la muestra");
      });
  };
  










  return <div>MuestrasPlantilla</div>;
};

export default MuestrasPlantilla;
