import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { useGetusersQuery } from "../../../store/api/users";
import { MdDeleteOutline } from "react-icons/md";

import { FiEdit } from "react-icons/fi";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";
import PaginationMolecula from "../pagination/PaginationMolecula";

const UserTable = () => {
  const { data, isLoading, isError, error } = useGetusersQuery();

  const [cantidadData, setCantidadData] = useState(7);
  const [pages, setPage] = useState(1);
  const final = pages * cantidadData;
  const inicial = final - cantidadData;

  const numeroPagina = Math.ceil(data?.length / cantidadData);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="text-red-400">{error.message}</p>;
  }
  const handlePageChange = (page) => {
    setPage(page);
  };
  const Editar = (id) => {
    alert(`Editando usuario con ID:${id}`);
  };
  const DataArray = data ? data.slice(inicial, final) : [];
  const User = DataArray
    ? DataArray.map((usuario) => (
        <tr className="hover:bg-hover " key={usuario.id_usuario}>
          <Td>{usuario.id_usuario}</Td>
          <Td>{usuario.nombre_usuario}</Td>
          <Td>{usuario.correo_electronico}</Td>
          <Td>{usuario.telefono_usuario}</Td>
          <Td>{usuario.rol_usuario}</Td>
          <Td>{usuario.tipo_documento}</Td>
          <Td>{usuario.numero_identificacion}</Td>
          <Td>
            <p className="flex-row flex  text-2xl text-left">
              <FiEdit
                className="hover:text-sena"
                onClick={() => Editar(usuario.id_usuario)}
              />
              <MdDeleteOutline
                className="hover:text-red-400"
                onClick={() => Eliminar(usuario.id_usuario)}
              />
            </p>
          </Td>
        </tr>
      ))
    : null;

  return (
    <>
      <div className="overflow-x-auto ">
        <table className="min-w-full  divide-y  table cursor-pointer">
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>Telefono</Th>
              <Th>Rol</Th>
              <Th>Tipo de Identificación</Th>
              <Th> Número de Identificación</Th>
              <Th> Acciones</Th>
            </tr>
          </thead>
          <tbody>{User}</tbody>
        </table>
      </div>
      <div className="min-w-full  justify-center flex  mt-8">
        <PaginationMolecula
          initialPage={pages}
          total={numeroPagina}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default UserTable;
