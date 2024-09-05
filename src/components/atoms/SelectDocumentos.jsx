import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
const selecDocumento = ({ data, label, onChange, items, ValueItem, value }) => {
  const [valueData, SetValueData] = useState("")



  useEffect(() => {
    const selectedKey = data?.find((item) =>
      item[ValueItem] === value
    );
    if (selectedKey) {
      SetValueData(selectedKey[items]);
      onChange({ target: { value: selectedKey[items] } });
    }
  }, [value, data, ValueItem, items, onChange]);
  





  return (
    <div className="w-full flex flex-col gap-4">
      <div key={"flat"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select
          variant={"flat"}
          label={label}
          selectedKeys={valueData}
          className="w-full"
          onChange={(e) => onChange(
            { target: { value: e.target.value } }

          )}
        >
          {data?.map((item) => (
            <SelectItem key={item[items]} value={String(item[items])}>
              {item[ValueItem]}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default selecDocumento;