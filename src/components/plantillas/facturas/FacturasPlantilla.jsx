import React from "react";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import { useGetMuestrasQuery } from "../../../store/api/muestra";
import Td from "../../atoms/Td";

const FacturasPlantilla = () => {
  const { data, isLoading, isError, error } = useGetMuestrasQuery();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.table(data);
  return (
    <div className="w-full px-20 overflow-x-auto ">
      <TableMolecula>
        <Thead>
          <Th>ID</Th>
          <Th>Código</Th>
          <Th>Cantidad</Th>
          <Th>Fecha</Th>
          <Th>Finca</Th>
          <Th>Usuario</Th>
          <Th>Estado</Th>
          <Th>Acciones</Th>
        </Thead>
        <Tbody>
          {data?.map((muestra) => (
            <tr key={muestra.id_muestra}>
              <Td>{muestra.id_muestra}</Td>
              <Td>{muestra.codigo_muestra}</Td>
              <Td>{muestra.cantidadEntrada}</Td>
              <Td>{muestra.fecha_muestra}</Td>
              <Td>{muestra.finca}</Td>
              <Td>{muestra.usuario}</Td>
              <Td>{muestra.estado}</Td>

              <Td></Td>
            </tr>
          ))}
        </Tbody>
      </TableMolecula>
    </div>
  );
};

export default FacturasPlantilla;
