import React, { useState } from 'react'
import ReportesGrafica from '../../molecules/graficas/ReportesGrafica'
import GraficaRadar from '../../molecules/graficas/GraficaRadar'
import Mybutton from '../../atoms/Mybutton'
import ModalOrganismo from '../../organismo/Modal/ModalOrganismo'

import { usePostRepoteTipoServcioQuery } from '../../../store/api/reportes'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import MyDocument from '../../organismo/Reportes/ReportePdf'

const ReportesPlantillas = () => {
  const [show, setShow] = useState(false)
  const { data, isLoading, isError } = usePostRepoteTipoServcioQuery();
  const handleReporte = (e) => {
    e.preventDefault();
    const data = e.target.elements.plantilla.value;
    console.log('Reporte generado', data)

  }
  if (isLoading) {
    return <p>Cargando...</p>
  }
  return (
    <>
      <header className='bg-white w-full '>
        {
          <ModalOrganismo visible={show} closeModal={() => setShow(false)}>
            <form onSubmit={handleReporte}>
              <label>Seleccione la plantilla</label>
              <select name='plantilla'>
                <option value='1'>Plantilla 1</option>
                <option value='2'>Plantilla 2</option>
                <option value='3'>Plantilla 3</option>
              </select>
              <Mybutton type='submit' color='primary'>Generar Reporte</Mybutton>

              <div>
                <PDFDownloadLink document={<MyDocument />} fileName="tabla-ejemplo.pdf">
                  {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
                </PDFDownloadLink>


                <PDFViewer className='w-full h-screen'>
                  {data && <MyDocument valor={data} />}
                </PDFViewer>




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