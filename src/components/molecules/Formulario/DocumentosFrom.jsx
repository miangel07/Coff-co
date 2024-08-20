import React, { useState } from 'react'
import InputAtomo from '../../atoms/Input'
import { useForm } from 'react-hook-form'
import Mybutton from '../../atoms/Mybutton';
import SelectAtomo from '../../atoms/Select';
import { useGetVariablesQuery } from '../../../store/api/variables';
import { useGetTipoDocumentosQuery } from '../../../store/api/TipoDocumentos';
import Label from '../../atoms/Label';
import { useGetTipoServicioQuery } from '../../../store/api/TipoServicio';
import CheckboxAtomo from '../../atoms/CheckboxAtomo';
import { useGetLogosQuery } from '../../../store/api/logos';
import { useCrearDocumentoMutation } from '../../../store/api/documentos';

const DocumentosFrom = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [file, setFile] = useState(null);
    const [ArryVariables, setArryVariables] = useState(null);
    const [logos, setlogos] = useState([])
    const [dataInput, SetDataInput] = useState("");
    const [servicio, setTipoServicio] = useState('')
    const { data, isLoading, isError, error } = useGetTipoDocumentosQuery();
    const [crearDocumento, { isLoading: loandCrearDocumneto, isError: isErrorDocumento, error: ErrorDocumento, data: dataResponse }] = useCrearDocumentoMutation()
    const { data: datalogos, isLoading: loandingLogos, } = useGetLogosQuery();
    const { data: varibles, isLoading: LoandVariables, isError: ErrorVariable, error: Error } = useGetVariablesQuery();
    const { data: TpoServicio, isLoading: TipoServicio } = useGetTipoServicioQuery();

    if (loandCrearDocumneto) {
        return <p>Loading...</p>;
    }
    if (isErrorDocumento) {
        return <p>Error: {ErrorDocumento.message}</p>;
    }
    if (TipoServicio) {
        return <p>Loading...</p>;
    }
    if (isLoading && loandingLogos) {
        return <p>Loading...</p>;
    }
    if (isError) {
        return <p>Error: {error.message}</p>;
    }
    const onDataChangeVersiones = (data) => {

        setArryVariables(data)
    }
    const onDataChangeLogos = (data) => {
        setlogos(data)
    }



    const HanderEnviar = (e) => {
        setFile(e.target.files[0]);
    }

    const onSubmit = (data) => {
        const DataForm = new FormData();

        DataForm.append('nombre', data.nombre);
        DataForm.append('descripcion', data.descripcion);
        DataForm.append('codigo', data.codigo_documentos);
        DataForm.append('fecha_emision', data.fecha_emision);
        DataForm.append('servicios', servicio);
        DataForm.append('tipo_documento', dataInput);
        DataForm.append('version', data.version);
        DataForm.append('variables', JSON.stringify(ArryVariables));
        DataForm.append('logos', JSON.stringify(logos));
        DataForm.append('file', file);

        crearDocumento(
            DataForm
        );
        console.log(dataResponse)



    }
    const AgregarVariable = dataInput == 5 ? (
        <section className='flex flex-col w-full mt-10 '>

            <SelectAtomo
                ValueItem={"nombreServicio"}
                data={TpoServicio}
                items={"idTipoServicio"}
                label={"Seleccione El servicio"}
                onChange={(e) => setTipoServicio(e.target.value)}
            />



        </section>
    ) : "";

    return (
        <div className='w-full flex justify-center'>
            <form
                className='w-full max-w-4xl md:rounded-xl md:shadow-xl p-6 flex flex-col gap-6'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className='text-2xl font-bold mb-4'>Formulario De Registro De Documentos</h1>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div className='flex w-[270px] h-[155px] flex-col '>
                        <Label>Nombre Del Documento</Label>
                        <InputAtomo
                            register={register}
                            name={'nombre'}
                            erros={errors}
                            placeholder={"Nombre"}
                            id={'nombre'}
                            type={"text"}
                        />
                    </div>
                    <div className='flex w-[270px] h-[155px] flex-col'>
                        <Label>Descripcion Del Documento</Label>
                        <InputAtomo
                            register={register}
                            name={'descripcion'}
                            erros={errors}
                            placeholder={"descripcion"}
                            id={'descripcion'}
                            type={"text"}
                        />
                    </div>
                    <div className='flex w-[270px] h-[155px] flex-col'>
                        <Label>Codigo Del Documento</Label>
                        <InputAtomo
                            register={register}
                            name={'codigo_documentos'}
                            erros={errors}
                            placeholder={"codigo del documentos"}
                            id={'codigo_documentos'}
                            type={"text"}
                        />
                    </div>
                    <div className='flex w-[270px] h-[155px] flex-col'>
                        <CheckboxAtomo
                            data={datalogos.data}
                            items={"nombre"}
                            valor={"idLogos"}
                            onDataChange={onDataChangeLogos}
                            cantidad={2}
                        />
                    </div>
                    <div className='flex w-[270px] h-[155px] flex-col'>
                        <Label>Fecha Emision</Label>
                        <InputAtomo
                            register={register}
                            erros={errors}
                            type={'date'}
                            name={'fecha_emision'}
                            placeholder={"Fecha De Emision"}
                        />
                    </div>
                    <div className='flex w-[270px] h-[155px] flex-col'>
                        <Label>Version Del Documento</Label>
                        <InputAtomo
                            register={register}
                            name={'version'}
                            erros={errors}
                            placeholder={"version"}
                            id={'version'}
                            type={"text"}
                        />
                    </div>
                    <div className='flex w-[270px] h-[155px] flex-col'>
                        <Label>Tipo De Documento</Label>
                        <SelectAtomo
                            ValueItem={"nombreDocumento"}
                            data={data}
                            items={"idTipoDocumento"}
                            label={"Tipo Documento"}
                            onChange={(e) => SetDataInput(e.target.value)}
                        />
                    </div>
                    <div className='flex w-[270px] h-[155px]'>
                        {AgregarVariable}
                    </div>
                    <div>
                        {AgregarVariable && <div className='w-full  h-[250px]'>
                            <CheckboxAtomo
                                data={varibles}
                                items={"nombre"}
                                valor={"idVariable"}
                                onDataChange={onDataChangeVersiones}
                                cantidad={4}
                            />
                        </div>}
                    </div>

                    <div className={`flex w-[270px] h-[155px] flex-col  `} >
                        <Label>Cargar Archivo</Label>
                        <input
                            type="file"
                            name="file"
                            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                            onChange={HanderEnviar}
                            className='w-full h-[48px] border border-gray-300 rounded-md p-2'
                        />
                    </div>
                </section>
                <Mybutton type={'submit'}>Enviar</Mybutton>
            </form>
        </div>
    );
}

export default DocumentosFrom
