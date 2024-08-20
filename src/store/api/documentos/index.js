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
            invalidatesTags: ["getDocumentos"],
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
            invalidatesTags: ["getDocumentos"],
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

    })
})

export const { useGetDocumentosQuery, useCrearDocumentoMutation, useActualizarDocumentoMutation, useEliminarDocumentoMutation } = docuentosApi