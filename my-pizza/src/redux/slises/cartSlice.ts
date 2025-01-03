import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS.ts";
import { calcTotalPrice } from "../../utils/calcTotalPrice.ts";

export type CartItemSet = {
  id: string;
  title: string;
  price: number;
  src: string;
  type: string;
  size: number;
  count: number;
}

interface cartSliceState {
  totalPrice: number;
  items: CartItemSet[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: cartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemSet>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
