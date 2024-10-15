import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useGetReporteAlquilerQuery } from '../../../store/api/reportes';

const GraficaAlquiler = () => {
    const [servicioData, setServicioData] = useState([]);
    const { data, isLoading, isSuccess, isError, error } = useGetReporteAlquilerQuery();




    useEffect(() => {
        if (data) {
            setServicioData(data);
        }
    }, [data]);
    if (isError) {


        return <p>{error.error}</p>;
    }


    const option = {
        title: {
            text: 'Servicios de Alquiler por Mes',
            subtext: 'Datos de alquiler de laboratorio',
            left: 'center',
            top: '10',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
            }
        },
        xAxis: {
            data: servicioData?.map(item => item.fecha), // Usamos la fecha como eje X (meses)
        },
        yAxis: {},
        series: {
            type: 'bar', // Tipo de gráfico: barras
            id: 'sales',
            data: servicioData.map(item => item.cantidad_servicios), // Cantidad de servicios
            universalTransition: {
                enabled: true,
                divideShape: 'clone'
            }
        }
    };
    if (isLoading) {
        return <p>Loading...</p>;
    }


    return (
        <ReactEcharts
            option={option}
            style={{ height: '400px', width: '100%' }}
        />
    );
};

export default GraficaAlquiler;
