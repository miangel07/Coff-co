import Mybutton from "../../atoms/Mybutton";
import Filtro from "../../molecules/documentos/Filtro";
import BarraBusqueda from "../../molecules/documentos/BarraBusqueda";
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

const DocumentosOrganismo = () => {
  const [dataInput, SetDataInput] = useState("");
  const [form, setFrom] = useState(false)
  const { data, isLoading, isError, error } = useGetDocumentosQuery();
  const { data: tipoData, isLoading: Tipo, isError: tipoError, error: errorTipo } = useGetTipoDocumentosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;


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
        <div>
          <BarraBusqueda />
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
          {data?.map((doc) => (
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
      <section >
        {openForm}
      </section>

    </section>
  );
};

export default DocumentosOrganismo;
