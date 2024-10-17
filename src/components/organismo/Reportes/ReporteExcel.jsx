import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const generateExcel = async (data) => {
  if (!data || data.length === 0) return;
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte', {
    pageSetup: { paperSize: 9, orientation: 'landscape' }
  });

  // Procesar logos
  const logosRutas = data[0].logos_rutas.split(', ');
  
  const logoPromises = logosRutas.map(async (logo, index) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL_LOGOS}/${logo}`);
      const arrayBuffer = await response.arrayBuffer();
      const logoId = workbook.addImage({
        buffer: arrayBuffer,
        extension: 'png',
      });
      
      // Ajustar la posición y tamaño de las imágenes
      if (index === 0) {
        // Primera imagen (izquierda)
        worksheet.addImage(logoId, {
          tl: { col: 0, row: 0 },
          ext: { width: 100, height: 50 }
        });
      } else if (index === 1) {
        // Segunda imagen (centro-arriba)
        worksheet.addImage(logoId, {
          tl: { col: 0, row: 2 },
          ext: { width: 100, height: 50 }
        });
      } else if (index === 2) {
        // Tercera imagen (derecha)
        worksheet.addImage(logoId, {
          tl: { col: 11, row: 0 },
          ext: { width: 100, height: 50 }
        });
      }
    } catch (error) {
      console.error(`Error al cargar el logo ${logo}:`, error);
    }
  });

  await Promise.all(logoPromises);

  // Ajustar altura de la primera fila para acomodar las imágenes
  worksheet.getRow(1).height = 40;

  // Estilos
  const titleStyle = {
    font: { bold: true, size: 12 },
    alignment: { horizontal: 'center', vertical: 'middle' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };

  const headerStyle = {
    font: { bold: true, size: 10 },
    alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E0E0E0' } }
  };

  // Configurar encabezados y estilos
  worksheet.mergeCells('A2:K2');
  worksheet.getCell('A2').value = 'Centro de Gestión y Desarrollo Sostenible Surcolombiano';
  worksheet.getCell('A2').style = titleStyle;

  worksheet.mergeCells('A3:K3');
  worksheet.getCell('A3').value = 'Escuela Nacional de la Calidad del Café';
  worksheet.getCell('A3').style = titleStyle;

  worksheet.mergeCells('A4:K4');
  worksheet.getCell('A4').value = `FORMATO RECEPCIÓN DE MUESTRAS - ${data[0].nombre_tipo_servicio}`;
  worksheet.getCell('A4').style = titleStyle;

  // Añadir información del documento
  worksheet.getCell('L2').value = `CÓDIGO: ${data[0].codigo_documento}`;
  worksheet.getCell('L3').value = `VERSIÓN: ${data[0].version_documento}`;
  worksheet.getCell('L4').value = `FECHA DE EMISIÓN: ${data[0].fecha_emision_documento}`;
  ['L2', 'L3', 'L4'].forEach(cell => {
    worksheet.getCell(cell).style = {
      font: { size: 10 },
      alignment: { horizontal: 'left', vertical: 'middle' },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };
  });

  // Añadir encabezados de sección
  worksheet.mergeCells('A6:D6');
  worksheet.getCell('A6').value = 'INGRESO';
  worksheet.getCell('A6').style = headerStyle;

  worksheet.mergeCells('E6:H6');
  worksheet.getCell('E6').value = 'DATOS - PRODUCTOR';
  worksheet.getCell('E6').style = headerStyle;

  worksheet.mergeCells('I6:L6');
  worksheet.getCell('I6').value = 'ORIGEN DE MATERIA PRIMA';
  worksheet.getCell('I6').style = headerStyle;

  // Añadir encabezados de columna
  const headers = ['Cod.', 'FECHA', 'CANTIDAD (Kg)', 'QUIEN RECIBE', 'NOMBRE /RAZON SOCIAL', 'NIT/C.C.', 'NUMERO', 'TELEFONO', 'MUNICIPIO', 'VARIEDAD', 'ALTURA (MSNM)', 'OBSERVACIONES'];
  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.style = headerStyle;
  });

  // Añadir datos
  data.forEach((item) => {
    const row = worksheet.addRow([
      item.codigo_muestra,
      item.fecha_muestra,
      item.cantidad_muestra,
      item.nombre_recibido,
      item.nombre_cliente,
      item.tipo_documento_cliente.toUpperCase(),
      item.numero_documento_cliente,
      item.telefono_cliente,
      item.municipio_muestra,
      item.variedad_muestra,
      item.altura_muestra,
      item.observaciones_muestra
    ]);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });

  // Ajustar ancho de columnas
  worksheet.columns.forEach((column, index) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = Math.min(maxLength + 2, 20);
  });

  // Generar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `reporte_${data[0].nombre_tipo_servicio.toLowerCase().replace(/ /g, '_')}.xlsx`);
};