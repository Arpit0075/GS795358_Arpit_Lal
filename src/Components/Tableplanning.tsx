import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlanningModal from "./PlanningModal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateSalesunit } from "../store/planningslice";
import { Button } from "@mui/material";

type TableskuProps = {
  array?: any; // Optional prop
};

export default function TablePlanning({ array }: TableskuProps) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [currentData, setCurrentdata] = useState<any>(null);

  const handleCurrentData = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    //    console.log(name, value);

    setCurrentdata((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = () => {
    dispatch(updateSalesunit(currentData)); // Directly dispatch the currentData from props
    handleClose();
  };

  const applyBackground = (percentage: number) => {
    if (percentage >= 40) {
      return "green";
    } else if (percentage >= 10 && percentage < 40) {
      return "yellow";
    } else if (percentage > 5 && percentage < 10) {
      return "orange";
    } else return "red";
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ paddingTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Store</TableCell>
              <TableCell>Sku</TableCell>
              <TableCell>Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array?.map((row: any, i: number) => {
              // console.log(row.sales);

              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th">{row.store}</TableCell>
                  <TableCell>{row.sku}</TableCell>
                  {row.sales?.map((el: any) => {
                    return (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ background: "lightgray" }}>
                              Week
                            </TableCell>
                            <TableCell sx={{ background: "lightgray" }}>
                              Units Sold
                            </TableCell>
                            <TableCell sx={{ background: "lightgray" }}>
                              Sales_Dollars:
                            </TableCell>
                            <TableCell sx={{ background: "lightgray" }}>
                              GM_Dollars
                            </TableCell>
                            <TableCell sx={{ background: "lightgray" }}>
                              GM_percentage
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableCell>week-{el.time}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                setOpen(true);
                                setCurrentdata({
                                  unit: el.unit,
                                  week: el.time,
                                  store: row.store,
                                  sku: row.sku,
                                });
                              }}
                            >
                              {el.unit}
                            </Button>
                          </TableCell>
                          <TableCell>${el.salesDollars}</TableCell>
                          <TableCell>${el.GM_Dollars}</TableCell>
                          <TableCell
                            //working
                            style={{
                              background: applyBackground(el.GM_percentage),
                            }}

                            // style={{
                            //   background: "red",
                            // }}
                            // sx={{background: ()=>applyBackground(el.GM_percentage)}}
                          >
                            {el.GM_percentage}%
                          </TableCell>
                        </TableBody>
                      </Table>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {
        <PlanningModal
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
