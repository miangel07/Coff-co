import { Select, SelectItem } from "@nextui-org/react";

const SelectAtomo = ({ data, label, onchage }) => {
  console.log(data);
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        key={"flat"}
        className="flex w-full  flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
      >
        <Select
          variant={"flat"}
          label={label}
          className="max-w-xs"
          onChange={onchage}
        >
          {data?.map((items) => (
            <SelectItem key={items.id} value={items.nombre}>
              {items.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectAtomo;
