import React, { useState, useContext } from "react";
import { Page, Document, Text, Image, StyleSheet } from "@react-pdf/renderer";



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

const PdfDocuments = ({ data }) => {
  console.log(data)


  return (
    <>
      <Document>
        <Page>
          <Text>{data.codigo_muestra}</Text>


        </Page>
      </Document>
    </>
  );
};

export default PdfDocuments;
