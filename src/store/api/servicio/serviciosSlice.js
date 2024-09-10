import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils"

export const servicioApiSlice = createApi({
    reducerPath: "servicio",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
        //listar servicios
        getServicio: build.query({
            query: () => ({
                url: "servicios/listar",
                method: "GET",
            }),
            providesTags:['servicios']
        }),






        //eliminar servicio
        eliminarServicio:build.mutation({
            query:(id)=>({
                url:`servicios/eliminar/${id}`,
                method:'DELETE'
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message,
                }
            },
            invalidatesTags:['servicios']
        }),


        //actualizar estado
        actualizarEstadoServicio:build.mutation({
            query:(data)=>({
                url:`servicios/actualizarestadoservicio/${data.id}`,
                method:'PUT',
                body:data,
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['dervicios']
        })


    })
})

export const { useGetServicioQuery, useEliminarServicioMutation, useActualizarEstadoServicioMutation } = servicioApiSlice;