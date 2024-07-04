import React from 'react'

const Cards = ({title}) => {
  return (
    <>
      <div className="h-full w-full bg-slate-400 pl-2 pt-4 ">
        <h1 className="text-3xl font-bold">{title}</h1>
        <span>Organiza y administra tus documentos</span>
        
      </div>
    </>
  );
}

export default Cards



