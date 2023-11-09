import { ReactNode, useEffect, useState } from "react"
import { MenuItem } from "@mui/material"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import FilterMenuItem from "./FilterMenuItem"
import styled from "styled-components"
import { z } from "zod"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import CustomCheckbox from "./CustomCheckbox"
import { rateOption } from "../data/checkboxData"
import { useAppDispatch } from "../app/hooks"
import {
  filterProductsByPrice,
  filterProductsByRate,
  sortProductsByAlphabetAZ,
  sortProductsByAlphabetZA,
  sortProductsByPriceHigh,
  sortProductsByPriceLow,
} from "../app/Redux/products/productSlice"
import CustomTextField from "./CustomTextField"
import CustomSelectField from "./CustomSelectField"
import { selectFilterData } from "../data/data"

const StyledFilterMenuItem = styled.div`
  padding: 6px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const MenuItemCategory = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--color-777777);
`

const CanvasFooter = styled.div`
  padding: 13px 25px;
`

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

export interface IFilterOptions {
  category: string
  element: ReactNode
}

interface IFiltersCanvasFormValue extends IFilterSideBarFormValue {
  sortValue: number
}

function FilterMenuContainer() {
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()

  const handleCloseParent = () => setShow(false)
  const handleShowParent = () => setShow(true)

  const form = useForm<IFiltersCanvasFormValue>({
    defaultValues: { rate: [], minPrice: "", maxPrice: "", sortValue: 0 },
    resolver: zodResolver(priceValueSchema),
  })

  const { handleSubmit, reset, control } = form

  const handleCheckboxChange = (value: number[]) => {
    dispatch(filterProductsByRate(value))
  }

  const onSubmit = (data: IFilterSideBarFormValue) => {
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

  const filterOptions: IFilterOptions[] = [
    {
      category: "Rate",
      element: (
        <CustomCheckbox
          onCheckboxChange={handleCheckboxChange}
          options={rateOption}
          name="rate"
        />
      ),
    },
    {
      category: "Price",
      element: (
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
      ),
    },
  ]

  const minPrice = Number(useWatch({ control, name: "minPrice" }))
  const maxPrice = Number(useWatch({ control, name: "maxPrice" }))

  useEffect(() => {
    if (!!minPrice && !!maxPrice) {
      dispatch(filterProductsByPrice([minPrice, maxPrice]))
    }
  }, [maxPrice, minPrice])

  return (
    <>
      <Button variant="secondary" onClick={handleShowParent}>
        Filter And Sort
      </Button>

      <Offcanvas
        show={show}
        onHide={handleCloseParent}
        style={{ zIndex: 1110 }}
      >
        <Offcanvas.Header
          style={{ borderBottom: "1px solid #cccccc" }}
          closeButton
        >
          <Offcanvas.Title>Filter And Sort</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="flex-grow-1">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {filterOptions?.map((option) => (
                <Offcanvas.Body
                  key={option.category}
                  as={"div"}
                  className="p-0"
                >
                  <MenuItem className="d-flex justify-content-between align-items-center">
                    <MenuItemCategory>{option?.category}:</MenuItemCategory>
                    <FilterMenuItem
                      key={option?.category}
                      category={option?.category}
                      option={option}
                    />
                  </MenuItem>
                </Offcanvas.Body>
              ))}
              <StyledFilterMenuItem>
                <MenuItemCategory>Sort By:</MenuItemCategory>
                <CustomSelectField
                  onSelectValueChange={handleSortProducts}
                  width="200px"
                  name={"sortValue"}
                >
                  {selectFilterData?.map((item, index) => (
                    <MenuItem selected key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </CustomSelectField>
              </StyledFilterMenuItem>
            </form>
          </FormProvider>
        </div>
        <CanvasFooter className="d-flex align-items-center justify-content-center gap-4">
          <Button
            onClick={() => {
              reset()
            }}
            variant="danger"
            style={{ width: "130px" }}
            className="rounded rounded-pill"
          >
            Clear
          </Button>
          <Button
            onClick={handleCloseParent}
            variant="success"
            style={{ width: "130px" }}
            className="rounded rounded-pill"
          >
            Apply
          </Button>
        </CanvasFooter>
      </Offcanvas>
    </>
  )
}

export default FilterMenuContainer
