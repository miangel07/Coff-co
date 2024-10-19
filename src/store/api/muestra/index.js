import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

// Define el slice de API
export const muestraApiSlice = createApi({
    reducerPath: "muestra",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        token: `${getCookie("Token")}`
      },
}),

/* creacion de los endpoint del api */
endpoints: (build) => ({

    //listar muestras
    getMuestras: build.query({
      query: () => ({
        url: "muestra/listar",
        method: "GET",
        headers: {
          token: `${getCookie("Token")}`,
        },
      }),
      providesTags:['Muestras']
    }),
    getMuestrasterminadas: build.query({
      query: () => ({
        url: "muestra/listarTerminadas",
        method: "GET",
        headers: {
          token: `${getCookie("Token")}`,
        },
      }),
      providesTags:['Muestras']
    }),

    //crear Muestra
    postMuestra: build.mutation({
      query:(data)=>({
        url:'muestra/registrar',
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
      invalidatesTags:['Muestras']
    }),

    //actualizar muestra 
    putMuestra: build.mutation({
      query:(data)=>(
        {
        url:`muestra/actualizar/${data.get("id_muestra")}`,
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
      invalidatesTags:['Muestras']
    }),


    //cambiar el estado de la muestra
    updateEstadoMuestra: build.mutation({
      query: (data) => ({
          url: `muestra/estado/${data.id}`,
          method: "PUT",
          body: data,
      }),

      invalidatesTags: ["Muestras"],

  }),
    //eliminar muestra
    deleteMuestra: build.mutation({
      query:(id)=>({
        url:`muestra/eliminar/${id}`,
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
      invalidatesTags:['Muestras'],
    })
  }),
});

export const { useGetMuestrasQuery, usePostMuestraMutation, usePutMuestraMutation, useDeleteMuestraMutation, useUpdateEstadoMuestraMutation,useGetMuestrasterminadasQuery  } = muestraApiSlice




