import { configureStore } from "@reduxjs/toolkit";
import filterSlise from "./slises/filterSlise";
import cartSlice from "./slises/cartSlice";
import pizzaSlice from "./slises/pizzaSlice";

export const store = configureStore({
  reducer: {
    filterSlise,
    cartSlice,
    pizzaSlice,
  },
});
