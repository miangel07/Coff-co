import React from "react";
import { Button } from "@nextui-org/react";

const Mybutton = ({ children, type, color }) => {
  return (
    <Button type={type}  className="bg-black  text-white">
      {children}
    </Button>
  );
};

export default Mybutton;
