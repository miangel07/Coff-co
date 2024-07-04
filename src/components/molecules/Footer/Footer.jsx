import React from "react";
import Socialicon from "../../atoms/Socialicon";

const Footer = () => {
  return (
    <div className="w-full md:h-32 h-24 bg-sena  flex flex-col justify-center">
      <div className="flex flex-row gap-3">
        <Socialicon
          bgColor={"white"}
          fgColor={"rgb(57, 169, 0)"}
          url={"https://www.facebook.com/SENAHuila/reviews"}
          iconSize="35px"
        />
        <Socialicon
          bgColor={"white"}
          fgColor={"rgb(57, 169, 0)"}
          url={"https://www.facebook.com/SENAHuila/reviews"}
          iconSize="35px"
        />
        <Socialicon
          bgColor={"white"}
          fgColor={"rgb(57, 169, 0)"}
          url={"https://www.facebook.com/SENAHuila/reviews"}
          iconSize="35px"
        />
        <Socialicon
          bgColor={"white"}
          fgColor={"rgb(57, 169, 0)"}
          url={"https://www.facebook.com/SENAHuila/reviews"}
          iconSize="35px"
        />
        <Socialicon
          bgColor={"white"}
          fgColor={"rgb(57, 169, 0)"}
          url={"https://www.facebook.com/SENAHuila/reviews"}
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
  );
};

export default Footer;
