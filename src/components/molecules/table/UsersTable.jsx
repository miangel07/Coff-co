import { createTheme} from '@mui/material';
import React, { useState } from 'react';

//ESTILOS DE LA TABLA
export const getMuiTheme = () => 
    createTheme ({
    tableContainer: {
        position: 'relative',
        zIndex: 1, // Asegúrate de que este valor sea menor que el del botón
      },

    //TABLE COLORS
    palette: {
        background: {
            paper: '#ffffff',
        },
        // mode: "dark",
    },

    components: {

        MuiTypographyroot: {
            styleOverrides: {
                color: '#ffffff',
            },
        },

        //SIZE OF THE SUBMENUS OF THE FUNCTION BUTTONS
        MuiPopover: {
            styleOverrides: {
              paper: {
                maxWidth: 'calc(50% - 32px)', 
                maxHeight: 'calc(40% - 32px)',
              },
            },
          },
          
        //TITULO DEL SHOW HIDE COLUMNS
        MUIDataTableViewCol:{
            styleOverrides:{
                title:{
                    paddingRight : '30px',
                }
            }
        },

        //PADING DEL SELECTIONABLE ROWS
        MuiMenu:{
            styleOverrides:{
                list: {
                    padding: "5px",
                },
            },
        },

        //PADING DEL SHOW HIDE COLUMNS
        MuiFormControl:{
            styleOverrides:{

                root: {
                    padding: "20px",
                },
            },
        },

        //PADING DEL FILTRO
        MUIDataTableFilter: {
            styleOverrides:{
              root: {
                  padding: "20px", 
              }
            }
        },

        //PADDING OF THE HEADER & COLUMNS & ROWS
        MuiTableCell:{
            styleOverrides:{
                head:{
                    padding:"10px 4px"
                },
                body:{
                    padding: "7px 15px",     
                },
            }
        }
        
    }
})

//OPCIONES PARA DETALLES DE ESTILOS DE LA TABLA
export const options = {
    selectableRows: "none",
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

