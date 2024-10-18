import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

// Define el slice de API
export const municipioApiSlice = createApi({
    reducerPath: "Municipio",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        token: `${getCookie("Token")}`
      },
}),

/* creacion de los endpoint del api */
endpoints: (build) => ({

    //listar municipios
    getMunicipio: build.query({
      query: () => ({
        url: "municipio/listar",
        method: "GET",
        headers: {
          token: `${getCookie("Token")}`,
        },
      }),
      providesTags:['municipio']
    }),

}),
});
export const { useGetMunicipioQuery } =  municipioApiSlice