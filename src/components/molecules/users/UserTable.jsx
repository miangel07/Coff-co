import MUIDataTable from "mui-datatables";
import { useGetusersQuery } from "../../../store/api/users";

const UserTable = () => {

  const { data, error, isLoading } = useGetusersQuery();

  const columnas = [
    {
      name: "id_usuario",
      label: "ID"
    },
    {
      name: "nombre",
      label: "NOMBRES"
    },
    {
        name: "apellidos",
        label: "APELLIDOS"
    },
    {
      name: "correo_electronico",
      label: "CORREO"
    },
    {
      name: "telefono",
      label: "TELEFONO"
    },
    {
      name: "numero_documento",
      label: "DOCUMENTO"
    },
    {
      name: "tipo_documento",
      label: "TIPO"
    },
    {
        name: "estado",
        label: "ESTADO"  
    },
    {
        name: "fk_idRol",
        label: "ROL"
    }
  ];

  const options = {
    selectableRows: "none",
    // elevation: 0,
    rowsPerPage: 7,
    rowsPerPageOptions: [7, 10, 15],

    textLabels: { 
        filter: {
            all: "Todo",
            title: "FILTROS", 
            reset: "RESETEAR",
        },
        viewColumns: { 
            title: "Mostrar/Ocultar Columnas"
        },
        body: {
            noMatch: "No se encontraron resultados",
            toolTip: "Ordenar"
          },
        toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver columnas",
            filterTable: "Filtrar tabla",
          },
        pagination: {
          next: "Siguiente página",
          previous: "Página anterior",
          rowsPerPage: "Filas por página:",
          displayRows: "de",
        },
      }, 
    
  }

  return (
    <>
      <MUIDataTable
        title={"Usuarios"}
        data={data}
        columns={columnas}
        options={options}
      />
    </>
  );
};

export default UserTable;
