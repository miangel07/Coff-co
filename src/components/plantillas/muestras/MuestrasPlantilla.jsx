import React, { useState } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import Td from "../../atoms/Td";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { Spinner, Switch } from "@nextui-org/react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import { useForm } from "react-hook-form";
import ToolTip from "../../molecules/toolTip/ToolTip";
import InputAtomo from "../../atoms/Input";
import { Select, SelectItem } from "@nextui-org/react";
import { useGetFincasQuery } from "../../../store/api/fincas";
import { useGetUsuarioQuery } from "../../../store/api/users";

import {
  useGetMuestrasQuery,
  usePostMuestraMutation,
  usePutMuestraMutation,
  useDeleteMuestraMutation,
} from "../../../store/api/muestra";

const MuestrasPlantilla = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;

  const [currentFinca, setCurrentFinca] = useState(null);
  const [currentUsuarios, setCurrentUsuarios] = useState(null);

  const { data: dataFincas, isLoading: isLoadingFincas } = useGetFincasQuery();

  const { data: dataUsuarios, isLoading: isLoadingUsuarios } =
    useGetUsuarioQuery();

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
    setValue,
  } = useForm();
  if (isLoading || isLoadingFincas || isLoadingUsuarios) {
    return (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    );
  }

  const abrirModal = (muestra) => {
    if (muestra) {
      setMuestraSeleccionada(muestra);
      reset({
        cantidadEntrada: muestra.cantidadEntrada,
        finca: muestra.finca,
        fecha_muestra: muestra.fecha_muestra,
        codigo_muestra: muestra.codigo_muestra,
        usuario: muestra.usuario,
      });
    } else {
      setMuestraSeleccionada(null);
      reset({
        cantidadEntrada: "",
        finca: "",
        fecha_muestra: "",
        codigo_muestra: "",
        usuario: "",
        estado: "terminado",
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
        fk_id_finca: currentFinca,
        fecha_muestra: datos.fecha_muestra,
        codigo_muestra: datos.codigo_muestra,
        fk_id_usuarios: currentUsuarios,
        estado: "pendiente",
      };
  
      if (muestraSeleccionada) {
        // Actualizar muestra existente
        await actualizarMuestra({ ...payload, id: muestraSeleccionada.id_muestra }).unwrap();
        toast.success("Muestra actualizada con éxito");
      } else {
        // Crear nueva muestra
        await crearMuestra(payload).unwrap();
        toast.success("Muestra registrada con éxito");
      }
  
      cerrarModal();
      refetch();
    } catch (error) {
      console.error("Error al crear/actualizar muestra:", error);
      toast.error("Error al crear/actualizar muestra");
    }
  };
  

  const handleSwitchChange = (checked, id) => {
    const nuevoEstado = checked ? "terminado" : "pendiente";
    const muestraActual = data.find((muestra) => muestra.id_muestra === id);
  
    if (!muestraActual) {
      toast.error("Muestra no encontrada");
      return;
    }
  
    const payload = {
      id: id,
      cantidadEntrada: muestraActual.cantidadEntrada,
      finca: muestraActual.finca,
      fecha_muestra: muestraActual.fecha_muestra,
      codigo_muestra: muestraActual.codigo_muestra,
      usuario: muestraActual.usuario,
      estado: nuevoEstado,
    };
  
    console.log("Actualizar muestra con payload:", payload);
  
    actualizarMuestra(payload)
      .unwrap()
      .then(() => {
        toast.success("Muestra actualizada con éxito");
        refetch();
      })
      .catch((error) => {
        console.error("Error al actualizar la muestra", error);
        toast.error("Error al actualizar la muestra");
      });
  };
  

  const handleEliminarMuestra = (id, codigo_muestra) => {
    confirmAlert({
      title: "Confirmación de eliminación",
      message: `¿Estás seguro de que quieres eliminar la muestra ${codigo_muestra}?`,
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              await eliminarMuestra(id);
              toast.success("Muestra eliminada con éxito");
              refetch();
            } catch (error) {
              console.error("Error al eliminar la muestra", error);
              toast.error("Error al eliminar la muestra");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Eliminación cancelada"),
        },
      ],
      closeOnClickOutside: true,
    });
  };

  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const currentItems = data
    ? data.slice(indicePrimerItem, indiceUltimoItem)
    : [];
  const totalPages = Math.ceil((data?.length || 0) / itemsPorPagina);

  return (
    <>
      <div className="w-auto h-screen flex flex-col gap-8 bg-gray-100">
        <div className="pt-10 pl-20">
          <Mybutton color={"primary"} onClick={() => abrirModal(null)}>
            <b>Nueva Muestra</b>
          </Mybutton>
        </div>
        <div className="w-full px-20 h-auto overflow-y-auto">
          <TableMolecula>
            <Thead>
              <Th>ID</Th>
              <Th>Código</Th>
              <Th>Cantidad</Th>
              <Th>Fecha</Th>
              <Th>Finca</Th>
              <Th>Usuario</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Thead>
            <Tbody>
              {currentItems.length > 0 ? (
                currentItems.map((muestra) => (
                  <tr className="hover:bg-slate-200" key={muestra.id_muestra}>
                    <Td>{muestra.id_muestra}</Td>
                    <Td>{muestra.codigo_muestra}</Td>
                    <Td>{muestra.cantidadEntrada}</Td>
                    <Td>{muestra.fecha_muestra}</Td>
                    <Td>{muestra.finca}</Td>
                    <Td>{muestra.usuario}</Td>
                    <Td>
                    <Switch
                    color={
                      muestra.estado === "terminado" ? "success" : "default"
                    }
                    isSelected={muestra.estado === "terminado"}
                    onValueChange={(checked) =>
                      handleSwitchChange(checked, muestra.id_muestra, dataFincas.id_finca, dataUsuarios.id_usuario)
                    }
                  >
                    {muestra.estado}
                  </Switch>
                    </Td>
                    <Td>
                      <div className="flex flex-row gap-6">
                        <ToolTip
                          content="Eliminar"
                          placement="left"
                          icon={() => (
                            <MdDelete
                              size={"35px"}
                              onClick={() =>
                                handleEliminarMuestra(
                                  muestra.id_muestra,
                                  muestra.codigo_muestra
                                )
                              }
                              className="cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300"
                            />
                          )}
                        />
                        <ToolTip
                          content="Actualizar"
                          placement="right"
                          icon={() => (
                            <FaRegEdit
                              size={"35px"}
                              onClick={() => abrirModal(muestra)}
                              className="cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300"
                            />
                          )}
                        />
                      </div>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    <h1 className="text-2xl">
                      <b>No hay datos</b>
                    </h1>
                  </td>
                </tr>
              )}
            </Tbody>
          </TableMolecula>
        </div>

        <div className="flex justify-center mt-4">
          <PaginationMolecula
            total={totalPages}
            initialPage={paginaActual}
            onChange={(pagina) => setPaginaActual(pagina)}
          />
        </div>
      </div>
      <div className="flex">
        <ModalOrganismo visible={visible} closeModal={cerrarModal}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-lg mx-auto p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              {muestraSeleccionada ? "Actualizar muestra" : "Nueva muestra"}
            </h2>
            <div className="flex flex-col py-4 gap-4 w-full">
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
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Select
                  isRequired
                  variant={"flat"}
                  label={"usuario"}
                  className="w-full"
                  onChange={(e) =>
                    setCurrentUsuarios(parseInt(e.target.value))
                  }
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
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Mybutton type="submit" color="primary">
                {muestraSeleccionada ? "Actualizar" : "Registrar"}
              </Mybutton>
            </div>
          </form>
        </ModalOrganismo>
      </div>
    </>
  );
};

export default MuestrasPlantilla;
