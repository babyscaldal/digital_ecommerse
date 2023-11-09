import { isSelectAllState, selectAll } from "../app/Redux/cart/CartSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Checkbox } from "@mui/material"

export default function AllCartSelected() {
  const isSelectAll = useAppSelector(isSelectAllState)
  const dispatch = useAppDispatch()

  return (
    <Checkbox
      onChange={() => {
        dispatch(selectAll())
      }}
      id="header-checkbox"
      checked={isSelectAll}
    />
  )
}
