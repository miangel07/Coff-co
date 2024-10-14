import React, { useState, useEffect } from 'react';
import { usePostExcelMutation } from '../../../store/api/Excel/ExcelApiSlice';
import { useGetTipoServicioQuery } from '../../../store/api/TipoServicio';
import { Button } from "@nextui-org/react";
import SelectAtomo from '../../atoms/SelectDocumentos';
import InputAtomo from '../../atoms/Input';
import { useForm } from "react-hook-form";
import { generateExcel } from '../../organismo/Reportes/ReporteExcel';


const ReporteExcel = () => {
  const [postExcel, { isLoading, isError }] = usePostExcelMutation();
  const { data: tiposServicio } = useGetTipoServicioQuery();
  const { register, handleSubmit, setValue, watch } = useForm();
  const [excelData, setExcelData] = useState(null);
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    if (excelData && excelData.length > 0) {
      const logosString = excelData[0].logos_rutas;
      const logosArray = logosString.split(',').map(item => ({
        item: item.trim()
      }));
      setLogos(logosArray);
    }
  }, [excelData]);

  const onSubmit = async (data) => {
    try {
      const result = await postExcel({
        idTipoServicio: data.idTipoServicio,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin
      }).unwrap();
      setExcelData(result);
      generateExcel(result, logos);
    } catch (error) {
      console.error('Error al generar el Excel:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Generar Reporte Excel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="mb-3">
          <SelectAtomo
            data={tiposServicio}
            label="Tipo de Servicio"
            onChange={(e) => setValue('idTipoServicio', e.target.value)}
            items="idTipoServicio"
            ValueItem="nombreServicio"
            value={watch('idTipoServicio')}
          />
        </div>
        <div className="mb-3">
          <InputAtomo
            type="date"
            placeholder="Fecha Inicio"
            id="fechaInicio"
            name="fechaInicio"
            erros={{}}
            register={register}
          />
        </div>
        <div className="mb-3">
          <InputAtomo
            type="date"
            placeholder="Fecha Fin"
            id="fechaFin"
            name="fechaFin"
            erros={{}}
            register={register}
          />
        </div>
        <Button type="submit" color="primary">
          Obtener Datos
        </Button>
      </form>

      {isLoading && <p>Generando Excel...</p>}
      {isError && <p>Error al generar el Excel</p>}
      
      {excelData && <p>Excel generado con éxito. Revisa tu carpeta de descargas.</p>}
    </div>
  );
};

export default ReporteExcel;