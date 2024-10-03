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
         postRepoteTipoServcio: build.query({
            query: () => ({
                url: `/reportes/listar`,
                method: "GET",
            }),
        }), 
    }),
})

export const { useGetReporteQuery ,usePostRepoteTipoServcioQuery} = repotesApi;