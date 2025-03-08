import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store.ts";
import BasicSelect from "../Components/SelectComponent";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchInitialState,
  PlanningSliceState,
  SalesResult,
} from "../store/planningslice";
import Barchart from "../Components/Barchart.tsx";

export type SalesRevenue = {
  GM_DollarsSales: number;
  GM_percentage: number;
  salesDollars: number;
  time: number;
};

function Charts() {
  const dispatch = useDispatch<AppDispatch>();
  const storedetail = useSelector((state: RootState) => state.storeReducer);
  //console.log(storedetail);

  const plannings = useSelector((state: RootState) => state.planningReducer);
  //console.log(plannings);

  useEffect(() => {
    dispatch(fetchInitialState());
  }, []);

  const [selectedStore, setSelectedStore] = useState(() => {
    return storedetail[0].Store || "";
  });

  const selectedPlans = plannings?.filter((el: PlanningSliceState) => {
    return el.store == selectedStore;
  });
  //console.log(selectedPlans);

  //use this as a data for barchart=> calculating gross sales and gross margin across weeks
  let salesRevenues: SalesRevenue[] = [];
  selectedPlans?.map((el: PlanningSliceState) => {
    el.sales.map((sal: SalesResult, i) => {
      if (!salesRevenues[i]) {
        salesRevenues[i] = {
          GM_DollarsSales: 0,
          salesDollars: 0,
          GM_percentage: 0,
          time: i + 1,
        };
      }
      salesRevenues[i].GM_DollarsSales += Number(sal.GM_Dollars);
      salesRevenues[i].salesDollars += Number(sal.salesDollars);
    });
  });

  //calculating gross margin percentage across each week
  salesRevenues = salesRevenues?.map((el: SalesRevenue) => {
    let GM_percentage = +((el.GM_DollarsSales / el.salesDollars) * 100).toFixed(
      2
    );
    return { ...el, GM_percentage };
  });

  //console.log(salesRevenues);
  //checking if the calculations above are correct
  // let rev1 = 4278800;
  // let rev2 = 32000 + 200000 + 3620000 + 260800 + 166000;
  // console.log(rev1, rev2, rev1 == rev2);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStore(event.target.value as string);
  };

  return (
    <div>
      <BasicSelect
        stores={storedetail}
        selectedStore={selectedStore}
        handleChange={handleChange}
      />

      <div style={{ maxHeight: "550px" }}>
        <Barchart dataObject={salesRevenues} />
      </div>
    </div>
  );
}

export default Charts;
