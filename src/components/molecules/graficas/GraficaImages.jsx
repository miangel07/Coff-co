import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";


const GraficaImages = ({ onExport, configuraciones,width ,height}) => {
  const chartRef = useRef(null);

  const getOption = () => {
    return configuraciones
  };

  const handleExportChartAsImage = () => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.getEchartsInstance();
      const imgBase64 = chartInstance.getDataURL({
        type: 'png',
        pixelRatio: 4,
        backgroundColor: '#fff'
      });
      if (typeof onExport === "function") {
        onExport(imgBase64);
      }
    }
  };

  useEffect(() => {
    if (configuraciones && chartRef.current) {
      setTimeout(() => {
        handleExportChartAsImage();
      }, 1000);
    }
  }, [configuraciones]);
  return (
    <ReactEcharts
      ref={chartRef}
      option={getOption()}
      style={{ height: height, width: width }}
    />
  );
};

export default GraficaImages;
