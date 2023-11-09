import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mui/material"
import EmailField from "./CustomTextField"
import { useNavigate } from "react-router-dom"

export const ForgotPasswordSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
})

export default function ForgotPasswordForm() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgotPasswordSchema),
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
        <EmailField
          label="Email"
          placeholder="Email"
          id={"login-email"}
          type="Email"
          name="email"
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
