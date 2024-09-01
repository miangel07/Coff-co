import { Select, SelectItem } from "@nextui-org/react";

const SelectAtomoActualizar = ({ data, label, onChange, items, ValueItem, value, placeholder }) => {
return (
    <div className="w-full flex flex-col gap-4">
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Select
        variant={"flat"}
        label={label}
        value={value || ""} 
        className="w-full"
        placeholder={placeholder}
        onChange={(value) => {
            console.log("Escogio:", value);
            onChange(value);
        }}
        aria-label={label}
        >
        {data.map(item => (
            <SelectItem
            key={item[items]} 
            value={item[items]}
            textValue={item[ValueItem]} 
            >
            {item[ValueItem]} 
            </SelectItem>
        ))}
        </Select>
    </div>
    </div>
);
};
  
export default SelectAtomoActualizar;
