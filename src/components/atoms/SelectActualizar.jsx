import React, {useEffect, useMemo} from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectAtomoActualizar = ({ data, label, onChange, value, items, ValueItem, placeholder }) => {

  // Esto toma el valor que llega de value y trim quita cualquier espacio que encuente en el al principio y al final
  const valorLimpio = String(value || "").trim();

  //Aqui el toma el valor que llega y lo compara con las opciones que hay dentro del array
  const selectedItem = useMemo(() => {
    return data?.find(item => 
      String(item[items]).trim() === valorLimpio || 
      String(item[ValueItem]).trim() === valorLimpio
    );
  }, [data, items, ValueItem, valorLimpio]);

  useEffect(() => {
    if (selectedItem && String(selectedItem[items]).trim() !== valorLimpio) {
      onChange({ target: { value: selectedItem[items] } });
    }
  }, [selectedItem, valorLimpio, onChange, items]);

  const valorSeleccionado = selectedItem ? String(selectedItem[items]) : "";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select isRequired
          label={label}
          placeholder={placeholder}
          defaultSelectedKeys={valorSeleccionado ? [valorSeleccionado] : []}
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
