import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store.ts";
import { fetchInitialState } from "../store/planningslice.ts";
import { useEffect } from "react";
import TablePlanning from "../Components/Tableplanning.tsx";

function Planning() {
  const dispatch = useDispatch<AppDispatch>();
  const storedetail = useSelector((state: RootState) => state.planningReducer);

  useEffect(() => {
    dispatch(fetchInitialState());
  }, []);

  return (
    <div>
      <TablePlanning array={storedetail} />
    </div>
  );
}

export default Planning;
