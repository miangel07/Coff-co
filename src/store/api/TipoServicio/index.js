import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

export const TipoServicioApi = createApi({
    reducerPath: "tiposervicio",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            token: `${getCookie("authToken")}`,
        },
    }),
    endpoints: (build) => ({
        GetTipoServicio: build.query({
            query: () => ({
                url: "tiposervicio/listar",
                method: "GET",
                headers: {
                    token: `${getCookie("authToken")}`,
                },
            }),
            providesTags: ['TipoServicio']
        }),

        PostTipoServicio: build.mutation({
            query: (data) => ({
                url: "tiposervicio/registrar",
                method: "POST",
                body: data,
                headers: {
                    token: `${getCookie("authToken")}`,
                },
            }),
            transformErrorResponse: (response) => ({
                error: response.data.message,
            }),
            invalidatesTags: ["TipoServicio"],
        }),


        PutTipoServicio: build.mutation({
            query: (data) => ({
                url: `tiposervicio/actualizar/${data.id}`,
                method: "PUT",
                body: data,
                headers: {
                    token: `${getCookie("authToken")}`,
                },
            }),
            transformErrorResponse: (response) => ({
                error: response.data.message,
            }),
            invalidatesTags: ["TipoServicio"],
        }),


        UpdateEstadoTipoServicio: build.mutation({
            query: (data) => ({
                url: `tiposervicio/estado/${data.id}`,
                method: "PUT",
                body: { estado: data.estado }, // Asegúrate de enviar el estado en el cuerpo
                headers: {
                    token: `${getCookie("authToken")}`,
                },
            }),
            invalidatesTags: ["TipoServicio"],
        }),



    }),
});

export const { useGetTipoServicioQuery, usePostTipoServicioMutation,
    usePutTipoServicioMutation, useUpdateEstadoTipoServicioMutation } = TipoServicioApi;
