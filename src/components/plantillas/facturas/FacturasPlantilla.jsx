import React from "react";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";

const FacturasPlantilla = () => {
  return (
    <div className="w-full px-20 overflow-x-auto ">
      <TableMolecula>
        <Thead>
          <Th>ID</Th>
          <Th>Nombre</Th>
          <Th>Tipo de Dato</Th>
          <Th>Estado</Th>
          <Th>Acciones</Th>
        </Thead>
        <Tbody></Tbody>
      </TableMolecula>
    </div>
  );
};

export default FacturasPlantilla;
