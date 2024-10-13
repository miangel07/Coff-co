import React from 'react';
import RecuperarPassPlantilla from '../../components/plantillas/recuperarContraseña/RecuperarPassPlantilla';
import Footer from '../../components/molecules/Footer/Footer';
import Mybutton from '../../components/atoms/Mybutton';
import { useNavigate } from 'react-router-dom';

const RecuperarPasswordPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="h-screen flex flex-col overflow-x-hidden bg-gray-100">
                <header className="bg-white  p-4">
                    <div className="flex justify-between mr-7 ml-7 items-center ">
                        <Mybutton color={"primary"} onClick={() => navigate("/")}>Volver</Mybutton>
                        <h1 className="text-lg font-semibold">Recuperar Contraseña</h1>
                    </div>
                </header>

                <div className="flex-grow flex items-center justify-center">
                    <RecuperarPassPlantilla />
                </div>

                <div className="mt-auto w-full">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default RecuperarPasswordPage;
