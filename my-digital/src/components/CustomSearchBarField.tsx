import * as React from "react"
import Snackbar from "@mui/material/Snackbar"
import Fade from "@mui/material/Fade"
import Slide, { SlideProps } from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { Alert } from "@mui/material"
import Tippy from "@tippyjs/react/headless"
import "tippy.js/dist/tippy.css"

import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import styled from "styled-components"
import SearchResultItem from "./SearchResultItem"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { resetToInit, searchProducts } from "../app/Redux/products/productSlice"
import useDebounce from "../hooks/useDebounce"

interface ICustomSearchBarField {
  id: string
  placeholder?: string
  children?: any
  type?: string
  name: string
  showResult: boolean
  onHideResult?: () => void
  onShowResult?: () => void
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

const PopoverContent = styled.div`
  padding: 10px 0;
  background: #f7dfdf;
  width: 450px;
  border-radius: 10px;
  overflow: auto;
  height: 380px;
`

export default function CustomSearchBarField({
  name,
  showResult,
  children,
  placeholder,
  id,
  type = "text",
  onShowResult,
  onHideResult,
}: ICustomSearchBarField) {
  const [state, setState] = React.useState<{
    open: boolean
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>
      }
    >
  }>({
    open: false,
    Transition: Fade,
  })

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>
        }
      >,
    ) =>
    () => {
      setState({
        open: true,
        Transition,
      })
    }

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    })
  }

  const { control } = useFormContext()

  const [iconColor, setColor] = useState("")

  const dispatch = useAppDispatch()

  const searchResultProducts = useAppSelector(
    (state) => state?.product?.searchResultProducts,
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const debounceValue = useDebounce(value.trim(), 500)

        useEffect(() => {
          if (!debounceValue.trim()) {
            dispatch(resetToInit())
            return
          }
          dispatch(searchProducts(debounceValue))
        }, [debounceValue])

        return (
          <Tippy
            onClickOutside={() => {
              onHideResult && onHideResult()
            }}
            visible={showResult && !!searchResultProducts.length}
            interactive
            placement="bottom-end"
            render={(props) => (
              <div tabIndex={-1} {...props}>
                <PopoverContent>
                  {searchResultProducts?.map((product) => (
                    <SearchResultItem
                      // showResult={showResult}
                      onHideResult={onHideResult}
                      key={product.id}
                      product={product}
                    />
                  ))}
                </PopoverContent>
              </div>
            )}
          >
            <FormControl
              fullWidth
              size="small"
              sx={{
                bgcolor: "#fff",
                borderRadius: "4px",
              }}
              variant="outlined"
            >
              <OutlinedInput
                error={!!error}
                placeholder={placeholder}
                onBlur={() => {
                  setColor("")
                  onBlur()
                }}
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                onFocus={() => {
                  setColor("warning.main")
                  onShowResult && onShowResult()
                }}
                value={value}
                id={id}
                type={type}
                endAdornment={
                  children && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClick(SlideTransition)}
                        sx={{ color: iconColor }}
                        type="submit"
                        edge="end"
                      >
                        {children}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              />
              {error && (
                <Snackbar
                  autoHideDuration={2000}
                  open={state.open}
                  onClose={handleClose}
                  TransitionComponent={state.Transition}
                  message="I love snacks"
                  key={state.Transition.name}
                >
                  <Alert
                    variant="filled"
                    severity="error"
                    onClose={handleClose}
                    sx={{
                      width: "100%",
                    }}
                  >
                    {error.message}
                  </Alert>
                </Snackbar>
              )}
            </FormControl>
          </Tippy>
        )
      }}
    />
  )
}
