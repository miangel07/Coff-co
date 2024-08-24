import React from "react";
import { SocialIcon } from "react-social-icons";

const Socialicon = ({ url,bgColor,fgColor,iconSize  }) => {
  return (
    <div>
      <SocialIcon  bgColor={bgColor} fgColor={fgColor} url={url}  style={{ width: iconSize, height: iconSize }}/>
    </div>
  );
};

export default Socialicon;
