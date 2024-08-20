import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";


export const preciosSlice = createApi({
    reducerPath:'precios',
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_BASE_URL,
        headers:{
            'Content-Type': 'application/json',
            token: `${getCookie('authToken')}`
        }
    }),

    endpoints:(build)=>({
        getPrecios:build.query({
            query:()=>({
                url:'precio/listar',
                method:'GET',
            }),
            providesTags:['precios']
        }),

        registrarPrecio: build.mutation({
            query:(data)=>({
                url:'precio/registrar',
                method:'POST',
                body:data,
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message,
                }
            },
            invalidatesTags:['precios']
        }),

        actualizarPrecio: build.mutation({
            query:(data)=>({
                url:`precio/actualizar/${data.id}`,
                method:'PUT',
                body:data,
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message
                }
            },
            invalidatesTags:['precios']
        }),

        eliminarPrecio:build.mutation({
            query:(id)=>({
                url:`precio/eliminar/${id}`,
                method:'DELETE',
            }),
            transformErrorResponse:(response,meta,arg)=>{
                return{
                    originalArg:arg,
                    error:response.data.message,
                }
            },
            invalidatesTags:['precios']
        })
    })
})

export const { useGetPreciosQuery, useRegistrarPrecioMutation,useActualizarPrecioMutation,useEliminarPrecioMutation } = preciosSlice