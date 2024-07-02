import React from "react";
import { Button } from "@nextui-org/react";

const Mybutton = ({ children, type, color }) => {
  return (
    <Button type={type} color={color}>
      {children}
    </Button>
  );
};

export default Mybutton;
