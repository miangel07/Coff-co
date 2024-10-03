import React from 'react';
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
    width: '184px',
    height: "20px",
    borderStyle: 'solid',
    borderWidth: 0,
    borderBottom: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
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
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  Titulos: {
    fontSize: 14,
    fontWeight: 800,
    display: 'flex',
    marginTop: 45,
    marginLeft: 25,
  },
  SubTitulos: {
    fontSize: 14,
    fontWeight: 100,
    display: 'flex',
    marginTop: 15,
    marginLeft: 40,
  },
  Section: {
    display: "flex",
    width: "100%",
    height: 300,
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
    textAlign: 'center',
  },
});

const MyDocument = ({ valor }) => {
  console.log(valor);

  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
  const fecha = `${mes}-${year}`;

  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Image style={styles.img} src={"/logo-sena-verde.jpg"} />
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible Surcolombiano Escuela Nacional de la Calidad del Café</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fila 1, Columna 3</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Image style={styles.img} src={"/imagenes/escuela_nacional_del_cafe.png"} />
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>INFORME  {valor ? valor[0].nombreServicio : ""}</Text>
            </View>
            <View style={styles.tableCol}>
              <View style={styles.subTableRow}>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-1</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-2</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-3</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-4</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.Section}>
          <Text style={styles.Titulos}>1. Objetivo</Text>
          <Text style={styles.SubTitulos}>El objetivo del siguiente informe es presentar los resultados del análisis físico-sensorial obtenidos para la muestra de café {valor ? valor[0].codigo_muestra : ""} descrita a continuación</Text>

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
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Método De Muestreo</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>No especifica</Text></View>
            </View>
            <View style={styles.cuadroRow}>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Método De Muestreo</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].altura : ''}</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Método Para La Preparación De
                La Muestra
              </Text></View>
              <View style={styles.cuadroColLast}><Text style={styles.cuadroText}>{ 'SCA'}</Text></View>
            </View>
          </View>

          <Text style={styles.Titulos}>4. Datos generales del café </Text>
          <View style={styles.cuadro}>
            <View style={styles.cuadroRow}>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Tipo De Proceso</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].variedad : ''}</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Código de la Muestra </Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].codigo_muestra : ''}</Text></View>
            </View>
            <View style={styles.cuadroRow}>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Fecha De Procesamiento</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>{valor ? valor[0].fecha_servicio : ''}</Text></View>
              <View style={styles.cuadroCol}><Text style={styles.cuadroText}>Densidad café verde 
              </Text></View>
              <View style={styles.cuadroColLast}><Text style={styles.cuadroText}>{ 'SCA'}</Text></View>
            </View>
          </View>
        </View>

       
      </Page>
      <Page size="A4" style={{ padding: 20 }}>
      <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Image style={styles.img} src={"/logo-sena-verde.jpg"} />
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible Surcolombiano Escuela Nacional de la Calidad del Café</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fila 1, Columna 3</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Image style={styles.img} src={"/imagenes/escuela_nacional_del_cafe.png"} />
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>INFORME  {valor ? valor[0].nombreServicio : ""}</Text>
            </View>
            <View style={styles.tableCol}>
              <View style={styles.subTableRow}>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-1</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-2</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-3</Text>
                </View>
                <View style={styles.subTableCol}>
                  <Text style={styles.tableCell}>Fila 2, Columna 3-4</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Section}>
          <Text style={styles.Titulos}>5. Análisis Físico</Text>
          <Text style={styles.text}>A continuación, se presentan los defectos hallados en la muestra de café en mayor proporción.</Text>

        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
