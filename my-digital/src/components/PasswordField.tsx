import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
} from "@mui/material"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

interface IPasswordField {
  id: string
  name: string
  label?: string
  placeholder?: string
}

export default function PasswordField({
  name,
  id,
  label,
  placeholder,
}: IPasswordField) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  const { control } = useFormContext()

  const [iconColor, setColor] = useState("")

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
              <InputLabel color="warning" htmlFor={id}>
                {label}
              </InputLabel>
              <OutlinedInput
                color="warning"
                error={!!error}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                onBlur={() => {
                  setColor("")
                  onBlur()
                }}
                onChange={onChange}
                onFocus={() => setColor("warning.main")}
                value={value}
                id={id}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      sx={{ color: iconColor }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={label}
              />

              {error && (
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {error.message}
                </FormHelperText>
              )}
            </FormControl>
          </>
        )
      }}
    />
  )
}
