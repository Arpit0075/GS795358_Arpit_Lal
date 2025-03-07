import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { storedetailsState } from "./storecomponentslice";
import { skuSliceState } from "./skuslice";
import { updaPlanningteData } from "../Components/Tableplanning";
import { RootState } from "./store";

export type SalesResult = {
  unit: number;
  time: number;
  salesDollars: number;
  GM_Dollars: number;
  GM_percentage: number;
};

export type PlanningSliceState = {
  store: string;
  sku: string;
  price: number;
  cost: number;
  sales: SalesResult[];
};

const initialState: PlanningSliceState[] = [];

// Async thunk to fetch initial state (this can be the function that pulls the necessary data)
//<returnType, argument type>
export const fetchInitialState = createAsyncThunk<PlanningSliceState[], void>(
  "planningslice/fetchInitialState",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeState = state.storeReducer;
      const skuState = state.skuReducer;

      // check if the data is available
      //   console.log("storeState:", storeState);
      //   console.log("skuState:", skuState);

      if (!storeState || !skuState) {
        throw new Error("storeState or skuState is missing");
      }

      // Initialize an empty array to store the results
      let planningsArray: PlanningSliceState[] = [];

      // Iterate over store details and sku details to generate the result
      storeState.map((el: storedetailsState) => {
        // el.Store is your store information
        skuState.map((sku: skuSliceState) => {
          // sku contains the sku, price, and cost info

          let sales1 = [
            { salesUnit: 200, time: 1 },
            { salesUnit: 300, time: 2 },
            { salesUnit: 350, time: 3 },
            { salesUnit: 100, time: 4 },
            { salesUnit: 5000, time: 5 },
          ];

          let salesResulantArray: SalesResult[] = [];

          sales1.map((sal) => {
            let salesDollars = Number(sal.salesUnit * +sku.price);
            let GM_Dollars = salesDollars - sal.salesUnit * +sku.cost;
            let GM_percentage = +((GM_Dollars / salesDollars) * 100).toFixed(2);

            salesResulantArray.push({
              unit: sal.salesUnit,
              time: sal.time,
              salesDollars,
              GM_Dollars,
              GM_percentage,
            });
          });

          // Push the calculated values into the planning array
          planningsArray.push({
            store: el.Store,
            sku: sku.sku,
            price: +sku.price,
            cost: +sku.cost,
            sales: salesResulantArray,
          });
        });
      });

      // Return the generated planning array
      return planningsArray;
    } catch (error: any) {
      // Handle any errors and return a rejected value
      console.error("Error fetching initial state:", error);
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Planning slice
const planningslice = createSlice({
  name: "planningslice",
  initialState,
  reducers: {
    updateSalesunit: (state, action: PayloadAction<updaPlanningteData>) => {
      // Create a new state array by mapping over the existing state
      return state.map((el) => {
        if (
          el.store === action.payload.store &&
          el.sku === action.payload.sku
        ) {
          // Update the sales data for the matching store and sku
          const updatedSales = el.sales.map((sal) => {
            if (sal.time === action.payload.week) {
              // Calculate new sales
              const salesDollars = +action.payload.unit * el.price;
              const GM_Dollars = salesDollars - +action.payload.unit * el.cost;
              const GM_percentage = +(
                (GM_Dollars / salesDollars) *
                100
              ).toFixed(2);

              // Return updated sales data
              return {
                ...sal,
                unit: +action.payload.unit,
                salesDollars,
                GM_Dollars,
                GM_percentage,
              };
            }
            return sal;
          });

          // Return updated store/sku entry with the updated sales data
          return {
            ...el,
            sales: updatedSales,
          };
        }
        return el;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialState.pending, () => {
        console.log("fetchInitialState is pending...");
      })
      .addCase(fetchInitialState.fulfilled, (_, action) => {
        //  console.log("fetchInitialState fulfilled!", action.payload);
        return action.payload; // action.payload contains the planningsArray
      })
      .addCase(fetchInitialState.rejected, (_, action) => {
        console.error("fetchInitialState rejected:", action.payload);
      });
  },
});

export const { updateSalesunit } = planningslice.actions;
export default planningslice.reducer;
