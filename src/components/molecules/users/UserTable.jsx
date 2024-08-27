import MUIDataTable from "mui-datatables";
import { useGetusersQuery } from "../../../store/api/users";
import { Button } from "@mui/material"; // Puedes usar el botón de Material-UI u otro de tu preferencia

const UserTable = () => {
  const { data, error, isLoading } = useGetusersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Funciones para manejar las acciones
  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
    // Aquí iría la lógica para editar el usuario
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
    // Aquí iría la lógica para eliminar el usuario
  };

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
    },
    {
      name: "acciones",
      label: "ACCIONES",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const userId = tableMeta.rowData;
          return (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(userId)}
                style={{ marginRight: "8px" }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(userId)}
              >
                Eliminar
              </Button>
            </div>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 5,
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
  };

  return (
    <MUIDataTable
      title={"Usuarios"}
      data={data}
      columns={columnas}
      options={options}
    />
  );
};

export default UserTable;
