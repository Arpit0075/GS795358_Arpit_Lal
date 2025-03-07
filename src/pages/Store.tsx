import { Button } from "@mui/material";
import Tablecomp from "../Components/TableStore.tsx";

import type { RootState } from "../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import BasicModal from "../Components/StoreModal.tsx";
import { useState } from "react";
import { addToStore, storedetailsState } from "../store/storecomponentslice.ts";

function Store() {
  const storedetail = useSelector((state: RootState) => state.storeReducer);
  // console.log(storedetail);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [currentData, setCurrentdata] = useState<storedetailsState>({
    id: "",
    SNo: "",
    State: "",
    City: "",
    Store: "",
  });

  const handleCurrentData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;

    setCurrentdata((prev: storedetailsState) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = () => {
    dispatch(addToStore({ ...currentData, id: +Date.now() }));

    setCurrentdata({
      id: "",
      SNo: "",
      State: "",
      City: "",
      Store: "",
    });
    handleClose();
  };

  return (
    <div>
      <Tablecomp element="store" array={storedetail} />
      <Button onClick={() => setOpen(true)}>Add</Button>
      <BasicModal
        action={"create"}
        open={open}
        handleCurrentData={handleCurrentData}
        handleClose={handleClose}
        currentData={currentData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default Store;
