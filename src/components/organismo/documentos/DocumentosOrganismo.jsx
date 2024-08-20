import Mybutton from "../../atoms/Mybutton";
import Filtro from "../../molecules/documentos/Filtro";

import SelectAtomo from "../../atoms/Select";
import { useState } from "react";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Tbody from "../../molecules/table/Tbody";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";
import { useGetDocumentosQuery } from "../../../store/api/documentos";
import { useGetTipoDocumentosQuery } from "../../../store/api/TipoDocumentos";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import DocumentosFrom from "../../molecules/Formulario/DocumentosFrom";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Search from "../../atoms/Search";

const DocumentosOrganismo = () => {
  const [dataInput, SetDataInput] = useState("");
  const [pages, setPages] = useState(1);
  const [form, setFrom] = useState(false)
  const { data, isLoading, isError, error } = useGetDocumentosQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const handlePageChange = (page) => {
    setPages(page);
  };
  const { data: tipoData, isLoading: Tipo, isError: tipoError, error: errorTipo } = useGetTipoDocumentosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const cantidad = 6;
  const final = pages * cantidad;
  const inicial = final - cantidad;

  const filteredData = data && data.length > 0
    ? data.filter((item) => {
      const tipoDocumentoMatch = dataInput === "" ||
        (item.tipo_documento && item.tipo_documento.toLowerCase() === dataInput.toLowerCase());
      const nombreDocumentoMatch = searchTerm === "" ||
        (item.nombre_documento && item.nombre_documento.toLowerCase().includes(searchTerm.toLowerCase()));
      return tipoDocumentoMatch && nombreDocumentoMatch;
    })
    : [];
  ;


  const numeroPagina = Math.ceil(data.length / cantidad);
  const DataArrayPaginacion = filteredData.slice(inicial, final);
  const HandelForm = () => {
    setFrom(true)
  }
  const openForm = form ? <DocumentosFrom /> : ""
  return (
    <section className="w-full  flex flex-col gap-8 items-center">
      <div className="w-full  flex flex-wrap justify-around   items-center">
        <Mybutton color={"primary"} type={"submit"} onClick={HandelForm}>
          Nuevo
        </Mybutton>
        <div className="w-72 ">
          <SelectAtomo
            label={"Selecione el Tipo de Documento"}
            data={tipoData}
            onChange={(e) => SetDataInput(e.target.value)}
            items={"nombreDocumento"}
            ValueItem={"nombreDocumento"}
          />

        </div>
        <div className="w-[550px]">
          <Search label={"Search"} placeholder={"Buscar..."} onchange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div>
          <Filtro />
        </div>
      </div>
      <TableMolecula>
        <Thead>
          <Th>Id</Th>
          <Th>Codigo</Th>
          <Th>Nombre</Th>
          <Th>Version</Th>
          <Th>Fecha De Version</Th>
          <Th>Fecha Emision</Th>
          <Th>Estado</Th>
          <Th>Tipo De Documento</Th>
          <Th>acciones</Th>
        </Thead>
        <Tbody>
          {DataArrayPaginacion?.map((doc) => (
            <tr className=" hover:bg-slate-100 " key={doc.id_documentos}>
              <Td>{doc.id_documentos}</Td>
              <Td>{doc.codigo_documentos}</Td>
              <Td>{doc.nombre_documento}</Td>
              <Td>{doc.version}</Td>
              <Td>{doc.fecha_version.split("T")[0]}</Td>
              <Td>{doc.fecha_emision.split("T")[0]}</Td>
              <Td>{doc.estado_version}</Td>
              <Td>{doc.tipo_documento}</Td>
              <Td>
                <div className=" flex flex-row gap-3 justify-between">
                  <FaRegEye size={"35px"} />
                  <FaArrowCircleDown size={"30px"} />
                  <FaRegEdit size={"30px"} />
                </div>

              </Td>
            </tr>
          ))}
        </Tbody>
      </TableMolecula>
      <div>
        <PaginationMolecula
          initialPage={pages}
          total={numeroPagina}
          onChange={handlePageChange}
        />
      </div>
      <section >
        {openForm}
      </section>

    </section>
  );
};

export default DocumentosOrganismo;
