import Mybutton from "../../atoms/Mybutton";
import Filtro from "../../molecules/documentos/Filtro";
import { BiDownload } from "react-icons/bi";
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
import DocumentosFrom from "../../molecules/Formulario/DocumentosFrom";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Search from "../../atoms/Search";
import { Switch } from "@nextui-org/react";
import { useCambioEstadoMutation } from "../../../store/api/documentos";

const DocumentosOrganismo = () => {
  const [dataInput, SetDataInput] = useState("");
  const [pages, setPages] = useState(1);
  const [form, setFrom] = useState(false)
  const { data, isLoading, isError, error } = useGetDocumentosQuery();
  const [searchTerm, setSearchTerm] = useState('');
  //  const [CambioEstado, { isSuccess, isLoading: loandEstado, isError: isErrorEstado, error: errorEstado }] = useCambioEstadoMutation()
  const { data: tipoData, isLoading: Tipo, isError: tipoError, error: errorTipo } = useGetTipoDocumentosQuery();
  const handlePageChange = (page) => {
    setPages(page);
  };
  if (isLoading && Tipo) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (tipoError) {

    return <p>Error: {tipoError.message}</p>;

  }

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
  const hadleClose = () => {
    setFrom(false)
  }
  const handleEstadoChange = (doc) => {
    const id = doc.id_documentos

    const nuevoEstado = doc.estado_version === "activo" ? "inactivo" : "activo";




  };

  const numeroPagina = Math.ceil(data?.length / cantidad);
  const DataArrayPaginacion = filteredData.slice(inicial, final);
  const HandelForm = () => {
    setFrom(true)
  }

  const openForm = form ? <DocumentosFrom hadleClose={hadleClose} /> : ""

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
              <Td>
                <Switch
                  isSelected={doc.estado_version}
                  onValueChange={() => handleEstadoChange(doc)}
                >
                  {doc.estado_version}
                </Switch>
              </Td>
              <Td>{doc.tipo_documento}</Td>
              <Td>
                <div className=" flex flex-row gap-3 justify-between">
                  <FaRegEye className="cursor-pointer" size={"35px"} />
                  <BiDownload className="cursor-pointer" size={"30px"} />
                  <FaRegEdit className="cursor-pointer" size={"30px"} />
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
