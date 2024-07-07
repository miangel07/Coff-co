import React from "react";
import { Spinner } from "@nextui-org/react";
import { useGetusersQuery } from "../../../store/api/users";
import { MdDeleteOutline } from "react-icons/md";

import { FiEdit } from "react-icons/fi";
import Th from "../../atoms/Th";
import Td from "../../atoms/Td";

const UserTable = () => {
  const { data, isLoading, isError, error } = useGetusersQuery();
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="text-red-400">{error.message}</p>;
  }
  const Editar = (id) => {
    alert(`Editando usuario con ID:${id}`);
  };

  return (
    <div className="overflow-y-hidden">
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
        <tbody>
          {data.map((usuario) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
