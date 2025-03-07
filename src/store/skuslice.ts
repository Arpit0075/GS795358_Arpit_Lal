import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface skuSliceState {
  sku: string;
  price: number;
  cost: number;
  id: any;
}

const initialState: skuSliceState[] = [
  { sku: "shirt", price: 500, cost: 340, id: "sku-1" },
  { sku: "tShirt", price: 12000, cost: 11000, id: "sku-2" },
  { sku: "pant", price: 20000, cost: 1900, id: "sku-3" },
  { sku: "cargo", price: 2100, cost: 796, id: "sku-4" },
  { sku: "blazer", price: 3950, cost: 3120, id: "sku-5" },
];

export const skuSlice = createSlice({
  name: "skudetails",
  initialState,
  reducers: {
    addToStore: (state, action: PayloadAction<skuSliceState>) => {
      state.push(action.payload);
    },
    deleteFromStore: (state, action: PayloadAction<string>) => {
      return state.filter((curr) => {
        return curr.id !== action.payload;
      });
    },
    updateStore: (state, action: PayloadAction<skuSliceState>) => {
      //  console.log("inside slice,", action.payload);

      return state?.map((curr) => {
        if (curr.id == action.payload.id) {
          return action.payload;
        } else return curr;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToStore, deleteFromStore, updateStore } = skuSlice.actions;

export default skuSlice.reducer;
