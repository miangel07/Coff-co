import React from 'react'
import Mybutton from '../../atoms/Mybutton'
import Filtro from '../../molecules/documentos/Filtro'
import BarraBusqueda from '../../molecules/documentos/BarraBusqueda'

const DocumentosOrganismo = () => {
    return (
        <section className='w-full  flex flex-row justify-around  items-center'>
            <div>
                <Mybutton color={"primary"} children={"Nuevo"} type={"submit"} />
            </div>
            <div>
                <BarraBusqueda />
            </div>
            <div>
                <Filtro />
            </div>
        </section>

    )
}

export default DocumentosOrganismo
