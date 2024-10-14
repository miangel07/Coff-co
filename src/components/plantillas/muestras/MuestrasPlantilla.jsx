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
import FincaFormulario from "../../molecules/Formulario/FincaFormulario";
import Search from "../../atoms/Search";

import {
  useGetMuestrasQuery,
} from "../../../store/api/muestra";

const MuestrasPlantilla = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFincaModal, setShowFincaModal] = useState(false);
  const [datosDelFormulario, setDatosDelFormulario] = useState("");
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedMuestra, setSelectedMuestra] = useState(null);
  const { data: dataMuestras, isLoading } = useGetMuestrasQuery();

  const handleImageClick = (muestra) => {
    setSelectedMuestra(muestra);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedMuestra(null);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleFincaModal = () => {
    setShowFincaModal(true);
  };

  const cantidad = 4;
  const final = pages * cantidad;
  const inicial = final - cantidad;
  const handlePageChange = (page) => {
    setPages(page);
  };

  const numeroPagina = Math.ceil((dataMuestras?.length || 0) / cantidad);

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
    setShowFincaModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
console.log(DataArrayPaginacion)
  return (
    <section className="w-full mt-5 gap-4 flex flex-wrap flex-col">
      <h2 className="text-2xl px-20 font-bold">Muestras</h2>

      <div className="px-20 flex gap-4 items-center">
        <Mybutton color={"primary"} onClick={handleModal}>
          Nuevo
        </Mybutton>
        <Mybutton color={"secondary"} onClick={handleFincaModal}>
          Agregar Finca
        </Mybutton>

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
          title={datosDelFormulario ? "Editar Muestra" : "Registrar Nueva Muestra"}
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
            <Th>Imagen</Th>
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
                    isSelected={muestra.estado === "terminado"}
                    color={muestra.estado === "terminado" ? "success" : "default"}
                  >
                    {muestra.estado}
                  </Switch>
                </Td>
                <Td>{muestra.altura}</Td>
                <Td>{muestra.variedad}</Td>
                <Td>{muestra.observaciones}</Td>
                <Td>
                  {muestra.fotoMuestra && (
                    <img
                      src={`http://localhost:3000/public/muestras/${muestra.fotoMuestra}`}
                      alt="Muestra"
                      className="cursor-pointer h-8 w-8 rounded object-cover"
                      onClick={() => handleImageClick(muestra)}
                    />
                  )}
                </Td>
                <Td>
                  <div className="flex items-center space-x-4">
                    <button
                      className="group bg-none flex cursor-pointer items-center justify-center h-[30px] w-[60px] rounded-[5px] border-none hover:rounded-full hover:bg-gray-400/30"
                      onClick={() => handleEdit(muestra)}
                    >
                      <FaRegEdit />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </Tbody>
        </TableMolecula>
      </div>

      {showImageModal && selectedMuestra && (
        <ModalOrganismo
          title={`Imagen de la Muestra: ${selectedMuestra.codigo_muestra}`}
          visible={true}
          closeModal={closeImageModal}
        >
          <div className="flex justify-center items-center">
            <img
              src={`http://localhost:3000/public/muestras/${selectedMuestra.fotoMuestra}`}
              alt={`Muestra ${selectedMuestra.codigo_muestra}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </ModalOrganismo>
      )}

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