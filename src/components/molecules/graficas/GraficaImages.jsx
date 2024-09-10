import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";
import { useGraficaQuery } from "../../../store/api/documentos";

const GraficaImages = ({ onExport }) => {
  const { data, isLoading, isError, error } = useGraficaQuery();
  const chartRef = useRef(null);

  const chartData = data?.data
    ? data.data.map((item) => ({
        name: item.name,
        value: item.value,
      }))
    : [];

  const getOption = () => ({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Informacion",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "Bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  });

  const handleExportChartAsImage = () => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.getEchartsInstance();
      const imgBase64 = chartInstance.getDataURL();
      if (typeof onExport === "function") {
        onExport(imgBase64);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      handleExportChartAsImage();
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || "Unknown error"}</p>;
  }

  return (
    <ReactEcharts
      ref={chartRef}
      option={getOption()}
      style={{ height: "600px", width: "100%" }}
    />
  );
};

export default GraficaImages;
