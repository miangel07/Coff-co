import React from 'react';
import { Input } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ label, onchange, placeholder }) => {
    return (
        <div className="w-full h-[70px] px-4 py-2 rounded-xl flex justify-center items-center bg-gradient-to-tr from-blue-500 to-purple-600 shadow-md">
            <Input
                onChange={onchange}
                label={`${label}`}
                radius="lg"
                classNames={{
                    label: "text-gray-300 font-semibold dark:text-gray-100 mb-1", // Mejor contraste en el texto del label
                    input: [
                        "bg-white/10", // Fondo más sutil para que no sea tan opaco
                        "backdrop-blur-sm", // Menos difuminado para no distraer
                        "border border-transparent focus:border-white", // Bordes más sutiles con transición al enfocar
                        "transition-colors duration-300", // Transición suave de colores al enfocar
                        "text-black dark:text-white", // Texto visible en ambos modos
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400", // Placeholder con mejor contraste
                        "rounded-lg", // Bordes redondeados pero no demasiado
                        "px-3 py-1.5" // Padding reducido para una mejor integración
                    ],
                }}
                placeholder={`${placeholder}`}
                startContent={
                    <IoSearchOutline className="text-gray-600 dark:text-gray-300 text-lg" />
                }
                fullWidth
            />
        </div>
    );
}

export default Search;
