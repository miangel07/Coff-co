import Mybutton from "../../atoms/Mybutton";
import Filtro from "../../molecules/documentos/Filtro";
import BarraBusqueda from "../../molecules/documentos/BarraBusqueda";
import SelectAtomo from "../../atoms/Select";
import { useState } from "react";

const DocumentosOrganismo = () => {
  const [data, SetData] = useState("");
  console.log(data);
  return (
    <section className="w-full  flex flex-row justify-around  items-center">
      <div>
        <Mybutton color={"primary"} type={"submit"}>
          Nuevo
        </Mybutton>
      </div>
      <div className="w-72 ">
        <SelectAtomo
          label={"Selecione el Tipo de Documento"}
          data={[
            {
              id: 1,
              nombre: "Procesos Misionales",
            },
            {
              id: 2,
              nombre: "Procesos Misionales",
            },
          ]}
          onchage={(e) => SetData(e.target.value)}
        />
      </div>
      <div>
        <BarraBusqueda />
      </div>
      <div>
        <Filtro />
      </div>
    </section>
  );
};

export default DocumentosOrganismo;
