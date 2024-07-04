import React from "react";
import { SocialIcon } from "react-social-icons";

const Socialicon = ({ url,bgColor,fgColor }) => {
  return (
    <div>
      <SocialIcon  bgColor={bgColor} fgColor={fgColor} url={url} />
    </div>
  );
};

export default Socialicon;
