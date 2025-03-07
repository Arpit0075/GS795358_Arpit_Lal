import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField, Typography } from "@mui/material";
import { updaPlanningteData } from "./Tableplanning";

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

export default function PlanningModal({
  open,
  handleClose,
  currentData,
  handleCurrentData,
  handleUpdate,
}: {
  open: boolean;
  handleClose: () => void;
  currentData: updaPlanningteData;
  handleCurrentData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUpdate: () => void;
}) {
  // If currentData is not available, don't render the form
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
            <Typography>Week-{currentData.week}</Typography>
            <Typography>SKU-{currentData.sku}</Typography>
            <TextField
              type="number"
              id="outlined-basic"
              label="Units Sold"
              variant={"outlined"}
              value={currentData.unit}
              name="unit"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleCurrentData(e)}
            />
          </Box>
          <Button onClick={handleUpdate}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}
