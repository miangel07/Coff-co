import React, { useEffect, useState } from 'react'
import ReportesGrafica from '../../molecules/graficas/ReportesGrafica'
import GraficaRadar from '../../molecules/graficas/GraficaRadar'
import Mybutton from '../../atoms/Mybutton'
import ModalOrganismo from '../../organismo/Modal/ModalOrganismo'
import SelectDocumentos from '../../atoms/SelectDocumentos'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import MyDocument from '../../organismo/Reportes/ReportePdf'
import { useGetTipoServicioQuery } from '../../../store/api/TipoServicio'
import { usePostRepoteTipoServcioMutation } from '../../../store/api/reportes'
import { useForm } from 'react-hook-form'
import InputAtomo from '../../atoms/Input'
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";
const ReportesPlantillas = () => {
  const [show, setShow] = useState(false)
  const [TipoServicio, SetTipoServicio] = useState("")
  const { data, isLoading, isError } = useGetTipoServicioQuery();
  const { data: tipoServicio, isLoading: tipoLoading, isError: tipoError } = useGetTipoServicioQuery();
  const [postReporteTipoServicio, { isSuccess, data: dataReporte, isError: errorReporte, error }] = usePostRepoteTipoServcioMutation();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  const handleReporte = (data) => {

    postReporteTipoServicio(
      {
        "muestra": data.muestra,
        "TipoServicio": TipoServicio,
      }
    )
    console.log("dataa", TipoServicio, data);

  }
  useEffect(() => {
    if (errorReporte) {
      toast.error(error.error)
    }


  }, [errorReporte, error])
  if (isLoading && tipoLoading) {
    return <p>Cargando...</p>
  }
  console.log(dataReporte)

  return (
    <>
      <header className='bg-white w-full '>
        {
          <ModalOrganismo visible={show} closeModal={() => setShow(false)}>
            <form onSubmit={handleSubmit(handleReporte)} className='flex  flex-col justify-center items-center'>
              <label>Seleccione la plantilla</label>

              <div className='w-[320px] flex flex-col gap-5 justify-center items-center'>

                <SelectDocumentos
                  label={"Selecione el Tipo de servicio"}
                  data={tipoServicio}
                  onChange={(e) => SetTipoServicio(e.target.value)}
                  items={"idTipoServicio"}
                  ValueItem={"nombreServicio"}
                />
                <InputAtomo register={register} name={"muestra"} erros={errors} placeholder={"Codigo Muestra"} type={"text"} id={"muestra"} />
                <Mybutton color={""} type={"submit"}>Generar Reporte</Mybutton>
              </div>
              <div className='w-full  justify-center flex flex-col'>

                {
                  isSuccess && (
                    <>

                      <PDFDownloadLink document={<MyDocument valor={dataReporte} />} fileName={`Reporte de muestra-${dataReporte[0]?.codigo_muestra || ""}.pdf`}>
                        {({ loading }) => (loading ? <Spinner /> : <Mybutton type='submit' color='primary'>Descargar PDF</Mybutton>)}
                      </PDFDownloadLink>




                      <PDFViewer className='w-full h-screen'>
                        <MyDocument valor={dataReporte} />
                      </PDFViewer>
                    </>


                  )
                }
              </div>



            </form>
          </ModalOrganismo>
        }
        <section>
          <h2 className='text-2xl font-bold'>Reporte de Servicios</h2>
          <Mybutton color={"primary"} onClick={() => setShow(true)}>
            Generar Repote
          </Mybutton>

        </section>
      </header>
      <section className=' gap-6 flex flex-col bg-white '>
        <ReportesGrafica />
        <GraficaRadar />
      </section>
    </>

  )
}

export default ReportesPlantillas