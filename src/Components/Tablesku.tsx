import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import { deleteFromStore, updateStore } from "../store/skuslice";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SkuModal from "./SkuModal";

type TableskuProps = {
  array?: any; // Optional prop
};

export default function TableSku({ array }: TableskuProps) {
  const dispatch = useDispatch();

  const handleDelete = (serial: string) => {
    dispatch(deleteFromStore(serial));
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [currentData, setCurrentdata] = useState<any>(null);

  const handleCurrentData = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    console.log(name, value);

    // setCurrentdata({ [name]: value });

    setCurrentdata((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = () => {
    dispatch(updateStore(currentData)); // Directly dispatch the currentData from props
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ paddingTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "5%" }}></TableCell>
              <TableCell>Sku</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell sx={{ width: "5%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array?.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: "5%" }}>
                  <Tooltip title="Delete">
                    <Button onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </TableCell>

                <TableCell component="th">{row.sku}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell sx={{ width: "5%" }}>
                  <Tooltip title="update">
                    <Button
                      onClick={() => {
                        setOpen(true);
                        setCurrentdata(row);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        <SkuModal
          action="update"
          open={open}
          handleCurrentData={handleCurrentData}
          handleClose={handleClose}
          currentData={currentData}
          handleUpdate={handleUpdate}
        />
      }
    </>
  );
}
