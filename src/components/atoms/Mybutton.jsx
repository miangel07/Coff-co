import React from "react";
import { Button } from "@nextui-org/react";

const Mybutton = ({ children, type, color }) => {
  const colors = color ? `bg-${color}` : "bg-black";
  return (
    <Button type={type} className={`${colors} text-white`}>
      {children}
    </Button>
  );
};

export default Mybutton;
