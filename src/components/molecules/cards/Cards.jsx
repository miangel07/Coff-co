import React from 'react'
import Mybutton from '../../atoms/Mybutton'

const Cards = ({ title, span, icon1, span1, icon2,span2, icon3,span3 }) => {
  return (
    <>
      <div className="h-full w-full bg-slate-50 rounded-badge pl-2 pt-4 shadow-dark-lg cursor-pointer hover:shadow-shadow-sena transform hover:scale-y-105 hover:scale-x-105  transition duration-300 ">
        <h1 className="text-3xl font-bold font-sans">{title}</h1>
        <span className="font-calibri">{span}</span>
        <div className="space-y-4 pt-2">
          <div className="flex gap-2">
            {icon1}
            {span1}
          </div>
          <div className="flex gap-2">
            {icon2}
            {span2}
          </div>
          <div className="flex gap-2">
            {icon3}
            {span3}
          </div>
        </div>
        <div className="pl-4 pt-3 pb-2">
          <Mybutton>Empezar</Mybutton>
        </div>
      </div>
    </>
  );
};

export default Cards



