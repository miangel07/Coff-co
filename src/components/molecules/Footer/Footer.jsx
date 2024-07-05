import React from "react";
import Socialicon from "../../atoms/Socialicon";

const Footer = () => {
  return (
    <div className="md:h-32 bg-sena w-full flex md:flex-row flex-col justify-around  items-center">
      <div className=" items-center md:items-start flex flex-col ">
        <div className="flex flex-row gap-3 ">
          <Socialicon
            bgColor={"white"}
            fgColor={"rgb(57, 169, 0)"}
            url={"https://www.facebook.com/SENAHuila/reviews"}
            iconSize="35px"
          />
          <Socialicon
            bgColor={"white"}
            fgColor={"rgb(57, 169, 0)"}
            url={"https://www.instagram.com/SENAHuila/reviews"}
            iconSize="35px"
          />
          <Socialicon
            bgColor={"white"}
            fgColor={"rgb(57, 169, 0)"}
            url={"https://www.linkedin.com/SENAHuila/reviews"}
            iconSize="35px"
          />
          <Socialicon
            bgColor={"white"}
            fgColor={"rgb(57, 169, 0)"}
            url={"https://www.x.com/SENAHuila/reviews"}
            iconSize="35px"
          />
          <Socialicon
            bgColor={"white"}
            fgColor={"rgb(57, 169, 0)"}
            url={"https://www.youtube.com/SENAHuila/reviews"}
            iconSize="35px"
          />
        </div>
        <div className="flex flex-row  items-end w-[223px] ">
          <h1 className="text-white font-calibri font-bold text-3xl tracking-widest">
            @SENAC
          </h1>
          <p className="text-white font-calibri font-bold text-2xl tracking-wider ">
            omunica
          </p>
        </div>
       
      </div>
      <div className="h-full justify-center items-center flex ">
          <p className="text-white font-calibri font-bold text-xl -tracking-tighter">www.sena.edu.co</p>
        </div> 
    </div>
  );
};

export default Footer;
