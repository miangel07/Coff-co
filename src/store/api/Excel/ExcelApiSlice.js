import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../../utils";

// Define el slice de API
export const excelApiSlice = createApi({
    reducerPath: "excel",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        token: `${getCookie("Token")}`
      },
}),

/* creacion de los endpoint del api */
endpoints: (build) => ({

    //seleccionaer reporte
    postExcel: build.mutation({
      query:(data)=>({
        url:'ingresos/reporte',
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
      invalidatesTags:['Excel'],
    }),

  }),
});

export const {  usePostExcelMutation } = excelApiSlice

