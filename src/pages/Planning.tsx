import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store.ts";
import { fetchInitialState } from "../store/planningslice.ts";
import { useEffect } from "react";
import TablePlanning from "../Components/Tableplanning.tsx";

function Planning() {
  const dispatch = useDispatch<AppDispatch>();
  // const storedetail = useSelector((state: RootState) => state.storeReducer);
  // const skudetail = useSelector((state: RootState) => state.skuReducer);
  //console.log(skudetail);

  const storedetail = useSelector((state: RootState) => state.planningReducer);
  console.log(storedetail);

  useEffect(() => {
    dispatch(fetchInitialState());
  }, []);

  //planningsArray;

  return (
    <div>
      <TablePlanning array={storedetail} />
    </div>
  );
}

export default Planning;
