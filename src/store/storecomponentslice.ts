import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type storedetailsState = {
  SNo: string | number;
  Store: string;
  City: string;
  State: string;
  id: string | number;
};

const initialState: storedetailsState[] = [
  {
    SNo: 1,
    Store: "Las Vegas Neon Treasures",
    City: "Las Vegas",
    State: "CA",
    id: 1,
  },
  { SNo: 2, Store: "Phoenix Sunwear", City: "Phoenix", State: "AZ", id: 2 },
  {
    SNo: 3,
    Store: "Seattle Skyline Goods",
    City: "Seattle",
    State: "WA",
    id: 3,
  },
  { SNo: 4, Store: "Austin Vibe Co.", City: "Austin", State: "TX", id: 4 },
  { SNo: 5, Store: "Detroit Motor Gear", City: "Detroit", State: "MI", id: 5 },
];

export const storeSlice = createSlice({
  name: "storedetails",
  initialState,
  reducers: {
    addToStore: (state, action: PayloadAction<storedetailsState>) => {
      state.push(action.payload);
    },
    deleteFromStore: (state, action: PayloadAction<number | string>) => {
      return state.filter((curr) => {
        return curr.id !== action.payload;
      });
    },
    updateStore: (state, action: PayloadAction<storedetailsState>) => {
      console.log("inside slice,", action.payload);

      return state?.map((curr) => {
        if (curr.id == action.payload.id) {
          return action.payload;
        } else return curr;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToStore, deleteFromStore, updateStore } = storeSlice.actions;

export default storeSlice.reducer;
