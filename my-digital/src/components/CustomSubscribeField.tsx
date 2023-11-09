import * as React from "react"
import Snackbar from "@mui/material/Snackbar"
import Fade from "@mui/material/Fade"
import Slide, { SlideProps } from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { Alert } from "@mui/material"

import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import styled from "styled-components"

interface ICustomSubscribeField {
  id: string
  placeholder?: string
  children?: any
  type?: string
  name: string
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

export default function CustomSubscribeField({
  name,
  children,
  placeholder,
  id,
  type = "text",
}: ICustomSubscribeField) {
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
            <OutlinedInput
              error={!!error}
              placeholder={placeholder}
              onBlur={() => {
                setColor("")
                onBlur()
              }}
              onChange={onChange}
              onFocus={() => setColor("warning.main")}
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
        )
      }}
    />
  )
}
