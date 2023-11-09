import {
  Alert,
  InputLabel,
  OutlinedInput,
  FormControl,
  TextField,
} from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import "tippy.js/dist/tippy.css"

interface ICustomTextField {
  id: string
  name: string
  type: string
  label?: string
  placeholder?: string
}

export default function CustomTextField({
  name,
  id,
  type,
  placeholder,
  label,
}: ICustomTextField) {
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
          <>
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
                size="small"
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id={id}
                type={type}
                label={label}
              />
            </FormControl>
          </>
        )
      }}
    />
  )
}
