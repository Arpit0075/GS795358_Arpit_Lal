import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Button, Tooltip } from "@mui/material";
import { deleteFromStore, updateStore } from "../store/storecomponentslice";
import EditIcon from "@mui/icons-material/Edit";
import BasicModal from "./StoreModal";
import { useState } from "react";
import { useDispatch } from "react-redux";

type TablecompProps = {
  element: string;
  array?: any; // Optional prop
};

export default function Tablecomp({ element, array }: TablecompProps) {
  const dispatch = useDispatch();

  const handleDelete = (serial: number) => {
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
    // console.log(currentData);

    // return;

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
              {element == "store" && (
                <TableCell sx={{ width: "5%" }}></TableCell>
              )}
              <TableCell>S.No</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
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
                    <Button>
                      <DeleteIcon onClick={() => handleDelete(row.id)} />
                    </Button>
                  </Tooltip>
                </TableCell>
                {element == "store" && (
                  <TableCell sx={{ width: "5%" }}>
                    <Button>
                      <ShuffleIcon />
                    </Button>
                  </TableCell>
                )}
                <TableCell component="th">{row.SNo}</TableCell>
                <TableCell>{row.Store}</TableCell>
                <TableCell>{row.City}</TableCell>
                <TableCell>{row.State}</TableCell>
                <TableCell sx={{ width: "5%" }}>
                  <Tooltip title="update">
                    <Button>
                      <EditIcon
                        onClick={() => {
                          setOpen(true);
                          setCurrentdata(row);
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        <BasicModal
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
