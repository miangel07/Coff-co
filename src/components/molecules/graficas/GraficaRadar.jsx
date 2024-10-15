import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Spinner } from "@nextui-org/react";
import { useGetReporteQuery } from '../../../store/api/reportes';

const GraficaRadar = () => {
    const { data, isLoading, isError } = useGetReporteQuery();

    const option = () => {
        return {
            title: {
                text: 'Uso de Servicios',
                left: 'center',
                textStyle: {
                    color: '#333',
                    fontSize: 16,
                },
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c}',
            },
            xAxis: {
                type: 'category',
                data: data?.map((items) => (items.nombreServicio))|| [],
                axisLine: {
                    lineStyle: {
                        color: '#333',
                    }
                },
                axisLabel: {
                    rotate: 45, 
                    fontSize: 12,
                    color: '#333', 
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#333',
                    }
                },
                axisLabel: {
                    fontSize: 12, 
                    color: '#333', 
                },
                splitLine: {
                    lineStyle: {
                        color: '#ddd', 
                    }
                }
            },
            series: [
                {
                    data: data?.map((items) => (items.cantidad_uso))||[],
                    type: 'line',
                    smooth: true, 
                    lineStyle: {
                        color: '#ff6384', 
                        width: 2,
                    },
                    areaStyle: {
                        color: 'rgba(255, 99, 132, 0.2)', 
                    },
                    itemStyle: {
                        color: '#ff6384', 
                    },
                    emphasis: {
                        focus: 'series',
                    },
                }
            ],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            }
        };
    };
    

    if (isLoading) return <Spinner />;
    if (isError) return <p>Error al graficar, intenta de nuevo más tarde.</p>;

    return (

        <ReactEcharts option={option()} style={{ height: '400px', width: '100%' }} />

    );
}

export default GraficaRadar;
