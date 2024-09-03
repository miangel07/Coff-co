import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const AlquilerApi=createApi({
    reducerPath:"alquiler",
    baseQuery:fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          token: `${getCookie("authToken")}`
        }
    }),
    
    endpoints:(build)=>({
        // query = get ,get id
        // mutatition : post put,delate,patch
        getAlquiler:build.query({
            query: () => ({
                url: "servicios/listaAlquiler",
                method: "GET",
            }),
            providesTags:['alquiler']
        }),      
        //Endpoint para registrar alquiler
        postAlquiler:build.mutation({
            query: (datos) => ({
                url: "servicios/agregarAlquiler",
                method: "POST",
                body: datos,
            }),
            invalidatesTags:['alquiler']
        })

    })
    

})

export const { useGetAlquilerQuery, usePostAlquilerMutation } = AlquilerApi;



