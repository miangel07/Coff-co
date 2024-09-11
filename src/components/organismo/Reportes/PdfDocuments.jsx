import React, { useState, useContext } from "react";
import { Page, Document, Text, Image } from "@react-pdf/renderer";
import GraficaImages from "../../molecules/graficas/GraficaImages";


/* const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    color: "red",
    justifyContent: "center",
    display: "flex",
    fontSize: "32px",
  },
  image: {
    width: "100%",
    height: "50%",
  },
}); */

const PdfDocuments = ({ imageData }) => {



  return (
    <>
      <Document>
        <Page>
          <Text>hola</Text>
          {
            imageData &&
            <Image src={imageData} style={{ width: "600px", height: "auto" }} />
          }

        </Page>
      </Document>
    </>
  );
};

export default PdfDocuments;
