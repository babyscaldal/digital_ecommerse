import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  cartProductsState,
  totalCartProductPriceState,
  totalPriceCalculate,
} from "../app/Redux/products/productSlice"
import { useEffect } from "react"

const Wrapper = styled.section`
  background-color: white;
  height: calc(100vh - 150px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px #0000001a;
`
const Price = styled.h5`
  font-size: 20px;
`
const Title = styled.div`
  height: 57px;
  border-bottom: 1px solid var(--color-777777);
`

export default function CartPayment() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const cartProducts = useAppSelector(cartProductsState)

  const totalPrice = cartProducts.reduce((acc, item) => {
    return acc + (item.totalPrice ?? 0)
  }, 0)

  useEffect(() => {
    dispatch(totalPriceCalculate(totalPrice))
  }, [totalPrice])

  return (
    <Wrapper className="home-wrapper-2">
      <Title>
        <h3 className="text-center mb-4">Payment</h3>
      </Title>
      <div className=" my-4 d-flex justify-content-between align-items-center">
        <h5 className="m-0">Subtotal:</h5>
        <Price className="text-success">${totalPrice}</Price>
      </div>
      <Button
        fullWidth
        variant="contained"
        color="warning"
        onClick={() => {
          navigate("/checkout")
        }}
      >
        Continue to checkout
      </Button>
    </Wrapper>
  )
}
