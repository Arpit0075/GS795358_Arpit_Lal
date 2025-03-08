import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { skuSliceState } from "../store/skuslice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SkuModal({
  open,
  handleClose,
  currentData,
  handleCurrentData,
  handleUpdate,
  action,
}: {
  open: boolean;
  handleClose: () => void;
  currentData: skuSliceState;
  handleCurrentData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUpdate: () => void;
  action: string;
}) {
  if (!currentData) return null;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            {action === "update" && (
              <TextField
                id="outlined-basic"
                label="id"
                variant={"filled"}
                value={currentData.id} // Controlled component, directly from props
                name="id"
                disabled={action == "update"}
                //onChange={(e) => handleCurrentData(e)}
              />
            )}

            <TextField
              type="text"
              id="outlined-basic"
              label="SKU"
              variant={"outlined"}
              value={currentData.sku}
              name="sku"
              onChange={(e) => handleCurrentData(e)}
            />
            <TextField
              type="number"
              id="standard-helperText"
              label="Price"
              variant="outlined"
              value={currentData.price}
              name="price"
              onChange={(e) => handleCurrentData(e)} // Update currentData
            />
            <TextField
              type="number"
              id="filled-basic"
              label="Cost"
              variant="outlined"
              value={currentData.cost}
              name="cost"
              onChange={(e) => handleCurrentData(e)}
            />
          </Box>
          <Button onClick={handleUpdate}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}
