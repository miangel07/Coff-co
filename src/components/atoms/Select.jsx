import { Select, SelectItem } from "@nextui-org/react";
const SelectAtomo = ({ data, label, onChange, items, ValueItem }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        key={"flat"}
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
      >
        <Select
          variant={"flat"}
          label={label}
          className="max-w-xs"
          onChange={onChange}
        >
          {data?.map((item, index) => (
            /* items es el valor que toma el select y el ValueItem es el que muestra ese select*/
            <SelectItem key={item[items]} >
              {item[ValueItem]}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectAtomo;

