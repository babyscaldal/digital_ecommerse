import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mui/material"
import PasswordField from "./PasswordField"
import { useNavigate } from "react-router-dom"

export const ResetPasswordSchena = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "The password must be least 8 characters long." }),
    confirmPassword: z
      .string()
      .min(8, { message: "The password must be at least 8 characters long." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords and Confirm Password does not match.",
    path: ["confirmPassword"],
  })

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: zodResolver(ResetPasswordSchena),
    mode: "onSubmit",
  })

  const { handleSubmit, reset } = form

  const onSubmit = (data: any) => {
    console.log(data)
    reset()
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-15"
      >
        <PasswordField
          placeholder="New Password"
          label="New Password"
          id={"reset-form-newPassword"}
          name={"newPassword"}
        />
        <PasswordField
          placeholder="Confirm Password"
          label="Confirm Password"
          id={"reset-form-confirmPassword"}
          name={"confirmPassword"}
        />

        <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
          <Button fullWidth type="submit" variant="contained" color="success">
            Submit
          </Button>
          <Button
            fullWidth
            onClick={() => {
              navigate("/login")
            }}
            type="button"
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
