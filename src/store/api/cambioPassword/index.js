import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const CambioPasswordApi = createApi({
    reducerPath: "cambioPassword",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    }),
    endpoints: (build) => ({
        rescuperarPassword: build.mutation({
            query: (data) => ({
                url: "password/recuperar",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Autenticacion"],
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
            invalidatesTags: ['Autenticacion'],
        }),
        validarPassord: build.mutation({
            query: (data) => ({
                url: "password/validar",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Autenticacion"],
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
            invalidatesTags: ['Autenticacion'],
        }),
        cambiarPassword: build.mutation({
            query: (data) => ({
                url: "password/cambiar",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Autenticacion"],
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message,
                };
            },
            invalidatesTags: ['Autenticacion'],
        }),

    }),

})

export const { useCambiarPasswordMutation, useValidarPassordMutation, useRescuperarPasswordMutation } = CambioPasswordApi;