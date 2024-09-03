import React, { useState } from 'react'
import { useGetVariablesQuery } from '../../../store/api/variables'
import TableMolecula from '../../molecules/table/TableMolecula'
import Tbody from '../../molecules/table/Tbody'
import Thead from '../../molecules/table/Thead'
import Th from '../../atoms/Th'
import Td from '../../atoms/Td'
import { MdDelete } from 'react-icons/md'
import ModalOrganismo from '../../organismo/Modal/ModalOrganismo'
import { FaRegEdit } from 'react-icons/fa'
import Mybutton from '../../atoms/Mybutton'
import { useForm } from 'react-hook-form'
import VariablesFormulario from '../../molecules/Formulario/VariablesFormulario'
import PaginationMolecula from '../../molecules/pagination/PaginationMolecula'
const VariablesPlantilla = () => {
  const [showModal, setShowMdal] = useState(false)
  const [pages, setPages] = useState(1);
  const { data: dataVariables, isLoading, isError, error } = useGetVariablesQuery()


  const handleModal = () => {
    setShowMdal(true);
  };

  const cantidad = 4;
const final = pages * cantidad;
const inicial = final - cantidad;
const handlePageChange = (page) => {
  setPages(page);
};

const numeroPagina = Math.ceil(dataVariables?.length / cantidad);
const DataArrayPaginacion = dataVariables?.slice(inicial, final);

  const closemodal = () => {
    setShowMdal(false);
  }
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }


  return (
    <section className='w-full  mt-5 gap-4 flex flex-wrap flex-col'>
      <h2 className='text-2xl px-20 font-bold'>Variables</h2>
      <div className='px-20 '>

        <Mybutton color={"primary"} onClick={handleModal}>Nuevo</Mybutton>


      </div>
      {
        showModal &&

        <ModalOrganismo title={"Registrar Nueva Variable"} visible={showModal} closeModal={closemodal}>

          <VariablesFormulario dataValue={""} closeModal={closemodal} />


        </ModalOrganismo>

      }
      <div className='w-full px-20 overflow-x-auto '>
        <TableMolecula>
          <Thead>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Estado</Th>
            <Th>Tipo de Dato</Th>
            <Th>Acciones</Th>
          </Thead>
          <Tbody>
            {DataArrayPaginacion?.map((variable) => (
              <tr key={variable.idVariable}>
                <Td>{variable.idVariable}</Td>
                <Td>{variable.nombre}</Td>
                <Td>{variable.estado}</Td>
                <Td>{variable.tipo_dato}</Td>

                <Td>
                  <div className=' gap-3 flex flex-graw'>

                    <FaRegEdit className="cursor-pointer" size={"30px"} />
                    <MdDelete className="cursor-pointer" size={"30px"} />

                  </div>

                </Td>


              </tr>
            ))}
          </Tbody>




        </TableMolecula>
      
      </div>
      <div className='flex justify-center mt-4'>
          <PaginationMolecula
            total={numeroPagina}
            initialPage={pages}
            onChange={handlePageChange}
          />
        </div>
    </section>
  )
}

export default VariablesPlantilla