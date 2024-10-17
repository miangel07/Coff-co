import React, { useState, useEffect, useCallback } from 'react';
import { usePostExcelMutation } from '../../../store/api/Excel/ExcelApiSlice';
import { useGetTipoServicioQuery } from '../../../store/api/TipoServicio';
import { Button } from "@nextui-org/react";
import SelectAtomo from '../../atoms/SelectDocumentos';
import InputAtomo from '../../atoms/Input';
import { useForm } from "react-hook-form";
import { generateExcel } from '../../organismo/Reportes/ReporteExcel';
import { toast } from 'react-toastify';

const ReporteExcel = () => {
  const [postExcel, { isLoading, isError, error }] = usePostExcelMutation();
  const { data: tiposServicio, isLoading: isLoadingTiposServicio, isError: isErrorTiposServicio } = useGetTipoServicioQuery();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [excelData, setExcelData] = useState(null);
  const [logos, setLogos] = useState([]);

  const processLogos = useCallback((data) => {
    if (data && data.length > 0) {
      const logosString = data[0].logos_rutas;
      const logosArray = logosString.split(',').map(item => ({
        item: item.trim()
      }));
      setLogos(logosArray);
    }
  }, []);

  useEffect(() => {
    if (excelData) {
      processLogos(excelData);
    }
  }, [excelData, processLogos]);

  const onSubmit = async (data) => {
    try {
      const result = await postExcel({
        idTipoServicio: data.idTipoServicio,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin
      }).unwrap();
      setExcelData(result);
      generateExcel(result, logos);
      toast.success('Excel generado con éxito. Revisa tu carpeta de descargas.');
    } catch (err) {
      console.error('Error al generar el Excel:', err);
      toast.error(err.error || 'Error al generar el Excel');
    }
  };

  if (isLoadingTiposServicio) {
    return <div>Cargando tipos de servicio...</div>;
  }

  if (isErrorTiposServicio) {
    return <div>Error al cargar los tipos de servicio. Por favor, intenta de nuevo más tarde.</div>;
  }

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
            required
          />
        </div>
        <div className="mb-3">
          <InputAtomo
            type="date"
            placeholder="Fecha Inicio"
            id="fechaInicio"
            name="fechaInicio"
            erros={errors}
            register={register}
            required
          />
        </div>
        <div className="mb-3">
          <InputAtomo
            type="date"
            placeholder="Fecha Fin"
            id="fechaFin"
            name="fechaFin"
            erros={errors}
            register={register}
            required
          />
        </div>
        <Button type="submit" color="primary" disabled={isLoading}>
          {isLoading ? 'Generando...' : 'Obtener Datos'}
        </Button>
      </form>

      {isLoading && <p>Generando Excel...</p>}
      {isError && <p>Error al generar el Excel: {error?.error || 'Error desconocido'}</p>}
      
      {excelData && <p>Excel generado con éxito. Revisa tu carpeta de descargas.</p>}
    </div>
  );
};

export default ReporteExcel;