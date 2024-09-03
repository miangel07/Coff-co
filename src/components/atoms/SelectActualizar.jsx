import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectAtomoActualizar = ({ data, label, onChange, items, ValueItem, value, placeholder,}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select
          variant="flat"
          label={label}
          placeholder={placeholder}
          value={"cc"} 
          className="w-full"
          onChange={onChange} 
        >
          {data.map((item) => (
            <SelectItem key={item[items]} value={item[items]}>
              {item[ValueItem]}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectAtomoActualizar;
