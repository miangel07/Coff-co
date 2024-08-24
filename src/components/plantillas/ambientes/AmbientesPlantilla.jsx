import React, { useState } from 'react';
import Mybutton from '../../atoms/Mybutton';
import TableMolecula from '../../molecules/table/TableMolecula';
import Thead from '../../molecules/table/Thead';
import Th from '../../atoms/Th';
import Tbody from '../../molecules/table/Tbody';
import Td from '../../atoms/Td';
import { FaRegEdit } from 'react-icons/fa';
import { 
  useActualizarAmbienteMutation, 
  useCrearAmbienteMutation, 
  useEliminarAmbienteMutation, 
  useGetAmbientesQuery } from '../../../store/api/ambientes/ambientesSlice';
import { MdDelete } from 'react-icons/md';
import ModalOrganismo from '../../organismo/Modal/ModalOrganismo';
import Navbar from '../../molecules/Navbar/Navbar';
import { Spinner } from '@nextui-org/react';
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PaginationMolecula from '../../molecules/pagination/PaginationMolecula';



const AmbientesPlantilla = () => {

  // Estado para la página actual y número de ítems por página__________________________________________________
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 2; // Número de ítems por página
 //_____________________________________________________________________________________________________________

  //Constantes para el manejo de métodos provenientes del slice de Redux._______________________________________
  const { data, isLoading, isError, error } = useGetAmbientesQuery();
  const [eliminarAmbiente] = useEliminarAmbienteMutation();
  const [crearAmbiente] = useCrearAmbienteMutation();
  const [actualizarAmbiente] = useActualizarAmbienteMutation();
  //____________________________________________________________________________________________________________

  //constantes para el manejo del modal, actualizacion y registro de ambientes__________________________________
  const [visible, setVisible] = useState(false);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState(null);
  const [DatosDelFormulario, setDatosDelFormulario] = useState({ nombre_ambiente:''});
  //____________________________________________________________________________________________________________

  const handleEliminarAmbiente = (id, nombre_ambiente) => {
    confirmAlert({
      title: (
        <div>
          <span><b>Confirmación de eliminación</b></span>
        </div>
      ),
      message: (
        <div>
          ¿Estás seguro de que quieres eliminar el ambiente 
          <span style={{ color: 'red', fontWeight: 'bold' }}> {nombre_ambiente}</span>?
        </div>
      ),
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              await eliminarAmbiente(id).unwrap();
              toast.success('Ambiente eliminado con éxito');
              
            } catch (error) {
              console.error('Error al eliminar el ambiente', error);
              toast.error('Error al eliminar el ambiente');
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
  };

  //_______________________________________________________________________________________

  // funcion que permite la apertura del modal y controla si hay un ambiente seleccionado
  //para actualizar o es un nuevo ambiente a registrar_______________________________________
  const abrirModal = (ambiente) => {
    if (ambiente) {
      setAmbienteSeleccionado(ambiente);
      setDatosDelFormulario({
        nombre_ambiente: ambiente.nombre_ambiente,
        estado: ambiente.estado
      });
    } else {
      setAmbienteSeleccionado(null);
      setDatosDelFormulario({
        nombre_ambiente: '',
        estado: 'inactivo'
      });
    }
    setVisible(true);
  };

  //__________________________________________________________________________________________

  //funcion que cierra el modal______________________________________________________________
  const cerrarModal = () => setVisible(false);
  //_________________________________________________________________________________________

  // funcion que permite agregar y actualizar un ambiente___________________________________
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { nombre_ambiente: DatosDelFormulario.nombre_ambiente, estado: DatosDelFormulario.estado };

      if (ambienteSeleccionado) {
        await actualizarAmbiente({ id: ambienteSeleccionado.idAmbiente, ...payload }).unwrap();
        toast.success('Ambiente actualizado con éxito');
      } else {
        await crearAmbiente(payload).unwrap();
        toast.success('Ambiente registrado con éxito');
      }
      cerrarModal();
    } catch (error) {
      console.error('Error al procesar la solicitud', error);
      alert('Error al procesar la solicitud');
    }
  };

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

  // Calcula los ítems a mostrar en la página actual
  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Calcula el número total de páginas
  const totalPages = Math.ceil((data?.length || 0) / itemsPorPagina);

  return (
    <>
      <div className='w-full h-screen flex flex-col gap-8'>
        <div className='pt-10 pl-20'>
          <Mybutton color={'primary'} onClick={() => abrirModal(null)}>
            Nuevo
          </Mybutton>
        </div>
        <div className='w-full px-20'>
          <TableMolecula>
            <Thead>
              <Th>ID</Th>
              <Th>Nombre ambiente</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Thead>
            <Tbody>
              {currentItems?.map((ambiente) => (
                <tr className='hover:bg-slate-200' key={ambiente.idAmbiente}>
                  <Td>{ambiente.idAmbiente}</Td>
                  <Td>{ambiente.nombre_ambiente}</Td>
                  <Td>{ambiente.estado}</Td>
                  <Td>
                    <div className='flex flex-row gap-6'>
                      <MdDelete
                        size={'35px'}
                        onClick={() => handleEliminarAmbiente(ambiente.idAmbiente,ambiente.nombre_ambiente)}
                        className='cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300 '
                      />
                      <FaRegEdit
                        size={"35px"}
                        onClick={() => abrirModal(ambiente)}
                        className='cursor-pointer transform hover:scale-y-110 hover:scale-x-110 transition duration-300 '
                      />
                    </div>
                  </Td>
                </tr>
              ))
            }
            </Tbody>
          </TableMolecula>
        </div>

        {/* Paginación */}
        <div className='flex justify-center mt-4'>
          <PaginationMolecula
            total={totalPages}
            initialPage={paginaActual}
            onChange={(pagina) => setPaginaActual(pagina)}
          />
        </div>
      </div>

      <div className='flex '> 
      <ModalOrganismo
        visible={visible}
        closeModal={cerrarModal}
        title={ambienteSeleccionado ? 'Actualizar ambiente' : 'Nuevo ambiente'}
        onSubmit={handleSubmit}
        >
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={DatosDelFormulario.nombre_ambiente || ''}
              onChange={(e) => setDatosDelFormulario({ ...DatosDelFormulario, nombre_ambiente: e.target.value })}
              placeholder='Nombre del ambiente'
              className="p-2 border border-gray-300 rounded"
            />
            
            {ambienteSeleccionado && (
              <div className="mt-4">
                <label className="mr-2">Estado:</label>
                <input
                  className='cursor-pointer'
                  type="checkbox"
                  checked={DatosDelFormulario.estado === 'activo'}
                  onChange={(e) =>
                    setDatosDelFormulario({
                      ...DatosDelFormulario,
                      estado: e.target.checked ? 'activo' : 'inactivo',
                    })
                  }
                />
                <span className="ml-2">
                  {DatosDelFormulario.estado === 'activo' ? 'activo' : 'inactivo'}
                </span>
              </div>
            )}
          </div>
          <div className='pt-10 pl-20'>
                <Mybutton color={'primary'} type="submit">
                  Registrar
                </Mybutton>
              </div>
        </form>
      </ModalOrganismo>
      </div>
    </>
  );
}

export default AmbientesPlantilla;
