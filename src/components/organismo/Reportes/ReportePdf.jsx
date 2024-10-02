import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
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
    fontWeight: 8000,
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



  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={{ padding: 20 }}>


      <View style={styles.table}>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Image style={styles.img} src={"/logo-sena-verde.jpg"} />
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible
              Surcolombiano
              Escuela Nacional de la Calidad del Café</Text>
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
            <Text style={styles.text}>INFORME SERVICIO</Text>
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

        {/*  Productor: Vicente Rojas Rojas
• Departamento: Huila 
• Municipio: Pitalito
• Vereda: Guacacallo
• Finca: No especifica
• Código Externo: No especifica 
• Consecutivo Informe: INF-07-2024 */}
        <Text style={styles.Titulos} >1. Objetivo</Text>
        <Text style={styles.SubTitulos}>El objetivo del siguiente informe es presentar los resultados del análisis físico-sensorial obtenidos para
          la muestra de café  "codigo de mustra"  descrita a continuación</Text>

        <Text style={styles.Titulos} >2. Información General</Text>
        <Text style={styles.SubTitulos} >- Productor:</Text>
        <Text style={styles.SubTitulos} >- Departamento: Huila</Text>
        <Text style={styles.SubTitulos} >- Municipio: Pitalito</Text>
        <Text style={styles.SubTitulos} >- Vereda: Guacacallo</Text>
        <Text style={styles.SubTitulos} >- Finca: No especifica</Text>
   <Text style={styles.SubTitulos} >- Código Externo: No especifica </Text>
        <Text style={styles.SubTitulos} >- Consecutivo Informe: INF-07-2024</Text>




      </View>


    </Page>
  </Document>
);


const RepotePdf = () => (
  <div>
    <PDFDownloadLink document={<MyDocument />} fileName="tabla-ejemplo.pdf">
      {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
    </PDFDownloadLink>
    <PDFViewer className='w-full h-screen'>
      <MyDocument />
    </PDFViewer>
  </div>
);

export default RepotePdf;
