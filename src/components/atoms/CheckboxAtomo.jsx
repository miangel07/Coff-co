import React, { useEffect, useState } from 'react';
import { Checkbox } from "@nextui-org/react";
import PaginationMolecula from '../molecules/pagination/PaginationMolecula';

const CheckboxAtomo = ({ data, valor, items, onDataChange, cantidad }) => {
    const [pages, setPages] = useState(1);
    const [dataArray, setDataArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // esto es para manejar el array que la peginacion 
    const final = pages * cantidad;
    const inicial = final - cantidad;

    // Filtra los datos que se le pasan al componente y crea un nuevo array con los elementos que coinciden con la búsqueda.
    const filteredData = data?.filter(item =>

        item[items].toLowerCase().includes(searchTerm.toLowerCase())
    );
    // calcula en numero de paginas que segun la cantidad de datos que se le pasa al componete 
    const numeroPagina = Math.ceil(filteredData?.length / cantidad);
    const DataArrayPaginacion = filteredData.slice(inicial, final);
    //cambia el numero de la pagina 
    const handlePageChange = (page) => {
        setPages(page);
    };
    //
    // Maneja el cambio en el estado del checkbox. Agrega o elimina el valor del checkbox del array de datos seleccionados basado en si el checkbox está seleccionado o no.
    const handleCheckbox = (value, isSelected) => {
        // Actualiza el estado 'dataArray' basado en si el checkbox está seleccionado o no.
        setDataArray((prevDataArray) =>
            // Si el checkbox está seleccionado ('isSelected' es true), agrega el valor al array de datos seleccionados.
            isSelected
                ? [...prevDataArray, value] // Crea una copia del array previo y agrega el nuevo valor.
                : prevDataArray.filter((v) => v !== value) // Si no está seleccionado, filtra el array previo eliminando el valor.
        );
    };

    useEffect(() => {
        if (onDataChange) {
            onDataChange(dataArray);
        }
    }, [dataArray, onDataChange]);

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
                        //maneja la selecion del input
                        isSelected={dataArray.includes(item[valor])}
                        //maneja el evento del click del checkbox y llama a la funcion handleCheckbox con el valor y el estado del checkbox seleccionado
                        onValueChange={(isSelected) => handleCheckbox(item[valor], isSelected)}
                        value={item[valor]}
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
