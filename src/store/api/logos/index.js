import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const logosApi = createApi({
    reducerPath: "logos",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        // headers: {
        //     "Content-Type": "application/json",
        //     token: `${getCookie("authToken")}`,
        // },
    }),
    endpoints: (build) => ({
        //LISTAR LOGOS
        getLogos: build.query({
            query: () => ({
                url: "logo/listar",
                method: "GET",
            }),
            providesTags: ['logos']
        }),

         //REGISTRAR
        registrarLogo: build.mutation({
            query:(data)=>({
            url:'/logo/registrar',
            method:'POST',
            body:data,
            }),
            transformErrorResponse:(response,meta,arg)=>{
            return{
                originalArg:arg,
                error:response.data.message,
            }
            },
            invalidatesTags:['logos']
        }),

        //ACTUALIZAR
        actualizarLogo: build.mutation({
        query: ({ data, id }) => ({
            url: `/logo/actualizar/${id}`,
            method: 'PUT',
            body: data,
        }),
        transformErrorResponse: (response, meta, arg) => {
            console.log("Respuesta completa de error:", response);
            
            return {
            originalArg: arg,
            error: response?.data?.message || response?.statusText || "Error desconocido",
            };
        },
        invalidatesTags: ['logos'],
        }),

        //ACTUALIZAR ESTADO ('ACTIVO' 'INACTIVO')
        actualizarEstado: build.mutation({
        query: (id) => ({
            url: `logo/estado/${id}`,
            method: 'PUT',
        }),
        transformErrorResponse: (response, meta, arg) => {
            console.log("Respuesta completa de error:", response);
            return {
            originalArg: arg,
            error: response?.data?.message || response?.statusText || "Error desconocido",
            };
        },
        invalidatesTags: ['logos'],
        }),

    })
})


export const { useGetLogosQuery,useRegistrarLogoMutation,useActualizarLogoMutation,useActualizarEstadoMutation } = logosApi;