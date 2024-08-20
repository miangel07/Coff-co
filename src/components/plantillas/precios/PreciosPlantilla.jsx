import React, { useState } from 'react'
import Navbar from '../../molecules/Navbar/Navbar'
import Mybutton from '../../atoms/Mybutton'
import TableMolecula from '../../molecules/table/TableMolecula'
import Thead from '../../molecules/table/Thead'
import Th from '../../atoms/Th'
import Tbody from '../../molecules/table/Tbody'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { useEliminarPrecioMutation, useGetPreciosQuery } from '../../../store/api/precios/preciosSlice'
import PaginationMolecula from '../../molecules/pagination/PaginationMolecula'
import { Spinner } from '@nextui-org/react'
import { toast } from 'react-toastify'
import Td from '../../atoms/Td';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PreciosPlantilla = () => {

    const [paginaActual, setPaginaActual]=useState(1);
    const itemsPorPagina = 2;

    const{data,isLoading,isError,error}=useGetPreciosQuery()
    const[eliminarPrecio] = useEliminarPrecioMutation()

    const indexOfLastItem = paginaActual * itemsPorPagina;
    const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil((data?.length || 0) / itemsPorPagina);


    if (isLoading) {
        return (
          <Spinner className='flex justify-center items-center h-screen bg-gray-100'/>
        );
      }


      if (isError) {
        const errorMessage = error?.data?.message || 'Error desconocido';
    
        toast.error(`Error: ${errorMessage}`)
        return(
              <div className='flex justify-center items-center h-screen bg-gray-100'>
          <p><b>ha ocurrido un error... !</b></p>
        </div>
        )
      }

    const handleEliminarPrecio = (id, presentacion)=>{
        confirmAlert({
            title: (
              <div>
                <span><b>Confirmación de eliminación</b></span>
              </div>
            ),
            message: (
              <div>
                ¿Estás seguro de que quieres eliminar el precio 
                <span style={{ color: 'red', fontWeight: 'bold' }}> {presentacion}</span>?
              </div>
            ),
            buttons: [
              {
                label: 'Sí',
                onClick: async () => {
                  try {
                    await eliminarPrecio(id).unwrap();
                    toast.success('Precio eliminado con éxito');
                    
                  } catch (error) {
                    console.error('Error al eliminar el precio', error);
                    toast.error('Error al eliminar el precio');
                  }
                }
              },
              {
                label: 'No',
                onClick: () => toast.info('Eliminación cancelada')
              }
            ],
            closeOnClickOutside: true,
          });
    }


  return (
    <>
    <div className='w-full h-screen flex flex-col gap-8'>
        <div>
            <Navbar/>
        </div>
        <div className='pt-10 pl-20'>
            <Mybutton color={'primary'} onClick={()=>abrirModal(null)}>
                Nuevo
            </Mybutton>
        </div>
        <div className='w-full px-20'>
            <TableMolecula>
                <Thead>
                    <Th>ID</Th>
                    <Th>Estado</Th>
                    <Th>Presentacion</Th>
                    <Th>Precio</Th>
                    <Th>Tipo servicio</Th>
                </Thead>
                <Tbody>
                    {currentItems?.map((precio)=>(
                        <tr className='hover:bg-slate-200'key={precio.idPrecio}>
                            <Td>{precio.estado_precio}</Td>
                            <Td>{precio.presentacion}</Td>
                            <Td>{precio.precio}</Td>
                            <Td>{precio.fk_idTipoServicio}</Td>
                            <Td>
                                <div className='flex flex-row gap-6'>
                                    <MdDelete
                                    size={'35px'}
                                    onClick={()=> handleEliminarPrecio(precio.idPrecio,precio.presentacion)}
                                    className='cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300 '
                                    />
                                    <FaRegEdit
                                        size={'35px'}
                                        // onClick={()=>abrirModal(precio)}
                                        className='cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300 '
                                    />
                                </div>
                            </Td>
                        </tr>
                    ))}
                </Tbody>
            </TableMolecula>
        </div>
        <div className='flex justify-center mt-4'>
            <PaginationMolecula
            total={totalPages}
            initialPage={paginaActual}
            onChange={(pagina)=>setPaginaActual(pagina)}
            />
        </div>

    </div>
    </>
  )
}

export default PreciosPlantilla
