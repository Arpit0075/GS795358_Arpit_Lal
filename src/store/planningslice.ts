import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the planning slice state
interface SalesResult {
  unit: number;
  time: number;
  salesDollars: number;
  GM_Dollars: number;
  GM_percentage: number;
}

interface PlanningSliceState {
  store: string;
  sku: string;
  price: number;
  cost: number;
  sales: SalesResult[];
}

// Initial state for the planning slice
const initialState: PlanningSliceState[] = [];

// Async thunk to fetch initial state (this can be the function that pulls the necessary data)
export const fetchInitialState = createAsyncThunk<PlanningSliceState[], void>(
  "planningslice/fetchInitialState",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const storeState = state.storeReducer; // Assuming storeReducer is your state slice for store details
      const skuState = state.skuReducer; // Assuming skuReducer is your state slice for SKU details

      // Log the state to check if the data is available
      //   console.log("storeState:", storeState);
      //   console.log("skuState:", skuState);

      if (!storeState || !skuState) {
        throw new Error("storeState or skuState is missing");
      }

      // Initialize an empty array to store the results
      let planningsArray: PlanningSliceState[] = [];

      // Iterate over store details and sku details to generate the result
      storeState.map((el: any) => {
        // el.Store is your store information
        skuState.map((sku: any) => {
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
            let salesDollars = sal.salesUnit * sku.price;
            let GM_Dollars = salesDollars - sal.salesUnit * sku.cost;
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
            store: el.Store, // Assuming el.Store holds the store name or identifier
            sku: sku.sku, // SKU code or name
            price: sku.price, // SKU price
            cost: sku.cost, // SKU cost
            sales: salesResulantArray, // Array of sales results for the SKU
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
    updateSalesunit: (state, action: PayloadAction<any>) => {
      console.log(action.payload);

      // Create a new state array by mapping over the existing state
      return state.map((el) => {
        if (
          el.store === action.payload.store &&
          el.sku === action.payload.sku
        ) {
          // Update the sales data for the matching store and sku
          const updatedSales = el.sales.map((sal) => {
            if (sal.time === action.payload.week) {
              // Calculate new sales metrics
              const salesDollars = action.payload.unit * el.price;
              const GM_Dollars = salesDollars - action.payload.unit * el.cost;
              const GM_percentage = +(
                (GM_Dollars / salesDollars) *
                100
              ).toFixed(2);

              // Return updated sales data
              return {
                ...sal, // Make sure to copy the old sales data and overwrite necessary properties
                unit: action.payload.unit,
                salesDollars,
                GM_Dollars,
                GM_percentage,
              };
            }
            return sal; // No change, just return the existing sales object
          });

          // Return updated store/sku entry with the updated sales data
          return {
            ...el, // Spread the current store data
            sales: updatedSales, // Replace with the updated sales array
          };
        }
        return el; // No change, just return the existing store data
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
        // Directly update the state with the data returned from the thunk
        return action.payload; // action.payload contains the planningsArray
      })
      .addCase(fetchInitialState.rejected, (_, action) => {
        console.error("fetchInitialState rejected:", action.payload);
      });
  },
});

// Export actions and reducer
export const { updateSalesunit } = planningslice.actions;
export default planningslice.reducer;
