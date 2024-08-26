import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const TipoServicioApi = createApi({
    reducerPath: "tipoServicio",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
        getTipoServicio: build.query({
            query: () => ({
                url: "tipoServicio/listar",
                method: "GET",
            }),

        }),




    }),
});

export const { useGetTipoServicioQuery } = TipoServicioApi;