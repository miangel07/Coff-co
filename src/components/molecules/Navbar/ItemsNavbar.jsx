import React, { useState } from "react";
import Icons from "../../atoms/Icons";
import { Link } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { GoFileDirectoryFill, GoHomeFill } from "react-icons/go";
import { GiCoffeeBeans } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { BsHousesFill, BsFillFileBarGraphFill } from "react-icons/bs";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5"; 

const ItemsNavbar = ({ visiblite }) => {
  const [itemsUser, setItemsUser] = useState(-1);
  const [subItems, setSubitems] = useState(-1);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const handleClick = (index) => {
    setItemsUser(index);
    if (index === 9 && items[index].label === "Configuraciones") {
      setSubMenuVisible(!subMenuVisible);
    } else {
      setSubMenuVisible(false);
    }
  };

  const handleClickSubimitem = (subIndex) => {
    setSubitems(subIndex);
  };

  const items = [
    {
      label: `${visiblite ? "Home" : ""}`,
      icon: <GoHomeFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/home",
    },
    {
      label: `${visiblite ? "Servicios" : ""}`,
      icon: <GiCoffeeBeans className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/servicios",
    },
    {
      label: `${visiblite ? "Documentos" : ""}`,
      icon: <GoFileDirectoryFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/documentos",
    },
    {
      label: `${visiblite ? "Precios" : ""}`,
      icon: <AiFillDollarCircle className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/precios",
    },
    {
      label: `${visiblite ? "Ambientes" : ""}`,
      icon: <BsHousesFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/ambientes",
    },
    {
      label: `${visiblite ? "Tipo de Documentos" : ""}`,
      icon: <IoDocumentText className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
    {
      label: `${visiblite ? "Tipo de Servicios" : ""}`,
      icon: <Icons img={"/maquina-de-cafe.png"} className="w-5 h-5 xl:size-7 "/>,
    },
    {
      label: `${visiblite ? "Muestras" : ""}`,
      icon: <BiSolidCoffeeBean className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
    {
      label: `${visiblite ? "Variables" : ""}`,
      icon: <Icons img={"/variable.png"} className="w-5 h-5 xl:size-7 " />,
    },
    {
      label: `${visiblite ? "Configuraciones" : ""}`,
      icon: <IoIosSettings className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      items: visiblite
        ? [
            {
              label: `${visiblite ? "Usuarios" : ""}`,
              icon: "pi pi-users",
              link: "/users",
            },
            {
              label: `${visiblite ? "Ayuda" : ""}`,
              icon: "pi-question-circle",
            },
            {
              label: `${visiblite ? "Logos" : ""}`,
              icon: "pi pi-image",
            },
          ]
        : [],
    },
    {
      label: `${visiblite ? "Alquiler Del Laboratorio" : ""}`,
      icon: <FaCalendarAlt className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/alquiler",
    },
    {
      label: `${visiblite ? "Reportes" : ""}`,
      icon: <BsFillFileBarGraphFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
    {
      label: `${visiblite ? "Facturas" : ""}`,
      icon: <TbReportMoney className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
    {
      label: `${visiblite ? "Salir" : ""}`,
      icon: <ImExit className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
  ];

  return (
    <div className="flex justify-content-center">
      <ul className="w-full">
        {items.map((item, index) => (
          <div key={index}>
            <li
              className={`flex items-center p-2 rounded-lg ${
                location.pathname === item.link ? "bg-light-gray" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <Link
                to={item.link}
                className="flex items-center space-x-2 w-full cursor-pointer"
              >
                <div className="cursor-pointer">{item.icon}</div>
                <span className="cursor-pointer line-clamp-1">
                  {item.label}
                </span>
              </Link>
            </li>
            {itemsUser === 9 && subMenuVisible && (
              <ul className="pl-4">
                {item.items?.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`flex items-center p-3 mt-1 rounded-lg ${
                      subItems === subIndex ? "bg-light-gray" : ""
                    }`}
                    onClick={() => handleClickSubimitem(subIndex)}
                  >
                    <Link
                      to={subItem.link}
                      className="flex items-center space-x-2 w-full cursor-pointer"
                    >
                      <div className="cursor-pointer">
                        <i className={subItem.icon}></i>
                      </div>
                      <span className="cursor-pointer line-clamp-1">
                        {subItem.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ItemsNavbar;
