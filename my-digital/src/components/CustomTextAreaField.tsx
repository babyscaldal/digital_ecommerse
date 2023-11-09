import { FormControl, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

interface ICustomTextAreaField {
  rows?: number
  label?: string
  id: string
  placeholder?: string
  name: string
}

export default function CustomTextAreaField({
  name,
  rows = 4,
  placeholder,
  id,
  label,
}: ICustomTextAreaField) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <FormControl
            fullWidth
            size="small"
            sx={{
              bgcolor: "#fff",
              borderRadius: "4px",
            }}
            variant="outlined"
          >
            <TextField
              color="warning"
              error={!!error}
              helperText={error?.message}
              id={id}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              label={label}
              multiline
              rows={rows}
              placeholder={placeholder}
            />
          </FormControl>
        )
      }}
    />
  )
}
