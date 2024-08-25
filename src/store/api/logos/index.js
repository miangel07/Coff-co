import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const logosApi = createApi({
    reducerPath: "logos",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
        //Listar logos
        getLogos: build.query({
            query: () => ({
                url: "logo/listar",
                method: "GET",
            }),
            providesTags: ['getVariable']
        }),

    })
})


export const { useGetLogosQuery } = logosApi;