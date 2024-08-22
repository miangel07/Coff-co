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
import { useCambioEstadoMutation, useGetDocumentosQuery } from "../../../store/api/documentos";
import { useGetTipoDocumentosQuery } from "../../../store/api/TipoDocumentos";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import DocumentosFrom from "../../molecules/Formulario/DocumentosFrom";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Search from "../../atoms/Search";
import { Switch } from "@nextui-org/react";
import ModalOrganismo from "../Modal/ModalOrganismo";
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';


const DocumentosOrganismo = () => {
  const [dataInput, SetDataInput] = useState("");
  const [pages, setPages] = useState(1);
  const [form, setFrom] = useState(false)
  const [Nombre_documentoVerion, setNombre_documentoVerion] = useState({})
  const { data, isLoading, isError, error } = useGetDocumentosQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [CambioEstado, { isSuccess, isLoading: loandEstado, isError: isErrorEstado, error: errorEstado }] = useCambioEstadoMutation()
  const { data: tipoData, isLoading: Tipo, isError: tipoError, error: errorTipo } = useGetTipoDocumentosQuery();
  const handlePageChange = (page) => {
    setPages(page);
  };

  if (isLoading && Tipo) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (tipoError || isErrorEstado) {

    return <p>Error: {tipoError.message} || Error: {errorEstado.message}</p>
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
  const visorDocumento = Nombre_documentoVerion?.nombre && Nombre_documentoVerion?.fecha ? (
    <DocViewer
      documents={[{ uri: `${import.meta.env.VITE_BASE_URL_DOCUMENTO}/${Nombre_documentoVerion.fecha}${Nombre_documentoVerion.nombre}` }]}
      pluginRenderers={DocViewerRenderers}
      config={{ header: { disableHeader: false } }}
    />
  ) : null;
  const handleClick = async (doc) => {
    const id = doc.id_documentos

    const nuevoEstado = doc.estado_version === "activo" ? "inactivo" : "activo";
    const data = { id: id, estado: nuevoEstado }
    console.log(data);
    await CambioEstado(data)
  };

  const numeroPagina = Math.ceil(data?.length / cantidad);
  const DataArrayPaginacion = filteredData.slice(inicial, final);




  const closeModal = () => {
    setFrom(false)
  }


  return (
    <section className="w-full  flex flex-col gap-8 items-center">
      <div className="w-full  flex flex-wrap justify-around   items-center">
        {visorDocumento}
        <Mybutton color={"primary"} type={"submit"} onClick={() => setFrom(true)}>
          Nuevo
        </Mybutton>
        {
          form &&
          <ModalOrganismo
            closeModal={closeModal}
            title={"Registrar Documentos"}
            visible={form}
          >
            <DocumentosFrom closeModal={closeModal} />


          </ModalOrganismo>
        }
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
                  color={doc.estado_version === "activo" ? "primary" : "default"}
                  isSelected={doc.estado_version}
                  onClick={() => handleClick(doc)}
                >
                  {doc.estado_version}
                </Switch>
              </Td>
              <Td>{doc.tipo_documento}</Td>
              <Td>
                <div className=" flex flex-row gap-3 justify-between">
                  <FaRegEye onClick={() => setNombre_documentoVerion(
                    {
                      nombre: doc.nombre_documento_version,
                      fecha: doc.fecha_version.split(".")[0],
                    }

                  )} className="cursor-pointer" size={"35px"} />
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
    </section>
  );
};

export default DocumentosOrganismo;
