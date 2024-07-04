import React from "react";
import Socialicon from "../../atoms/Socialicon";

const Footer = () => {
  return (
    <div className="w-full md:h-32 h-24 bg-sena  flex">
      <Socialicon
        bgColor={"white"}
        fgColor={"rgb(57, 169, 0)"}
        url={"https://www.facebook.com/SENAHuila/reviews"}
      />
    </div>
  );
};

export default Footer;
