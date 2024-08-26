import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const TipoDocumento = createApi({
    reducerPath: "tipodocumento",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
        //listar Tipo documentos
        getTipoDocumentos: build.query({
            query: () => ({
                url: "tipodocumento/listar",
                method: "GET",
                headers: {
                    token: `${getCookie("authToken")}`,
                },
            }),

        }),
        //crear Tipo documento
        crearTipoDocumento: build.mutation({
            query: (data) => ({
                url: "tipodocumento/registrar",
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
            invalidatesTags: ["getTipoDocumentos"],
        }),
        //actualizar Tipo documento
        actualizarTipoDocumento: build.mutation({
            query: (datos) => ({
                url: `tipodocumento/actualizar/${datos.id}`,
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
            invalidatesTags: ["getTipoDocumentos"],
        }),
        //buscar Tipo documento
        buscarTipoDocumento: build.query({
            query: (id) => ({
                url: `tipodocumento/listarid/${id}`,
                method: "GET",
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
        }),
        //eliminar Tipo documento
        eliminarTipoDocumento: build.mutation({
            query: (id) => ({
                url: `tipodocumento/eliminar/${id}`,
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
            invalidatesTags: ["getTipoDocumentos"],


        }),

    })
})

export const { useActualizarTipoDocumentoMutation, useBuscarTipoDocumentoQuery,
    useCrearTipoDocumentoMutation, useEliminarTipoDocumentoMutation, useGetTipoDocumentosQuery
} = TipoDocumento