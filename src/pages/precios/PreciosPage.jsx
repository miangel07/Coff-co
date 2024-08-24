import React, { useState } from 'react'
import PreciosPlantilla from '../../components/plantillas/precios/PreciosPlantilla'
import Navbar from '../../components/molecules/Navbar/Navbar'

const PreciosPage = () => {
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
        <PreciosPlantilla />
      </div>
    </div>
    </>

  )
}

export default PreciosPage
