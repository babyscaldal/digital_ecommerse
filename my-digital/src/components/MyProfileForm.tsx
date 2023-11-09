import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, IconButton } from "@mui/material"
import PasswordField from "./PasswordField"
import { useNavigate } from "react-router-dom"
import CustomTextField from "./CustomTextField"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  currentUserState,
  updateCurrentUser,
} from "../app/Redux/users/userSlice"
import EditIcon from "@mui/icons-material/Edit"

const MyProfileSchema = z.object({
  password: z
    .string()
    .min(8, { message: "The password must be least 8 characters long." }),
})

export interface IMyProfileFormValue {
  password: string
}

export default function MyProfileForm() {
  const [isUpdate, setIsUpdate] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const form = useForm({
    defaultValues: { password: "" },
    resolver: zodResolver(MyProfileSchema),
    mode: "onSubmit",
  })

  const { handleSubmit, reset } = form

  const onSubmit = (data: IMyProfileFormValue) => {
    console.log(data)
    dispatch(updateCurrentUser(data))
    setIsUpdate(false)
    reset()
  }

  const currentUser = useAppSelector(currentUserState)

  return (
    <>
      {isUpdate ? (
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-15"
          >
            <PasswordField
              label="New password"
              placeholder="New password"
              id="signUp-password"
              name="password"
            />

            <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                Submit
              </Button>
              <Button
                fullWidth
                onClick={() => setIsUpdate(false)}
                type="button"
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="m-0">User name:</h6>
              <p className="m-0">{currentUser?.user.username}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 ">Email:</h6>
              <p className="m-0">{currentUser?.user.email}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="m-0">Password:</h6>
              <p className="m-0">***************</p>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button
              startIcon={<EditIcon />}
              color="warning"
              size="large"
              aria-label="edit"
              onClick={() => setIsUpdate(true)}
            >
              Update password
            </Button>
          </div>
        </>
      )}
    </>
  )
}
