import React, { useState, useContext } from "react";
import Icons from "../../atoms/Icons";
import { Link } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { GoFileDirectoryFill, GoHomeFill } from "react-icons/go";
import { GiCoffeeBeans } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { BsHousesFill, BsFillFileBarGraphFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import { IoIosApps } from "react-icons/io";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import SelectDocumentos from '../../atoms/SelectDocumentos';
import { useTranslation } from 'react-i18next'; //  <--------importan este para usar la traducioon Esteeeeee
import { TraslateContex } from "../../../context/TranslationoContex";
const ItemsNavbar = ({ visiblite }) => {
  const { changeLanguage, language } = useContext(TraslateContex);
  const [itemsUser, setItemsUser] = useState(-1);
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const { t } = useTranslation(); // <--------aca ponen esto tal cual  no vallan a cambiar la letra asi lo usan con la "t"

  const handleClick = (index) => {
    setItemsUser(index);
    if (index === 9 && items[index].label === "Configuraciones") {
      setSubMenuVisible(!subMenuVisible);
    } else {
      setSubMenuVisible(false);
    }
  };
  const idioma = [
    { value: "es", label: t("espanol") },
    { value: "en", label: t("ingles") },

  ]


  const handleLogout = () => {
    document.cookie = 'Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('Token eliminado');
    window.location.reload();
  };


  const items = [
    {
      label: `${visiblite ? t("home") : ""}`,
      icon: <GoHomeFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/home",
    },
    {
      label: `${visiblite ? t("servicios") : ""}`,
      icon: <GiCoffeeBeans className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/servicios",
    },
    {
      label: `${visiblite ? t("documentos") : ""}`,
      icon: <GoFileDirectoryFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/documentos",
    },
    {
      label: `${visiblite ? t("precios") : ""}`,
      icon: <AiFillDollarCircle className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/precios",
    },
    {
      label: `${visiblite ? t("ambientes") : ""}`,
      icon: <BsHousesFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/ambientes",
    },
    {
      label: `${visiblite ? t("tipoDocumentos") : ""}`,
      icon: <IoDocumentText className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
    {
      label: `${visiblite ? t("tipoServicios") : ""}`,
      icon: <MdOutlineMiscellaneousServices className="w-5 h-5 xl:size-7 " />,
    },
    {
      label: `${visiblite ? t("muestras") : ""}`,
      icon: <BiSolidCoffeeBean className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/muestras"
    },
    {
      label: `${visiblite ? t("variables") : ""}`,
      icon: <IoIosApps className="w-5 h-5 xl:size-7 " />,
      link: "/varibles"
    },
    {
      label: `${visiblite ? t("alquiler") : ""}`,
      icon: <FaCalendarAlt className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
      link: "/alquiler",
    },
    {
      label: `${visiblite ? t("reportes") : ""}`,
      icon: <BsFillFileBarGraphFill className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
    {
      label: `${visiblite ? t("facturas") : ""}`,
      icon: <TbReportMoney className="w-5 h-5 xl:size-7" />, // Tamaño ajustable
    },
    {
      label: `${visiblite ? t("salir") : ""}`,
      icon: <ImExit className="w-5 h-5 xl:size-7" />,
      link: "/"
    }
  ];

  return (
    <div className="flex justify-content-center flex-col">
      <ul className="w-full">
        {items.map((item, index) => (
          <div key={index}>
            <li
              className={`flex items-center p-2 rounded-lg ${location.pathname === item.link ? "bg-light-gray" : ""
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
          </div>
        ))}
      </ul>
      <SelectDocumentos
        value={""}
        data={idioma}
        items={"value"}
        label={t("idioma")}
        ValueItem={"label"}
        onChange={(e) => changeLanguage(e.target.value)}
      />
    </div>
  );
};

export default ItemsNavbar;
