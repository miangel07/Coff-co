// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import { authApi } from "./api/auth";
import { userApi } from "./api/users";
import { docuentosApi } from "./api/documentos";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [docuentosApi.reducerPath]: docuentosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userApi.middleware,
      docuentosApi.middleware
    ),
});
