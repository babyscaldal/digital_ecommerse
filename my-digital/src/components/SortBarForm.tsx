import { useForm, FormProvider } from "react-hook-form"
import { MenuItem } from "@mui/material"
import { useAppDispatch } from "../app/hooks"

import CustomSelectField from "./CustomSelectField"
import { selectFilterData } from "../data/data"
import {
  sortProductsByAlphabetAZ,
  sortProductsByAlphabetZA,
  sortProductsByPriceHigh,
  sortProductsByPriceLow,
} from "../app/Redux/products/productSlice"

interface selectFormValue {
  sortValue: number
}

export default function SortBarForm() {
  const dispatch = useAppDispatch()

  const form = useForm<selectFormValue>({
    defaultValues: { sortValue: 0 },
    mode: "all",
  })

  const { handleSubmit } = form

  const onSubmit = (data: selectFormValue) => {
    console.log(data)
  }

  const handleSortProducts = (value: number) => {
    switch (value) {
      case 1:
        dispatch(sortProductsByAlphabetAZ())
        return
      case 2:
        dispatch(sortProductsByAlphabetZA())
        return
      case 3:
        dispatch(sortProductsByPriceHigh())
        return
      case 4:
        dispatch(sortProductsByPriceLow())
        return

      default:
        return
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomSelectField
          onSelectValueChange={handleSortProducts}
          width="250px"
          name={"sortValue"}
        >
          {selectFilterData.map((item, index) => (
            <MenuItem
              selected={item.selected}
              disabled={item.disabled}
              key={index}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </CustomSelectField>
      </form>
    </FormProvider>
  )
}
