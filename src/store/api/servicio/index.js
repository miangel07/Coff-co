import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils"

export const ServicioApi = createApi({
    reducerPath: "servicio",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
        getServicio: build.query({
            query: () => ({
                url: "servicios/listar",
                method: "GET",
            }),

        }),
    })
})

export const { useGetServicioQuery } = ServicioApi;