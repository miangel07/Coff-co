import { Select, SelectItem } from "@nextui-org/react";

import { useEffect } from "react";

const selectDocumentos = ({ data, label, onChange, items, ValueItem, value }) => {
  // Verifica que value esté definido
  const trimmedValue = value ? String(value).trim() : "";

  // Encuentra el objeto en data donde el ValueItem coincide con el valor proporcionado
  const selectedItem = data.find(item => item[ValueItem]?.trim() === trimmedValue);




  useEffect(() => {
    // Cuando se renderiza el componente, verifica si el valor proporcionado coincide con el valor de selectedItem
    if (selectedItem && selectedItem[items] !== trimmedValue) {
      onChange({ target: { value: selectedItem[items] } });
    }


  }, [])

  // Obtén el id correspondiente al nombreDocumento
  const selectedKey = selectedItem ? selectedItem[items] : null;


  return (
    <div className="w-full flex flex-col gap-4">
      <div
        key={"flat"}
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
      >
        <Select
          variant={"flat"}
          label={label}
          value={selectedKey ? `${selectedKey}` : ""} // Establece el valor del Select
          defaultSelectedKeys={selectedKey ? [`${selectedKey}`] : []} // defaultSelectedKeys debe ser un array
          className="max-w-xs"
          onChange={onChange}
        >
          {data?.map((item, index) => (
            /* items es el valor que toma el select y el ValueItem es el que muestra ese select */
            <SelectItem key={item[items]}>
              {item[ValueItem]}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default selectDocumentos;