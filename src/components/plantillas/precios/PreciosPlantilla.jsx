import React, { useState } from 'react'
import Navbar from '../../molecules/Navbar/Navbar'
import Mybutton from '../../atoms/Mybutton'
import TableMolecula from '../../molecules/table/TableMolecula'
import Thead from '../../molecules/table/Thead'
import Th from '../../atoms/Th'
import Tbody from '../../molecules/table/Tbody'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { useActualizarPrecioMutation, useEliminarPrecioMutation, useGetPreciosQuery, useRegistrarPrecioMutation } from '../../../store/api/precios/preciosSlice'
import PaginationMolecula from '../../molecules/pagination/PaginationMolecula'
import { Spinner } from '@nextui-org/react'
import { toast } from 'react-toastify'
import Td from '../../atoms/Td';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ModalOrganismo from '../../organismo/Modal/ModalOrganismo'

const PreciosPlantilla = () => {

    const [paginaActual, setPaginaActual]=useState(1);
    const itemsPorPagina = 2;


    // const {data,isLoading,isError,error}
    const {data,isLoading,isError,error}=useGetPreciosQuery()
    const [eliminarPrecio] = useEliminarPrecioMutation()
    const [registrarPrecio] = useRegistrarPrecioMutation()
    const [actualizarPrecio] = useActualizarPrecioMutation()

    const [visible, setVisible] = useState(false)
    const [precioSeleccionado, setPrecioSeleccionado] = useState(null)
    const [datosDelFormulario, setDatosDelFormulario] = useState({
      presentacion:'',
      precio:'',
      fk_idTipoServicio:''
    })

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

    const abrirModal = (precio)=>{
      if(precio){
        setPrecioSeleccionado(precio)
        setDatosDelFormulario({
          presentacion:precio.presentacion,
          precio:precio.precio,
          fk_idTipoServicio:precio.fk_idTipoServicio
        })
      }else{
        setPrecioSeleccionado(null)
        setDatosDelFormulario({
          presentacion:'',
          precio:'',
          fk_idTipoServicio:''
        })
      }
      setVisible(true)
    }

    const cerrarModal =()=>setVisible(false)

    const handleSubmit=async(e)=>{
      e.preventDefault()
      try {
        const payload ={presentacion:datosDelFormulario.presentacion,precio:datosDelFormulario.precio,fk_idTipoServicio:datosDelFormulario.fk_idTipoServicio}

        if(precioSeleccionado){
          await actualizarPrecio({id:precioSeleccionado.idPrecio,...payload}).unwrap()
          toast.success('Precio actualizado con éxito')
        }else{
          await registrarPrecio(payload).unwrap()
          toast.success('Precio registrado con éxito')
        }
        cerrarModal()
      } catch (error) {
        console.error('Error al procesar la solicitud', error)
        toast.error('Error al procesar la solicitud')
      }
    }


    const indexOfLastItem = paginaActual * itemsPorPagina;
    const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
    <div className='w-full h-screen flex flex-col gap-8'>
        <div>
            {/* <Navbar/> */}
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
                            <Td>{precio.idPrecio}</Td>
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
    <div className='flex'>
      <ModalOrganismo
      visible={visible}
      closeModal={cerrarModal}
      title={precioSeleccionado?'Actualizar precio':'Nuevo precio'}
      onSubmit={handleSubmit}
      >
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2 gap-2'>
          <input 
          type="text" 
          value={datosDelFormulario.presentacion||''}
          onChange={(e)=>setDatosDelFormulario({...datosDelFormulario,presentacion:e.target.value})}
          placeholder='Presentacion'
          className='p-2 border border-gray-300 rounded'
          />

          <input 
          type="text" 
          value={datosDelFormulario.precio||''}
          onChange={(e)=>setDatosDelFormulario({...datosDelFormulario,precio:e.target.value})}
          placeholder='Precio'
          className='p-2 border border-gray-300 rounded'
          />

          <input 
          type="text" 
          value={datosDelFormulario.fk_idTipoServicio||''}
          onChange={(e)=>setDatosDelFormulario({...datosDelFormulario,fk_idTipoServicio:e.target.value})}
          placeholder=''
          className='p-2 border border-gray-300 rounded'
          />

          {precioSeleccionado && (
              <div className="mt-4">
                <label className="mr-2">Estado:</label>
                <input
                  className='cursor-pointer'
                  type="checkbox"
                  checked={datosDelFormulario.estado_precio === 'activo'}
                  onChange={(e) =>
                    setDatosDelFormulario({
                      ...datosDelFormulario,
                      estado_precio: e.target.checked ? 'activo' : 'inactivo',
                    })
                  }
                />
                <span className="ml-2">
                  {datosDelFormulario.estado_precio === 'activo' ? 'activo' : 'inactivo'}
                </span>
              </div>
            )}
        </div>
      </form>

      </ModalOrganismo>
    </div>
    </>
  )
}

export default PreciosPlantilla
