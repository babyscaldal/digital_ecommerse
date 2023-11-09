import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  styled,
} from "@mui/material"
import { useState } from "react"
import { IProductResponse } from "../app/Redux/products/productType"

interface ICountInputField {
  id: string
  item: IProductResponse
  count: number
  onIncrease: () => void
  onDecrease: () => void
  setCount: React.Dispatch<React.SetStateAction<number>>
}

const TextCenterInput = styled(OutlinedInput)`
  input {
    text-align: center;
  }
`

export default function CountInputField({
  id,
  count,
  setCount,
  onDecrease,
  onIncrease,
}: ICountInputField) {
  const [iconColor, setColor] = useState("")

  return (
    <FormControl
      size="small"
      sx={{
        textAlign: "center",
        bgcolor: "#fff",
        borderRadius: "4px",
        width: "150px",
      }}
      variant="outlined"
    >
      <TextCenterInput
        onBlur={() => {
          setColor("")
        }}
        onChange={(e) => setCount(Number(e.target.value))}
        onFocus={() => setColor("warning.main")}
        value={count}
        id={id}
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              onClick={onDecrease}
              sx={{ color: iconColor }}
              edge="start"
            >
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={onIncrease}
              sx={{ color: iconColor }}
              edge="end"
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
