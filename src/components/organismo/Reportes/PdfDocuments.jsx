import React, { useState, useContext } from "react";
import { Page, Document, Text, Image, StyleSheet} from "@react-pdf/renderer";
import GraficaImages from "../../molecules/graficas/GraficaImages";


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    color: "red",
    justifyContent: "center",
    display: "flex",
    fontSize: "32px",
  },
  image: {
    width: "100%",
    height: "400px",
    backgroundColor: "red",
  },
});

const PdfDocuments = ({ imageData }) => {



  return (
    <>
      <Document>
        <Page>
          <Text>hola</Text>
          {
            imageData &&
            <Image src={imageData} style={styles.image} />
          }

        </Page>
      </Document>
    </>
  );
};

export default PdfDocuments;
