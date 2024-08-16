
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Tbody from "../../molecules/table/Tbody";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";
import { useGetDocumentosQuery } from "../../../store/api/documentos";


const TableDocumentos = ({data}) => {
  const { data, isLoading, isError, error } = useGetDocumentosQuery();
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full justify-center flex items-center ">
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
            <tr key={doc.id_documentos}>
              <Td>{doc.id_documentos}</Td>
              <Td>{doc.codigo_documentos}</Td>
              <Td>{doc.nombre_documento}</Td>
              <Td>{doc.version}</Td>
              <Td>{doc.fecha_version.split("T")[0]}</Td>
              <Td>{doc.fecha_emision.split("T")[0]}</Td>
              <Td>{doc.estado_version}</Td>
              <Td>{doc.tipo_documento}</Td>
              <Td>
                <h1>acciones</h1>
              </Td>
            </tr>
          ))}
        </Tbody>
      </TableMolecula>
    </div>
  );
};

export default TableDocumentos;
