import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils"

export const servicioApiSlice = createApi({
    reducerPath: "servicio",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("Token")}`,
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

        // obtener muestras para servicios 
        obtenerMuestrasParaServicio:build.query({
            query:()=>({
                url:'servicios/getmuestrasser',
                method: 'GET'
            }),
            providesTags:['servicios']
        }),

        // obtener Variables para registrar servicio
        obtenerVariablesParaServicio:build.mutation({
            query:(data)=>({
                url:'servicios/getvariables',
                method:'POST',
                body:data
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),

        // obtener variables para actualizacion de servicio
        obtenerVariablesParaActualizarServicio:build.mutation({
            query:(data)=>({
                url:'servicios/getvariablesupdate',
                method:'POST',
                body:data
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),

        // obtener precios segun tipo servicio para registrar un servicio
        obtenerPrecioSegunTipoServicio:build.mutation({
            query:(data)=>({
                url:'servicios/getprecio',
                method:'POST',
                body:data
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),


        //registrar servicio
        registrarServicio:build.mutation({
            query:(data)=>({
                url:'servicios/registrarser',
                method:'POST',
                body:data,
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),
        //Registro servicio terminado
        servicioTerminado:build.mutation({
            query:(data)=>({
                url:`servicios/servicioter/${data.id}`,
                method:'PUT',
                body:data,
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),

        // actualizarServicio:build.mutation({
        //     query:(data)=>({
        //         url:``
        //     })
        // }),




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

export const { useGetServicioQuery, useObtenerMuestrasParaServicioQuery, useRegistrarServicioMutation,useServicioTerminadoMutation, useEliminarServicioMutation, useActualizarEstadoServicioMutation, useObtenerVariablesParaServicioMutation,useObtenerVariablesParaActualizarServicioMutation,useObtenerPrecioSegunTipoServicioMutation} = servicioApiSlice;