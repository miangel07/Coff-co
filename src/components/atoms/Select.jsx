import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useMemo } from "react";

const SelectAtomo = ({ data, label, onChange, items, ValueItem, value }) => {
 
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
      <div key={"flat"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select
          isRequired
          variant={"flat"}
          label={label}
          selectedKeys={selectedKey ? [selectedKey] : []}
          className="w-full"
          onChange={(e) => onChange({ target: { value: e.target.value } })}
        >
          {data?.map((item) => (
            <SelectItem key={String(item[items])} value={String(item[items])}>
              {item[ValueItem]}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectAtomo;