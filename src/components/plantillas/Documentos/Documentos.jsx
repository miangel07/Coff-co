import DocumentosOrganismo from "../../organismo/documentos/DocumentosOrganismo";
import TableDocumentos from "../../organismo/documentos/TableDocumentos";

const Documentos = () => {
  return (
    <div>
      <div>
        <DocumentosOrganismo />
      </div>
      <div>
        <TableDocumentos />
      </div>
    </div>
  );
};

export default Documentos;
