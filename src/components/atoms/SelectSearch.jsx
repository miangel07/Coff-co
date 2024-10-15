import React, { useState, useEffect } from 'react';
import TableMolecula from '../molecules/table/TableMolecula';
import Thead from '../molecules/table/Thead';
import Tbody from '../molecules/table/Tbody';
import Th from './Th';
import Td from './Td';
import PaginationMolecula from '../molecules/pagination/PaginationMolecula';
import Mybutton from './Mybutton';

const SelectSearch = ({ label, valueCampos, onChange, data, idKey, labelKey, placeholder }) => {
  //COMO USARLO 
  //___________________________LO DECLARA NORMAL DONDE LO VALLAN A USAR
  /*     <SelectSearch
          label="Usuario">> el label normal
          valueCampos={[ >> estos son los campos de la tabla 
            {
              value: "nombre",>>> este es value de la tabla ose lo que va en Tbody 
              label: "Nombre">>> esto es lo que va en el thead
            }

          ]}
          data={dataUsuarios}>>> los datos para mapearlos
          idKey="id_usuario">> el valor que toma al darle selecionar 
          labelKey="nombre">>> lo que se va acargar al input del serch
          onChange={(value) => setUsuario(value)} este es el valor que se seleciono en el search osea idKey que es id_usuario 
        /> */
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [showTable, setShowTable] = useState(true);
  const [pages, setPages] = useState(1);

  const cantidad = 4;
  const final = pages * cantidad;
  const inicial = final - cantidad;
  const numeroPagina = Math.ceil((filteredData?.length > 0 || 0) / cantidad)
  const DataArrayPaginacion = filteredData
    ? filteredData?.slice(inicial, final)
    : [];
  const handlePageChange = (page) => {
    setPages(page);
  };
  useEffect(() => {

    if (filter === '') {
      setShowTable(true);
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item[labelKey].toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [filter, data, labelKey]);

  const handleSelect = (item) => {
    onChange(item[idKey]);
    setFilter(item[labelKey]);
    setShowTable(false);
  };

  return (
    <div>
      <label htmlFor={label}>{label}</label>

      <input
        type="text"
        id={label}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={placeholder || `Buscar ${label}`}
        className="border p-2 w-full mb-4"
      />


      {showTable && (
        <>
          <TableMolecula className="w-full table-auto border-collapse">
            <Thead>
              {valueCampos.map((campo, index) => (
                <Th key={index} className="border px-4 py-2">
                  {campo.label}
                </Th>
              ))}
              <Th className="border px-4 py-2">Acciones</Th>

            </Thead>
            <Tbody>

              {DataArrayPaginacion.map((item) => (
                <tr key={item[idKey]}>

                  {valueCampos.map((campo, index) => (
                    <Td key={index} className="border px-4 py-2">
                      {item[campo.value] || '-'}
                    </Td>
                  ))}
                  <Td className="border px-4 py-2">
                    <Mybutton
                      onClick={() => handleSelect(item)}
                      color={"primary"}
                    >
                      Seleccionar
                    </Mybutton>
                  </Td>
                </tr>
              ))}
            </Tbody>
          </TableMolecula>
          <PaginationMolecula
            total={numeroPagina}
            initialPage={pages}
            onChange={handlePageChange}
          />
        </>

      )}
    </div>
  );
};

export default SelectSearch;
