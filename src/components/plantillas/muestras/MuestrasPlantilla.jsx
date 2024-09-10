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
import MuestrasFormulario from "../../molecules/Formulario/MuestrasFormulario";


import {
  useGetMuestrasQuery,
  useUpdateEstadoMuestraMutation,
} from "../../../store/api/muestra";

const MuestrasPlantilla = () => {
  const [showModal, setShowModal] = useState(false);
  const [datosDelFormulario, setDatosDelFormulario] = useState("");
  const [pages, setPages] = useState(1);
  const {
    data: dataMuestras,
    isLoading,
    isError,
    error,
  } = useGetMuestrasQuery();
  const [
    updateEstado,
    { isLoading: isLoadingCambio, isError: isErrorCambio, error: errorCambio },
  ] = useUpdateEstadoMuestraMutation();

  const handleModal = () => {
    setShowModal(true);
  };

  const cantidad = 4;
  const final = pages * cantidad;
  const inicial = final - cantidad;
  const handlePageChange = (page) => {
    setPages(page);
  };

  const numeroPagina = Math.ceil((dataMuestras?.length || 0) / cantidad);
  const DataArrayPaginacion = dataMuestras
    ? dataMuestras?.slice(inicial, final)
    : [];
  const handleEdit = (muestra) => {
    setDatosDelFormulario(muestra);
    setShowModal(true);
  };

  const closemodal = () => {
    setDatosDelFormulario("");
    setShowModal(false);
  };
  const handleSwitchChange = (checked, id) => {
    try {
      updateEstado({
        id: id,
        estado: checked ? "terminado" : "pendiente",
      });
    } catch (error) {
      console.error("Error al procesar la solicitud", error);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full  mt-5 gap-4 flex flex-wrap flex-col">
      <h2 className="text-2xl px-20 font-bold">Muestras</h2>
      <div className="px-20 ">
        <Mybutton color={"primary"} onClick={handleModal}>
          Nuevo
        </Mybutton>
      </div>
      {showModal && (
        <ModalOrganismo
          title={"Registrar Nueva Muestra"}
          visible={showModal}
          closeModal={closemodal}
        >
          <MuestrasFormulario
            dataValue={datosDelFormulario}
            closeModal={closemodal}
          />
        </ModalOrganismo>
      )}
      <div className="w-full px-20 overflow-x-auto ">
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
            {DataArrayPaginacion?.map((muestra) => (
              <tr key={muestra.id_muestra}>
                <Td>{muestra.id_muestra}</Td>
                    <Td>{muestra.codigo_muestra}</Td>
                    <Td>{muestra.cantidadEntrada}</Td>
                    <Td>{muestra.fecha_muestra}</Td>
                    <Td>{muestra.finca}</Td>
                    <Td>{muestra.usuario}</Td>
                <Td>
                  <Switch
                    color={muestra.estado === "terminado" ? "success" : "default"}
                    isSelected={muestra.estado === "terminado"}
                    onValueChange={(checked) =>
                      handleSwitchChange(checked, muestra.id_muestra)
                    }
                  >
                    {muestra.estado}
                  </Switch>
                </Td>

                <Td>
                  <div className=" gap-3 flex flex-graw">
                    <FaRegEdit
                      className="cursor-pointer"
                      size={"30px"}
                      onClick={() => handleEdit(muestra)}
                    />
                  </div>
                </Td>
              </tr>
            ))}
          </Tbody>
        </TableMolecula>
      </div>
      <div className="flex justify-center mt-4">
        <PaginationMolecula
          total={numeroPagina}
          initialPage={pages}
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default MuestrasPlantilla;
/* <>
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
    </> */
