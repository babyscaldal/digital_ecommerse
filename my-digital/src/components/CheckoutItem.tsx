import { TableRow, TableCell } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { IProductResponse } from "../app/Redux/products/productType"
import {
  addTotalPriceToCartProducts,
  removeProductsFromCartList,
} from "../app/Redux/products/productSlice"
import { useAppDispatch } from "../app/hooks"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { useEffect, useState } from "react"

interface ICartItem {
  item: IProductResponse
}

export const CheckoutItem = ({ item }: ICartItem) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [updatedProduct] = useState(item)

  useEffect(() => {
    dispatch(addTotalPriceToCartProducts(updatedProduct))
  }, [updatedProduct])

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { backgroundColor: "action.hover", cursor: "pointer" },
      }}
    >
      <TableCell align="left">
        <h6 onClick={() => navigate(`/products/${item?.category}/${item?.id}`)}>
          {item?.title}
        </h6>
      </TableCell>
      <TableCell align="center">
        <h6>{item?.quantity}</h6>
      </TableCell>

      <TableCell align="right">
        <h6>${item?.totalPrice}</h6>
      </TableCell>
    </TableRow>
  )
}
