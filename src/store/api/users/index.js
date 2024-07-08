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
    getusers: build.query({
      query: () => ({
        url: "usuario/listar",
        method: "GET",
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
    })
  }),
});

export const { useGetusersQuery,usePostUsersMutation } = userApi;
