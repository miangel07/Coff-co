import React, { useState } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  useActualizarEstadoPrecioMutation,
  useActualizarPrecioMutation,
  useEliminarPrecioMutation,
  useGetPreciosQuery,
  useRegistrarPrecioMutation,
} from "../../../store/api/precios/preciosSlice";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import { Spinner, Switch } from "@nextui-org/react";
import { toast } from "react-toastify";
import Td from "../../atoms/Td";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { useGetTipoServicioQuery } from "../../../store/api/TipoServicio";
import { useForm } from "react-hook-form";
import ToolTip from "../../molecules/toolTip/ToolTip";
import InputAtomo from "../../atoms/Input";
import SelectAtomo from "../../atoms/Select";

const PreciosPlantilla = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;
  const [currentTipoServicio, setCurrentTipoServicio] = useState("");

  const { data: dataTipoServicio, isLoading: isLoadingTipoServicio } =
    useGetTipoServicioQuery();
  const {
    data: dataPrecio,
    isLoading: isLoadingPrecio,
    refetch,
  } = useGetPreciosQuery();
  const [registrarPrecio, { isLoading }] = useRegistrarPrecioMutation();
  const [actualizarPrecio] = useActualizarPrecioMutation();
  const [actualizarEstadoPrecio] = useActualizarEstadoPrecioMutation();
  const [eliminarPrecio] = useEliminarPrecioMutation();

  const [visible, setVisible] = useState(false);
  const [precioSeleccionado, setPrecioSeleccionado] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const totalPages = Math.ceil((dataPrecio?.length || 0) / itemsPorPagina);

  if (isLoadingPrecio || isLoadingTipoServicio || isLoading) {
    return (
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    );
  }

  const abrirModal = (precio) => {
    if (precio) {
      setPrecioSeleccionado(precio);
      reset({
        presentacion: precio.presentacion,
        precio: precio.precio,
        fk_idTipoServicio: precio.fk_idTipoServicio,
      });
      setCurrentTipoServicio(precio.nombreServicio);
    } else {
      setPrecioSeleccionado(null);
      reset({
        presentacion: "",
        precio: "",
        fk_idTipoServicio: "",
      });
      setCurrentTipoServicio("")
    }
    setVisible(true);
  };

  const cerrarModal = () => {
    setVisible(false);
    reset();
    setCurrentTipoServicio("")
  };

  const onSubmit = async (datosDelFormulario) => {
    try {
      const payload = {
        presentacion: datosDelFormulario.presentacion,
        precio: datosDelFormulario.precio,
        fk_idTipoServicio: datosDelFormulario.fk_idTipoServicio,
      };

      if (precioSeleccionado) {
        await actualizarPrecio({
          id: precioSeleccionado.idPrecio,
          ...payload,
        }).unwrap();
        toast.success("Precio actualizado con exito");
      } else {
        await registrarPrecio(payload).unwrap();
        toast.success("Precio registrado con éxito");
      }
      cerrarModal();
      refetch();
    } catch (error) {
      console.error("Error al procesar la solicitud", error);
      toast.error("Error al procesar la solicitud");
    }
  };

  const manejadorCambioEstadoSwitch = (checked, id) => {
    const nuevoEstado = checked ? "activo" : "inactivo";

    const precioActual = dataPrecio.find((precio) => precio.idPrecio === id);

    if (!precioActual) {
      toast.error("Registro de precio no encontrado");
      return;
    }

    const payload = {
      id: id,
      estado_precio: nuevoEstado,
    };
    actualizarEstadoPrecio(payload)
      .unwrap()
      .then(() => {
        toast.success("Estado actualizado con éxito");
        refetch();
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del ambiente", error);
        toast.error("Error al actualizar el estado del ambiente");
      });
  };

  const handleEliminarPrecio = (id, presentacion) => {
    confirmAlert({
      title: (
        <div>
          <span>
            <b>Confirmación de eliminación</b>
          </span>
        </div>
      ),
      message: (
        <div>
          ¿Estás seguro de que quieres eliminar el precio
          <span style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            {presentacion}
          </span>
          ?
        </div>
      ),
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              await eliminarPrecio(id).unwrap();
              toast.success("Precio eliminado con éxito");
            } catch (error) {
              console.error("Error al eliminar el precio", error);
              toast.error("Error al eliminar el precio");
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

  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const articulosActualesPrecio = dataPrecio
    ? dataPrecio.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <>
      <div className="w-auto h-screen  flex flex-col gap-8 bg-gray-100">
        <div className="pt-10 pl-20">
          <Mybutton color={"primary"} onClick={() => abrirModal(null)}>
            <b>Nuevo Precio</b>
          </Mybutton>
        </div>
        <div className="w-full px-20 h-auto overflow-y-auto">
          <TableMolecula>
            <Thead>
              <Th>ID</Th>
              <Th>Presentacion</Th>
              <Th>Precio</Th>
              <Th>Tipo servicio</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Thead>
            <Tbody>
              {articulosActualesPrecio.length > 0 ? (
                articulosActualesPrecio.map((precio) => (
                  <tr className="hover:bg-slate-200" key={precio.idPrecio}>
                    <Td>{precio.idPrecio}</Td>
                    <Td>{precio.presentacion}</Td>
                    <Td>{precio.precio}</Td>
                    <Td>{precio.nombreServicio}</Td>
                    <Td>
                      <Switch
                        color={
                          precio.estado_precio === "activo"
                            ? "success"
                            : "default"
                        }
                        isSelected={precio.estado_precio === "activo"}
                        onValueChange={(checked) =>
                          manejadorCambioEstadoSwitch(
                            checked,
                            precio.idPrecio,
                            dataTipoServicio.idTipoServicio
                          )
                        }
                      >
                        {precio.estado_precio}
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
                                handleEliminarPrecio(
                                  precio.idPrecio,
                                  precio.presentacion
                                )
                              }
                              className="cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300 "
                            />
                          )}
                        />
                        <ToolTip
                          content="Actualizar"
                          placement="right"
                          icon={() => (
                            <FaRegEdit
                              size={"35px"}
                              onClick={() => abrirModal(precio)}
                              className="cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300 "
                            />
                          )}
                        />
                      </div>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
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
        <ModalOrganismo
          visible={visible}
          closeModal={cerrarModal}
          // title={precioSeleccionado ? "Actualizar precio" : "Nuevo precio"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              {precioSeleccionado ? "Actualizar Precio" : "Nuevo Precio"}
            </h2>
            <div className="flex flex-col py-6 gap-2">
              <InputAtomo
                type="text"
                id="presentacion"
                name="presentacion"
                placeholder="presentacion"
                register={register}
                erros={errors}
              />
              <InputAtomo
                type="number"
                id="precio"
                name="precio"
                placeholder="Ingrese el precio"
                register={register}
                erros={errors}
              />
              <div>
                <div className="">
                  <SelectAtomo
                    data={dataTipoServicio}
                    label="Tipo de servicio"
                    onChange={(e) => {
                      setValue("fk_idTipoServicio", e.target.value);
                      setCurrentTipoServicio(e.target.value); 
                    }}
                    items="idTipoServicio"
                    ValueItem="nombreServicio"
                    value={currentTipoServicio}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Mybutton color={"primary"} type="submit">
                {precioSeleccionado ? "Actualizar" : "Registrar"}
              </Mybutton>
            </div>
          </form>
        </ModalOrganismo>
      </div>
    </>
  );
};

export default PreciosPlantilla;
