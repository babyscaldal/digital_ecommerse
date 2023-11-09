import { FormControl, Select } from "@mui/material"
import { useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  allCountriesState,
  citiesState,
  getCities,
} from "../app/Redux/countries/countrySlice"

interface ICustomSelectField {
  fullWidth?: boolean
  label?: string
  children?: any
  name: string
  width?: string
  onSelectValueChange?: (value: number) => void
  onCountryChange?: (data: string[]) => void
}

export default function CustomSelectField({
  fullWidth,
  width,
  name,
  children,
  label,
  onSelectValueChange,
}: ICustomSelectField) {
  const { control } = useFormContext()

  const dispatch = useAppDispatch()
  const countries = useAppSelector(allCountriesState)
  const cities = useAppSelector(citiesState)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => {
        useEffect(() => {
          onSelectValueChange && onSelectValueChange(value)
          const selectedCountry = countries.find(
            (item) => item.country === value,
          )
          if (selectedCountry) {
            dispatch(getCities(selectedCountry?.cities))
          }
        }, [value])
        return (
          <FormControl fullWidth={fullWidth} size="small">
            <Select
              sx={{ width: width ? width : null, backgroundColor: "#fff" }}
              value={value}
              label={label}
              onChange={onChange}
              onBlur={onBlur}
            >
              {children}
            </Select>
          </FormControl>
        )
      }}
    />
  )
}
