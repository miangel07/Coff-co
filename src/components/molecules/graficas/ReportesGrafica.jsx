import React from 'react';
import { useGetReporteQuery } from '../../../store/api/reportes';
import ReactEcharts from 'echarts-for-react';
import { Spinner } from "@nextui-org/react";

const ReportesGrafica = () => {
    const { data, isLoading, isError } = useGetReporteQuery();

    const option = () => {
        return {
            title: {
                text: 'Cantidad de servicios usados',
                subtext: 'Datos de Servicio',
                left: 'center',
                top: '10',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                },
            },
            xAxis: {
                type: 'category',
                data: data?.map((item) => item.nombreServicio),
                axisLabel: {
                    show: true,
                    position: 'bottom',
                    color: '#000',
                    fontSize: 12,
                    formatter: (params) => params.value,
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 12,
                    color: '#555',
                },
            },
            series: [
                {
                    data: data?.map((item) => item.cantidad_uso),
                    type: 'bar',
                    barWidth: '20%',
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        color: '#4CAF50',
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#81C784',
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#000',
                            fontSize: 12,
                            formatter: (params) => {
                                return params.name;
                            },
                        },
                    },
                },
            ],
            grid: {
                left: '5%',
                right: '5%',
                bottom: '20%',
                top: '10%',
            },
        };
    };

    if (isLoading) return <Spinner />;
    if (isError) return <p>Error al Graficar, intenta después.</p>;

    return (
        <ReactEcharts option={option()} style={{ height: '350px', width: '100%' }} />
    );
};

export default ReportesGrafica;
