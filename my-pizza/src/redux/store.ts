import { configureStore } from "@reduxjs/toolkit";
import filterSlise from "./slises/filterSlise.ts";
import cartSlice from "./slises/cartSlice.ts";
import pizzaSlice from "./slises/pizzaSlice.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlise,
    cartSlice,
    pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
