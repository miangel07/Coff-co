import React, { useState } from "react";
import Icons from "../../atoms/Icons";
import { Link } from "react-router-dom";


const ItemsNavbar = ({ visiblite }) => {
  const [itemsUser, setItemsUser] = useState(-1);
  const [subItems, setSubitems] = useState(-1);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const handleClick = (index) => {
    setItemsUser(index);
    console.log(index)
    if (index == 8 && items[index].label === "Configuraciones") {
      setSubMenuVisible(!subMenuVisible);
    } else {
      setSubMenuVisible(false)
    }


  };
  const handleClickSubimitem = (subIndex) => {
    setSubitems(subIndex)
  }

  const items = [
    {
      label: `${!visiblite ? "Home" : ""}`,
      icon: <Icons img={"/home.png"} />,
    },
    {
      label: `${!visiblite ? "Servicios" : ""}`,
      icon: <Icons img={"/maquina-de-cafe.png"} />,
      link: "/servicios"
    },
    {
      label: `${!visiblite ? "Documentos" : ""}`,
      icon: <Icons img={"/documento.png"} />,
    },
    {
      label: `${!visiblite ? "Precios" : ""}`,
      icon: <Icons img={"/precios.png"} />,
    },
    {
      label: `${!visiblite ? "Ambientes" : ""}`,
      icon: <Icons img={"/moverse.png"} />,
    },
    {
      label: `${!visiblite ? "Tipo de Documentos" : ""}`,
      icon: <Icons img={"/contrato.png"} />,
    },
    {
      label: `${!visiblite ? "Tipo de Servicios" : ""}`,
      icon: <Icons img={"/soporte-tecnico.png"} />,
    },
    {
      label: `${!visiblite ? "Variables" : ""}`,
      icon: <Icons img={"/base-de-datos.png"} />,
    },
    {
      label: `${!visiblite ? "Configuraciones" : ""}`,
      icon: <Icons img={"/configuraciones.png"} />,
      items: !visiblite ? [
        {
          label: `${!visiblite ? "Usuarios" : ""}`,
          icon: 'pi pi-users',
        },
        {
          label: `${!visiblite ? "Ayuda" : ""}`,
          icon: 'pi-question-circle'
        },
        {
          label: `${!visiblite ? "Logos" : ""}`,
          icon: 'pi pi-image'
        }
      ] : [],
    },
    {
      label: `${!visiblite ? "Alquiler Del Laboratorio" : ""}`,
      icon: <Icons img={"/laboratorio.png"} />,
    },
    {
      label: `${!visiblite ? "Reportes" : ""}`,
      icon: <Icons img={"/reporte.png"} />,
    },
    {
      label: `${!visiblite ? "Facturas" : ""}`,
      icon: <Icons img={"/facturacion.png"} />,
    },
    {
      label: `${!visiblite ? "Salir" : ""}`,
      icon: <Icons img={"/cerrar-sesion.png"} />,
    },
  ];

  return (
    <div className="flex justify-content-center">
      <ul className="w-full">
        {items.map((item, index) => (
          <div key={index}>
            <Link
              to={item.link}
            >
              <li
                className={`flex items-center p-2 rounded-lg ${itemsUser === index ? "bg-slate-400" : ""}`}
                onClick={() => handleClick(index)}
              >


                <div className="flex items-center space-x-2 w-full cursor-pointer">
                  <div className="cursor-pointer">{item.icon}</div>
                  <span className="cursor-pointer line-clamp-1">{item.label}</span>
                </div>
              </li>
              {itemsUser == 8 && subMenuVisible && (
                <ul className="pl-4 ">
                  {item.items?.map((subItem, subIndex) => (
                    <li key={subIndex} className={`flex items-center p-3 mt-2 rounded-lg ${subItems === subIndex ? "bg-slate-400" : ""}`}
                      onClick={() => handleClickSubimitem(subIndex)}>
                      <div className="flex items-center space-x-2 w-full cursor-pointer">
                        <div className="cursor-pointer">
                          <i className={subItem.icon}></i>
                        </div>
                        <span className="cursor-pointer line-clamp-1">{subItem.label}</span>
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
