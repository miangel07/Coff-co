import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { useGraficaQuery } from '../../../store/api/documentos';
const GraficaDocumento = () => {
    const { data, isLoading, isError, error } = useGraficaQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>No hay datos para graficar</p>;
    const getOption = () => {
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Informacion',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'Bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data.data
                }
            ]
        };
    };
    return (
        <div>
            <h1>
                Grafica de Documentos
            </h1>
            <ReactEcharts option={getOption()} style={{ height: '600px', width: '100%' }} />
        </div>
    )
}

export default GraficaDocumento