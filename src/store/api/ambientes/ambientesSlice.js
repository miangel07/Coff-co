import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

// Define el slice de API
export const ambientesApiSlice = createApi({
  reducerPath: "ambientes",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      token: `${getCookie("Token")}`
    },
  }),
  endpoints: (build) => ({

    //listar ambientes
    getAmbientes: build.query({
      query: () => ({
        url: "ambiente/listar",
        method: "GET",
        headers: {
          token: `${getCookie("Token")}`,
        },
      }),
      providesTags:['Ambientes']
    }),

    //crear ambiente
    crearAmbiente: build.mutation({
      query:(data)=>({
        url:'ambiente/registrar',
        method:'POST',
        body:data,
        headers:{
          token:`${getCookie('Token')}`
        },
      }),
      transformErrorResponse:(response,meta,arg)=>{
        return{
          originalArg:arg,
          error:response.data.message,
        };
      },
      invalidatesTags:['Ambientes'],
    }),

    //actualizar ambiente 
    actualizarAmbiente: build.mutation({
      query:(data)=>({
        url:`ambiente/actualizar/${data.id}`,
        method:'PUT',
        body:data,
        headers:{
          token:`${getCookie('Token')}`,
        },
      }),
      transformErrorResponse:(response,meta,arg)=>{
        return{
          originalArg: arg,
          error:response.data.message,
        }
      },
      invalidatesTags:['Ambientes']
    }),

    //eliminar ambiente
    eliminarAmbiente: build.mutation({
      query:(id)=>({
        url:`ambiente/eliminar/${id}`,
        method:'DELETE',
        headers:{
          token:`${getCookie('Token')}`
        }
      }),
      transformErrorResponse:(response,meta,arg)=>{
        return{
          originalArg:arg,
          error: response.data.message,
        }
      },
      invalidatesTags:['Ambientes'],
    })
  }),
});


export const { useGetAmbientesQuery, useCrearAmbienteMutation, useActualizarAmbienteMutation, useEliminarAmbienteMutation} = ambientesApiSlice;

