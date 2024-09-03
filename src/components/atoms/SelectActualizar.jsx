import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectAtomoActualizar = ({ data, label, onChange, value, placeholder }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select
          isRequired
          label={label}
          placeholder={placeholder}
          // defaultSelectedKeys={value}
          value={value}
          className="w-full"
          variant="flat"
          onChange={onChange}
        >
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectAtomoActualizar;
