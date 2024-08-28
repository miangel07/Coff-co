import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const docuentosApi = createApi({
    reducerPath: "documentos",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
        mode: 'cors',
        credentials: 'include'
    }),
    endpoints: (build) => ({
        //listar documentos
        getDocumentos: build.query({
            query: () => ({
                url: "documentos/listar",
                method: "GET",
                headers: {
                    token: `${getCookie("authToken")}`,
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
                    token: `${getCookie("authToken")}`,
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
            query: (datos) => ({
                url: `documentos/actualizar/${datos.id}`,
                method: "PUT",
                body: data,
                headers: {
                    token: `${getCookie("authToken")}`,
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
            invalidatesTags: ["getDocumentos"],
        }),
        //eliminar documento
        eliminarDocumento: build.mutation({
            query: (id) => ({
                url: `documento/eliminar/${id}`,
                method: "DELETE",
                headers: {
                    token: `${getCookie("authToken")}`,
                },
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
            invalidatesTags: ["getDocumentos"],


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
                    method: "PUT",
                    body: data,
                }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.message,
                };
            },
            invalidatesTags: ["Documentos"],
        })

    })
})

export const { useGetDocumentosQuery, useCrearDocumentoMutation, useActualizarDocumentoMutation, useEliminarDocumentoMutation, useCambioEstadoMutation, useActualizarVersionMutation } = docuentosApi