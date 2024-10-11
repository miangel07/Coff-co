import React from "react";
import { Page, Document, Text, View, Image, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: "white",
    },
    section: {
        marginBottom: 10,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 10,
        alignSelf: 'left',
    },
    header: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
        color: "#000",
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 10,
        color: "#2c3e50",
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#34495e",
    },
    table: {
        display: "table",
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        marginTop: 15,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        alignItems: 'center',
    },
    tableCol: {
        width: "33.33%", 
        borderRightWidth: 1, 
        borderRightColor: "#ccc",
        padding: 10,
    },
    tableCell: {
        fontSize: 12,
        color: "#34495e",
        textAlign: 'center',
    },
    tableHeader: {
        backgroundColor: "#7f8c8d",
        borderBottomWidth: 2,
        borderBottomColor: "#34495e",
    },
    tableHeaderCell: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#fff",
    },
    total: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'right',
        fontWeight: 'bold',
        color: "#000",
    },
});

const FacturaAlquile = ({ data }) => {
    if (!data) {
        return (
            <Document>
                <Page style={styles.page}>
                    <Text>No hay datos disponibles</Text>
                </Page>
            </Document>
        );
    }

    return (
        <Document>
            <Page style={styles.page}>
                <Image
                    style={styles.logo}
                    src="/logo-sena-verde.jpg"
                />

                <Text style={styles.header}>Factura</Text>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Información del Cliente</Text>
                    <Text style={styles.text}>Nombre: {data.nombre} {data.apellidos}</Text>
                    <Text style={styles.text}>Tipo de Documento: {data.tipo_documento?.toUpperCase()}</Text>
                    <Text style={styles.text}>Número de Documento:  {data.cedula}</Text>
                    <Text style={styles.text}>Correo: {data.correo_electronico}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Detalles de la Factura</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderCell}>Estado</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderCell}>Fecha de Inicio</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderCell}>Fecha de Fin</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.estado}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.fecha}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.fecha_fin}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={styles.total}>Total: ${data.precio}</Text>
            </Page>
        </Document>
    );
};

export default FacturaAlquile;
