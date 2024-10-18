import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

// Define el slice de API
export const fincaApiSlice = createApi({
    reducerPath: "finca",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        token: `${getCookie("Token")}`
      },
}),

/* creacion de los endpoint del api */
endpoints: (build) => ({

    //listar fincas
    getFincas: build.query({
      query: () => ({
        url: "finca/listar",
        method: "GET",
        headers: {
          token: `${getCookie("Token")}`,
        },
      }),
      providesTags:['Fincas']
    }),
    PostFinca: build.mutation({
      query: (data) => ({
          url: "finca/registrar",
          method: "POST",
          body: data,
          headers: {
              token: `${getCookie("Token")}`,
          },
      }),
      transformErrorResponse: (response) => ({
          error: response.data?.message,
      }),
      invalidatesTags: ["Fincas"],
  }),

}),
});
export const { useGetFincasQuery, usePostFincaMutation } =  fincaApiSlice