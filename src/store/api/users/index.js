import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";



export const usuariosSlice = createApi({
  reducerPath: 'usuarios',
  baseQuery: fetchBaseQuery({
    baseUrl:import.meta.env.VITE_BASE_URL,
    headers:{
      'Content-Type': 'application/json',
      token:`${getCookie('authToken')}`
    },
  }),

  endpoints:(build)=>({

  getUsuario: build.query({
    query:()=>({
      url:'usuario/listar',
      method:'GET',
    }),
    providesTags:['usuarios']
  }),

  registrarUsuario: build.mutation({
    query:(data)=>({
      url:'usuario/registrar',
      method:'POST',
      body:data,
    }),
    transformErrorResponse:(response,meta,arg)=>{
      return{
        originalArg:arg,
        error:response.data.message,
      }
    },
    invalidatesTags:['usuarios']
  }),

  actualizarUsuario:build.mutation({
    query:(data)=>({
      url:`usuario/actualizar/${data.id}`,
      method: 'PUT',
      body:data,
    }),
    transformErrorResponse:(response,meta,arg)=>{
      return{
        originalArg: arg,
        error:response.data.message
      }
    },
    invalidatesTags:['usuarios']
  }),

  eliminarUsuario:build.mutation({
    query:(id)=>({
      url:`usuario/eliminar/${id}`,
      method:'DELETE',
    }),
    transformErrorResponse:(response,meta,arg)=>{
      return{
        originalArg: arg,
        error: response.data.message,
      }
    },
    invalidatesTags:['usuarios']
  })

  })

})

export const {useGetUsuarioQuery,useRegistrarUsuarioMutation,useActualizarUsuarioMutation,useEliminarUsuarioMutation} = usuariosSlice
