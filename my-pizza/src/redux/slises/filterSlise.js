import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: "",
  currentPage: 1,
  sort: {
    name: "popularity",
    sort: "rating",
  },
};

const filterSlise = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectFilter = (state) => state.filterSlise;

export const selectSort = (state) => state.filterSlise.sort;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlise.actions;

export default filterSlise.reducer;
