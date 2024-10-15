import React from "react";
import { Input } from "@nextui-org/react";

const InputAtomoActualizar = ({ type, placeholder, id, name, errores, register, defaultValue, isRequired }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full h-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 font-sans">
        <Input
          size={"sm"}
          type={type}
          id={id}
          label={placeholder}
          name={name}
          {...register(name, {
            required: isRequired ? {
              value: true,
              message: `${name} es obligatorio`,
            } : false,
          })}
          defaultValue={defaultValue} 
        />
      </div>
      {errores[name] && <p className="text-amber-700">{errores[name].message}</p>}
    </div>
  );
};

export default InputAtomoActualizar;
