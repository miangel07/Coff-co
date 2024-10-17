import React, { useState, useContext } from "react";
import SelectDocumentos from "../../atoms/SelectDocumentos";

import { TraslateContex } from "../../../context/TranslationoContex";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next"; //Importacion para cambio de idioma
import { Link } from "react-router-dom";

const ItemsNavbar = ({ visiblite }) => {
  const { t } = useTranslation(); //Aca ponen esto tal cual no vayan a cambiar la letra, lo usan con la "t"

  //ROL DEL USUARIO
  const { authData } = useContext(AuthContext); 
  const Rol = authData?.usuario.rol

  // ITEMS Y FILTRADO
  const items = [
    {
      icon: "bi-house",
      iconFill: "bi-house-fill",
      label: visiblite ? t("home") : "",
      link: "/home",
      roles: ["administrador", "encargado", "operario", "cliente"],
    },
    {
      icon: "bi-file-earmark-break",
      iconFill: "bi-file-earmark-break-fill",
      label: visiblite ? t("tipoDocumentos") : "",
      link: "/tipodocumento",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-folder",
      iconFill: "bi-folder-fill",
      label: visiblite ? t("documentos") : "",
      link: "/documentos",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-layers",
      iconFill: "bi-layers-fill",
      label: visiblite ? t("variables") : "",
      link: "/variables",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-coin",
      iconFill: "bi-coin",
      label: visiblite ? t("precios") : "",
      link: "/precios",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-houses",
      iconFill: "bi-houses-fill",
      label: visiblite ? t("ambientes") : "",
      link: "/ambientes",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-nut",
      iconFill: "bi-nut-fill",
      label: visiblite ? t("tipoServicios") : "",
      link: "/tiposervicio",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-cup-hot",
      iconFill: "bi-cup-hot-fill",
      label: visiblite ? t("muestras") : "",
      link: "/muestras",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-handbag",
      iconFill: "bi-handbag-fill",
      label: visiblite ? t("servicios") : "",
      link: "/servicios",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-arrow-repeat",
      iconFill: "bi-handbag-fill",
      label: visiblite ? t("cambios") : "",
      link: "/cambios",
      roles: ["administrador", "encargado", "operario"],
    },
    {
      icon: "bi-calendar",
      iconFill: "bi-calendar-fill",
      label: visiblite ? t("alquiler") : "",
      link: "/alquiler",
      roles: ["administrador", "encargado"],
    },
    {
      icon: "bi-people",
      iconFill: "bi-people-fill",
      label: visiblite ? t("usuarios") : "",
      link: "/users",
      roles: ["administrador"],
    },
    {
      icon: "bi-clipboard-check",
      iconFill: "bi-clipboard-check-fill",
      label: visiblite ? t("facturas") : "",
      link: "/facturas",
      roles: ["administrador", "encargado"],
    },
    {
      icon: "bi-file-bar-graph",
      iconFill: "bi-file-bar-graph-fill",
      label: visiblite ? t("reportes") : "",
      link: "/reportes",
      roles: ["administrador", "encargado"],
    }
  ];

  const itemsFiltrados = items.filter(item => item.roles.includes(Rol));

  return (
    <div className="flex justify-content-center flex-col">
      <ul className="w-full">
        {itemsFiltrados.map((item, index) => {
          const iconoSeleccionado = location.pathname === item.link;
          return (
            <li key={index} className={`flex items-center m-0.5 p-2 rounded-lg ${iconoSeleccionado ? "bg-light-gray" : "hover:bg-light-gray"}`}>
              <Link to={item.link} className="flex items-center w-full cursor-pointer">
                <div className="group cursor-pointer flex items-center ml-1.5 space-x-2">
                  <div className="group">
                    {iconoSeleccionado ? ( <i className={`${iconoSeleccionado ? item.iconFill : item.icon} text-2xl`}></i> ) :
                    <>
                    <i className={`bi ${item.icon} icon-default block group-hover:hidden text-2xl`}></i>
                    <i className={`bi ${item.iconFill} icon-hover hidden group-hover:block text-2xl`}></i> 
                    </>
                    }
                  </div>
                  <span className="text-base line-clamp-1">{item.label}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    
    </div>
  );
};

export default ItemsNavbar;
