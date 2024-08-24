import React, { useState } from 'react'
import AmbientesPlantilla from '../../components/plantillas/ambientes/AmbientesPlantilla'
import Navbar from '../../components/molecules/Navbar/Navbar'

const AmbientesPage = () => {

  const [menuAbierto, setMenuAbierto] = useState(false)

  const toggleMenu = ()=>{
    setMenuAbierto(!menuAbierto)
  }


  return (
    <>
    <div className="flex">
      <Navbar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
      <div
        className={`transition-all duration-300 ease-in-out ${menuAbierto ? "ml-64" : "ml-16"
          } w-full`}
      >
        <AmbientesPlantilla />
      </div>
    </div>
    </>

  )
}

export default AmbientesPage
