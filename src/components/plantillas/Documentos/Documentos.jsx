import { useState } from "react";
import GraficaDocumento from "../../molecules/graficas/GraficaDocumento";
import GraficaImages from "../../molecules/graficas/GraficaImages";
import DocumentosOrganismo from "../../organismo/documentos/DocumentosOrganismo";
import PdfDocuments from "../../organismo/Reportes/PdfDocuments";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useGraficaQuery } from "../../../store/api/documentos";
const Documentos = () => {
  const [imageData, setImageData] = useState([]);
  const { data, isLoading, isError, error } = useGraficaQuery();

  return (
    <>
      <div className=" w-full px-10 flex flex-col ">
        <DocumentosOrganismo />
      </div>
    </>
  );
};

export default Documentos;
