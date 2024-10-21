import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { useGraficaQuery } from '../../../store/api/documentos';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Mybutton from '../../atoms/Mybutton';

const GraficaDocumento = () => {
    const { t } = useTranslation();
    const { data, isLoading, isError, error } = useGraficaQuery();
    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{t("errorGrafica")}</p>;
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
                        position: 'outside',
                        formatter: '{b}: {c}',
                    },

                    labelLine: {
                        show: true
                    },
                    data: data?.data
                }
            ]
        };
    };
    return (
        <div className='flex flex-col   items-center' onClick={() => navigate("/documentos")}>
            <p className='font-sans font-medium' >Gestion Documental</p>
            <ReactEcharts option={getOption()} style={{ height: '600px', width: '50%' }} />

        </div>
    )
}

export default GraficaDocumento