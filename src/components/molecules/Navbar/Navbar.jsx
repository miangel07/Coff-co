import { CgMenu } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { GiTransparentTubes } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import React, { useState } from "react";
import { removeCookie } from "../../../utils/index.js";

import { FcConferenceCall } from "react-icons/fc";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcOpenedFolder } from "react-icons/fc";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const logout = () => {
    removeCookie("authToken");
  };

  const icons = [
    { icon: <GrHomeRounded />, label: "Inicio", link: "/home" },
    {
      icon: <IoMdNotificationsOutline />,
      label: "Notificaciones",
      link: "/home",
    },
    { icon: <FcConferenceCall />, label: "Administrar Usuarios", link: "/users" },
    {
      icon: <FcOpenedFolder />,
      label: "Documentos",
      link: "/home",
    },
    {
      icon: <GiTransparentTubes />,
      label: "Servicios",
      link: "/home",
    },
    { icon: <IoSettingsOutline />, label: "Configuraciones", link: "/home" },
    { icon: <MdHelpOutline />, label: "Ayuda", link: "/home" },

    {
      icon: <ImExit />,
      label: "Salir",
      link: "/",
      onClick: logout,
    },
  ];

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const openMenu = isOpenMenu ? (
    <>
      <div
        className={`${
          !isOpenMenu && "hidden"
        } bg-gray-200/50 min-h-screen w-full fixed top-0 left-0 right-0 z-20`}
        onClick={() => setIsOpenMenu(false)}
      ></div>
      <div
        className={`${
          isOpenMenu ? "w-80" : "w-0"
        } bg-slate-600 z-40 min-h-screen fixed top-0 left-0 flex transition-all duration-800 gap-2  `}
      >
        <div className={`${!isOpenMenu && "hidden"} pt-3`}>
          <button
            className="ml-4 mb-14 text-white "
            onClick={() => setIsOpenMenu(false)}
          >
            <MdClose className="size-7" />
          </button>

          {icons.map(({ icon, label, link, onClick }, index) => (
            <Link to={link} key={index}>
              <ul className="text-center flex  text-white text-lg hover:bg-slate-500 cursor-pointer py-3 mb-2">
                <div className="flex ml-5 gap-2 ">
                  <span onClick={onClick}>
                    {React.cloneElement(icon, { size: 25 })}
                  </span>
                  <p>{label}</p>
                </div>
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </>
  ) : (
    ""
  );

  return (
    <>
      <div className="bg-white flex-row py-3 flex  top-0 left-0 md:justify-between justify-around right-0 shadow-md">
        <div className=" xl:w-3/4 w-4/5  flex-row  justify-between xl:ml-7 lg:flex hidden">
          {icons.map(({ icon, label, link, onClick }, index) => (
            <Link to={link} key={index}>
              <ul className="text-center flex  text-lg hover:text-slate-300 cursor-pointer ">
                <div className="flex ml-5 gap-1 flex-wrap justify-center">
                  <span onClick={onClick}>
                    {React.cloneElement(icon, { size: 25 })}
                  </span>
                  <p className="font-calibri font-black line-clamp-1">
                    {label}
                  </p>
                </div>
              </ul>
            </Link>
          ))}
        </div>
        <div className="lg:hidden flex mr-7">
          <button className="ml-4  top-3" onClick={() => handleOpenMenu()}>
            <CgMenu className="size-7" />
          </button>
        </div>
        <p className="text-center mr-7 relative items-center font-sans text-2xl font-bold">
          Coffco
        </p>
      </div>
      {openMenu}
    </>
  );
};

export default Navbar;
