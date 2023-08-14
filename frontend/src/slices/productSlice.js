import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: {} };

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;

export default productSlice.reducer;
