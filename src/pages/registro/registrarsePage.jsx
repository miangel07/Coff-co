import React from 'react';
import RegistrarsePlantilla from '../../components/plantillas/registrarsePlantilla/RegistrarsePlantilla';
import Footer from '../../components/molecules/Footer/Footer';
import Mybutton from '../../components/atoms/Mybutton';
import { Link } from "react-router-dom";

const RegistroPage = () => {
    return (
        <>
            <div className="h-screen flex flex-col overflow-x-hidden bg-gray-100">
                <header className="bg-white  p-4">
                    <div className="flex justify-between items-center ">
                        <Link to="/">
                            <Mybutton color={"primary"}>Volver</Mybutton>
                        </Link>
                        <h1 className="text-lg font-semibold">Registrate</h1>
                    </div>
                </header>

                <div className="flex-grow flex items-center justify-center">
                    <RegistrarsePlantilla />
                </div>

                <div className="mt-auto w-full">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default RegistroPage;
