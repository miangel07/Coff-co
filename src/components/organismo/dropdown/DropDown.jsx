import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const DropDown = ({ nombreBoton, items }) => {
  return (
    <Dropdown className="flex w-full">
      <DropdownTrigger>
        <Button variant="bordered">
          {nombreBoton}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        {items.map((item, index) => (
          <DropdownItem
            key={item.key || index}
            color={item.color || "default"}
            className={item.className || ""}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;


