import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const docuentosApi = createApi({
    reducerPath: "documentos",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            token: `${getCookie("Token")}`,
        },
    }),
    endpoints: (build) => ({
        //listar documentos
        getDocumentos: build.query({
            query: () => ({
                url: "documentos/listar",
                method: "GET",
                headers: {
                    token: `${getCookie("Token")}`,
                },
            }),
            providesTags: ["Documentos"],
        }),
        //crear documento
        crearDocumento: build.mutation({
            query: (data) => ({
                url: "documentos/registrar",
                method: "POST",
                body: data,
                headers: {
                    token: `${getCookie("Token")}`,
                },
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
            invalidatesTags: ["Documentos"],

        }),
        //actualizar documento
        actualizarDocumento: build.mutation({
            query: (data) => (
                console.log("DATA", data), {
                    url: `documentos/actualizar/${data.get('id_documentos')}`,
                    method: "PUT",
                    body: data,
                    headers: {
                        token: `${getCookie("Token")}`,
                    },
                }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
            invalidatesTags: ["Documentos"],
        }),
        //buscar documento
        buscarDocumento: build.query({
            query: (id) => ({
                url: `documento/buscar/${id}`,
                method: "GET",
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
            invalidatesTags: ["Documentos"],
        }),


        CambioEstado: build.mutation({
            query: (data) => (
                console.log(data),
                {

                    url: `versiones/actualizarEstado/${data.id}`,
                    method: "PUT",
                    body: ({ estado: data.estado })
                }),
            /*  { id: 7, estado: 'inactivo' } */

            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.message,
                };
            },
            invalidatesTags: ["Documentos"],
        }),

        ActualizarVersion: build.mutation({
            query: (data) => (
                {
                    url: `documentos/actualizarversion`,
                    method: "POST",
                    body: data,
                }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.message,
                };
            },
            invalidatesTags: ["Documentos"],
        }),
        grafica: build.query({
            query: () => ({
                url: "documentos/grafica",
                method: "GET",
            }),
            providesTags: ["Documentos"],
        })

    })
})

export const { useGetDocumentosQuery, useCrearDocumentoMutation, useActualizarDocumentoMutation, useCambioEstadoMutation, useActualizarVersionMutation, useGraficaQuery } = docuentosApi