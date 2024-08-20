import React from 'react'
import { Input } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";



const Search = ({ label, onchange, placeholder }) => {
    return (
        <div className="w-full h-[110px]  px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr  text-white ">
            <Input
                onChange={onchange}
                label={`${label}`}

                radius="lg"
                classNames={{
                    label: "text-black/50 dark:text-white/100",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],

                }}
                placeholder={`${placeholder}`}
                startContent={
                    <IoSearchOutline className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />
        </div>
    );
}

export default Search
