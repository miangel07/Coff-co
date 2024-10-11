import React, { useState } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import Td from "../../atoms/Td";
import { FaRegEdit } from "react-icons/fa";
import ModalOrganismo from "../../organismo/Modal/ModalOrganismo";
import { Switch } from "@nextui-org/react";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import MuestrasFormulario from "../../molecules/Formulario/MuestrasFormulario";
import FincaFormulario from "../../molecules/Formulario/FincaFormulario"; // Importar el nuevo formulario
import Search from "../../atoms/Search"; // Importar el componente de búsqueda

import {
  useGetMuestrasQuery,
  useUpdateEstadoMuestraMutation,
} from "../../../store/api/muestra";

const MuestrasPlantilla = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFincaModal, setShowFincaModal] = useState(false); // Estado para el modal de finca
  const [datosDelFormulario, setDatosDelFormulario] = useState("");
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el valor del campo de búsqueda

  const { data: dataMuestras, isLoading } = useGetMuestrasQuery();
  const [updateEstado] = useUpdateEstadoMuestraMutation();

  const handleModal = () => {
    setShowModal(true);
  };

  const handleFincaModal = () => {
    setShowFincaModal(true); // Mostrar modal de finca
  };

  const cantidad = 4;
  const final = pages * cantidad;
  const inicial = final - cantidad;
  const handlePageChange = (page) => {
    setPages(page);
  };

  const numeroPagina = Math.ceil((dataMuestras?.length || 0) / cantidad);

  // Filtrar los datos según el valor del campo de búsqueda
  const filteredData = dataMuestras
  ? dataMuestras.filter((muestra) =>
      muestra?.codigo_muestra?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  const DataArrayPaginacion = filteredData
    ? filteredData?.slice(inicial, final)
    : [];

  const handleEdit = (muestra) => {
    setDatosDelFormulario(muestra);
    setShowModal(true);
  };

  const closemodal = () => {
    setDatosDelFormulario("");
    setShowModal(false);
  };

  const closeFincaModal = () => {
    setShowFincaModal(false); // Cerrar modal de finca
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
    <section className="w-full mt-5 gap-4 flex flex-wrap flex-col">
      <h2 className="text-2xl px-20 font-bold">Muestras</h2>

      {/* Botones y barra de búsqueda */}
      <div className="px-20 flex gap-4 items-center">
        <Mybutton color={"primary"} onClick={handleModal}>
          Nuevo
        </Mybutton>
        <Mybutton color={"secondary"} onClick={handleFincaModal}>
          Agregar Finca
        </Mybutton>

        {/* Componente de búsqueda */}
        <div className="ml-auto">
          <Search
            label={"Buscar muestra"}
            placeholder={"Código de muestra"}
            onchange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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

      {showFincaModal && (
        <ModalOrganismo
          title={"Agregar Nueva Finca"}
          visible={showFincaModal}
          closeModal={closeFincaModal}
        >
          <FincaFormulario closeModal={closeFincaModal} />
        </ModalOrganismo>
      )}

      <div className="w-full px-20 overflow-x-auto">
        <TableMolecula>
          <Thead>
            <Th>ID</Th>
            <Th>Código</Th>
            <Th>Cantidad</Th>
            <Th>Unidad</Th>
            <Th>Fecha</Th>
            <Th>Finca</Th>
            <Th>Usuario</Th>
            <Th>Servicio</Th>
            <Th>Estado</Th>
            <Th>Altura (M)</Th>
            <Th>Variedad</Th>
            <Th>Observaciones</Th>
            <Th>Acciones</Th>
          </Thead>
          <Tbody>
            {DataArrayPaginacion?.map((muestra) => (
              <tr key={muestra.id_muestra}>
                <Td>{muestra.id_muestra}</Td>
                <Td>{muestra.codigo_muestra}</Td>
                <Td>{muestra.cantidadEntrada}</Td>
                <Td>{muestra.UnidadMedida}</Td>
                <Td>{muestra.fecha_muestra}</Td>
                <Td>{muestra.finca}</Td>
                <Td>{muestra.usuario}</Td>
                <Td>{muestra.fk_idTipoServicio}</Td>
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
                <Td>{muestra.altura}</Td>
                <Td>{muestra.variedad}</Td>
                <Td>{muestra.observaciones}</Td>
                <Td>
                  <div className="gap-3 flex flex-grow">
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
