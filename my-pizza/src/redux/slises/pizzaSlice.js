import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, ThunkAPI) => {
    const { sortBy, order, category, limit, currentPage } = params;
    const { data } = await axios.get(
      `https://66e7ec24b17821a9d9da8d61.mockapi.io/items?page=${currentPage}${limit}${category}&sortBy=${sortBy}&order=${order}`
    );

    if (data.length === 0) {
      return ThunkAPI.rejectWithValue("Pizzas list is empty");
    }

    return ThunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
