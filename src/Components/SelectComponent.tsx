import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { storedetailsState } from "../store/storecomponentslice";

export default function BasicSelect({
  stores,
  selectedStore,
  handleChange,
}: {
  stores: storedetailsState[];
  selectedStore: string;
  handleChange: (event: SelectChangeEvent) => void;
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Stores</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedStore}
          label="Stores"
          onChange={handleChange}
        >
          {stores?.map((store: storedetailsState) => {
            return (
              <MenuItem key={store.id} value={store.Store}>
                {store.Store}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
