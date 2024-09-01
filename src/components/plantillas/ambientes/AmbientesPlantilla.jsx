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
import { Spinner, Switch } from '@nextui-org/react';
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PaginationMolecula from '../../molecules/pagination/PaginationMolecula';

const AmbientesPlantilla = () => {
//estados que manejan la paginacion de la tabla_____________________________________________________________________________________________
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;
  //________________________________________________________________________________________________________________________________________

  //estados que manejan los slices que permiten el crud de ambientes________________________________________________________________________
  const { data, isLoading, refetch } = useGetAmbientesQuery();
  const [crearAmbiente] = useCrearAmbienteMutation();
  const [actualizarAmbiente] = useActualizarAmbienteMutation();
  const [eliminarAmbiente] = useEliminarAmbienteMutation();
  //_________________________________________________________________________________________________________________________________________

  //estado que maneja la apertura del modal__________________________________________________________________________________________________
  const [visible, setVisible] = useState(false);
  //_________________________________________________________________________________________________________________________________________

  //estado que maneja el ambiente seleccionado para pasar la info rquerida en algunas operaciones del crud___________________________________
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState(null);
  //_________________________________________________________________________________________________________________________________________

  //estado que maneja la informacion del formularo para el registro y actualizacion de registros_____________________________________________
  const [DatosDelFormulario, setDatosDelFormulario] = useState({ nombre_ambiente: '', estado: 'inactivo' });
  //_________________________________________________________________________________________________________________________________________

  //manejo del estado cargado__________________________________________________________
  if(isLoading){
    return (
      <Spinner className='flex justify-center items-center h-screen bg-gray-100' />
    );
  }
  //_______________________________________________________________________________________

  //funcion que controla la apertura del modal, se le pasa el ambiente el cual si es para actualizar trae la
  //info necesaria para realizar el proceso______________________________________________________________________________________________ 
  const abrirModal = (ambiente) => {
    console.log(ambiente)
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
        estado: 'activo'
      });
    }
    setVisible(true);
  };
  //funcion que cierra el modal__________________________________________________________________________________________________________________
  const cerrarModal = () => setVisible(false);
  //____________________________________________________________________________________________________________________________________________

  //funcion que maneja el ingreso de datos proveniente del formulario a la base de datos aqui se hace la actualizacion y el registro de nuevos datos_____
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //verifica que no hayan campos vacios______________________________
      if (!DatosDelFormulario.nombre_ambiente.trim()) {
        toast.error('Por favor completa todos los campos');
        return;
      }
      //_________________________________________________________________

      //crea un objeto de carga que contiene los datos a insertar__________________________________
      const payload = { 
        nombre_ambiente: DatosDelFormulario.nombre_ambiente, 
        estado: 'activo'
      };
      //___________________________________________________________________________________________

      //condicion que verifica si hay un ambiente seleccionado para actualizar_____________________
      if (ambienteSeleccionado) {
        await actualizarAmbiente({ id: ambienteSeleccionado.idAmbiente, ...payload }).unwrap();
        toast.success('Ambiente actualizado con éxito');

      //___________________________________________________________________________________________

      //si no hay ambiente entonces registra uno nuevo_____________________________________________
      } else {
        await crearAmbiente(payload).unwrap();
        toast.success('Ambiente registrado con éxito');
      }
      //___________________________________________________________________________________________

      cerrarModal();

      //refresca el componente para visualizar los nuevos cambios de inmediato____________________________
      refetch();
      //__________________________________________________________________________________________________
    } catch (error) {
      console.error('Error al procesar la solicitud', error);
      toast.error('Error al procesar la solicitud');
    }
  };


  //maneja los cambios de estado desde el switch_________________________________________________________________________________________________
  const handleSwitchChange = (checked, id) => {
    //aqui se comprueba si checked es true o false y se le da el nuevo estado para insertar________________________________________
    const nuevoEstado = checked ? 'activo' : 'inactivo';
    //________________________________________________________________________________________________________________________________

    //comprueba si hay un ambiente seleccionado_____________________________________________________________________________________
    const ambienteActual = data.find(ambiente => ambiente.idAmbiente === id);
    // hace la condicion si no exite ambiente muestra el mensaje_____________________________________________________________________
    if (!ambienteActual) {
      toast.error('Ambiente no encontrado');
      return;
    }
    //________________________________________________________________________________________________________________________________

    //obejeto con los datos a cargar se le pasa el id el nombre y el estado el cual proviene del switch________________________________
    const payload = { 
      id:id,
      nombre_ambiente: ambienteActual.nombre_ambiente,
      estado:nuevoEstado  
    };
    //___________________________________________________________________________________________________________________________________

    //se utiliza el slice de actualizar se le pasa el payyload________________________________________________________________________
    actualizarAmbiente(payload).unwrap()
      .then(() => {
        toast.success('Estado del ambiente actualizado con éxito');
        refetch(); 
      })
      .catch(error => {
        console.error('Error al actualizar el estado del ambiente', error);
        toast.error('Error al actualizar el estado del ambiente');
      });
  };
  

  //funsion para eliminar ambientes se le pasa el ID del registro a eliminar y el nombre que se utilizara en el mensaje de confirmacion___________________
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
              refetch();
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
//configuracion para la paginacion_____________________________________________________________________________________________

  //Determina el índice del último ítem que se mostrará en la página actual__Multiplica el número de la página actual (paginaActual) por el número de ítems por página (itemsPorPagina).
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  //Determina el índice del primer ítem que se mostrará en la página actual.__Resta el número de ítems por página (itemsPorPagina) al índice del último ítem (indiceUltimoItem).
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  //Obtiene una porción de los ítems de datos que se deben mostrar en la página actual.__sa el método slice() para extraer una sublista del array data desde el indicePrimerItem hasta el indiceUltimoItem.
  const currentItems = data ? data.slice(indicePrimerItem, indiceUltimoItem) : [];
  //Calcula el número total de páginas necesarias para mostrar todos los ítems.__Divide el número total de ítems (data.length o 0 si data es null o undefined) por el número de ítems por página (itemsPorPagina) y usa Math.ceil() para redondear hacia arriba. Esto asegura que si hay ítems adicionales que no llenan una página completa, se contará una página adicional para ellos.
  const totalPages = Math.ceil((data?.length || 0) / itemsPorPagina);
  //____________________________________________________________________________________________________________________________

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
              {currentItems.length > 0  ? (
              currentItems.map((ambiente) => (
                <tr className='hover:bg-slate-200' key={ambiente.idAmbiente}>
                  <Td>{ambiente.idAmbiente}</Td>
                  <Td>{ambiente.nombre_ambiente}</Td>
                  <Td>
                    <Switch
                      isSelected={ambiente.estado === 'activo'}
                      onValueChange={(checked) => handleSwitchChange(checked, ambiente.idAmbiente)}
                    >
                      {ambiente.estado}
                    </Switch>
                    </Td>
                  <Td>
                    <div className='flex flex-row gap-6'>
                      <MdDelete
                        size={'35px'}
                        onClick={() => handleEliminarAmbiente(ambiente.idAmbiente, ambiente.nombre_ambiente)}
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
            ) : (
              <tr>
                <td colSpan={4} className='text-center'>
                  <h1 className='text-2xl'><b>No hay datos</b></h1>
                </td>
              </tr>
            )}
            </Tbody>
          </TableMolecula>
        </div>

        <div className='flex justify-center mt-4'>
          <PaginationMolecula
            total={totalPages}
            initialPage={paginaActual}
            onChange={(pagina) => setPaginaActual(pagina)}
          />
        </div>
      </div>

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
          </div>
          <div className="flex justify-end mt-4">
            <Mybutton type="submit" color="primary">
              {ambienteSeleccionado ? 'Actualizar' : 'Registrar'}
            </Mybutton>
          </div>
        </form>
      </ModalOrganismo>
    </>
  );
};

export default AmbientesPlantilla;
