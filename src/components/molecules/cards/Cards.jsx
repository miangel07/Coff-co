import React from "react";
import Mybutton from "../../atoms/Mybutton";

const Cards = ({ title, span, icons }) => {
  return (
    <>
      <div className="h-full w-full bg-slate-50 rounded-badge pl-2 pt-4 shadow-dark-lg cursor-pointer  transform hover:scale-y-105 hover:scale-x-105 transition duration-300 ">
        <h1 className="text-2xl font-bold font-sans">{title}</h1>
        <span className="font-calibri text-[23px]">{span}</span>
        <div className="space-y-4 pt-2 flex justify-between flex-col ">
          {icons.map((icon, index) => (
            <div key={index} className="flex gap-2">
              <div className="ml-4 text-3xl ">{icon.icon}</div>
              <div className="text-[17px]  justify-center items-center">
                {icon.description}
              </div>
            </div>
          ))}
          <div className="pl-4  pb-2">
            <Mybutton>Empezar</Mybutton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
