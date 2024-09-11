import React, { useState, useRef} from "react";
import usuarioImagen from "../../../../public/usuario.png"

const DropDownMenu = () => {

    const [open, setOpen] = useState(false);

    const Menus = [ "Mi perfil", "Logos", "Ayuda", "Salir"];

    const menuRef = useRef();
    const imgRef = useRef();

    window.addEventListener('click', (e)=>{
        if(e.target !== menuRef.current && e.target !== imgRef.current){
            setOpen(false);
        };
    })

    return (
        <div className="h-screen bg-gray-200 flex justify-center pt-14">
            <div className="relative">
                    <img 
                        ref={imgRef}
                        onClick={() => setOpen(false)}
                        src={usuarioImagen} 
                        alt="User"
                        className="h-20 w-20 object cover border-4 border-gray-400 rounded-full cursor-pointer" 
                    />
                {open && (
                    <div
                    ref={menuRef} 
                    className="bg-white p-4 w-52 shadow-lg absolute -left-14 top-24">
                        <ul>
                            {Menus.map((menu) => (
                                <li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100" key={menu}>{menu}</li>
                            ))
                            }
                        </ul>
                    </div>
                    )
                }
                </div>
            </div>
    )
}

export default DropDownMenu