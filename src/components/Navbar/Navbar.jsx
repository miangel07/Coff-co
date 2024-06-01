import { CgMenu } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); 

    return (
        <>
            <div className="bg-white  py-3 fixed top-0 left-0 right-0 shadow-md ">
                <div className="flex  justify-center"><p className="text-center">Coffco</p></div>
                <button className="ml-4" onClick={() => setIsOpen(true)}>
                    <CgMenu className="size-7" />
                </button>
                <div className={`${!isOpen && 'hidden'} bg-gray-200/50 min-h-screen w-full fixed top-0 left-0 right-0 `}onClick={() => setIsOpen(false)}></div>
                <div className={`${isOpen ? "w-80" : "w-0"} bg-slate-700 min-h-screen fixed top-0 left-0 transition-all duration-300`}>
                    <div className={`${!isOpen && 'hidden'} pt-3`}>
                        <button className="ml-4 mb-14 text-white" onClick={() => setIsOpen(false)}>
                            <MdClose  className="size-7" />
                        </button>
                        <div className="text-center text-white text-lg hover:text-slate-300 cursor-pointer py-3 mb-2">link 1</div>
                        <div className="text-center text-white text-lg hover:text-slate-300 cursor-pointer py-3 mb-2">link 2</div>
                        <div className="text-center text-white text-lg hover:text-slate-300 cursor-pointer py-3 mb-2">link 3</div>
                        <div className="text-center text-white text-lg hover:text-slate-300 cursor-pointer py-3 mb-2">link 4</div>
                        <div className="text-center text-white text-lg hover:text-slate-300 cursor-pointer py-3 mb-2">link 5</div>
                        <div className="text-center text-white text-lg hover:text-slate-300 cursor-pointer py-3 mb-2">link 6</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;