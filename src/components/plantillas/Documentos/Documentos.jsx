import GraficaDocumento from "../../molecules/graficas/GraficaDocumento";
import DocumentosOrganismo from "../../organismo/documentos/DocumentosOrganismo";

const Documentos = () => {
  return (
    <>
      <div className=" w-full px-10 flex flex-col ">
        <DocumentosOrganismo />
        <div className="w-full px-10  ">
          <GraficaDocumento />
        </div>
      </div>

    </>
  );
};

export default Documentos;
