import { FormProvider, useForm, useWatch } from "react-hook-form"
import CustomCheckbox from "./CustomCheckbox"
import { rateOption } from "../data/checkboxData"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@mui/material"

import { SubTitle } from "../pages/OurStore"
import CustomTextField from "./CustomTextField"
import { useAppDispatch } from "../app/hooks"
import {
  filterProductsByPrice,
  filterProductsByRate,
} from "../app/Redux/products/productSlice"
import { useEffect } from "react"

const numberRegex = /^[0-9]+$/

const priceValueSchema = z.object({
  maxPrice: z.string().refine((value) => numberRegex.test(value), {
    message: "Must be number",
  }),
  minPrice: z.string().refine((value) => numberRegex.test(value), {
    message: "Must be number",
  }),
  rate: z.string().array().optional(),
})

interface IFilterSideBarFormValue {
  rate: number[]
  minPrice: string
  maxPrice: string
}

export default function FilterSideBarForm() {
  const dispatch = useAppDispatch()
  const form = useForm<IFilterSideBarFormValue>({
    defaultValues: { rate: [], minPrice: "", maxPrice: "" },
    resolver: zodResolver(priceValueSchema),
    mode: "all",
  })

  const { handleSubmit, reset, control } = form

  const onSubmit = (data: IFilterSideBarFormValue) => {
    console.log(data)
  }

  const handleCheckboxChange = (value: number[]) => {
    dispatch(filterProductsByRate(value))
  }

  const minPrice = Number(useWatch({ control, name: "minPrice" }))
  const maxPrice = Number(useWatch({ control, name: "maxPrice" }))

  useEffect(() => {
    if (!!minPrice && !!maxPrice) {
      dispatch(filterProductsByPrice([minPrice, maxPrice]))
    }
  }, [maxPrice, minPrice])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubTitle>Rate</SubTitle>
        <CustomCheckbox
          onCheckboxChange={handleCheckboxChange}
          options={rateOption}
          name="rate"
        />
        <SubTitle>Price</SubTitle>
        <div className="d-flex align-items-center gap-10">
          <CustomTextField
            placeholder="From"
            name="minPrice"
            id="min-price"
            label="From"
            type={"text"}
          />
          <CustomTextField
            placeholder="To"
            name="maxPrice"
            id="max-price"
            label="To"
            type={"text"}
          />
        </div>

        <div className="mt-3">
          <Button
            fullWidth
            color="warning"
            size="small"
            variant="contained"
            type="button"
            onClick={() => {
              reset()
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
