import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const VariablesApi = createApi({
    reducerPath: "variables",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
        //listar variables
        getVariables: build.query({
            query: () => ({
                url: "variables/listar",
                method: "GET",
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                }
            },
            providesTags: ['getVariable']
        }),
        //crear variable
        crearVariable: build.mutation({
            query: (data) => ({
                url: "variables/registrar",
                method: "POST",
                body: data,
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                }
            },
        }),
        //editar variable
        editarVariable: build.mutation({
            query: (data) => ({
                url: `variables/actualizar/${data.id}`,
                method: "PUT",
                body: datos,
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                }
            },
        }),
        //eliminar variable
        eliminarVariable: build.mutation({
            query: (id) => ({
                url: `variables/eliminar/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                }
            },
        }),
    })

})

export const { useCrearVariableMutation, useEditarVariableMutation, useGetVariablesQuery, useEliminarVariableMutation } = VariablesApi