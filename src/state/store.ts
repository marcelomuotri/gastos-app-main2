import { configureStore } from '@reduxjs/toolkit';
import { api } from './api'; // Asegúrate de ajustar la ruta de importación al archivo correcto
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    // Tus otros reducers
    auth: authReducer,
    api: api.reducer, // Reducer de tu RTK Query API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Agregar el middleware de tu RTK Query API
});

export default store;
