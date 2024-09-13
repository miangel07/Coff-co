import React, { useEffect, useState } from "react";
import TableMolecula from "../../molecules/table/TableMolecula";
import Thead from "../../molecules/table/Thead";
import Th from "../../atoms/Th";
import Tbody from "../../molecules/table/Tbody";
import { useGetMuestrasQuery } from "../../../store/api/muestra";
import Td from "../../atoms/Td";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useGeneraFacturaMutation } from "../../../store/api/factura";
import { toast } from "react-toastify";
import { pdf } from '@react-pdf/renderer';
import Facturapdf from "../../organismo/Reportes/Facturapdf";


const FacturasPlantilla = () => {
  const [datosFactura, setDatosDelFormulario] = useState([]);
  const { data, isLoading, isError, error } = useGetMuestrasQuery();
  const [generaFactura, { isLoading: isLoadingFactura, isSuccess, data: dataFactura }] = useGeneraFacturaMutation();

  const handleFactura = async (codigo) => {
    try {
      const response = await generaFactura({ codigo });
      setDatosDelFormulario(response.data);
    } catch (error) {
      toast.error('Error al generar la factura');
    }
  };

  console.log(datosFactura)
  useEffect(() => {
    const downloadPDF = async () => {
      if (datosFactura.length > 0) {
        const blob = await pdf(<Facturapdf data={datosFactura[0]} />).toBlob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `factura_${datosFactura[0].codigo_muestra}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        setDatosDelFormulario([])
      }
    };

    downloadPDF();
  }, [datosFactura]);

  if (isLoading || isLoadingFactura) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-full mt-5 gap-4 flex flex-wrap flex-col">
      <h2 className="text-2xl px-20  font-bold">Factura</h2>
      <div className="w-full px-20 overflow-x-auto ">
        <TableMolecula>
          <Thead>
            <Th>ID</Th>
            <Th>Código</Th>
            <Th>Cantidad</Th>
            <Th>Fecha</Th>
            <Th>Finca</Th>
            <Th>Usuario</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Thead>
          <Tbody>
            {data?.map((muestra) => (
              <tr key={muestra.id_muestra}>
                <Td>{muestra.id_muestra}</Td>
                <Td>{muestra.codigo_muestra}</Td>
                <Td>{muestra.cantidadEntrada}</Td>
                <Td>{muestra.fecha_muestra}</Td>
                <Td>{muestra.finca}</Td>
                <Td>{muestra.usuario}</Td>
                <Td>{muestra.estado}</Td>
                <Td>
                  <FaFileInvoiceDollar
                    size={"30px"}
                    className="cursor-pointer"
                    onClick={() => handleFactura(muestra.codigo_muestra)}
                  />
                </Td>
              </tr>
            ))}
          </Tbody>
        </TableMolecula>
      </div>
    </section>
  );
};

export default FacturasPlantilla;
