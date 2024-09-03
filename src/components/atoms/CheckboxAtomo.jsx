import React, { useEffect, useState } from 'react';
import { Checkbox } from "@nextui-org/react";
import PaginationMolecula from '../molecules/pagination/PaginationMolecula';

const CheckboxAtomo = ({ data, valor, items, onDataChange, cantidad, value }) => {
    const [pages, setPages] = useState(1);
    const [dataArray, setDataArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        // Convierte 'value' en una lista de nombres separados por comas
        const namesArray = value ? String(value).split(',').map(name => name.trim()) : [];

        // Busca los valores correspondientes en los datos
        if (data && namesArray.length > 0) {
            const selectedValues = data
                .filter(d => namesArray.includes(d[items]))
                .map(d => d[valor]);

            setDataArray(selectedValues);
        }
    }, [data, value, items, valor]);

    // Maneja el cambio en el estado del checkbox
    const handleCheckbox = (value, isSelected) => {
        setDataArray((prevDataArray) =>
            isSelected
                ? [...prevDataArray, value]
                : prevDataArray.filter((v) => v !== value)
        );
    };

    useEffect(() => {
        if (onDataChange) {
            onDataChange(dataArray);
        }
    }, [dataArray, onDataChange]);

    // Esto es para manejar el array que la paginación
    const final = pages * cantidad;
    const inicial = final - cantidad;

    // Filtra los datos que se le pasan al componente y crea un nuevo array con los elementos que coinciden con la búsqueda.
    const filteredData = data?.filter(item =>
        item[items].toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcula el número de páginas que según la cantidad de datos que se le pasa al componente
    const numeroPagina = Math.ceil(filteredData?.length / cantidad);
    const DataArrayPaginacion = filteredData.slice(inicial, final);

    // Cambia el número de la página
    const handlePageChange = (page) => {
        setPages(page);
    };

    return (
        <div className='min-w-full '>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            {DataArrayPaginacion.map((item, index) => (
                <div key={index}>
                    <Checkbox
                        size="md"
                        // Maneja la selección del input
                        isSelected={dataArray.includes(item[valor])}
                        // Maneja el evento del click del checkbox y llama a la función handleCheckbox con el valor y el estado del checkbox seleccionado
                        onValueChange={(isSelected) => handleCheckbox(item[valor], isSelected)}
                        value={item[valor] || []}
                        name={item[items]}
                    >
                        {item[items]}
                    </Checkbox>
                </div>
            ))}
            <PaginationMolecula
                initialPage={pages}
                total={numeroPagina}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default CheckboxAtomo;
