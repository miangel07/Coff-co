import Documentos from "../../components/plantillas/Documentos/Documentos";
import Header from "../../components/molecules/layout/Header";
import Footer from "../../components/molecules/Footer/Footer";
const DocumentosPage = () => {
  return (
    <div className=" h-screen justify-between flex flex-col">

      <Header contenido={"hola"} />


      <Documentos />

      <Footer />
    </div>

  )
};

export default DocumentosPage;
