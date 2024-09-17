import React, { useState, useRef } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router-dom";
import usuarioImagen from "../../../../public/usuario.png";

const Header = ({ color }) => {
    const [open, setOpen] = useState(false);
    const Menus = ["Mi perfil", "Logos", "Ayuda", "Salir"];

    const menuRef = useRef();
    const imgRef = useRef();
    const navigate = useNavigate();

    window.addEventListener("click", (e) => {
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpen(false);
        }
    });

    const handleLogout = () => {
        document.cookie = 'Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log('Sesion Finalizada');
        window.location.reload();
    };

    const handleMenuClick = (menu) => {
        setOpen(false); 

        switch (menu) {
            case "Mi perfil":
                navigate("/perfil"); 
                break;
            case "Logos":
                navigate("/logos"); 
                break;
            case "Ayuda":
                navigate("/ayuda"); 
                break;
            case "Salir":
                handleLogout();
                navigate("/");
                break;
            default:
                break;
        }
    };

    return (
        <>
            <header
                className={`inset-x-0 top-0 shadow-lg h-16 md:px-8 sm:px-8 max-sm:px-8 ${color} z-50`}
            >
                <nav
                    className="flex items-center justify-between lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <figure className="h-16 w-16">
                            <LazyLoadImage
                                src={"/logo-sena-verde.jpg"}
                                className="h-full w-full cursor-pointer"
                                effect="opacity"
                                alt="logo-sena"
                            />
                        </figure>
                        <div className="flex justify-center items-center font-semibold ml-2">
                            Coffco
                        </div>
                    </div>

                    {/* Menu Dropeable */}
                    <div className="relative">
                        <img
                            ref={imgRef}
                            onClick={() => setOpen(!open)}
                            src={usuarioImagen}
                            alt="User"
                            className="h-15 w-16 object-cover rounded-full cursor-pointer"
                        />
                        {open && (
                            <div
                                ref={menuRef}
                                className="bg-white p-4 w-48 shadow-lg absolute -left-24 top-16"
                            >
                                <ul>
                                    {Menus.map((menu) => (
                                        <li
                                            className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
                                            key={menu}
                                            onClick={() => handleMenuClick(menu)}
                                        >
                                            {menu}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
