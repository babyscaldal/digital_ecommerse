import { TableRow, TableCell } from "@mui/material"
import Image from "./Image"
import SingleCartSelected from "./SingleCartSelected"
import CountInputField from "./CountInputField"
import { IProductResponse } from "../app/Redux/products/productType"
import {
  addTotalPriceToCartProducts,
  removeProductsFromCartList,
} from "../app/Redux/products/productSlice"
import { useAppDispatch } from "../app/hooks"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface ICartItem {
  item: IProductResponse
}

export const CartItem = ({ item }: ICartItem) => {
  const dispatch = useAppDispatch()
  const [count, setCount] = useState(item.quantity)
  const navigate = useNavigate()
  const [updatedProduct, setUpdatedProduct] = useState(item)

  useEffect(() => {
    dispatch(addTotalPriceToCartProducts(updatedProduct))
  }, [updatedProduct])

  const handleClickToDeleteSingleProduct = () => {
    dispatch(removeProductsFromCartList(item))
  }

  const handleIncrease = () => {
    setCount((prevCount) => {
      setUpdatedProduct({
        ...item,
        quantity: prevCount + 1,
        totalPrice: item.price * (prevCount + 1),
      })
      return prevCount + 1
    })
  }

  const handleDecrease = () => {
    setCount((prevCount) => {
      if (prevCount > 1) {
        setUpdatedProduct({
          ...item,
          quantity: prevCount - 1,
          totalPrice: item.price * (prevCount - 1),
        })
        return prevCount - 1
      }
      setUpdatedProduct({
        ...item,
        quantity: 1,
        totalPrice: item.price,
      })
      return prevCount
    })
  }

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { backgroundColor: "action.hover", cursor: "pointer" },
      }}
    >
      <TableCell align="center">
        <SingleCartSelected item={item} />
      </TableCell>
      <TableCell align="center">
        <Image
          width="50px"
          height="50px"
          src={item?.image}
          alt={item?.category}
        />
      </TableCell>
      <TableCell align="center">
        <h6 onClick={() => navigate(`/products/${item?.category}/${item?.id}`)}>
          {item?.title}
        </h6>
        <Link
          className="text-decoration-underline"
          to={`/products/${item?.category}/${item?.id}`}
        >
          More detail
        </Link>
      </TableCell>
      <TableCell align="center">${item?.price}</TableCell>
      <TableCell align="center">
        <CountInputField
          count={count}
          setCount={setCount}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          item={item}
          id={"cart-form-quantity"}
        />
      </TableCell>
      <TableCell align="center">${item.totalPrice}</TableCell>
      <TableCell align="center">
        <DeleteConfirmModal
          setCount={setCount}
          count={count}
          title="Delete a single product"
          onDeleteSingle={handleClickToDeleteSingleProduct}
          item={item}
        />
      </TableCell>
    </TableRow>
  )
}
