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
        grid: {
            left: '10%',  // Margen izquierdo
            right: '10%', // Margen derecho
            bottom: '10%', // Margen inferior
            top: '20%'   // Margen superior
        },
        xAxis: {
            data: servicioData?.map(item => item.fecha), // Usamos la fecha como eje X (meses)
            axisLabel: {
                
                fontSize: 12, // Tamaño de la fuente
            }
        },
        yAxis: {
            axisLabel: {
                fontSize: 12, 
            }
        },
        series: [{
            type: 'bar', 
            id: 'sales',
            data: servicioData.map(item => item.cantidad_servicios), // Cantidad de servicios
            barWidth: '30%', // Ancho de las barras (puedes ajustarlo según tu preferencia)
            barGap: '15%', // Espacio entre las barras
            universalTransition: {
                enabled: true,
                divideShape: 'clone'
            },
            itemStyle: {
                borderRadius: [4, 4, 0, 0], // Bordes redondeados para las barras
                color: '#3398DB' // Color personalizado
            }
        }]
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
