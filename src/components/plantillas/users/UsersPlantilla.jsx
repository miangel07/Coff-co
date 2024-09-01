import React, { useState } from "react";
import Mybutton from "../../atoms/Mybutton";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import { useActualizarUsuarioMutation, useEliminarUsuarioMutation, useGetUsuarioQuery, useRegistrarUsuarioMutation } from "../../../store/api/users";
import { Spinner } from "@nextui-org/react";
import PaginationMolecula from "../../molecules/pagination/PaginationMolecula";
import Td from "../../atoms/Td";

const UsersPlantilla = () => {

  //paginacion
  const [paginaActual,setPaginaActual]= useState(1)
  const itemsPorPagina = 4

  const {data,isLoading, refetch} = useGetUsuarioQuery()
  const [registrarUsuario]= useRegistrarUsuarioMutation()
  const [actualizarUsuario]= useActualizarUsuarioMutation()
  const [ekiminarUsuario]= useEliminarUsuarioMutation()

  if(isLoading){
    return(
      <Spinner className="flex justify-center items-center h-screen bg-gray-100" />
    )
  }


  const indiceUltimoItem = paginaActual * itemsPorPagina
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina
  const elementosActuales = data ? data.slice(indicePrimerItem,indiceUltimoItem):[]
  const totalPages = Math.ceil((data?.length||0)/itemsPorPagina)


  return (
    <>
      <div className="w-auto h-screen flex flex-col gap-8 bg-gray-100">
        <div className="pt-10 pl-20">
          <Mybutton color={"primary"}>Nuevo usuario</Mybutton>
        </div>
        <div className="w-full px-20 h-auto overflow-y-auto">
          <TableMolecula lassName="w-full">
            <Thead>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Correo electronico</Th>
              <Th>Telefono</Th>
              <Th>Numero Documento</Th>
              <Th>Tipo de documento</Th>
              <Th>Estado</Th>
              <Th>Rol</Th>
            </Thead>
            <Tbody>
              {elementosActuales.length>0?(
                elementosActuales.map((usuario)=>(
                  <tr className="'hover:bg-slate-200" key={usuario.id_usuario}>
                    <Td>{usuario.id_usuario}</Td>
                    <Td>{usuario.nombre}</Td>
                    <Td>{usuario.apellidos}</Td>
                    <Td>{usuario.correo_electronico}</Td>
                    <Td>{usuario.telefono}</Td>
                    <Td>{usuario.numero_documento}</Td>
                    <Td>{usuario.tipo_documento}</Td>
                    <Td>{usuario.estado}</Td>
                    <Td>{usuario.fk_idRol}</Td>
                  </tr>
                ))
              ):(
                <tr>
                <td colSpan={9} className="text-center">
                  <h1 className="text-2xl">
                    <b>No hay datos</b>
                  </h1>
                </td>
              </tr>
              )
              }

            </Tbody>
          </TableMolecula>
        </div>
        <div className="flex justify-center mt-4">
            <PaginationMolecula
            total={totalPages}
            initialPage={paginaActual}
            onChange={(pagina)=>setPaginaActual(pagina)}
            />
          </div>
      </div>
    </>
  );
};

export default UsersPlantilla;
