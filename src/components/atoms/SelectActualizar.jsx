import React, {useEffect, useMemo} from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectAtomoActualizar = ({ data, label, onChange, value, items, ValueItem, placeholder }) => {

  const trimmedValue = String(value || "").trim();

  const selectedItem = useMemo(() => {
    return data?.find(item => 
      String(item[items]).trim() === trimmedValue || 
      String(item[ValueItem]).trim() === trimmedValue
    );
  }, [data, items, ValueItem, trimmedValue]);

  useEffect(() => {
    if (selectedItem && String(selectedItem[items]).trim() !== trimmedValue) {
      onChange({ target: { value: selectedItem[items] } });
    }
  }, [selectedItem, trimmedValue, onChange, items]);

  const selectedKey = selectedItem ? String(selectedItem[items]) : "";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select
          isRequired
          label={label}
          placeholder={placeholder}
          defaultSelectedKeys={selectedKey ? [selectedKey] : []}
          // value={value}
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
