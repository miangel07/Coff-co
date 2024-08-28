import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const userApi = createApi({
  reducerPath: "usuario",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),

  endpoints: (build) => ({

  // END POINT PARA LISTAR USUARIOS
    getusers: build.query({
      query: () => ({
        url: "http://localhost:3000/api/usuario/listar",
        method: "GET",
        // headers: {
        //   token: `${getCookie("authToken")}`,
        // },
      }),
      transformErrorResponse: (response, meta, arg) => {
        return {
          originalArg: arg,
          error: response.data.message,
        };
      },
    }),

    postUsers:build.mutation({
      query: (data) => ({
        url: "usuario/registrar",
        method: "POST",
        body: data,
        headers: {
          token: `${getCookie("authToken")}`,
        },
      }),
     

      transformErrorResponse: (response, meta, arg) => {
        return {
          originalArg: arg,
          error: response.data.message,
        };
      },
    }),
    
    deleteUsers:build.mutation({
      query: (id) => ({
        url: `usuario/eliminar/${id}`,
        method: "DELETE",
        headers: {
          token: `${getCookie("authToken")}`,
        },
      }),
    })


  }),
});

export const { useGetusersQuery,usePostUsersMutation,useDeleteUsersMutation } = userApi;
