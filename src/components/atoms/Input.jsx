import React from "react";
import { Input } from "@nextui-org/react";

const InputAtomo = ({ type, placeholder, id, name, erros , register, icon }) => {
  return (
    <div className="w-full flex flex-col gap-4">

      <div className="flex w-full h-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 font-sans">
        <Input size={"sm"} type={type} id={id} label={placeholder} name={name} endContent={icon}
          {...register(name, {
            required: {
              value: true,
              message: `${name} es obligatorio`,
            },
          })} />
      </div>
      {erros[name] && <p className="text-red-500">{erros[name].message}</p>}
    </div>
  );
};

export default InputAtomo;

