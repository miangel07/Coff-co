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

