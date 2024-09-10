import React, { useState } from "react";
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

const PdfDocuments = () => {
  const [imagen, setImagen] = useState();

  const onExport = (img) => {
    setImagen(img);
  };

  console.log(imagen);
  return (
    <>
      <GraficaImages onExport={onExport} />
      <Document>
        <Page>
          <Text>hola</Text>
          <Image src={imagen} />
        </Page>
      </Document>
    </>
  );
};

export default PdfDocuments;
