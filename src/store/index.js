// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import { authApi } from "./api/auth";
import { userApi } from "./api/users";
import { docuentosApi } from "./api/documentos";
import { TipoDocumento } from "./api/TipoDocumentos";
import { ambientesApiSlice } from "./api/ambientes/ambientesSlice";
import { preciosSlice } from "./api/precios/preciosSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [docuentosApi.reducerPath]: docuentosApi.reducer,
    [TipoDocumento.reducerPath]: TipoDocumento.reducer,
    [ambientesApiSlice.reducerPath]: ambientesApiSlice.reducer,
    [preciosSlice.reducerPath]: preciosSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userApi.middleware,
      docuentosApi.middleware,
      TipoDocumento.middleware,
      ambientesApiSlice.middleware,
      preciosSlice.middleware,
    ),
});
