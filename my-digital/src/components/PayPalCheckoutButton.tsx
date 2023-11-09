import React, { useEffect, useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  cartProductsState,
  removeAllProducts,
} from "../app/Redux/products/productSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface IPayPalCheckoutButton {
  totalPrice: number
}

export default function PayPalCheckoutButton({
  totalPrice,
}: IPayPalCheckoutButton) {
  const [paidFor, setPaidFor] = useState(false)
  const [error, setError] = useState<any>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleApprove = (orderId: any) => {
    setPaidFor(true)
  }

  useEffect(() => {
    if (paidFor) {
      toast.success("Thank you for purchasing from us")
      dispatch(removeAllProducts())
      navigate("/")
    } else if (error) {
      toast.error("Purchasing is failed. Please try again!!!")
    }
  }, [paidFor, error])

  return (
    <div style={{ height: "40px" }}>
      <PayPalButtons
        onClick={(_, actions) => {
          const hasAlreadyBought = false
          if (hasAlreadyBought) {
            setError("You already bought this products")
            return actions.reject()
          }
          return actions.resolve()
        }}
        createOrder={(_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "subtotal",
                amount: {
                  value: totalPrice.toString(),
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture()
          console.log("order", order)

          handleApprove(data.orderID)
        }}
        onCancel={() => {}}
        onError={(err: any) => {
          setError(err)
        }}
      />
    </div>
  )
}
