import React from 'react';
import RecuperarPassPlantilla from '../../components/plantillas/recuperarContraseña/RecuperarPassPlantilla';
import Footer from '../../components/molecules/Footer/Footer';
import Mybutton from '../../components/atoms/Mybutton';

const RecuperarPasswordPage = () => {
    return (
        <>
            <div className="h-screen flex flex-col overflow-x-hidden bg-gray-100">
                <header className="bg-white  p-4">
                    <div className="flex justify-between items-center ">
                        <Mybutton color={"primary"}>Volver</Mybutton>
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
