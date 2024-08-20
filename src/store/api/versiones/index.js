import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


import { getCookie } from "../../utils";

export const VersionesApi = createApi({
    reducerPath: "versiones",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
      
    })
})