import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputAtomo from '../../atoms/Input'
import SelectAtomo from '../../atoms/Select'
import { useCrearVariableMutation } from '../../../store/api/variables'
import Mybutton from '../../atoms/Mybutton'
import { toast } from "react-toastify";
const VariablesFormulario = ({ closeModal, dataValue }) => {
    const [tipoDato, setTipoDato] = useState("")
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const [crearVariable, { isLoading, isError, error, data: dataResponse, isSuccess }] = useCrearVariableMutation()

    const hadleEdit = (data) => { }
    useEffect(() => {
        if (dataValue) {
            setValue("nombre", dataValue.nombre)
            setTipoDato(dataValue.tipo_dato)
        } else {
            reset()
        }

        if (isSuccess) {
            toast.success(`${dataResponse?.menssage}`);
            closeModal()
        }
    }, [dataValue, dataResponse, setValue, isSuccess]

    )
    const onsubmit = (data) => {
        console.log(data)
        try {
            if (data) {
                crearVariable({
                    nombre: data.nombre,
                    tipo_dato: tipoDato,
                })
            }
        } catch (error) {

        }

    }
    const TipoDatos = [
        { value: "text", label: "texto" },
        { value: "number", label: "Numeros" },
        { value: "data", label: "Fechas" },
    ];
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (

        /* data, label, onChange, items, ValueItem, value */
        <section className='w-full overflow-auto  justify-center items-center flex'>
            <form onSubmit={handleSubmit(dataValue ? hadleEdit : onsubmit)} className='  flex flex-col  justify-between '>
                <div className='flex w-[230px] h-[155px]   flex-col gap-5 '>

                    <InputAtomo name={"nombre"} erros={errors} placeholder={"Ingrese el nombre"} register={register} type={"text"} id={"nombre"} />
                    <SelectAtomo value={tipoDato} data={TipoDatos} items={"value"} label={"Seleccione El Tipo de Dato"} ValueItem={"label"} onChange={(e) => setTipoDato(e.target.value)} />
                </div>
                <div className='flex w-[230px]  flex-col '>

                    <Mybutton type={"onsubmit"} color={"primary"}>{dataValue ? "Actualizar" : "Registrar"}</Mybutton>
                </div>
            </form>
        </section>
    )
}

export default VariablesFormulario