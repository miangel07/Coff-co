import React, { useState } from 'react'
import MostrarServicios from '../../organismo/servicios/MostrarServiciosOrganismo'
import RegistrarServicio from '../../organismo/servicios/RegistrarServicioOrganismo'
import Mybutton from '../../atoms/Mybutton'
import Search from '../../atoms/Search'

const ServiciosPlantilla = () => {

  const [modalRegistroVisible,setModalRegistroVisible ] = useState(false)
  const [filtro, setFiltro] = useState("");

  const abrirModalRegistro =()=>{
    setModalRegistroVisible(true)
  }

  const cerrarModalRegistro=()=>{
    setModalRegistroVisible(false)
  }


  return (
    <>
     <div className="w-auto h-screen  flex flex-col gap-8 bg-gray-100">
     <div className="pt-10 pl-20 justify-center flex items-center">
          <div className="pt-10 pl-20">
            <Mybutton
              color={"primary"}
              onClick={() => abrirModalRegistro(null)}
            >
              <b>Nuevo Servicio</b>
            </Mybutton>
          </div>
            <Search
            label={'Filtro'}
            placeholder={'Filtro por muestra...'}
            onchange={(e)=> setFiltro(e.target.value)}
            />
        </div>
      <MostrarServicios filtro={filtro}/>
      <RegistrarServicio
      visible={modalRegistroVisible}
      closeModal={cerrarModalRegistro}
      />
      </div> 
    </>
  )
}

export default ServiciosPlantilla
