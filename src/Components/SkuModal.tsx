import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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
  currentData: any;
  handleCurrentData: any;
  handleUpdate: any;
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
            {/* Directly using currentData to control the form fields */}

            {/* {action === "create" && (
              <TextField
                id="outlined-basic"
                label="id"
                variant={"filled"}
                defaultValue={+Date.now()} // Controlled component, directly from props
                name="id"
                disabled
                // onChange={(e) => handleCurrentData(e)}
              />
            )} */}
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
              id="outlined-basic"
              label="SKU"
              variant={"outlined"}
              value={currentData.sku} // Controlled component, directly from props
              name="sku"
              onChange={(e) => handleCurrentData(e)}
            />
            <TextField
              id="standard-helperText"
              label="Price"
              variant="outlined"
              value={currentData.price} // Controlled component, directly from props
              name="price"
              onChange={(e) => handleCurrentData(e)} // Update currentData directly
            />
            <TextField
              id="filled-basic"
              label="Cost"
              variant="outlined"
              value={currentData.cost} // Controlled component, directly from props
              name="cost"
              onChange={(e) => handleCurrentData(e)} // Update currentData directly
            />
          </Box>
          <Button onClick={handleUpdate}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}
