import React from 'react'
import Mybutton from '../../atoms/Mybutton'

const Cards = ({title, icon1,icon2,icon3}) => {
  return (
    <>
      <div className="h-full w-full bg-slate-50 rounded-badge pl-2 pt-4 shadow-dark-lg  hover:shadow-shadow-sena transform hover:scale-y-105 hover:scale-x-105  transition duration-300 ">
        <h1 className="text-3xl font-bold">{title}</h1>
        <span>Organiza y administra tus documentos</span>
        <div className="space-y-4 pt-2">
            {/* <IoDocumentAttachSharp className="ml-4 text-3xl" /> */}
            {icon1}
          {/* <HiDocumentMagnifyingGlass className="ml-4 text-3xl" /> */}
            {icon2}
          {/* <MdEditDocument className="ml-4 text-3xl" /> */}
          {icon3}
        </div>
        <div className="pl-4 pt-3 pb-2">
          <Mybutton>Empezar</Mybutton>
        </div>
      </div>
    </>
  );
}

export default Cards



