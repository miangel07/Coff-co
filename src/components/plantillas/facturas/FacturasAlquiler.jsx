import React, { useEffect, useState } from 'react'
import Mybutton from '../../atoms/Mybutton'
import { useForm } from "react-hook-form";
import InputAtomo from '../../atoms/Input';
import { useGeneraFacturaAlquilerMutation } from '../../../store/api/factura';
import { toast } from "react-toastify";

const FacturasAlquiler = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataFactura, seDatafactura] = useState([])
    const [generaFacturaAlquiler, { isLoading, data, isSuccess, error, isError }] = useGeneraFacturaAlquilerMutation();

    useEffect(() => {
        if (isSuccess) {
            seDatafactura(data)
        }
        if (isError) {
            toast.error(`${error.error}`);
        }


    }, [isLoading, data, isSuccess, error])
    console.log(dataFactura)

    return (

        <>
            <section>
                <form className="flex flex-col gap-3 justify-center items-center " onSubmit={handleSubmit(generaFacturaAlquiler)}>
                    <div className="w-[250px]">

                        <InputAtomo erros={errors} name={"Documento"} register={register} type={"number"} placeholder={"Numero de Documento"} />
                    </div>
                    <Mybutton color={"primary"} type={"submit"}>
                        Generar Factura
                    </Mybutton>
                </form>

            </section>
        </>
    )
}


export default FacturasAlquiler