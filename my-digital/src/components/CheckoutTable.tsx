import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import { cartProductsState } from "../app/Redux/products/productSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectedCartListState } from "../app/Redux/cart/CartSlice"
import { CheckoutItem } from "./CheckoutItem"

export default function CheckoutTable() {
  const selectedCartList = useAppSelector(selectedCartListState)
  console.log(selectedCartList)

  const cartProducts = useAppSelector(cartProductsState)

  return (
    <Paper
      sx={{
        borderRadius: "10px",
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        border: "1px solid black",
      }}
    >
      <TableContainer sx={{ height: 240 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="MuiTableRow-divider">
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Product
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                style={{ width: 100 }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                style={{ width: 100 }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts?.map((item) => {
              return <CheckoutItem item={item} key={item?.id} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
