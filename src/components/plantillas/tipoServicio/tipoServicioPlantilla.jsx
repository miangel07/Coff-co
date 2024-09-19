import React, { useState } from "react";
import { useGetTipoServicioQuery, 
    useUpdateEstadoTipoServicioMutation } from "../../../store/api/TipoServicio";
import TableMolecula from "../../molecules/table/TableMolecula";
import Tbody from "../../molecules/table/Tbody";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { FaRegEdit } from "react-icons/fa";
import Mybutton from "../../atoms/Mybutton";
import TipoServicioFormulario from "../../molecules/Formulario/TipoServicioFormulario";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import { Switch } from "@nextui-org/react";

const TipoServicioPlantilla = () => {
  const [showModal, setShowModal] = useState(false);
  const [datosDelFormulario, setDatosDelFormulario] = useState(null);
  const [pages, setPages] = useState(1);

  const { data: dataTipoServicios, isLoading, isError, error } = useGetTipoServicioQuery();
  const [updateEstadoTipoServicio] = useUpdateEstadoTipoServicioMutation();

  const handleModal = () => {
    setShowModal(true);
  };

  const cantidad = 4;
  const final = pages * cantidad;
  const inicial = final - cantidad;
  const handlePageChange = (page) => {
    setPages(page);
  };

  const numeroPagina = Math.ceil((dataTipoServicios?.length || 0) / cantidad);
  const DataArrayPaginacion = dataTipoServicios ? dataTipoServicios.slice(inicial, final) : [];

  const handleEdit = (TipoServicio) => {
    setDatosDelFormulario(TipoServicio);
    setShowModal(true);
  };

  const closeModal = () => {
    setDatosDelFormulario(null);
    setShowModal(false);
  };

  const handleSwitchChange = async (checked, id) => {
    try {
      await updateEstadoTipoServicio({
        id: id,
        estado: checked ? "activo" : "inactivo",
      });
    } catch (error) {
      console.error("Error al procesar la solicitud", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="w-full mt-5 gap-4 flex flex-wrap flex-col">
      <h2 className="text-2xl px-20 font-bold">Tipo de Servicio</h2>
      <div className="px-20">
        <Mybutton color="primary" onClick={handleModal}>
          Nuevo
        </Mybutton>
      </div>
      {showModal && (
        <ModalOrganismo
          title="Registrar Nuevo Tipo de Servicio"
          visible={showModal}
          closeModal={closeModal}
        >
          <TipoServicioFormulario
            dataValue={datosDelFormulario}
            closeModal={closeModal}
          />
        </ModalOrganismo>
      )}
      <div className="w-full px-20 overflow-x-auto">
        <TableMolecula>
          <Thead>
            <Th>ID</Th>
            <Th>Nombre del Servicio</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Thead>
          <Tbody>
            {DataArrayPaginacion?.map((TipoServicio) => (
              <tr key={TipoServicio.idTipoServicio}>
                <Td>{TipoServicio.idTipoServicio}</Td>
                <Td>{TipoServicio.nombreServicio}</Td>
                <Td>
                  <Switch
                    color={TipoServicio.estado === "activo" ? "success" : "default"}
                    isSelected={TipoServicio.estado === "activo"}
                    onValueChange={(checked) => handleSwitchChange(checked, TipoServicio.idTipoServicio)}
                  >
                    {TipoServicio.estado}
                  </Switch>
                </Td>
                <Td>
                  <div className="gap-3 flex flex-graw">
                    <FaRegEdit
                      className="cursor-pointer"
                      size="30px"
                      onClick={() => handleEdit(TipoServicio)}
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

export default TipoServicioPlantilla;
