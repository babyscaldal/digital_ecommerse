import { Controller, useFormContext } from "react-hook-form"
import { DateField } from "@mui/x-date-pickers/DateField"
import FormControl from "@mui/material/FormControl"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { FormHelperText, TextField } from "@mui/material"

interface ICustomDateField {
  name: string
}

export default function CustomDateField({ name }: ICustomDateField) {
  const { control } = useFormContext()
  // const today = dayjs(new Date())

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
              <DateField
                // minDate={today}
                format="MM/YYYY"
                fullWidth
                size="small"
                label="Select Date"
                value={value}
                onChange={onChange}
              />
              {error && (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {error.message}
                </FormHelperText>
              )}
            </>
          </LocalizationProvider>
        )
      }}
    />
  )
}
