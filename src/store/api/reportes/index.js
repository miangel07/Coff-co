import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const repotesApi = createApi({
    reducerPath: "reportes",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${localStorage.getItem("token")}`,
        },
    }),
    endpoints: (build) => ({
        getReporte: build.query({
            query: () => ({
                url: `/estadisticas/estadistica`,
                method: "GET",
            }),
        }),
        getReporteRadar: build.query({
            query: () => ({
                url: `/estadisticas/radar`,
                method: "GET",
            }),
        }),
        postRepoteTipoServcio: build.mutation({
            query: (data) => ({
                url: `/reportes/generar`,
                method: "POST",
                body: data,
            }),
            transformErrorResponse: (response, arg) => {
                return {
                    originalArg: arg,
                    error: response?.data?.message,
                };
            },
        }),
    }),
})

export const { useGetReporteQuery, usePostRepoteTipoServcioMutation } = repotesApi;