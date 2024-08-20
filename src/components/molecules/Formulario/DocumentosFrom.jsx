import React, { useState } from 'react'
import InputAtomo from '../../atoms/Input'
import { useForm } from 'react-hook-form'
import Mybutton from '../../atoms/Mybutton';
import SelectAtomo from '../../atoms/Select';

import { useGetTipoDocumentosQuery } from '../../../store/api/TipoDocumentos';
import Label from '../../atoms/Label';


const DocumentosFrom = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [file, setFile] = useState(null);
    const [dataInput, SetDataInput] = useState("");
    const { data, isLoading, isError, error } = useGetTipoDocumentosQuery();
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    const HanderEnviar = (e) => {

        setFile(e.target.files[0].name);

    }
    const onSubmit = (data) => {
        console.log(data, file, dataInput)
    }
    const AgregarVariable = dataInput == 5 ? <section>
        hola
    </section> : ""

    return (
        <div className=' w-full justify-center flex '>

            <form className='w-[1022px]  md:rounded-xl md:shadow-xl sm:h-[500px]  justify-around flex flex-col items-center ' onSubmit={handleSubmit(onSubmit)}>
                <h1>Formulario De Registro De Documentos</h1>
                <section className='grid grid-cols-2 sm:grid-cols-3 sm:justify-center sm:items-center divide-y  gap-4'>
                    <div className='w-56'>
                        <Label>Nombre Del Documento</Label>
                        <InputAtomo register={register} name={'nombre'} erros={errors} placeholder={"Nombre"} id={'nombre'} type={"text"} />
                    </div>
                    <div className='w-56'>
                        <Label>Fecha Cargar</Label>
                        <InputAtomo register={register} name={'fecha_carga'} erros={errors} placeholder={"Fecha De carga"} id={'fecha'} type={"date"} />
                    </div>
                    <div className='w-56'>
                        <Label>Descripcion Del Documento</Label>
                        <InputAtomo register={register} name={'descripcion'} erros={errors} placeholder={"descripcion"} id={'descripcion'} type={"text"} />
                    </div>
                    <div className='w-56'>
                        <Label>Codigo Del Documento</Label>
                        <InputAtomo register={register} name={'codigo_documentos'} erros={errors} placeholder={"codigo del documentos"} id={'codigo_documentos'} type={"text"} />
                    </div>
                    <div className='w-56'>
                        <Label>Fecha Emision</Label>
                        <InputAtomo register={register} erros={errors} type={'date'} name={'fecha_emision'} placeholder={"Fecha De Emision"} />
                    </div>
                    <div className='w-56 '>
                        <Label>Version Del Documento</Label>
                        <InputAtomo register={register} name={'version'} erros={errors} placeholder={"version"} id={'version'} type={"text"} />
                    </div>
                    <div className='w-56 '>
                        <Label>Tipo De Documento</Label>
                        <SelectAtomo ValueItem={"nombreDocumento"} data={data} items={"idTipoDocumento"} label={"Tipo Documento"} onChange={(e) => SetDataInput(e.target.value)} />
                    </div>

                    {AgregarVariable}
                    <div className='w-56'>
                        <Label>Cargar Archivo</Label>
                        <input
                            type="file"
                            name="file"
                            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                            onChange={HanderEnviar}
                            className='w-56 h-[48px]'
                        />
                    </div>

                </section>


                <Mybutton type={'submit'}>Enviar</Mybutton>
            </form>
        </div>
    )
}

export default DocumentosFrom
