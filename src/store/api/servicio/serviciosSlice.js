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
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            providesTags:['servicios']
        }),

        listarCambios: build.query({
            query: () => ({
                url: "servicios/getcambios",
                method: "GET",
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            providesTags:['servicios']
        }),

        obtenerMuestrasParaServicio:build.query({
            query:()=>({
                url:'servicios/getmuestrasser',
                method: 'GET',
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            providesTags:['servicios']
        }),

        // obtener Variables para registrar servicio
        obtenerVariablesParaServicio:build.mutation({
            query:(data)=>({
                url:'servicios/getvariables',
                method:'POST',
                body:data,
                headers :{
                    token: `${getCookie("Token")}`,
                },
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
                body:data,
                headers :{
                    token: `${getCookie("Token")}`,
                },
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
                body:data,
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),

        //obtener fk_idTipoServicio
        obtenerIdTipoServicio:build.mutation({
            query:(data)=>({
                url:'servicios/gettiposervicio',
                method:'POST',
                body:data,
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),

        //obtener los datos de la muestra segun el id del servicio
        obtenerDatosDeLaMuestraSegunServicio: build.query({
            query: (id) => ({
                url: `servicios/gedatosmuestra/${id}`,
                method: 'GET',
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    originalArg: arg,
                    error: response.data.message
                };
            },
            providesTags: ['servicios']
        }),



        //registrar servicio
        registrarServicio:build.mutation({
            query:(data)=>({
                url:'servicios/registrarser',
                method:'POST',
                body:data,
                headers :{
                    token: `${getCookie("Token")}`,
                },
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
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        }),

        // actualizarValores de variables de servicio 
            editarValoresPorServicio:build.mutation({
                query:(data)=>({
                    url:`servicios/editarvaloresvariables`,
                    method:'POST',
                    body:data,
                    headers :{
                        token: `${getCookie("Token")}`,
                    },
                }),
                transformErrorResponse:(response,meta,arg)=>{
                    return{
                        originalArg:arg,
                        error:response.data.message
                    }
                },
                invalidatesTags:['servicios']
            }),

            //registro del cambio 
            registrarCambioDelServicio:build.mutation({
                query:(data)=>({
                    url:`servicios/registrarcambio`,
                    method:'POST',
                    body:data,
                    headers :{
                        token: `${getCookie("Token")}`,
                    },
                }),
                transformErrorResponse:(response,meta,arg)=>{
                    return{
                        originalArg:arg,
                        error:response.data.message
                    }
                },
                invalidatesTags:['servicios']
            }),

        //eliminar servicio
        eliminarServicio:build.mutation({
            query:(id)=>({
                url:`servicios/eliminar/${id}`,
                method:'DELETE',
                headers :{
                    token: `${getCookie("Token")}`,
                },
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
                headers :{
                    token: `${getCookie("Token")}`,
                },
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['servicios']
        })
   
    })
})

export const { useGetServicioQuery,useObtenerMuestrasParaServicioQuery, 
    useRegistrarServicioMutation,useServicioTerminadoMutation,useRegistrarCambioDelServicioMutation,
    useEliminarServicioMutation, useActualizarEstadoServicioMutation, 
    useObtenerVariablesParaServicioMutation,useEditarValoresPorServicioMutation,
    useObtenerIdTipoServicioMutation,useObtenerVariablesParaActualizarServicioMutation, 
    useObtenerPrecioSegunTipoServicioMutation,useListarCambiosQuery,useObtenerDatosDeLaMuestraSegunServicioQuery} = servicioApiSlice;