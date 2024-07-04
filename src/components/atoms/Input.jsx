import React from "react";

const Input = ({ type, placeholder, id, name, erros, register }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: true,
            message: `${name} es obligatorio`,
          },
        })}
        className="text-black w-full h-[36px] rounded-lg  outline outline-3 outline-none  pl-3
        border-solid border-2 "
      />

      {erros[name] && <p className="text-amber-700">{erros[name].message}</p>}
    </div>
  );
};

export default Input;
