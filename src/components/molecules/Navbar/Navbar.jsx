import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { FaHome } from "react-icons/fa";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IoMdSettings } from "react-icons/io";
import { ImMenu } from "react-icons/im";
import { PanelMenu } from "primereact/panelmenu";
import img from "../../../../public/cafe-tostado.png";
import { Link } from "react-router-dom";
import { GiTransparentTubes } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import Icons from "../../atoms/Icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const items = [
    {
      icon: <FaHome />,
      label: "Home",
      template: (item, options) => (
        <Link
          to="/home"
          className={options.className}
          onClick={toggleDrawer(false)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </Link>
      ),
    },
    {
      label: "Servicios",
      icon: <GiTransparentTubes />,
      items: [
        {
          label: "Tostion",
          icon: <Icons img={img} />,
        },
        {
          label: "Trilla",
          icon: "",
        },
        {
          label: "Alquiler Del Laboratorio",
          icon: "",
        },
        {
          label: "Analisis Fisico",
          icon: "",
        },
        {
          label: "Analisis Sensorial",
          icon: "",
        },
      ],
    },
    {
      label: "Gestion Documental",
      icon: <Icons img={"../../../../public/documento.png"} />,
      items: [
        {
          label: "Procesos Misionales",
          icon: "",
        },
        {
          label: "Procesos Estrategicos",
          icon: "",
        },
        {
          label: "Procesos De soporte ",
          icon: "",
        },
        {
          label: "Procesos De Evaluacion",
          icon: "",
        },
      ],
    },
    {
      label: "Configuraciones",
      icon: <IoMdSettings />,
      items: [
        {
          label: "Administrar Usuarios",
          icon: <IoMdSettings />,
          template: (item, options) => (
            <Link to="/users" className={options.className}>
              <ListItemText primary={item.label} />
            </Link>
          ),
        },
        {
          label: "Administrar Clientes",
          icon: "",
        },
        {
          label: "Cambiar Contraseña",
          icon: "",
        },
      ],
    },
    {
      icon: <Icons img={"../../../../public/notificacion.png"} />,
      label: "Notificaciones",
      template: (item, options) => (
        <Link
          to="/"
          className={options.className}
          onClick={toggleDrawer(false)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </Link>
      ),
    },
    {
      icon: <Icons img={"../../../../public/reporte.png"} />,
      label: "Reportes",
      template: (item, options) => (
        <Link
          to="/"
          className={options.className}
          onClick={toggleDrawer(false)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </Link>
      ),
    },
    {
      icon: <Icons img={"../../../../public/facturacion.png"} />,
      label: "Administracion de Facturas",
      template: (item, options) => (
        <Link
          to="/"
          className={options.className}
          onClick={toggleDrawer(false)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </Link>
      ),
    },

    {
      icon: <ImExit />,
      label: "Salir",
      template: (item, options) => (
        <Link
          to="/"
          className={options.className}
          onClick={toggleDrawer(false)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </Link>
      ),
    },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <PanelMenu model={items} className="w-full md:w-20rem" />
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <div className="w-full flex justify-start h-10 items-center ">
        <div className="mt-6">
          <Button onClick={toggleDrawer(true)}>
            <ImMenu className="size-8 text-black" />
          </Button>
        </div>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Navbar;
