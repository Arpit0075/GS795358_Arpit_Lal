import { useDispatch, useSelector } from "react-redux";
import TableSku from "../Components/Tablesku";
import type { RootState } from "../store/store.ts";
import SkuModal from "../Components/SkuModal.tsx";
import { Button } from "@mui/material";
import { useState } from "react";
import { addToStore } from "../store/skuslice.ts";

function Sku() {
  const storedetail = useSelector((state: RootState) => state.skuReducer);
  console.log(storedetail);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [currentData, setCurrentdata] = useState<any>({
    id: "",
    sku: "",
    price: "",
    cost: "",
  });

  const handleCurrentData = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    console.log(name, value);
    setCurrentdata((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = () => {
    dispatch(addToStore({ ...currentData, id: +Date.now() }));

    setCurrentdata({
      id: "",
      sku: "",
      price: "",
      cost: "",
    });
    handleClose();
  };
  return (
    <div>
      <TableSku array={storedetail} />
      <Button onClick={() => setOpen(true)}>Add</Button>
      <SkuModal
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

export default Sku;
