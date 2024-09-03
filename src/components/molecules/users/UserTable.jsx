import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material";
import { getMuiTheme } from "../table/UsersTable";
import { options } from "../table/UsersTable";
import styled from 'styled-components';
import { useGetusersQuery } from "../../../store/api/users";

const UserTable = () => {

  const { data } = useGetusersQuery();

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
        name: "rol",
        label: "ROL"
    },
    { 
      name: "opciones", 
      label: "EDITAR",
      options: {
          customBodyRenderLite: (dataIndex) => (
              <button className='btnActualizar' onClick={() => editUsuario(usuarios[dataIndex])}> 
                  <svg className='icon-default' xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                  <svg className='icon-hover' xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                  </svg>
              </button>
          ),
          columns: false,
          filter: false,
      }
  },
];

  return (
    <StyledContainer>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Usuarios"}
          data={data}
          columns={columnas}
          options={options}
        />
      </ThemeProvider>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  .btnActualizar{
        background: none;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        height:30px;
        width: 60px;
        border-radius: 5px;
        border: none;
        .icon-default{
            display: block;
        }
        .icon-hover{
                display:none
        }
}

.btnActualizar:hover{
    border-radius: 100px;
    background:rgba(128, 128, 128, 0.3);
        .icon-default{
            display: none;
        }
        .icon-hover{
            display:block
        }
}
`

export default UserTable;
