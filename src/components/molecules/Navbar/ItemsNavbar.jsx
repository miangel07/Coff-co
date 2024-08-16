import React, { useState } from "react";
import Icons from "../../atoms/Icons";
import { Link } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { GoFileDirectoryFill } from "react-icons/go";
import { GiCoffeeBeans } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { BsHousesFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { IoDocument } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import { BiSolidCoffeeBean } from "react-icons/bi";
const ItemsNavbar = ({ visiblite }) => {
  const [itemsUser, setItemsUser] = useState(-1);
  const [subItems, setSubitems] = useState(-1);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const handleClick = (index) => {
    setItemsUser(index);
    console.log(index);
    if (index == 9 && items[index].label === "Configuraciones") {
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
      label: `${!visiblite ? "Home" : ""}`,
      icon: <GoHomeFill size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Servicios" : ""}`,
      icon: <GiCoffeeBeans size={"28px"} />,
      link: "/servicios",
    },
    {
      label: `${!visiblite ? "Documentos" : ""}`,
      icon: <GoFileDirectoryFill size={"28px"} />,
      link: "/documentos",
    },
    {
      label: `${!visiblite ? "Precios" : ""}`,
      icon: <AiFillDollarCircle size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Ambientes" : ""}`,
      icon: <BsHousesFill size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Tipo de Documentos" : ""}`,
      icon: <IoDocument size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Tipo de Servicios" : ""}`,
      icon: <Icons img={"/maquina-de-cafe.png"} />,
    },
    {
      label: `${!visiblite ? "Muestras" : ""}`,
      icon: <BiSolidCoffeeBean size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Variables" : ""}`,
      icon: <Icons img={"/variable.png"} />,
    },
    {
      label: `${!visiblite ? "Configuraciones" : ""}`,
      icon: <IoIosSettings size={"28px"} />,
      items: !visiblite
        ? [
          {
            label: `${!visiblite ? "Usuarios" : ""}`,
            icon: "pi pi-users",
          },
          {
            label: `${!visiblite ? "Ayuda" : ""}`,
            icon: "pi-question-circle",
          },
          {
            label: `${!visiblite ? "Logos" : ""}`,
            icon: "pi pi-image",
          },
        ]
        : [],
    },
    {
      label: `${!visiblite ? "Alquiler Del Laboratorio" : ""}`,
      icon: <FaCalendarAlt size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Reportes" : ""}`,
      icon: <BsFillFileBarGraphFill size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Facturas" : ""}`,
      icon: <TbReportMoney size={"28px"} />,
    },
    {
      label: `${!visiblite ? "Salir" : ""}`,
      icon: <ImExit size={"28px"} />,
    },
  ];

  return (
    <div className="flex justify-content-center">
      <ul className="w-full">
        {items.map((item, index) => (
          <div key={index}>
            <Link to={item.link}>
              <li
                className={`flex items-center p-2 rounded-lg ${itemsUser === index ? "bg-slate-400" : ""
                  }  `}
                onClick={() => handleClick(index)}
              >
                <div className="flex items-center space-x-2 w-full cursor-pointer">
                  <div className="cursor-pointer">{item.icon}</div>
                  <span className="cursor-pointer line-clamp-1">
                    {item.label}
                  </span>
                </div>
              </li>
              {itemsUser == 9 && subMenuVisible && (
                <ul className="pl-4 ">
                  {item.items?.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`flex items-center p-3 mt-1 rounded-lg ${subItems === subIndex ? "bg-slate-400" : ""
                        }`}
                      onClick={() => handleClickSubimitem(subIndex)}
                    >
                      <div className="flex items-center space-x-2 w-full cursor-pointer">
                        <div className="cursor-pointer">
                          <i className={subItem.icon}></i>
                        </div>
                        <span className="cursor-pointer line-clamp-1">
                          {subItem.label}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ItemsNavbar;
