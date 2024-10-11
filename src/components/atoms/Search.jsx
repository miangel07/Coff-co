import React from 'react';
import { Input } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ label, onchange, placeholder }) => {
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <Input
                onChange={onchange}
                label={`${label}`}
                radius="lg"
                classNames={{
                    base: "max-w-full",
                    label: "text-blue-600 font-semibold mb-1",
                    inputWrapper: [
                        "bg-white",
                        "border-2 border-sena",
                        "hover:border-sena",
                        "focus:border-blue-600",
                        "transition-all duration-300 ease-in-out",
                        "shadow-md hover:shadow-lg",
                    ],
                    input: [
                        "text-gray-800",
                        "placeholder:text-gray-500",
                        "font-medium",
                    ],
                }}
                placeholder={`${placeholder}`}
                startContent={
                    <IoSearchOutline className="text-sena text-xl" />
                }
                fullWidth
            />
        </div>
    );
}

export default Search;