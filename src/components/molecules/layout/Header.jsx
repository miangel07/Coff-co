import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Logosímbolo from '../../atoms/Logosímbolo';


const Header = ({ color, contenido }) => {
    return (
        <header
            className={`inset-x-0 top-0   h-16 md:px-8 sm:px-8 max-sm:px-8 ${color} z-50`}
        >
            <nav
                className="flex items-center justify-between  lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <figure className=" h-16 w-16 ">
                        <LazyLoadImage
                            src={"../../../public/logo-sena-verde.jpg"}
                            className="h-full w-full cursor-pointer"
                            effect="opacity"
                            alt="logo-sena"
                        />
                    </figure>
                    <div className="flex justify-center items-center font-semibold ml-2">Coffco</div>
                </div>
                {contenido}
            </nav>
        </header>
    );
}

export default Header