import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos para la tabla y el documento
const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    height: '100px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    display: "flex",
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    display: "flex",
    width: '60%',
    borderStyle: 'solid',
    justifyContent: "center",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColimg: {
    display: "flex",
    width: '111px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColTitle: {
    display: "flex",
    width: '2/3',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  subTableRow: {
    margin: 'auto',
    flexDirection: 'column',
  },
  subTableCol: {
    display: "flex",
    width: '111px',
    borderWidth: 0,
    borderBottom: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    fontSize: 10,
    height: "auto",
    marginLeft: 15,
    textAlign: "left",
  },
  pageTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  img: {
    width: "auto",
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  text: {
    fontSize: 12,
    marginTop: 0,
    marginLeft: 'auto',
    justifyContent: 'center',
    height: "auto",
    textAlign: 'center',
    marginRight: 'auto',
    display: 'flex',
  },
  textinforme: {
    fontSize: 12,
    marginLeft: 85,
    display: 'flex',
  },
  Titulos: {
    fontSize: 14,
    fontWeight: 800,
    display: 'flex',
    marginTop: 30,
    marginLeft: 25,
  },
  SubTitulos: {
    fontSize: 12,
    fontWeight: 100,
    display: 'flex',
    marginTop: 8,
    marginLeft: 40,
  },
  Section: {
    display: "flex",
    width: "100%",
    height: "auto",
    marginTop: 2,
  },
  cuadro: {
    display: 'table',
    width: '100%',
    marginTop: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
  cuadroRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 2

  },
  cuadroCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  cuadroCol2: {
    width: '100%',
    borderStyle: 'solid',
    border: "collapse",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderLeft: 1,
    borderColor: 'black',
    padding: 5,
  },

  cuadroCol1: {
    width: '100%',
    borderStyle: 'solid',
    border: "collapse",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeft: 1,
    borderColor: 'black',
    padding: 5,
  },
  cuadroColLast: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  cuadroText: {
    fontSize: 10,
    width: "100%",
    textAlign: 'center',

  },

  linea: {
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderTop: 1,
    height: '30px',
    textAlign: 'center',
    display: "flex",
    justifyContent: "center",
    width: "100%",
    borderBottomWidth: 1,

    marginTop: 15,

  },
  text1: {
    fontSize: 12,
    marginTop: 10,
    display: 'flex',
  },

});

const MyDocument = ({ valor }) => {
  console.log(valor);
  const [mappedVariables, setMappedVariables] = useState([]);
  const [logos, setLogos] = useState([]);
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const fecha = `${mes}-${year}`;



  useEffect(() => {
    if (valor && valor.length > 0) {
      const variablesString = valor[0].variables;
      const variablesArray = variablesString.split(',').map(item => {
        const [key, value] = item.split(':').map(part => part.trim());
        return { key, value };
      });
      setMappedVariables(variablesArray);

    }
    if (valor && valor.length > 0) {
      const logosString = valor[0].logo_ruta;
      const logos = logosString.split(',').map(item => {
        return { item: item.trim() };
      });
      setLogos(logos);

    }
  }, [valor]);
console.log(logos[1]?.item || "");

  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <View style={styles.table} fixed>
          <View style={styles.tableRow}>
            <View style={styles.tableColimg}>
            <Image style={styles.img} src={`${import.meta.env.VITE_BASE_URL_LOGOS}/${logos[0]?.item || ""}`} />
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible Surcolombiano Escuela Nacional de la Calidad del Café</Text>
            </View>
            <View style={styles.tableColimg}>
            <Image style={styles.img} src={`${import.meta.env.VITE_BASE_URL_LOGOS}/${logos[1]?.item || ""}`} />
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColimg}>
            <Image style={styles.img} src={`${import.meta.env.VITE_BASE_URL_LOGOS}/${logos[2]?.item || ""}`} />
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.textinforme}>Informe  {valor ? valor[0].nombreServicio : ""}</Text>
            </View>
            <View style={styles.tableColimg}>
              <View style={styles.subTableRow}>{/* codigo_documentos */}
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>{valor ? valor[0].codigo_documentos : ""}</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>{valor ? valor[0].version : ""}</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>{valor ? valor[0].fecha_version : ""}</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell} render={({ pageNumber, totalPages }) =>
                    (`Página ${pageNumber} de ${totalPages}`)}></Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.Section}>
          <Text style={styles.Titulos}>1. Objetivo</Text>
          <Text style={styles.SubTitulos}>El objetivo del siguiente informe es presentar los resultados del {valor ? valor[0].nombreServicio : ""} obtenidos para la muestra de café {valor ? valor[0].codigo_muestra : ""} descrita a continuación</Text>

          <Text style={styles.Titulos}>2. Información General</Text>
          <Text style={styles.SubTitulos}>- Productor: {valor ? valor[0].nombre_usuario : ""}</Text>
          <Text style={styles.SubTitulos}>- Departamento: Huila</Text>
          <Text style={styles.SubTitulos}>- Municipio: {valor ? valor[0].municipio : ""}</Text>
          <Text style={styles.SubTitulos}>- Vereda: {valor ? valor[0].vereda : "No especifica"}</Text>
          <Text style={styles.SubTitulos}>- Finca: {valor ? valor[0].nombre_finca : "No especifica"}</Text>
          <Text style={styles.SubTitulos}>- Código Externo: {valor ? valor[0].codigo_externo : "No especifica"}</Text>
          <Text style={styles.SubTitulos}>- Consecutivo Informe: {`INF-${fecha}`}</Text>
        </View>

        <View style={styles.Section}>
          <Text style={styles.Titulos}>3. Especificaciones del café</Text>
          <View style={styles.cuadro}>
            <View style={styles.cuadroRow}>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Variedad</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].variedad : ''}</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Altura</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].altura : ''}</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Observaciones</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].observaciones : ''}</Text></View>
            </View>

          </View>

          <Text style={styles.Titulos}>4. Datos generales del café </Text>
          <View style={styles.cuadro}>
            <View style={styles.cuadroRow}>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Fecha De Procesamiento</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].fecha_servicio : ''}</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Código de la Muestra </Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].codigo_muestra : ''}</Text></View>
            </View>
          </View>
        </View>


      </Page>
      <Page size="A4" style={{ padding: 20 }} >
        <View style={styles.table} fixed>
          <View style={styles.tableRow}>
            <View style={styles.tableColimg}>
              <Image style={styles.img} src={"/logo-sena-verde.jpg"} />
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible Surcolombiano Escuela Nacional de la Calidad del Café</Text>
            </View>
            <View style={styles.tableColimg}>
              <Text style={styles.tableCell}>Fila 1, Columna 3</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColimg}>
              <Image style={styles.img} src={"/imagenes/escuela_nacional_del_cafe.png"} />
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.textinforme}>Informe  {valor ? valor[0].nombreServicio : ""}</Text>
            </View>
            <View style={styles.tableColimg}>
              <View style={styles.subTableRow}>{/* codigo_documentos */}
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>{valor ? valor[0].codigo_documentos : ""}</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>{valor ? valor[0].version : ""}</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>{valor ? valor[0].fecha_version : ""}</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell} render={({ pageNumber, totalPages }) =>
                    (`Página ${pageNumber} de ${totalPages}`)}></Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Section}>
          <Text style={styles.Titulos}>5. {valor ? valor[0].nombreServicio : ""}</Text>
          <Text style={styles.text1}>A continuación, se presentan los datos recolectados en las muestra Segun el servicio</Text>
          <View style={styles.linea}><Text style={styles.cuadroText}>datos {valor ? valor[0].nombreServicio : ""}</Text></View>
          {mappedVariables.map((variable, index) => (

            <View key={index} style={styles.cuadroRow}>

              <View style={styles.cuadroCol2}><Text style={styles.cuadroText}>{variable.key}:</Text></View>
              <View style={styles.cuadroCol1}><Text style={styles.cuadroText}> {variable.value}</Text></View>
            </View>
          ))}
        </View>
        <Text style={styles.text1}> Cantidad de salida : {valor ? valor[0].cantidad_salida : ""}</Text>



      </Page>
    </Document>
  );
};

export default MyDocument;
