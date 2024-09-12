import { useState } from "react";
import GraficaDocumento from "../../molecules/graficas/GraficaDocumento";
import GraficaImages from "../../molecules/graficas/GraficaImages";
import DocumentosOrganismo from "../../organismo/documentos/DocumentosOrganismo";
import PdfDocuments from "../../organismo/Reportes/PdfDocuments";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useGraficaQuery } from "../../../store/api/documentos";
const Documentos = () => {
  const [imageData, setImageData] = useState([]);
  const { data, isLoading, isError, error } = useGraficaQuery();

  const handleExportImage = (data) => {
    setImageData(data);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || "Unknown error"}</p>;
  }
  const configuraciones = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Informacion',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'Bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  };

  return (
    <>
      <div className=" w-full px-10 flex flex-col ">
        <DocumentosOrganismo />
        <div className="w-full px-10  ">
          <PDFDownloadLink document={<PdfDocuments imageData={imageData} />} fileName="mipdf.pdf">
            {({ loading, url, error, blod }) =>
              loading ? (
                <button>Descargando...</button>
              ) : (
                <button>Descargar</button>
              )
            }
          </PDFDownloadLink>
          <div className="">

            <GraficaImages onExport={handleExportImage} configuraciones={configuraciones} height={"400px"} width={"100%"} />
          </div>
          <GraficaDocumento />
        </div>
      </div>
    </>
  );
};

export default Documentos;
