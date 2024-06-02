import { CgMenu } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidArchiveIn } from "react-icons/bi";
import { PiPasswordFill } from "react-icons/pi";
import { IoMdHelpCircle } from "react-icons/io";
import { GiTransparentTubes } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { removeCookie } from "../../utils/index.js";

const Navbar = () => {
   
  const icons = [
    { icon: <IoHomeSharp />, label: "inicio", link: "/home" },
    {
      icon: <BiSolidArchiveIn />,
      label: "solicitud de aprobacion",
      link: "/home",
    },
    { icon: <FaUsers />, label: "administrar usuarios", link: "/home" },
    { icon: <PiPasswordFill />, label: "cambiar contraseña", link: "/home" },
    { icon: <IoMdHelpCircle />, label: "ayuda", link: "/home" },
    {
      icon: <GiTransparentTubes />,
      label: "alquiler de laboratorio",
      link: "/home",
    },
    { icon: <ImExit />, label: "salir", link: "/home" ,onClick: ()=>logout() },
  ];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logout = () => {
    removeCookie("authToken");
    removeCookie("user");
    setIsAuthenticated(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white  py-3 fixed top-0 left-0 right-0 shadow-md">
        <p className="text-center relative items-center">Coffco</p>
        <button className="ml-4 absolute top-3" onClick={() => setIsOpen(true)}>
          <CgMenu className="size-7" />
        </button>
        <div
          className={`${
            !isOpen && "hidden"
          } bg-gray-200/50 min-h-screen w-full fixed top-0 left-0 right-0 `}
          onClick={() => setIsOpen(false)}
        ></div>
        <div
          className={`${
            isOpen ? "w-80" : "w-0"
          } bg-slate-700 min-h-screen fixed top-0 left-0  flex transition-all duration-300`}
        >
          <div className={`${!isOpen && "hidden"} pt-3`}>
            <button
              className="ml-4 mb-14 text-white"
              onClick={() => setIsOpen(false)}
            >
              <MdClose className="size-7" />
            </button>
         
          {icons.map(({ icon, label, link }, index) => (
              <Link to={link} key={index}>
                <ul
                  className="text-center flex text-white text-lg hover:text-slate-300 cursor-pointer py-3 mb-2"
                >
                  <div className="flex ml-5 gap-2 ">
                    {React.cloneElement(icon, { size: 25 })}
                    <p>{label}</p>
                  </div>
                </ul>
              </Link>
            ))}

       
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
