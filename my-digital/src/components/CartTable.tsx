import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { CartItem } from "./CartItem"
import AllCartSelected from "./AllCartSelected"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectedCartListState } from "../app/Redux/cart/CartSlice"

import {
  cartProductsState,
  removeAllSelectedProductsFromCartList,
} from "../app/Redux/products/productSlice"
import { IProductResponse } from "../app/Redux/products/productType"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { Tooltip } from "@mui/material"

export default function CartTable() {
  const selectedCartList = useAppSelector(selectedCartListState)
  console.log(selectedCartList)

  const handleClickToDeleteAllSelected = (products: IProductResponse[]) => {
    dispatch(removeAllSelectedProductsFromCartList(products))
  }

  const cartProducts = useAppSelector(cartProductsState)
  const dispatch = useAppDispatch()

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: "calc(100vh - 150px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="MuiTableRow-divider">
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 50 }}
              >
                <AllCartSelected />
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 150 }}
              >
                Product
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 400 }}
              >
                Detail
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 150 }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
                style={{ width: 150 }}
              >
                Price
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <DeleteConfirmModal
                  title="Delete all selected products"
                  onDeleteAllSelected={handleClickToDeleteAllSelected}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts?.map((item) => {
              return <CartItem item={item} key={item?.id} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
