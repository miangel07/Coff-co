import React from "react";
import { Page, Document, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Estilos para el documento PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        backgroundColor: "white",
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 10,
        alignSelf: 'left',
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#333",
    },
    section: {
        marginBottom: 20,
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: "#444",
    },
    text: {
        marginBottom: 5,
        color: "#555",
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 20,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f5f5f5",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    tableCell: {
        margin: 5,
        padding: 10,
        fontSize: 12,
        borderColor: "#ddd",
        borderRightWidth: 1,
        textAlign: "left",
        color: "#333",
    },
    tableCellHeader: {
        margin: 5,
        padding: 10,
        fontSize: 12,
        fontWeight: 'bold',
        borderColor: "#ddd",
        borderRightWidth: 1,
        textAlign: "left",
        color: "#333",
    },
    total: {
        textAlign: "right",
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000",
    },
});

const Facturapdf = ({ data }) => {
    // Asignar valores predeterminados para evitar errores si data es undefined
    const {
        apellido_usuario = "",
        cantidadEntrada = "",
        cantidad_salida_servicios = "",
        codigo_muestra = "",
        correo_usuario = "",
        nombre_finca = "",
        nombre_municipio = "",
        nombre_usuario = "",
        precios = "",
        servicios = "",
        total_calculado = "",
        usuarios_servicio = "",
    } = data || {}; // Asegurarse de que data no sea undefined

    // Procesar los datos de servicios, precios, cantidad de salida y usuarios_servicio
    const serviciosArray = servicios.split(", ").map(servicio => servicio.trim());
    const preciosArray = precios.split(", ").map(precio => precio.trim());
    const cantidadSalidaArray = cantidad_salida_servicios.split(", ").map(cantidad => cantidad.trim());
    const usuariosServicioArray = usuarios_servicio.split(", ").map(usuario => usuario.trim());

    return (
        <Document>
            <Page style={styles.page}>
                {/* Logo */}
                <Image
                    style={styles.logo}
                    src="/logo-sena-verde.jpg" // Ruta a la imagen en la carpeta 'public'
                />

                {/* Cabecera */}
                <Text style={styles.header}>Factura de la Muestra {data ? `${data.codigo_muestra}` : ""}</Text>

                {/* Información del Usuario */}
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Información del Cliente</Text>
                    <Text style={styles.text}>Nombre: {nombre_usuario} {apellido_usuario}</Text>
                    <Text style={styles.text}>Correo: {correo_usuario}</Text>
                    <Text style={styles.text}>Finca: {nombre_finca}</Text>
                    <Text style={styles.text}>Municipio: {nombre_municipio}</Text>
                    <Text style={styles.text}>Código de Muestra: {codigo_muestra}</Text>
                    <Text style={styles.text}>Cantidad Entrada: {cantidadEntrada}</Text>
                </View>

                {/* Tabla de servicios, precios, cantidad de salida y responsables */}
                <View style={styles.table}>
                    {/* Encabezado de la tabla */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCellHeader, { flex: 3 }]}>Servicio</Text>
                        <Text style={[styles.tableCellHeader, { flex: 2 }]}>Precio</Text>
                        <Text style={[styles.tableCellHeader, { flex: 2 }]}>Cantidad de Salida</Text>
                        <Text style={[styles.tableCellHeader, { flex: 3 }]}>Responsable</Text>
                    </View>

                    {/* Filas de la tabla con los datos */}
                    {serviciosArray.map((servicio, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 3 }]}>
                                {servicio}
                            </Text>
                            <Text style={[styles.tableCell, { flex: 2 }]}>
                                {preciosArray[index] ? preciosArray[index].split(": ")[1] : 'N/A'}
                            </Text>
                            <Text style={[styles.tableCell, { flex: 2 }]}>
                                {cantidadSalidaArray[index] ? cantidadSalidaArray[index].split(": ")[1] : 'N/A'}
                            </Text>
                            <Text style={[styles.tableCell, { flex: 3 }]}>
                                {usuariosServicioArray[index] ? usuariosServicioArray[index].split(": ")[1] : 'N/A'}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Total */}
                <Text style={styles.total}>Total Calculado: ${total_calculado}</Text>
            </Page>
        </Document>
    );
};

export default Facturapdf;
