import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Col, Container, Row } from "react-bootstrap"
import CustomTextField from "./CustomTextField"
import CustomSelectField from "./CustomSelectField"
import { Button, MenuItem } from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  allCountriesState,
  citiesState,
  getAllCountries,
} from "../app/Redux/countries/countrySlice"

import { cartProductsState } from "../app/Redux/products/productSlice"
import PayPalCheckoutButton from "./PayPalCheckoutButton"

export const checkoutFormValueSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
})

interface ICheckoutFormValue {
  country: string
  firstName: string
  lastName: string
  address: string
  city: string
}

export default function CheckoutForm() {
  const dispatch = useAppDispatch()
  const allCountries = useAppSelector(allCountriesState)
  const cities = useAppSelector(citiesState)

  const form = useForm<ICheckoutFormValue>({
    defaultValues: {
      country: "default",
      firstName: "",
      lastName: "",
      address: "",
      city: "default",
    },
    resolver: zodResolver(checkoutFormValueSchema),
    mode: "onSubmit",
  })

  const { handleSubmit, reset } = form

  const onSubmit = (data: ICheckoutFormValue) => {
    console.log(data)
    reset()
  }

  useEffect(() => {
    dispatch(getAllCountries())
  }, [])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className="p-0">
          <Row>
            <Col xs={6} className="mb-3">
              <CustomTextField
                label="First Name"
                placeholder="First Name"
                name="firstName"
                id="checkout-form-firstName"
                type="text"
              />
            </Col>
            <Col xs={6} className="mb-3">
              <CustomTextField
                label="Last Name"
                placeholder="Last Name"
                name="lastName"
                id="checkout-form-lastName"
                type="text"
              />
            </Col>
            <Col xs={12} className="mb-3">
              <CustomSelectField fullWidth name="country">
                <MenuItem selected disabled value="default">
                  Select Country
                </MenuItem>
                {allCountries?.map((item) => {
                  return (
                    <MenuItem key={item?.country} value={item?.country}>
                      {item?.country}
                    </MenuItem>
                  )
                })}
              </CustomSelectField>
            </Col>
            <Col xs={12} className="mb-3">
              <CustomSelectField fullWidth name="city">
                <MenuItem selected disabled value="default">
                  Select Cities
                </MenuItem>
                {cities?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  )
                })}
              </CustomSelectField>
            </Col>

            <Col xs={12} className="mb-3">
              <CustomTextField
                label="Address"
                placeholder="Address"
                name="address"
                id="checkout-form-address"
                type="text"
              />
            </Col>
            <Col xs={12} className="mb-3"></Col>
          </Row>
          <div className="d-flex justify-content-between my-3">
            <Button
              color="secondary"
              startIcon={<ArrowBackIosIcon />}
              variant="text"
            >
              Return to cart
            </Button>
            <Button
              endIcon={<ArrowForwardIosIcon />}
              color="warning"
              variant="text"
              type="submit"
            >
              Continue to shipping
            </Button>
          </div>
        </Container>
      </form>
    </FormProvider>
  )
}
