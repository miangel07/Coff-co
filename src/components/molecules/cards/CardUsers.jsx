import React from "react";

const CardUsers = ({ title, icons, number }) => {
  return (
    <div className="rounded-lg shadow-md w-fit ">
      <div className="w-[383px] border-solid border-1 border-slate-200 justify-around items-center flex flex-col  h-[208px] ">
        <div className="w-full flex flex-col  items-center  ">
          <h1 className="font-sans font-semibold text-2xl">{title}</h1>
          <span className="text-[25px]">{icons}</span>
        </div>
        <p className="font-calibri text-4xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default CardUsers;
