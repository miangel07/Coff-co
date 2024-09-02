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
const VariablesPlantilla = () => {
  const [showModal, setShowMdal] = useState(false)
  const { data: dataVariables, isLoading, isError, error } = useGetVariablesQuery()


  const handleModal = () => {
    setShowMdal(true);
  };
  const closemodal = () => {
    setShowMdal(false);
  }
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }


  return (
    <section className='w-full overflow-auto mt-5 gap-4 flex flex-wrap flex-col'>
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
      <div className='w-full px-20 h-auto overflow-y-auto '>
        <TableMolecula>
          <Thead>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Estado</Th>
            <Th>Tipo de Dato</Th>
            <Th>Acciones</Th>
          </Thead>
          <Tbody>
            {dataVariables?.map((variable) => (
              <tr key={variable.idVariable}>
                <Td>{variable.idVariable}</Td>
                <Td>{variable.nombre}</Td>
                <Td>{variable.estado ? 'Activo' : 'Inactivo'}</Td>
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
    </section>
  )
}

export default VariablesPlantilla