import React from 'react'
import TableMolecula from '../../molecules/table/TableMolecula'
import Thead from '../../molecules/table/Thead'
import Tbody from '../../molecules/table/Tbody'
import Th from '../../atoms/Th'
import Td from '../../atoms/Td'
import { useGetDocumentosQuery } from '../../../store/api/documentos'

const TableDocumentos = () => {
    const { data, isLoading, isError, error } = useGetDocumentosQuery()
    console.log(data)
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    return (
        <div className='w-full justify-center flex items-center '>
            <TableMolecula>
                <Thead>
                    <Th>Id</Th>
                    <Th>Codigo</Th>

                    <Th>Nombre</Th>
                    <Th>Version</Th>
                    <Th>Fecha De Version</Th>
                    <Th>Fecha Emision</Th>
                    <Th>Estado</Th>
                    <Th>Tipo De Documento</Th>
                    <Th>acciones</Th>
                </Thead>
                <Tbody>

                    {data?.map((doc) => (
                        <tr key={doc.id_documentos}>
                            <Td>{doc.id_documentos}</Td>
                            <Td>{doc.codigo_documentos}</Td>
                            <Td>{doc.nombre}</Td>
                            <Td>{doc.versiones[0].version}</Td>
                            <Td>{doc.versiones[0].fechaVersion.split('T')[0]}</Td>
                            <Td>{doc.fecha_emision.split('T')[0]}</Td>
                            <Td>{doc.versiones[0].estado}</Td>
                            <Td>{doc.fk_idTipoDocumento}</Td>
                            <Td>
                                <button className='text-blue-500'>Editar</button>
                                <button className='text-red-500 ml-2'>Eliminar</button>
                            </Td>
                        </tr>
                    ))}

                </Tbody>

            </TableMolecula>
        </div>
    )
}

export default TableDocumentos
