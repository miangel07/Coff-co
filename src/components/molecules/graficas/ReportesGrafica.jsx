import React from 'react';
import { useGetReporteQuery } from '../../../store/api/reportes';
import ReactEcharts from 'echarts-for-react';
import { Spinner } from "@nextui-org/react";

const ReportesGrafica = () => {
    const { data, isLoading, isError } = useGetReporteQuery();

    const option = () => {
        return {
            xAxis: {
                type: 'category',
                data: data.map((item) => item.nombreServicio), 
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: data.map((item) => item.cantidad_uso),  
                    type: 'bar',
                    barWidth: '20%', 
                    label: {
                        show: true, 
                        position: 'top', 
                        color: '#000', 
                        fontSize: 12, 
                    },
                },
            ],
        };
    };

    if (isLoading) return <Spinner />;
    if (isError) return <p>Error al Graficar, intenta después.</p>;

    return (
       
            <ReactEcharts option={option()} style={{ height: '300px', width: '100%' }} />
        
    );
}

export default ReportesGrafica;
