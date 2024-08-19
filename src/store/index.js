// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import { authApi } from "./api/auth";
import { userApi } from "./api/users";
import { docuentosApi } from "./api/documentos";
import { TipoDocumento } from "./api/TipoDocumentos";
import { VariablesApi } from "./api/variables";
import { TipoServicioApi } from "./api/TipoServicio";
import { logosApi } from "./api/logos";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [docuentosApi.reducerPath]: docuentosApi.reducer,
    [TipoDocumento.reducerPath]: TipoDocumento.reducer,
    [VariablesApi.reducerPath]: VariablesApi.reducer,
    [TipoServicioApi.reducerPath]: TipoServicioApi.reducer,
    [logosApi.reducerPath]: logosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userApi.middleware,
      docuentosApi.middleware,
      TipoDocumento.middleware,
      VariablesApi.middleware,
      TipoServicioApi.middleware,
      logosApi.middleware,
    ),
});
