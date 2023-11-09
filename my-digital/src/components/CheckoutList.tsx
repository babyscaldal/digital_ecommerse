import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"

import { CheckoutItem } from "./CheckoutItem"
import { TableCell, TableHead, TableRow } from "@mui/material"
import { useAppSelector } from "../app/hooks"
import { cartProductsState } from "../app/Redux/products/productSlice"

export default function CheckoutList() {
  const cartProducts = useAppSelector(cartProductsState)
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 190 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="MuiTableRow-divider">
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 100 }}
              >
                Product
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: "auto" }}
              >
                Detail
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 20 }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 20 }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts?.map((item) => (
              <CheckoutItem item={item} key={item.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
