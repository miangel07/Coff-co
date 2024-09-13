import React from "react";
import { Tooltip } from "@nextui-org/react";

const ToolTip = ({ content = "I am a tooltip", placement = "right", icon: IconComponent }) => {
  return (
    <Tooltip 
      showArrow
      placement={placement}
      content={content}
      classNames={{
        base: [
          "before:bg-neutral-400 dark:before:bg-white",
        ],
        content: [
          "py-1 px-1 shadow-xl",
          "text-black bg-gradient-to-br from-white to-neutral-400",
        ],
      }}
    >
      <div className="flex items-center">
        {IconComponent && <IconComponent size={"35px"} />}
      </div>
    </Tooltip>
  );
};

export default ToolTip;
