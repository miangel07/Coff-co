import GraficaDocumento from "../../molecules/graficas/GraficaDocumento";
import GraficaImages from "../../molecules/graficas/GraficaImages";
import DocumentosOrganismo from "../../organismo/documentos/DocumentosOrganismo";
import PdfDocuments from "../../organismo/Reportes/PdfDocuments";
import { PDFDownloadLink } from "@react-pdf/renderer";
const Documentos = () => {
  return (
    <>
      <div className=" w-full px-10 flex flex-col ">
        <DocumentosOrganismo />
        <div className="w-full px-10  ">
          <PDFDownloadLink document={<PdfDocuments />} fileName="mipdf.pdf">
            {({ loading, url, error, blod }) =>
              loading ? (
                <button>Descargando...</button>
              ) : (
                <button>Descargar</button>
              )
            }
          </PDFDownloadLink>

          <GraficaDocumento />
        </div>
      </div>
    </>
  );
};

export default Documentos;
