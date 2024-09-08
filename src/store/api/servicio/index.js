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
            providesTags:['servicios']

        }),

        // endpoint para traer variables de los documentos
        postFormulario: build.mutation({
            query: (datos) => (
                console.log(datos),{
                url: "servicios/variablesVersion",
                method: "POST",
                body: datos,
            }),
            invalidatesTags: ['servicios']

            
        })

    
    })
})

export const { useGetServicioQuery , usePostFormularioMutation} = ServicioApi;