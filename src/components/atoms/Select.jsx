import { Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";

const SelectAtomo = ({ data, label, onChange, items, ValueItem, value }) => {
  const trimmedValue = value ? String(value).trim() : "";

  const selectedItem = data.find(item => String(item[items]).trim() === trimmedValue);

  useEffect(() => {
    if (selectedItem && String(selectedItem[items]).trim() !== trimmedValue) {
      onChange({ target: { value: selectedItem[items] } });
    }
  }, [selectedItem, trimmedValue, onChange]);

  const selectedKey = selectedItem ? String(selectedItem[items]) : "";

  return (
    <div className="w-full flex flex-col gap-4">
      <div key={"flat"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select
          variant={"flat"}
          label={label}
          value={selectedKey}
          defaultSelectedKeys={selectedKey ? [selectedKey] : []} 
          className="w-full"
          onChange={(e) => onChange({ target: { value: e.target.value } })}
        >
          {data?.map((item) => (
            <SelectItem 
              key={item[items]} 
              value={item[items]} 
              textValue={String(item[ValueItem])} 
            >
              {item[ValueItem]}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectAtomo;
